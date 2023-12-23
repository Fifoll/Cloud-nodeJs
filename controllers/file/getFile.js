import File from '../../models/file.js';
const getFile = async (req, res) => {
    try {
        const file = await File.findOne({
            where: {
                user_id: req.userData.userId,
                file_id: req.params.id
            }
        })
        if(file) {
            res.status(200).send({
                success: true,
                status: res.status,
                data: file,
                message: `Display file with id ${req.params.id}`
            });
        } else {
            res.status(400).send({
                success: false,
                status: res.status,
                message: `File with id ${req.params.id} doesnt exist`
            });
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

export default getFile;