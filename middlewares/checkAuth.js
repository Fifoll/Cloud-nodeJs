import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'key');
        req.userData = decoded;
        next();
    }
    catch(err) {
        res.status = 401;
        res.send({
            success: false,
            message: 'Auth failed',
            status: res.status
        })
    }
}