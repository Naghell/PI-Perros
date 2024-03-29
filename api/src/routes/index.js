const { Router } = require("express");
const getDogs = require("../controllers/getDogs");
const getRazaByID = require("../controllers/getRazaByID");
const getRazaByName = require("../controllers/getRazaByName");
const getTemperaments = require("../controllers/getTemperaments");
const postDog = require("../controllers/postDog");

const router = Router();

router.get("/dogs", (req, res) => {
  const { name } = req.query;
  if (name) {
    getRazaByName(req, res);
  } else {
    getDogs(req, res);
  }
});

router.get("/dogs/:id", (req, res) => {
  getRazaByID(req, res);
});

router.get("/temperaments", (req, res) => {
  getTemperaments(req, res);
});

router.post("/dogs", (req, res) => {
  postDog(req, res);
});

module.exports = router;
