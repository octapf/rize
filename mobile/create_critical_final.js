const fs = require('fs');

const content = `describe('Flujos Críticos de RIZE', () => {

  // TEST 1: Validación de Registro (Contraseñas) - No requiere Mock
  it('1. [Registro] Debe validar coincidencia de contraseñas', () => {
    cy.visit('/auth/register');
    cy.get('input').eq(0).type('Test User');
    cy.get('input').eq(1).type('test@val.com');
    cy.get('input').eq(2).type('testuserFAIL');
    cy.get('input[type="password"]').first().type('password123'); 
    cy.get('input[type="password"]').last().type('password999');  
    
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.contains('Crear Cuenta').click();
    cy.wait(500);
    cy.url().should('include', 'register');
  });

  // TEST 2: Flujo de Registro Exitoso (Mocked)
  it('2. [Registro] Debe redirigir al Onboarding tras registro exitoso', () => {
    cy.intercept('POST', '**/auth/register', {
      statusCode: 201,
      body: {
        success: true,
        data: {
            user: { id: 'new', email: 'new@rize.app', username: 'newuser', xp: 0, level: 1 },
            accessToken: 'mock-token',
            refreshToken: 'mock-refresh'
        }
      }
    }).as('registerReq');

    cy.visit('/auth/register');
    cy.get('input').eq(0).type('New User');
    cy.get('input').eq(1).type('new@rize.app');
    cy.get('input').eq(2).type('newuser');
    cy.get('input[type="password"]').each(($el) => {
        cy.wrap($el).type('password123');
    });
    
    cy.contains('Crear Cuenta').click();
    cy.wait('@registerReq');
    cy.url({ timeout: 10000 }).should('include', 'onboarding');
  });

  // TEST 3: Seguridad
  it('3. [Seguridad] Debe proteger rutas privadas', () => {
    cy.visit('/(tabs)/exercises', { failOnStatusCode: false });
    cy.contains(/Iniciar Sesi/i, { timeout: 10000 }).should('be.visible');
  });

  // TEST 4: Login y Navegación (Mocked)
  it('4. [Navegación] Login exitoso y acceso a Ejercicios', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        data: {
          user: { id: '1', email: 'demo@rize.app', username: 'demouser', xp: 100, level: 2 },
          accessToken: 'mock-token',
          refreshToken: 'mock-refresh'
        }
      }
    }).as('loginReq');

    cy.intercept('GET', '**/workouts/my/recent', { statusCode: 200, body: { success: true, data: { workouts: [] } } });
    cy.intercept('GET', '**/users/me/stats', { statusCode: 200, body: { success: true, data: { workouts: {thisWeek:0}, volume: {total:0}, user: {streak:0, level:1, xp:0}, records: {thisMonth:0} } } });

    cy.visit('/auth/login');
    cy.get('input').eq(0).type('demo@rize.app');
    cy.get('input').last().type('password123');
    cy.contains(/Iniciar Sesi/i).click();

    cy.wait('@loginReq');
    cy.contains(/Iniciar Sesi/i).should('not.exist');
    cy.url({ timeout: 10000 }).should('include', 'tabs');

    cy.contains('Ejercicios').click();
    cy.contains('Biblioteca completa').should('be.visible');
  });

  // TEST 5: Navegación a Perfil (Mocked)
  it('5. [Navegación] Acceso al Perfil de Usuario', () => {
      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            user: { id: '1', email: 'demo@rize.app', username: 'demouser', xp: 100, level: 2 },
            accessToken: 'mock-token',
            refreshToken: 'mock-refresh'
          }
        }
      }).as('loginReq');
      
      cy.intercept('GET', '**/notifications/unread/count', { statusCode: 200, body: { success: true, data: { count: 0 } } });

      cy.visit('/auth/login');
      cy.get('input').eq(0).type('demo@rize.app');
      cy.get('input').last().type('password123');
      cy.contains(/Iniciar Sesi/i).click();
      
      cy.wait('@loginReq');
      cy.url({ timeout: 10000 }).should('include', 'tabs');

      // Buscar Profile
      cy.contains('Profile').click();
      cy.contains('Perfil', { timeout: 5000 }).should('be.visible');
  });

});`;

fs.writeFileSync('c:\\Users\\Arigo\\OneDrive\\Escritorio\\web-dev\\rize\\mobile\\cypress\\e2e\\critical_flows.cy.ts', content);