const File = require('../../models/file.js');
const fs = require('fs/promises');
const getFileFromDBIfExists = require('../../utlis/getFileFromDBIfExists.js');

const removeFileFromPublicFolder = async (path, res) => {
    try {
        await fs.unlink(path);
        return true;
    } catch (err) {
        res.status(500).send({
            success: false,
            status: res.status,
            message: err.message
        });
        return false;
    }
}

const deleteFile = async (req, res) => {
    try {
        const file = await getFileFromDBIfExists(req.userData.userId, req.params.id, res);

        if (file) {
            const removed = await removeFileFromPublicFolder(file.path, res);

            if (removed) {

                await File.destroy({
                    where: {
                        file_id: file.file_id
                    }
                });

                res.status(200).send({
                    success: true,
                    status: res.status,
                    message: `Delete file with id ${req.params.id}`
                });
            }

        }
    }
    catch (err) {
        res.status(500).send({
            success: false,
            status: res.status,
            message: err.message
        });
    }
}

module.exports = deleteFile;
