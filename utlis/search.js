import File from '../models/file.js';
import { Op } from 'sequelize';

const search = async (query, userId) => {
    try {
        const files = await File.findAll({
            where: {
                user_id: userId,
                name: {
                    [Op.like]: `%${query}%`
                }
            }
        })
        return files;
    }
    catch (err) {
    throw new Error('Problem with searching: ' + err)
}
}

export default search;