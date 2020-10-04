import * as winston from 'winston';
import { Request, Response, NextFunction } from 'express'

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    winston.error(err.message, err);
    res.status(500).send('something went wrong.');
}