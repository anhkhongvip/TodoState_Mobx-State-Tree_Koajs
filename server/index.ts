// Import prerequisite packages
import 'dotenv/config';
import bodyParser from 'koa-bodyparser';
import next from 'next';
import cors from 'koa-cors';
import Koa from 'koa';
import Router from 'koa-router';
import connectDB  from './configs/db';
import api from './routes'
// Initialize KoaJs server and router
const server = new Koa();
const router = new Router();
require('dotenv').config()

// Initialize NextJs instance and expose request handler
const nextApp = next({ dev: true });
const handler = nextApp.getRequestHandler();

(async () => {
    try {
        await nextApp.prepare();
        await connectDB();
        server.use(bodyParser());
        server.use(cors());
        router.get('(.*)', async ctx => {
            await handler(ctx.req, ctx.res);
            ctx.respond = false;
        });

        
        server.use(api.routes());
        server.use(router.routes());
        server.listen(3000, () => console.log('App running on port 3000'));
    } catch (e) {
        console.error(e);
        process.exit();
    }
})();