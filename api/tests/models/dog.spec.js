const { Dog, Temperament, conn } = require('../../src/db.js');

describe('Dog model', () => {
  beforeAll(() => conn.authenticate()
    .catch((err) => {
      console.error('No se puede conectar a la base de datos:', err);
    }));
  describe('Validaciones:', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('Debe lanzar un error si está vacío', () => {
        return Dog.create({})
          .catch((err) => {
            expect(err).toBeTruthy();
          });
      });
      it('Debe lanzar un error si falta algún dato', () => {
        return Dog.create({
          name: "Testing Dog",
          image: "https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg",
          height: 10,
          weight: 20
        })
          .catch((err) => {
            expect(err).toBeTruthy();
          });
      });
      it('Debe crear un perro si están todos los datos', () => {
        return Dog.create({
          name: "Testing Dog",
          image: "https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg",
          height: 10,
          weight: 20,
          life_span: "10 - 15",
          temperament: ["Assertive"]
        })
          .then((dog) => {
            expect(dog).toBeDefined();
          });
      });
    });
  });
});