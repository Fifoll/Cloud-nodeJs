const User = require('../../models/user.js');
const bcrypt = require('bcrypt');

const encrypt = async (password) => {
    return await bcrypt.hash(password, 10);
}

const register = async (req, res) => {
    try {
        const data = req.body;

        const userExists = await User.findOne({
            where: {
                email: data.email,
            }
        });

        if(!userExists) {
            const hashedPassword = await encrypt(data.password);
            const user = await User.create({
                email: data.email,
                password: hashedPassword
            });
    
            res.status(200).send({
                success: true,
                data: user,
                message: `New user created with id ${user.id}`
            })
        }
        else {
            res.status(207).send({
                success: false,
                message: `User with email ${data.email} already exists in database`
            })
        }

    } catch(err) {
        res.status(500).send({
            success: false,
            status: res.status,
            message: err.message
        })
    }

}

module.exports = register;
