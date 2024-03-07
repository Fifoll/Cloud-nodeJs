const express = require('express');
const getFile = require('../controllers/file/getFile.js');
const uploadFile = require('../controllers/file/uploadFile.js');
const deleteFile = require('../controllers/file/deleteFile.js');
const updateFileName = require('../controllers/file/updateFile.js');
const checkAuth = require('../middlewares/checkAuth.js');
const multer = require("multer");
const getFiles = require('../controllers/file/getFiles.js');
const downloadFile = require('../controllers/file/downloadFile.js');

const upload = multer({dest: '../public'});

const fileRoutes = express.Router();

fileRoutes.get('/', checkAuth, getFiles);
fileRoutes.get('/:id', checkAuth, getFile);
fileRoutes.get('/download/:id', checkAuth, downloadFile);
fileRoutes.post('/', checkAuth, upload.single('file'), uploadFile);
fileRoutes.delete('/:id', checkAuth, deleteFile);
fileRoutes.put('/:id', checkAuth, updateFileName);

module.exports = fileRoutes;
