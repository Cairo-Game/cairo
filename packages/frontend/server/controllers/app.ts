import {Request, Response} from 'express';

export default function renderApp(req: Request, res: Response) {
    const resHeaders = res.getHeaders();
    // req.tld!
    const {
        ip,
    } = req;

    res.renderBundle('desktop', {
        ip,
        resHeaders,
    });
}
