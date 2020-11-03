const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) =>{
    if(req.method === 'OPTIONS'){
        next()
    }

    try{
        console.log('req headers in auth', req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        console.log('token in auth', token)
        if(!token){
            console.log('token stoken', token)
            return res.status(401).json({message: 'There is not autorization'})
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        console.log('decoded', decoded)
        req.user = decoded
        next()
    }catch(e){
        console.log('token sto 2')
        res.status(401).json({message: 'There is not autorization'})
    }
}