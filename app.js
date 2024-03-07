const cfg = require('./config/general-config.js');
const express = require('express');
const userRoutes = require('./routes/user-routes.js');
const fileRoutes = require('./routes/file-routes.js');
const cors = require('cors');
const corsconfig = require('./config/cors-config.js');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsconfig));

app.use('/api/user', userRoutes);
app.use('/api/file', fileRoutes);

app.listen(cfg.PORT, cfg.HOST, () => {
    console.log(`Server started at: ${cfg.HOST}:${cfg.PORT}`);
});
