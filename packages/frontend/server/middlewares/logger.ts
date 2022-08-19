import {NextFunction, Request, Response} from 'express';

export default function () {
    return (req: Request, _res: Response, next: NextFunction) => {
        // @ts-ignore
        req.logger = () => {
            // eslint-disable-next-line
            console.log(req);
        };
        next();
    };
}
