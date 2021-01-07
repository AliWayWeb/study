const jwt = require('jsonwebtoken')
const config = require('config')

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token')
        if (!token) {
            return res.status(401).json({ message: 'Нет токена аутентификации, в авторизации отказано' })
        }

        const verified = jwt.verify(token, config.get('jwtSecret'))
        if(!verified) {
            return res.status(401).json({ message: 'Ошибка проверки токена, в авторизации отказано' })
        }

        req.user = verified.id
        next()
    } catch (e) {
        res.status(500).json({ e: e.message })
    }
}

module.exports = auth