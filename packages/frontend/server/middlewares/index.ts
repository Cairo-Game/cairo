import cookieParserMiddleware from 'cookie-parser';
import {RequestHandler} from 'express';

import loggerMiddleware from './logger';
import renderMiddleware from './render';

const cookieParser: RequestHandler = cookieParserMiddleware();


const render: RequestHandler | RequestHandler[] = renderMiddleware;

const logger: RequestHandler = loggerMiddleware();

export {
    cookieParser,
    render,
    logger,
};
