const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'The min length of the password is 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data on registartion"
                })
            }
            const {email, password} = req.body;
            console.log('req body server', req.body)
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'This user is already exist'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await user.save()

            res.status(201).json({message: 'the user was created'})

        } catch (err) {
            res.status(500).json({message: 'Something went wrong'})
        }
    })

router.post(
    '/login',
    [
    check('email', 'Input correct email').normalizeEmail().isEmail(),
    check('password', 'Input the password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data on log in system"
                })
            }

            const {email, password} = req.body
            console.log('req body server', req.body)
            const user = await User.findOne({email})
            if(!user){
                return res.status(400).json({message: 'User not found'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({message: 'The password is wrong'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn:'1h'}
            )
            console.log('user', user)
            console.log('token', token)

            res.json({token, userId: user.id})

        } catch (err) {
            res.status(500).json({message: 'Something went wrong'})
        }
    }
)

router.get(
    '/register',(req, res)=>{
        res.status(200).json({message: 'Fuck you Pidr!'})
    })

router.get(
    '/login',(req, res)=>{
        res.status(200).json({message: 'Fuck you Pidr!'})
    })


module.exports = router