import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

// Importez les dépendances nécessaires pour les tests
import supertest from 'supertest';
import app from './app'; // Assurez-vous que le chemin est correct

const request = supertest(app);

describe('Tests des routes API', () => {
  it('Test de la route principale /api', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to GlobeTrotter Insights!');
  });

  it('Test de la route /api/country/:language/:name', async () => {
    const response = await request.get('/api/country/en/italy'); // Remplacez 'en' et 'italy' par les valeurs appropriées
    expect(response.status).toBe(200);
    // Assurez-vous que la réponse contient les propriétés attendues
    expect(response.body).toHaveProperty('common_name');
    expect(response.body).toHaveProperty('capital');
    // Ajoutez d'autres attentes selon les données que vous attendez de la route
  });

  it('Test de la route /api/countries', async () => {
    const response = await request.get('/api/countries');
    expect(response.status).toBe(200);
    // Assurez-vous que la réponse contient une liste de pays
    expect(response.body).toBeInstanceOf(Array);
    // Ajoutez d'autres attentes selon les données que vous attendez de la route
  });
});


describe('GET /', () => {
  it('should return homepage with 200 status code', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.status, 200);
  });
});
