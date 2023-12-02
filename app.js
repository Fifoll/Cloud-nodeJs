import dotenv from 'dotenv';
dotenv.config({ path: '.env' })
import cfg from './config/general-config.js';
import express from 'express';
import userRoutes from './routes/user-routes.js';
import fileRoutes from './routes/file-routes.js';


const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('api/files', fileRoutes);

app.listen(cfg.PORT, cfg.HOST, () => {
    console.log(`Server started at: ${cfg.HOST}:${cfg.PORT}`);
})