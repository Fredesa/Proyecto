const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
const {generatePassword} =require ('./auth');
const nodemailer = require ('nodemailer');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, correo, password, done) => {
    const rows = await pool.query('SELECT * FROM Usuarios WHERE correo = ?',[correo]);
    if (rows.length > 0 ){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) { 
            done(null, user, req.flash( 'success','Welcome '+ user.nombreCompleto));
        }else {
            done(null, false, req.flash('messsage','Contraseña Incorrecta'))
        }
    }else {
        return done(null, false, req.flash('message','El usuario no existe'));
    }
}));
passport.use('local.signup', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
},async (req, correo, password, done) =>{
    contentHTML = `
        <h1> REGISTRO COMPLETADO </h1>
        <ul>
            <p>Se ha completado correctamente el registro, a continuacion veras tus datos de ingreso</p>
            <li>Usuario: ${correo}</li>
            <li>Contraseña: ${password}</li>
        </ul>
        `;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'testdeaya@gmail.com', 
            pass: 'xsknxfebafxxoxcp'
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    
    const {nombreCompleto,telefono} = req.body;
    const newUser = {
        correo,
        nombreCompleto,
        password,
        telefono
    };
    const Validator = await pool.query('SELECT correo FROM Usuarios WHERE correo = ?',[correo]);
    if (Validator.length!=0){
        done(null, false, req.flash('message','Este correo ya se encuentra registrado'));
    }else{
        newUser.password = await helpers.encryptPassword(password);
        const result = await pool.query('INSERT INTO Usuarios SET ?',[newUser]);
        const info = await transporter.sendMail({
            from: "'Test de Actitud y Aptituz' <testdeaya@gmail.com>" ,
            to: req.body.correo,
            subject: 'Registro Test de Aptitud y Actitud',
            html: contentHTML
        });
        newUser.id = result.insertId;
        return done(null, newUser);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE id = ?',[id]);
    done(null, rows[0]);

})