const e = require('express');
const { json } = require('express');
const express = require('express');
const pool = require('../database');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const Chart = require('chart.js');
router.get('/', isNotLoggedIn, (req, res) => {
    res.render('index')
})

router.get('/test', isLoggedIn, (req, res) => {
    res.render('test/test')
})

router.post('/test', isLoggedIn, (req, res) => {

    const { option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, myChart1 } = req.body;
    const pregunta1 = {
        nombrePregunta:'pregunta 1',
        respuesta: option1,
        user_id: req.user.id
    };
    pool.query('INSERT INTO Respuestas set ?', [pregunta1]);
    const pregunta2 = {
        nombrePregunta: 'pregunta 2',
        respuesta: option2,
        user_id: req.user.id
    };
    pool.query('INSERT INTO Respuestas set ?', [pregunta2]);
    const pregunta3 = {
        nombrePregunta: 'pregunta 3',
        respuesta: option3,
        user_id: req.user.id
    };
    pool.query('INSERT INTO Respuestas set ?', [pregunta3]);
    const pregunta4 = {
        nombrePregunta: 'pregunta 4',
        respuesta: option4,
        user_id: req.user.id
    };
    pool.query('INSERT INTO Respuestas set ?', [pregunta4]);
    const pregunta5 = {
        nombrePregunta: 'pregunta 5',
        respuesta: option5,
        user_id: req.user.id
    };
    pool.query('INSERT INTO Respuestas set ?', [pregunta5]);
    const pregunta6 = {
        nombrePregunta: 'pregunta 6',
        respuesta: option6,
        user_id: req.user.id
    };
    pool.query('INSERT INTO Respuestas set ?', [pregunta6]);
    const pregunta7 = {
        nombrePregunta: 'pregunta 7',
        respuesta: option7,
        user_id: req.user.id
    };
    pool.query('INSERT INTO Respuestas set ?', [pregunta7]);
    const pregunta8 = {
        nombrePregunta: 'pregunta 8',
        respuesta: option8,
        user_id: req.user.id
    };
    pool.query('INSERT INTO Respuestas set ?', [pregunta8]);
    const pregunta9 = {
        nombrePregunta: 'pregunta 9',
        respuesta: option9,
        user_id: req.user.id
    };
    pool.query('INSERT INTO Respuestas set ?', [pregunta9]);
    const pregunta10 = {
        nombrePregunta: 'pregunta 10',
        respuesta: option10,
        user_id: req.user.id
    };
    pool.query('INSERT INTO Respuestas set ?', [pregunta10]);
    var w = 0;
    var x = 0;
    var y = 0;
    var z = 0;
    if (option1 == 1) {
        x = x + 1;
        w = w + 1;
    }
    
    if (option2 == 1) {
        y = y + 1;
        z = z + 1;
    }
    if (option3 == 1) {
        x = x + 1;
        z = z + 1;
        w = w + 1;
    }
    if (option4 == 1) {
        y = y + 1;
    }
    if (option5 == 1) {
        z = z + 1;
    }
    if (option6 == 1) {
        z = z + 1;
        w = w + 1;
    }
    if (option7 == 1) {
        w = w + 1;
    }
    if (option8 == 1) {
        x = x + 1;
        y = y + 1;
    }
    if (option9 == 1) {
        y = y + 1;
    }
    if (option10 == 1) {
        x = x + 1;
    }

    const Materia1 = {
        nombreMateria: 'w',
        conteo: w,
        user_id: req.user.id
    }
    pool.query('INSERT INTO Materias set ?', [Materia1]);
    const Materia2 = {
        nombreMateria: 'x',
        conteo: x,
        user_id: req.user.id
    }
    pool.query('INSERT INTO Materias set ?', [Materia2]);
    const Materia3 = {
        nombreMateria: 'y',
        conteo: y,
        user_id: req.user.id
    }
    pool.query('INSERT INTO Materias set ?', [Materia3]);
    const Materia4 = {
        nombreMateria: 'z',
        conteo: z,
        user_id: req.user.id
    }
    pool.query('INSERT INTO Materias set ?', [Materia4]);

    res.redirect('/results');
})

router.get('/results', async (req, res) => {
    const links = await pool.query('SELECT conteo FROM Materias WHERE user_id = ?',req.user.id);
    var w= links[0].conteo;
    var x= links[1].conteo;
    var y= links[2].conteo;
    var z= links[3].conteo;
    console.log(w, x, y, z);
    res.render('test/results',{w: w, x:x,y:y, z:z});
})

router.get('/pago', (req, res) => {
    res.render('pagos/pago');
})
router.get('/pago/debito',(req,res) => {
    res.render('pagos/Debito');
})
router.post('/pago/debito', async (req, res) => {
    const { id, fechaCaducidad, cvc} = req.body;
    newCard = {
        codigoTarjeta: id,
        fechaCaducidad,
        cvc,
        user_id: req.user.id
    }
    console.log(newCard);
    await pool.query('INSERT INTO debito set ?', [newCard]);
    req.flash('success', 'Se ha hecho correctamente el pago');
    res.redirect('/preTest');
})
router.get('/pago/credito',(req,res) => {
    res.render('pagos/Credito');
})

router.post('/pago/credito', async (req, res) => {
    const { id, apellidos, telefono, fechaCaducidad, cvc} = req.body;
    newCard = {
        codigoTarjeta: id,
        apellidos,
        telefono,
        fechaCaducidad,
        cvc,
        user_id: req.user.id
    }
    await pool.query('INSERT INTO credito set ?', [newCard]);
    req.flash('success', 'Se ha hecho correctamente el pago');
    res.redirect('/preTest');
})

router.get('/preTest',(req, res) => {
    res.render('test/preTest')
})

module.exports = router;