import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ExtendedRequest } from '../interfaces/ExtendedRequest.ts';
import { ExtendedJwtPayload } from '../interfaces/ExtendedJwtPayload.ts';

export const authenticateJWT = (req: ExtendedRequest, res: Response, next: Function) => {
    console.log("Calling authenticateJWT");

    const token = req.header('Authorization');

    console.log("token: " + token);
    
    if (token) {
        jwt.verify(token.replace("Bearer ", ""), 'yourSecretKey', (err, user) => {
            if (err) {
                if (err.name == "TokenExpiredError")
                    return res.sendStatus(408);
                else
                    return res.sendStatus(403); // Forbidden
            }

            req.phoneNumber = (user as ExtendedJwtPayload)!.phoneNumber

            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
  }
  