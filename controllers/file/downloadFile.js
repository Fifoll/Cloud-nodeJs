import { promisify } from 'util';
import getFileFromDBIfExists from '../../utlis/getFileFromDBIfExists.js';
import fs from 'fs';

const readFileAsync = promisify(fs.readFile);

const downloadFile = async (req, res) => {
    try {
        const file = await getFileFromDBIfExists(req.userData.userId, req.params.id, res);

        if (file) {
            const encodedFilename = encodeURIComponent(file.name);
            res.setHeader('Content-Disposition', `attachment; filename=${encodedFilename}`);
            res.setHeader('Content-Type', 'application/octet-stream');
            const data = await readFileAsync(file.path);
            res.send(data);
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            status: res.status,
            message: err.message
        });
    }
}

export default downloadFile;