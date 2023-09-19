"use strict";
// create a nodejs endpoint that uses jwt to verify a supplied token string
// use this endpoint when loading each screen on the mobile side to verify the current token, and if this returns a 408, go to the Logout.tsx page
// if the token is valid, return a 200 status code and a message
// if the token is invalid, return a 401 status code and a message
// if the token is missing, return a 400 status code and a message
/*
import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/secrets';

const confirmAccessTokenRouter = Router();

confirmAccessTokenRouter.get('/', (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(200).json({ message: 'Valid token provided' });
  });
});

export default confirmAccessTokenRouter;
*/
//# sourceMappingURL=confirmAccessToken.js.map