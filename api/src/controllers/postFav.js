const { Favorite } = require('../db');

const postFav = async (req, res) => {
    try {
        const { id, name, weight, height, image, life_span, temperament } = req.body;
        if (!id || !name || !weight || !height || !image || !life_span || !temperament) {
          return res.status(400).send('Faltan datos');
        }
        await Favorite.findOrCreate({
          where: {
            id: id,
            nombre: name,
            peso: weight,
            altura: height,
            imagen: image,
            anios_vida: life_span,
            temperamento: temperament
          }
        });
        const allFavorites = await Favorite.findAll();
        return res.status(200).json(allFavorites);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = postFav;