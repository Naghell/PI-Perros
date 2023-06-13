const { Router } = require('express');
const getDogs = require('../controllers/getDogs');
const getRazaByID = require('../controllers/getRazaByID');
const getRazaByName = require('../controllers/getRazaByName');
const getTemperaments = require('../controllers/getTemperaments');
const postDog = require('../controllers/postDog');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', (req, res) => {
    getDogs(req, res);
});

router.get('/dogs/name', (req, res) => {
    getRazaByName(req, res);
});

router.get('/dogs/:id', (req, res) => {
    getRazaByID(req, res);
});

router.get('/temperaments', (req, res) => {
    getTemperaments(req, res);
});

router.post('/dogs', (req, res) => {
    postDog(req, res);
});

module.exports = router;
