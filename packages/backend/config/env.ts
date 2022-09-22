import { env } from 'process';
const { PORT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = env;

export const config = {
    port: !isNaN(Number(PORT)) ? Number(PORT) : 4000,
    db: {
        host: DB_HOST ?? 'postgres',
        port: !isNaN(Number(DB_PORT)) ? Number(DB_PORT) : 5432,
        username: DB_USERNAME ?? 'russiancmo',
        password: DB_PASSWORD ?? '3tr879m306',
        database: DB_NAME ?? 'cairo',
    },
};
