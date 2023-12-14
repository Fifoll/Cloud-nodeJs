import fileExtension from 'file-extension';
import fs from 'fs/promises';
import path from 'path';
import File from '../../models/file.js';
import cryptoRandomString from 'crypto-random-string';

const uploadFile = async (req, res) => {
    try {
        const publicFolderPath = 'D:\\Szkolenia\\Altcom nodeJs\\nodejs-workshop\\miniProjects\\cloud\\Cloud\\public';
        const extension = fileExtension(req.file.originalname);
        const randomString = cryptoRandomString({length: 10});
        const destinationPath = path.join(publicFolderPath, `${randomString}.${extension}`);
        const temporaryFilePath = req.file.path;

        // zapisanie do bazy i przejście walidacji
        const userId = req.userData.userId;
        const fileName = req.body.fileName ? `${req.body.fileName}.${extension}` : req.file.originalname;
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
    } catch (err) {
        res.status(500).send({
            success: false,
            status: res.status,
            message: err.message
        });
    }
}

export default uploadFile;