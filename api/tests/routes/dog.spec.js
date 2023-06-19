const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: "Pug",
  image: "https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg",
  height: 10,
  weight: 20,
  life_span: "10",
  temperament: ["Assertive"]
};

describe('Rutas', () => {
  beforeAll(() => conn.authenticate()
    .catch((err) => {
      console.error('No se puede conectar a la base de datos:', err);
    }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('Debe recibir un status 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('GET /dogs by ID', () => {
    it('Debe recibir al perro con ID 1', async () => {
      const response = await agent.get('/dogs/1')
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
    });
  });
  describe('GET /dogs by name', () => {
    it('Debe recibir al perro con nombre "Affenpinscher"', async () => {
      const response = await agent.get('/dogs?name=Affenpinscher');
      expect(response.status).toBe(200);
      expect(response.body[0].name).toBe('Affenpinscher');
    });
  });
  describe('GET /temperaments', () => {
    it('Debe recibir todos los temperamentos', async () => {
      const response = await agent.get('/temperaments');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(124);
    });
  });
  describe('POST /dogs', () => {
    it('Debe hacer un post de dog', async () => {
      const response = await agent.post('/dogs').send(dog);
      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
    });
  });
  
});
