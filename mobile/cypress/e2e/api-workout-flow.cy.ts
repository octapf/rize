/**
 * E2E Tests: API Validation - Flujo de Workout
 */

describe('E2E: API - Workout Validation', () => {
  const TEST_EMAIL = 'test@test.com';
  const TEST_PASSWORD = 'Admin123';
  const API_BASE = 'http://localhost:5000/api/v1';
  let accessToken: string;

  describe('1. Authentication', () => {
    it('✅ Debe loguearse  con credenciales válidas', () => {
      cy.request({
        method: 'POST',
        url: `${API_BASE}/auth/login`,
        body: { emailOrUsername: TEST_EMAIL, password: TEST_PASSWORD },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.success).to.be.true;
        expect(res.body.data.accessToken).to.exist;
        accessToken = res.body.data.accessToken;
      });
    });

    it('❌ Rechaza credenciales inválidas', () => {
      cy.request({
        method: 'POST',
        url: `${API_BASE}/auth/login`,
        body: { emailOrUsername: TEST_EMAIL, password: 'wrong' },
        failOnStatusCode: false,
      }).then((res) => {
        expect([400, 401]).to.include(res.status);
      });
    });

    it('❌ Rechaza sin autenticación', () => {
      cy.request({
        method: 'GET',
        url: `${API_BASE}/workouts`,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(401);
      });
    });
  });

  describe('2. Workouts - GET', () => {
    before(() => {
      cy.request({
        method: 'POST',
        url: `${API_BASE}/auth/login`,
        body: { emailOrUsername: TEST_EMAIL, password: TEST_PASSWORD },
      }).then((res) => {
        accessToken = res.body.data.accessToken;
      });
    });

    it('✅ Obtener lista de workouts', () => {
      cy.request({
        method: 'GET',
        url: `${API_BASE}/workouts?limit=20`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.success).to.be.true;
        expect(Array.isArray(res.body.data)).to.be.true;
        expect(res.body.pagination).to.exist;
      });
    });

    it('✅ Pagina workouts correctamente', () => {
      cy.request({
        method: 'GET',
        url: `${API_BASE}/workouts?limit=10&page=1`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.pagination.limit).to.eq(10);
      });
    });
  });

  describe('3. Workouts - POST (Validation)', () => {
    before(() => {
      cy.request({
        method: 'POST',
        url: `${API_BASE}/auth/login`,
        body: { emailOrUsername: TEST_EMAIL, password: TEST_PASSWORD },
      }).then((res) => {
        accessToken = res.body.data.accessToken;
      });
    });

    it('❌ Rechaza POST sin nombre', () => {
      cy.request({
        method: 'POST',
        url: `${API_BASE}/workouts`,
        headers: { Authorization: `Bearer ${accessToken}` },
        body: { exercises: [] },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.success).to.be.false;
      });
    });

    it('❌ Rechaza POST sin ejercicios', () => {
      cy.request({
        method: 'POST',
        url: `${API_BASE}/workouts`,
        headers: { Authorization: `Bearer ${accessToken}` },
        body: { name: 'Test' },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
      });
    });

    it('❌ Rechaza POST con ejerciseID inválido', () => {
      cy.request({
        method: 'POST',
        url: `${API_BASE}/workouts`,
        headers: { Authorization: `Bearer ${accessToken}` },
        body: {
          name: 'Test',
          exercises: [{
            exerciseId: 'invalid-id',
            sets: [{ reps: 8 }]
          }]
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
      });
    });
  });

  describe('4. Workouts - GET Details', () => {
    before(() => {
      cy.request({
        method: 'POST',
        url: `${API_BASE}/auth/login`,
        body: { emailOrUsername: TEST_EMAIL, password: TEST_PASSWORD },
      }).then((res) => {
        accessToken = res.body.data.accessToken;
      });
    });

    it('❌ GET ID inexistente retorna 404', () => {
      cy.request({
        method: 'GET',
        url: `${API_BASE}/workouts/000000000000000000000000`,
        headers: { Authorization: `Bearer ${accessToken}` },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(404);
      });
    });
  });

  describe('5. API Response Structure', () => {
    before(() => {
      cy.request({
        method: 'POST',
        url: `${API_BASE}/auth/login`,
        body: { emailOrUsername: TEST_EMAIL, password: TEST_PASSWORD },
      }).then((res) => {
        accessToken = res.body.data.accessToken;
      });
    });

    it('✅ Respuesta tiene estructura correcta', () => {
      cy.request({
        method: 'GET',
        url: `${API_BASE}/workouts?limit=1`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => {
        // Validar estructura del response
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('pagination');
        expect(res.body.pagination).to.have.property('total');
        expect(res.body.pagination).to.have.property('page');
      });
    });

    it('✅ Token válido se acepta', () => {
      cy.request({
        method: 'GET',
        url: `${API_BASE}/workouts?limit=1`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('❌ Token inválido es rechazado', () => {
      cy.request({
        method: 'GET',
        url: `${API_BASE}/workouts?limit=1`,
        headers: { Authorization: 'Bearer invalid-token' },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(401);
      });
    });
  });
});
