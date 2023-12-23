import getFileFromDBIfExists from '../../utlis/getFileFromDBIfExists.js';

const getFile = async (req, res) => {
    try {
        const file = await getFileFromDBIfExists(req.userData.userId, req.params.id, res);

        if(file) {
            res.status(200).send({
                success: true,
                status: res.status,
                data: file,
                message: `Display file with id ${req.params.id}`
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