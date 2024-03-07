const fileExtension = require('file-extension');
const fs = require('fs/promises');
const path = require('path');
const File = require('../../models/file.js');
const randomString = require('randomstring');
const { fileURLToPath } = require('url');

const uploadFile = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const extension = fileExtension(req.file.originalname);
        const fileName = req.body.fileName ? `${req.body.fileName}.${extension}` : req.file.originalname;
        
        // walidacja danych
        const fileExists = await File.findOne({
            where: {
                user_id: userId,
                name: fileName
            }
        });

        if(fileExists) {
            // informacja o konflikcie
            res.status(409).send({
                success: false,
                status: res.status,
                message: `File with name ${fileName} already exists`
            });
        }
        else {

            const publicFolderPath = path.join(__dirname, '../../public');
            const randomStringValue = randomString.generate(10);
            const destinationPath = path.join(publicFolderPath, `${randomStringValue}.${extension}`);
            const temporaryFilePath = req.file.path;
            // zapisanie do bazy danych
            const fileInstance = await File.create({
                name: fileName,
                path: destinationPath,
                user_id: userId
            });

            // zapisanie pliku na serwer
            const fileContent = await fs.readFile(temporaryFilePath);
            await fs.writeFile(destinationPath, fileContent);
            await fs.unlink(temporaryFilePath);
            
            res.status(200).send({
                success: true,
                status: res.status,
                data: fileInstance,
                message: `File successfully uploaded.`
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            status: res.status,
            message: err.message
        });
    }
}

module.exports = uploadFile;
