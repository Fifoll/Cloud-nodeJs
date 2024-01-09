import dotenv from 'dotenv';
dotenv.config({ path: '.env' })
import cfg from './config/general-config.js';
import express from 'express';
import userRoutes from './routes/user-routes.js';
import fileRoutes from './routes/file-routes.js';
import cors from 'cors';
import corsconfig from './config/cors-config.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors(corsconfig));

app.use('/api/user', userRoutes);
app.use('/api/file', fileRoutes);

app.listen(cfg.PORT, cfg.HOST, () => {
    console.log(`Server started at: ${cfg.HOST}:${cfg.PORT}`);
})