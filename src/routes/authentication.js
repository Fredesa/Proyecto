const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');
const helpers = require('../lib/helpers');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');
router.get('/signup',isNotLoggedIn,(req,res) =>{
    res.render('auth/signup')
});
router.post('/signup',isNotLoggedIn, passport.authenticate('local.signup',{
        successRedirect: '/logouts',
        failureRedirect: '/signup',
        failureFlash: true
    }));
router.get('/signin',isNotLoggedIn,(req,res)=>{
    res.render('auth/signin');
});
router.post('/signin',isNotLoggedIn,(req, res, next)=> {
    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});
router.get('/profile',isLoggedIn, (req, res) =>{
    res.render('profile');
});
router.get('/logout',isLoggedIn, (req,res)=>{
    req.logOut();
    res.redirect('/');
})
router.get('/logouts',isLoggedIn, (req,res)=>{
    req.logOut();
    req.flash('success','Te has registrado correctamente, revisa tu correo para conocer la clave');
    res.redirect('/signin');
})
router.get('/cambioContrasena',isLoggedIn, (req, res) => {
    res.render('auth/cambioContrasena');
})
router.post('/cambioContrasena',isLoggedIn,async (req, res) =>{
    const {password, password2} = req.body;
    if(password === password2){
        pw = await helpers.encryptPassword(password);
        console.log(password,password2);
        await pool.query('UPDATE Usuarios SET password = ? WHERE id = ?',[pw, req.user.id]);
        req.flash('success','Contraseña cambiada correctamente');
        res.redirect('/profile');
    }
})
module.exports = router;