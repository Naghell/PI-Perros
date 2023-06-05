const { Router } = require('express');
const getDogs = require('../controllers/getDogs');
const getRazaByID = require('../controllers/getRazaByID');
const getRazaByName = require('../controllers/getRazaByName');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', (req, res) => {
    getDogs(req, res);
})

router.get('/dogs/:id', (req, res) => {
    getRazaByID(req, res);
})

router.get('/dogs/name/:name', (req, res) => {
    getRazaByName(req, res);
})

module.exports = router;
