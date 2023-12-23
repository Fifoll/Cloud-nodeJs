import File from '../../models/file.js';
const getFiles = async (req, res) => {
    try {
        const files = await File.findAll({
            where: {
                user_id: req.userData.userId
            }
        })
        res.status(200).send({
            success: true,
            status: res.status,
            data: files,
            message: `Display all files`
        });
    }
    catch(err) {
        res.status(500).send({
            success: false,
            status: res.status,
            message: err.message
        });
    }
}

export default getFiles;