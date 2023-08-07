import rateLimit from 'express-rate-limit';

export const TenSecondLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 1, // limit each IP to 1 request per windowMs
  message: "Too many sign-up attempts from this IP, please try again later."
});

export const ThreeSecondLimiter = rateLimit({
  windowMs: 3 * 1000, // 3 seconds
  max: 1, // limit each IP to 1 request per windowMs
  message: "Too many sign-up attempts from this IP, please try again later."
});
