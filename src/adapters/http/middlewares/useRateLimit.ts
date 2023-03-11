import rateLimit  from 'express-rate-limit'

export const rateLimiter = () => rateLimit({ 
    max: 120,
    windowMs: 10 * 60 * 1000,
    message: {message: 'Muitas requisições a partir deste IP, tente novamente após 10 minutos' }
  });