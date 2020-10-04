import * as jwt from 'jsonwebtoken';
import * as express from "express";
import * as config from "config";

export const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const token = req.header('x-auth-token');

    if (!token)
        return res.status(401).send('access denied. no token provided');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req["user"] = decoded;
        next();
    } catch (ex) {
        res.status(400).send('invalid token');
    }

}