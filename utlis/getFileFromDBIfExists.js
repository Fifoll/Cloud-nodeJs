import File from '../models/file.js';

const getFileFromDBIfExists = async (user_id, file_id, res) => {
    try {
        const file = await File.findOne({
            where: { user_id, file_id }
        });

        if(file) {
            return file;
        } else {
            res.status(400).send({
                success: false,
                status: res.status,
                message: `File with id ${file_id} doesnt exist`
            });
            return false;
        }
    }
    catch(err) {
        res.status(500).send({
            success: false,
            status: res.status,
            message: err.message
        });
    }
}

export default getFileFromDBIfExists;