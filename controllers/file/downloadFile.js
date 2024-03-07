const { promisify } = require('util');
const getFileFromDBIfExists = require('../../utlis/getFileFromDBIfExists.js');
const fs = require('fs');

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

module.exports = downloadFile;
