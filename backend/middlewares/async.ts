import * as express from "express";

export = ((handler) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await handler(req, res);
        } catch (ex) {
            next(ex);
        }
    }
});