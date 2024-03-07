const File = require('../../models/file.js');
const fileExtension = require('file-extension');
const getFileFromDBIfExists = require('../../utlis/getFileFromDBIfExists.js');

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
        const file = await getFileFromDBIfExists(req.userData.userId, req.params.id, res);

        if (file) {
            const extension = fileExtension(file.name);
            const newName = `${req.body.name}.${extension}`;

            const fileExists = await fileNameExists(newName, res);

            if (!fileExists) {
                await File.update({ name: newName }, {
                    where: {
                        file_id: req.params.id
                    }
                })

                res.status(200).send({
                    success: true,
                    status: res.status,
                    message: `Change filename to ${newName}`
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

module.exports = updateFileName;
