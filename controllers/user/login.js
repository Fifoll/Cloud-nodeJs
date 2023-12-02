import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({where: { email }});
        if(user) {
            const passwordCheck = await bcrypt.compare(req.body.password, user.password);
            if(passwordCheck) {
                const token = jwt.sign({email: user.email, userId: user.id}, 'key', {expiresIn: '1h'});
                res.status(200).send({
                    success: true,
                    status: 200,
                    data: token,
                    message: 'Auth successed'
                })
                return;
            }
        }
        res.status(401).send({
            success: false,
            status: res.status,
            message: 'Auth failed'
        })
    } catch(err) {
        res.status(500).send({
            success: false,
            status: res.status,
            message: err.message
        })
    }
}

export default login;