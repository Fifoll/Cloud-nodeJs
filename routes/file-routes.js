import express from 'express';
import getFile from '../controllers/file/getFile.js';
import uploadFile from '../controllers/file/uploadFile.js';
import deleteFile from '../controllers/file/deleteFile.js';
import updateFileName from '../controllers/file/updateFile.js';
import checkAuth from '../middlewares/checkAuth.js';
import multer from "multer";
import getFiles from '../controllers/file/getFiles.js';
import downloadFile from '../controllers/file/downloadFile.js';
const upload = multer({dest: '../public'});

const fileRoutes = express.Router();

fileRoutes.get('/', checkAuth, getFiles);
fileRoutes.get('/:id', checkAuth, getFile);
fileRoutes.get('/download/:id', checkAuth, downloadFile);
fileRoutes.post('/', checkAuth, upload.single('file'), uploadFile);
fileRoutes.delete('/:id', checkAuth, deleteFile);
fileRoutes.put('/:id', checkAuth, updateFileName);

export default fileRoutes;