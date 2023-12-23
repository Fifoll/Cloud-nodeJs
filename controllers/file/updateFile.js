import File from '../../models/file.js';
import fileExtension from 'file-extension';

const fileNameExists = async (name, res) => {
    const fileExists = await File.findOne({
        where: {
            name: name
        }
    });
    if(fileExists) {
        res.status(409).send({
            success: false,
            status: res.status,
            message: `File with name ${name} already exists`
        });
        return true;
    }
    else {
        return false;
    }
}

const updateFileName = async (req, res) => {
    try {
        const id = req.params.id;
        const file = await File.findOne({
            where: {
                user_id: req.userData.userId,
                file_id: id
            }
        })
        if (file) {
            const extension = fileExtension(file.name);
            const newName = `${req.body.name}.${extension}`;

            const fileExists = await fileNameExists(newName, res);

            if (!fileExists) {
                await File.update({ name: newName }, {
                    where: {
                        file_id: id
                    }
                })

                res.status(200).send({
                    success: true,
                    status: res.status,
                    message: `Change filename to ${newName}`
                });
            }

        } else {
            res.status(400).send({
                success: false,
                status: res.status,
                message: `File with id ${id} doesnt exist`
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

export default updateFileName;