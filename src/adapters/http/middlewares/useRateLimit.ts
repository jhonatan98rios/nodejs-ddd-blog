import rateLimit  from 'express-rate-limit'

export const rateLimiter = () => rateLimit({ 
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: {message: 'Muitas requisições a partir deste IP, tente novamente após 60 minutos' }
  });