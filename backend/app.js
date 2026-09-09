import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';

const app = express();
export const prisma = new PrismaClient();

// Security Headers
app.use(helmet());

// Trust proxy for Render/reverse proxies so rate limiter reads real client IP
app.set('trust proxy', 1);

// Parse allowed frontend origins from FRONTEND_URL env var + local dev defaults
const configuredOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(url => url.trim())
  .filter(Boolean);

const allowedOrigins = [
  ...configuredOrigins,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(`[CORS Blocked] Origin '${origin}' not permitted.`);
    return callback(new Error('CORS Policy: Origin not allowed'), false);
  },
  credentials: true
}));

// Request body size limiting to prevent payload flooding
app.use(express.json({ limit: '10kb' }));

// Global Rate Limiter: max 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use(globalLimiter);

// Specific Rate Limiter for Lead Submissions: max 5 submissions per 15 minutes per IP
const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many lead submissions from this IP. Please try again after 15 minutes.' }
});

// GET /api/health - Health check endpoint (Independent of DB)
app.get('/api/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// POST /api/leads - Create a new lead with strict validation
app.post('/api/leads', leadLimiter, async (req, res, next) => {
  try {
    const { name, email, phone, company, service, message } = req.body || {};

    // 1. Required fields check
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Name is required.'
      });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Email is required.'
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // 2. Format & Length Validations
    if (trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name must be 100 characters or less.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 255) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const trimmedPhone = typeof phone === 'string' ? phone.trim().slice(0, 50) : null;
    const trimmedCompany = typeof company === 'string' ? company.trim().slice(0, 100) : null;
    const trimmedService = typeof service === 'string' ? service.trim().slice(0, 100) : null;
    const trimmedMessage = typeof message === 'string' ? message.trim().slice(0, 2000) : null;

    console.log('[POST /api/leads] Received validated submission for:', trimmedEmail);

    // 3. Save to Supabase via Prisma
    const newLead = await prisma.lead.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone || null,
        company: trimmedCompany || null,
        service: trimmedService || null,
        message: trimmedMessage || null,
        status: 'NEW'
      }
    });

    console.log('[POST /api/leads] Lead created with ID:', newLead.id);

    return res.status(201).json({
      success: true,
      message: 'Lead created successfully.',
      data: newLead
    });
  } catch (error) {
    console.error('[POST /api/leads] Database Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit lead. Please try again later.'
    });
  }
});

// GET /api/leads - Protected route for admin listing leads
app.get('/api/leads', async (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey || adminKey !== expectedKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized access.'
    });
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    console.error('[GET /api/leads] Error fetching leads:', error);
    return res.status(500).json({ success: false, error: 'Failed to retrieve leads.' });
  }
});

// 404 Handler for non-existent API routes
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    error: 'Endpoint not found.'
  });
});

// Global Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[UNHANDLED ERROR]', err);

  if (err.message === 'CORS Policy: Origin not allowed') {
    return res.status(403).json({
      success: false,
      error: 'CORS Policy: Request origin not allowed.'
    });
  }

  return res.status(500).json({
    success: false,
    error: 'Internal server error.'
  });
});

export default app;
