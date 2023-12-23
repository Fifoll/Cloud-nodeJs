import File from '../../models/file.js';
import fs from 'fs/promises';

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
        const file = await File.findOne({
            where: {
                user_id: req.userData.userId,
                file_id: req.params.id
            }
        })

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
        else {
            res.status(400).send({
                success: false,
                status: res.status,
                message: `File with id ${req.params.id} doesnt exist`
            });
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

export default deleteFile;