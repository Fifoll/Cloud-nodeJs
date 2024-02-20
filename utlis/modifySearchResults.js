import File from '../models/file.js';
import { Op } from 'sequelize';

const modifySearchResults = async (searchQuery, sort, userId) => {
    try {
        const options = {
            where: {
                user_id: userId
            }
        };
        if (searchQuery) {
            options.where.name = {
                [Op.like]: `%${searchQuery}%`
            }
        }
        if (sort) {
            const sortParts = sort.split(',');
            const sortBy = sortParts[0];
            const orderBy = sortParts[1];
            options.order = [[sortBy, orderBy]];
        }

        const files = await File.findAll(options);
        return files;
    }
    catch (err) {
        throw new Error('Problem with modifying search results: ' + err);
    }
}

export default modifySearchResults;