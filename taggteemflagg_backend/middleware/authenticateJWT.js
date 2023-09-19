import jwt from 'jsonwebtoken';
export const authenticateJWT = (req, res, next) => {
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
            req.phoneNumber = user.phoneNumber;
            next();
        });
    }
    else {
        res.sendStatus(401); // Unauthorized
    }
};
//# sourceMappingURL=authenticateJWT.js.map