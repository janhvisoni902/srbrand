import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5001;

// CORS configuration - allow Vite frontend origins & all during dev
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// POST /api/leads - Create a new lead
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required fields.'
      });
    }

    console.log('[POST /api/leads] Received submission:', { name, email, phone, company, service, message });

    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        service: service || null,
        message: message || null,
        status: 'NEW'
      }
    });

    console.log('[POST /api/leads] Successfully saved lead to DB:', newLead.id);

    return res.status(201).json({
      success: true,
      message: 'Lead created successfully.',
      data: newLead
    });
  } catch (error) {
    console.error('[POST /api/leads] Error creating lead:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to submit lead. Please try again later.'
    });
  }
});

// GET /api/leads - List all leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    console.error('[GET /api/leads] Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server listening on http://localhost:${PORT}`);
});
