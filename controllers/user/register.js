import User from '../../models/user.js';
import bcrypt from 'bcrypt';

const encrypt = async (password) => {
    return await bcrypt.hash(password, 10);
}

const register = async (req, res) => {
    try {
        const data = req.body;
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
    } catch(err) {
        res.status(500).send({
            success: false,
            status: res.status,
            message: err.message
        })
    }

}


export default register;