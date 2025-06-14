const request = require('supertest');
const app = require('../app');
const { lista } = require('../models/memoModel');

describe('Memo API (Simulado)', () => {
  beforeEach(() => {
    lista.length = 0; 
  });

  describe('POST /api/memos', () => {
    it('should create a new memo and return 201', async () => {
      const res = await request(app)
        .post('/api/memos')
        .send({ title: 'Aprender Testes' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: 1,
          title: 'Aprender Testes',
          status: 'pendente',
          created_at: expect.any(String),
        })
      );
    });
  });

  describe('GET /api/memos', () => {
    it('should return all memos with 200', async () => {
      await request(app).post('/api/memos').send({ title: 'Memo 1' });
      await request(app).post('/api/memos').send({ title: 'Memo 2' });

      const res = await request(app).get('/api/memos');

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('DELETE /api/memos/:id', () => {
    it('should delete a memo and return 204', async () => {
      await request(app).post('/api/memos').send({ title: 'Para deletar' });

      const res = await request(app).delete('/api/memos/1');

      expect(res.statusCode).toBe(204);
    });

    it('should return 404 if memo not found', async () => {
      const res = await request(app).delete('/api/memos/999');

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Memo not found' });
    });
  });

  describe('PUT /api/memos/:id', () => {
    it('should update a memo and return 200', async () => {
      await request(app).post('/api/memos').send({ title: 'Original' });

      const res = await request(app)
        .put('/api/memos/1')
        .send({ title: 'Atualizado', status: 'feito' });

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Atualizado');
      expect(res.body.status).toBe('feito');
    });

    it('should return 400 if memo to update is not found', async () => {
      const res = await request(app)
        .put('/api/memos/999')
        .send({ title: 'Nada' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ message: 'The field \"status\" is mandatory.' });
    });
  });
});
