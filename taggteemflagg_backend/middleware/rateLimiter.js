import rateLimit from 'express-rate-limit';
export const TenSecondLimiter = rateLimit({
    windowMs: 10 * 1000,
    max: 1,
    message: "Too many sign-up attempts from this IP, please try again later."
});
export const ThreeSecondLimiter = rateLimit({
    windowMs: 3 * 1000,
    max: 1,
    message: "Too many sign-up attempts from this IP, please try again later."
});
//# sourceMappingURL=rateLimiter.js.map