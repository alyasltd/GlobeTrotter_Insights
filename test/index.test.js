import { describe, it } from 'node:test';
import assert from 'node:assert';
import app from '../src/app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('Tests de l\'API pour une route spécifique', () => {
  it('Test de la route /api/country/:language/:name pour récupérer les détails d\'un pays', async () => {
    // Remplacez 'en' et 'italy' par les valeurs appropriées pour vos tests
    const response = await request.get('/api/country/en/italy');

    // Vérifiez que le status HTTP est 200 OK
    assert.strictEqual(response.status, 200, 'Le code de réponse devrait être 200');

    // Assurez-vous que la réponse contient les propriétés attendues
    assert.ok(response.body.hasOwnProperty('common_name'), 'La réponse doit contenir le nom commun du pays');
    assert.ok(response.body.hasOwnProperty('capital'), 'La réponse doit contenir la capitale du pays');
    // Ajoutez d'autres assertions ici basées sur ce que vous attendez de la route

    // Exemple pour vérifier des valeurs spécifiques
    // assert.strictEqual(response.body.common_name, 'Expected Common Name', 'Le nom commun du pays ne correspond pas à l\'attendu');
  });

  // Ajoutez d'autres tests pour les différentes routes de votre API si nécessaire
});

// Exemple de test pour une route simple retournant la page d'accueil
describe('GET /', () => {
  it('doit retourner la page d\'accueil avec le code de statut 200', async () => {
    const response = await request.get('/');
    assert.strictEqual(response.status, 200, 'Le code de réponse devrait être 200');
  });
});
