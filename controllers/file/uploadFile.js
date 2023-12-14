import fileExtension from 'file-extension';
import fs from 'fs/promises';
import path from 'path';

const uploadFile = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const publicFolderPath = 'D:\\Szkolenia\\Altcom nodeJs\\nodejs-workshop\\miniProjects\\cloud\\Cloud\\public';
        const file = req.file;
        const fileName = req.body.fileName;
        const extension = fileExtension(file.originalname);
        let destinationPath;
        destinationPath = req.body.fileName ? path.join(publicFolderPath, `${fileName}.${extension}`) :  path.join(publicFolderPath, file.originalname);
        const temporaryFilePath = file.path;

        const fileContent = await fs.readFile(temporaryFilePath);

        await fs.writeFile(destinationPath, fileContent);

        await fs.unlink(temporaryFilePath);

        res.status(200).send({
            success: true,
            status: res.status,
            message: 'Plik został pomyślnie przesłany i zapisany.'
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