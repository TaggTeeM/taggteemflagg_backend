import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ExtendedRequest } from '../interfaces/ExtendedRequest.js';
import { ExtendedJwtPayload } from '../interfaces/ExtendedJwtPayload.js';
import { JWT_SECRET } from '../config/secrets.js';

export const authenticateJWT = (req: ExtendedRequest, res: Response, next: Function) => {
    console.log("Calling authenticateJWT");

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized
    }

    console.log("AUTH: " + authHeader);

    const token = authHeader.split(" ")[1];
    
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                if (err.name == "TokenExpiredError")
                    return res.sendStatus(403); // Forbidden when expired
                else
                    return res.sendStatus(401); // Unauthorized when invalid
            }

            req.phoneNumber = (user as ExtendedJwtPayload)!.phoneNumber;

            console.log("  FOUND: " + req.phoneNumber);

            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
  }
  