import fileExtension from 'file-extension';
import fs from 'fs/promises';
import path from 'path';
import File from '../../models/file.js';
import cryptoRandomString from 'crypto-random-string';
import { fileURLToPath } from 'url';

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

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            const publicFolderPath = path.join(__dirname, '../../public');
            const randomString = cryptoRandomString({length: 10});
            const destinationPath = path.join(publicFolderPath, `${randomString}.${extension}`);
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

export default uploadFile;