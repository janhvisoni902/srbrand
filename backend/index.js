import app, { prisma } from './app.js';

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n[SIGNAL] ${signal} received. Initiating graceful shutdown...`);
  server.close(async () => {
    console.log('[HTTP] Server closed.');
    try {
      await prisma.$disconnect();
      console.log('[PRISMA] Disconnected from database.');
    } catch (err) {
      console.error('[PRISMA] Error during disconnect:', err);
    }
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[UNHANDLED REJECTION] Reason:', reason);
});
