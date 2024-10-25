import rateLimit from 'express-rate-limit';

// Configuración de rate-limiting
export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Demasiados intentos de inicio de sesión, por favor intente nuevamente en 15 minutos',
    standardHeaders: true,
    legacyHeaders: false,
});