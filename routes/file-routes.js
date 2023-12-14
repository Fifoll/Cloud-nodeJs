import express from 'express';
import getFile from '../controllers/file/getFile.js';
import uploadFile from '../controllers/file/uploadFile.js';
import deleteFile from '../controllers/file/deleteFile.js';
import checkAuth from '../middlewares/checkAuth.js';
import multer from "multer";
const upload = multer({dest: '../public'});

const fileRoutes = express.Router();

fileRoutes.get('/:id', checkAuth, getFile);
fileRoutes.post('/', checkAuth, upload.single('file'), uploadFile);
fileRoutes.delete('/:id', checkAuth, deleteFile);

export default fileRoutes;