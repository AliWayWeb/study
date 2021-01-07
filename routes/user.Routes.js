// imports

const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require("express-validator");
const config = require('config')
const auth = require('../middleware/auth.middleware')

// register users

router.post('/register',

    // validate

    [
        check('email', 'Не правильный e-mail').isEmail(),
        check('password', 'Пароль должен быть больше 6 символов').isLength({ min: 6, max: 12 })
    ],

    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({ message: "Вы не правильно заполнили форму", errors })
            }

            const { email, password, name, lastName } = req.body;

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(200).json({ message: `Пользователь с таким email уже существует` })
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashPassword })

            if (user) {
                await user.save()
            }
            return res.send({ message: "Пользователь создан" })

        } catch (e) {

            // errors

            console.log(e)
            res.send({ e: e.message })
        }
    })

// login users

router.post('/login',
    async (req, res) => {
        try {

            // validate

            const { email, password } = req.body

            const user = await User.findOne({ email })
            if (!user) {
                res.status(400).json({ message: "Пользователь не найден" })
            }

            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                res.status(400).json({ message: "Пользователь не найден" })
            }

            const token = jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: '1h' })

            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }
            })

        } catch (e) {

            // errors

            console.log(e)
            res.send({ e: e.message })
        }
    })

// delete account

router.delete('/delete', auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser)
    } catch (e) {

    }
})


// token validate

router.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token')
        if (!token) {
            return res.json(false)
        }

        const verified = jwt.verify(token, config.get('jwtSecret'))
        if(!verified) {
            return res.json(false)
        }

        const user = await User.findById(verified.id) 
        if(!user) {
            return res.json(false)
        }

        return res.json(true)
    } catch (e) {
        console.log({ e: e.message });
    }
})

// auht get

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user)
    res.json({
        id: user.id,
        email: user.email
    })
})

// export 

module.exports = router