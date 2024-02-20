import File from '../../models/file.js';
import modifySearchResults from '../../utlis/modifySearchResults.js';
import sortFiles from '../../utlis/sortFiles.js';

const getFiles = async (req, res) => {
    try {
        const sortQuery = req.query.sort;
        const searchQuery = req.query.search;
        const userId = req.userData.userId;
        const files = await modifySearchResults(searchQuery, sortQuery, userId);

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