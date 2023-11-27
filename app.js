import cfg from './config/general-config.js';
import express from 'express';

const app = express();

app.listen(cfg.PORT, cfg.HOST, () => {
    console.log(`Server started at: ${cfg.HOST}:${cfg.PORT}`);
})