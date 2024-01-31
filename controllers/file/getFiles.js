import File from '../../models/file.js';
import search from '../../utlis/search.js';

const getFiles = async (req, res) => {
    try {
        const searchQuery = req.query.search;
        const userId = req.userData.userId;
        let files;
        if(searchQuery) {
            files = await search(searchQuery, userId);
        } else {
            files = await File.findAll({
                where: {
                    user_id: userId
                }
            })
        }
        res.status(200).send({
            success: true,
            status: res.status,
            data: files,
            message: `Display files`
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