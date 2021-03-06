const passport = require('passport')

module.exports = {
    local: (req, res, next) => {
        passport.authenticate('local', {session: false}, (error, user, info) => {
            if (error && error.name === 'InvalidArgumentError') {
                return res.status(401).json({error: error.message});
            }else if (erro){
                return res.status(500).json({error: error.message});
            }else if (!user) {
                return res.status(401).json({error: error.message});
            }
            req.user = user;
            return next()
        },(req, res, next))
    },
    bearer: (req, res, next) => {
        passport.authenticate('bearer', {session: false}, (error, user, info)=>{
            if (error && error.name === 'JsonwebtokenError') {
                return res.status(401).json({error: error.message})
            }else if (error && error.name === 'TokenExpiredError') {
                return res.status(401).json({error: error.message, expiresIn: error.expiresIn})
            }else if (error){
                return res.status(500).json({error: error.message})
            }else if (!user){
                return res.status(401).json()
            }
            req.user = user;
            return next();
        })
    }
}