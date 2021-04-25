import jwt from 'jsonwebtoken'
import HttpStatus from '../utils/HttpStatus'

async function verifyToken(token, secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err)
                reject(err);
            resolve(decoded);
        });
    });
}

const authMiddleware = async (req, res) => {
    const token = req.headers.authorization
    if (!token)
        res.status(400).send({
            info: 'need authorization'
        })
    else {
        try {
            await verifyToken(token.replace('Bearer ', ''), "secret")
        } catch (error) {
            res.status(500).send({
                info: 'invalid token'
            })
        }

    }
    next()
}

export default authMiddleware