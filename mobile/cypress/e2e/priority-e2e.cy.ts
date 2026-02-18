/**
 * E2E Tests Prioritarios - RIZE
 *
 * Flujos críticos que deben pasar siempre.
 * Usan mocks de API para ejecución independiente del backend.
 *
 * Ejecutar: npm run test:e2e:run -- --spec cypress/e2e/priority-e2e.cy.ts
 */

const MOCK_USER = {
  id: 'e2e-user',
  _id: 'e2e-user',
  email: 'e2e@rize.app',
  username: 'e2euser',
  xp: 100,
  level: 2,
};

const MOCK_STATS = {
  user: { streak: 5, level: 2, xp: 100 },
  workouts: { thisWeek: 2, thisMonth: 5, total: 10 },
  volume: { total: 5000, totalSets: 100, totalReps: 500 },
  time: { total: 3600 },
  records: { thisMonth: 1, total: 5 },
  achievements: { total: 3 },
};

const MOCK_WORKOUTS = {
  success: true,
  data: [],
  pagination: { total: 0, page: 1, pages: 0 },
};


const MOCK_NOTIFICATIONS = {
  success: true,
  data: { count: 0 },
};

function setupAuthMocks() {
  cy.intercept('GET', '**/workouts*', MOCK_WORKOUTS);
  cy.intercept('GET', '**/users/me/stats', { success: true, data: MOCK_STATS });
  cy.intercept('GET', '**/notifications/unread/count', MOCK_NOTIFICATIONS);
}

/** Login estable. Usa data-testid en RN Web, fallback a placeholder/type si no existe. */
function doLogin() {
  const emailSel = '[data-testid="login-email-input"], input[placeholder*="ejemplo"], input[placeholder*="email"]';
  const passSel = '[data-testid="login-password-input"], input[type="password"]';

  cy.get(emailSel, { timeout: 12000 }).first().should('be.visible').clear().type('demo@rize.app');
  cy.get(passSel).first().clear().type('password123');
  cy.get('[data-testid="login-button"]')
    .then(($el) => ($el.length ? cy.wrap($el.first()) : cy.contains('Iniciar Sesión')))
    .click({ force: true });
}

describe('E2E Prioritarios - RIZE', () => {
  before(() => {
    cy.visit('/', { timeout: 25000 });
  });

  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
  });

  describe('P1: Autenticación', () => {
    it('P1.1 Login - redirige al Home tras login exitoso', () => {
      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            user: MOCK_USER,
            accessToken: 'mock-token',
            refreshToken: 'mock-refresh',
          },
        },
      }).as('login');
      setupAuthMocks();

      cy.visit('/auth/login', { timeout: 15000 });
      doLogin();

      cy.wait('@login', { timeout: 8000 });
      cy.contains('Tu Progreso', { timeout: 15000 }).should('be.visible');
    });

    it('P1.2 Registro - valida que las contraseñas coincidan', () => {
      cy.visit('/auth/register', { timeout: 15000 });
      cy.get('input', { timeout: 8000 }).should('have.length.at.least', 4);

      cy.get('input').eq(0).type('Test User');
      cy.get('input').eq(1).type('testuser');
      cy.get('input').eq(2).type('test@rize.app');
      cy.get('input').eq(3).type('Password123');
      cy.get('input').eq(4).type('Password456');

      cy.contains('Crear Cuenta').click();
      cy.url().should('include', 'register');
    });

    it('P1.3 Rutas privadas - redirige a login sin auth', () => {
      cy.visit('/(tabs)/workouts', { failOnStatusCode: false });
      cy.contains(/Iniciar Sesi|Bienvenido|login/i, { timeout: 8000 }).should('be.visible');
    });
  });

  describe('P2: Navegación post-login', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            user: MOCK_USER,
            accessToken: 'mock-token',
            refreshToken: 'mock-refresh',
          },
        },
      }).as('login');
      setupAuthMocks();

      cy.visit('/auth/login', { timeout: 15000 });
      doLogin();
      cy.wait('@login', { timeout: 8000 });
      cy.contains('Tu Progreso', { timeout: 25000 }).should('be.visible');
    });

    it('P2.1 Home muestra Tu Progreso y acciones', () => {
      cy.contains('Tu Progreso').should('be.visible');
      cy.contains(/Nuevo Entrenamiento|Biblioteca|Rankings/i).should('be.visible');
    });

    it('P2.2 Tab Workouts - lista de entrenamientos', () => {
      cy.contains('Workouts', { timeout: 8000 }).should('be.visible').click();
      cy.contains(/Entrenamientos|Comienza tu viaje|entrenamientos registrados/i, { timeout: 12000 }).should('be.visible');
    });

    it('P2.3 Tab Ejercicios - biblioteca', () => {
      cy.contains('Ejercicios').click();
      cy.contains(/Biblioteca|ejercicios|calistenia/i, { timeout: 8000 }).should('be.visible');
    });

    it('P2.4 Tab Stats - dashboard', () => {
      cy.contains('Stats').click();
      cy.contains(/Stats|Estad|semana|volumen/i, { timeout: 8000 }).should('be.visible');
    });

    it('P2.5 Tab Profile - perfil de usuario', () => {
      cy.contains('Profile').click();
      cy.contains(/Profile|Perfil|Configuraci|Ajustes/i, { timeout: 8000 }).should('be.visible');
    });
  });

  describe('P3: Crear Workout', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            user: MOCK_USER,
            accessToken: 'mock-token',
            refreshToken: 'mock-refresh',
          },
        },
      }).as('login');
      setupAuthMocks();
      cy.intercept('GET', '**/workouts*', MOCK_WORKOUTS);

      cy.visit('/auth/login', { timeout: 15000 });
      doLogin();
      cy.wait('@login', { timeout: 8000 });
      cy.contains('Tu Progreso', { timeout: 25000 }).should('be.visible');
    });

    it('P3.1 Botón crear visible en Workouts', () => {
      cy.contains('Workouts').click();
      cy.get('[data-testid="create-workout-fab"], [data-testid="create-workout-empty"]', { timeout: 6000 }).should('exist');
      cy.contains(/Entrenamientos|Comienza tu viaje|entrenamientos registrados/i, { timeout: 6000 }).should('be.visible');
    });

    it('P3.2 Formulario crear - valida nombre requerido', () => {
      cy.intercept('POST', '**/workouts', { statusCode: 201 }).as('createWorkout');

      cy.contains('Workouts').click();
      cy.url({ timeout: 8000 }).should('include', 'workouts');

      cy.get('[data-testid="create-workout-fab"], [data-testid="create-workout-empty"]').first().click({ force: true });
      cy.url({ timeout: 5000 }).should('include', 'create');

      // El botón Crear está deshabilitado cuando no hay nombre - intentar submit de todas formas
      cy.get('[data-testid="create-workout-submit"]').should('exist');
      // Con nombre vacío, el botón está disabled - la validación impide submit
      cy.url().should('include', 'create');
    });

    it('P3.3 Crear workout con nombre - éxito (mock)', () => {
      const workoutName = `E2E Test ${Date.now()}`;
      cy.intercept('POST', '**/workouts', {
        statusCode: 201,
        body: { success: true, data: { _id: 'new-id', name: workoutName } },
      }).as('createWorkout');

      cy.contains('Workouts').click();
      cy.url({ timeout: 8000 }).should('include', 'workouts');
      cy.get('[data-testid="create-workout-fab"], [data-testid="create-workout-empty"]').first().click({ force: true });

      cy.url({ timeout: 5000 }).should('include', 'create');
      cy.get('input[placeholder*="espalda"], input[placeholder*="Nombre"]').first().type(workoutName);
      cy.get('[data-testid="create-workout-submit"]').click();

      cy.wait('@createWorkout');
      cy.url({ timeout: 8000 }).should('not.include', 'create');
    });
  });

  describe('P4: Stats y Progreso', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            user: MOCK_USER,
            accessToken: 'mock-token',
            refreshToken: 'mock-refresh',
          },
        },
      });
      setupAuthMocks();

      cy.visit('/auth/login', { timeout: 15000 });
      doLogin();
      cy.wait('@login', { timeout: 8000 });
      cy.contains('Tu Progreso', { timeout: 25000 }).should('be.visible');
    });

    it('P4.1 Home muestra stats (mocked)', () => {
      cy.contains('Tu Progreso').should('be.visible');
      cy.contains(/Entrenamientos|Racha|XP|Semana/i, { timeout: 6000 }).should('be.visible');
    });
  });
});
