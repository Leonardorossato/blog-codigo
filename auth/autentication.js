const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer').Strategy
const Users = require('../models/Users')
const { InvalidArgumentError} = require('../middleware/erros')

const verifyUser = (user) => {
    if(!user) {
        throw new InvalidArgumentError('Não existe usario com esse email')
    }
}

const verifyPassword = async (senha, senhaHash) => {
    const senhaValida = await bcrypt.compare(senha, senhaHash)
    if(!senhaValida) {
        throw new InvalidArgumentError('Email ou senha invalidos')
    }
}

passport.use(
    new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha', 
    session: false,
},async(email, senha, done)=>{
        try {
            const user = await Users.buscaPorEmail(email)
            verifyUser(user)
            await verifyPassword(senha, user.senhaHash)
            done(null, user);
        } catch (error) {
            done(error)
        }
    })
)

passport.use(
    new BearerStrategy(async(token , done)=>{
        try {
            const payload = jwt.verify(token, process.env.secretPassword)
            const user = await Users.buscaPorId(payload.id)
            done(null, user)
        } catch (error) {
            done(error)
        }
    })
)