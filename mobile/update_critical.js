const fs = require('fs');

const content = `describe('Flujos Críticos de RIZE', () => {

  // TEST 1: Validación de Registro (Contraseñas)
  it('1. [Registro] Debe validar coincidencia de contraseñas', () => {
    cy.visit('/auth/register');
    cy.get('input').eq(0).type('Test User');
    cy.get('input').eq(1).type('test@val.com');
    cy.get('input').eq(2).type('testuserFAIL');
    cy.get('input[type="password"]').first().type('password123'); 
    cy.get('input[type="password"]').last().type('password999');  
    
    // Stub alert
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.contains('Crear Cuenta').click();
    cy.wait(500);
    cy.url().should('include', 'register');
  });

  // TEST 2: Flujo de Registro Exitoso
  it('2. [Registro] Debe redirigir al Onboarding tras registro exitoso', () => {
    cy.visit('/auth/register');
    const randomUser = 'user' + Math.floor(Math.random() * 100000);
    cy.get('input').eq(0).type('New User');
    cy.get('input').eq(1).type(randomUser + '@rize.app');
    cy.get('input').eq(2).type(randomUser);
    cy.get('input[type="password"]').each(($el) => {
        cy.wrap($el).type('password123');
    });
    
    cy.contains('Crear Cuenta').click();
    // Aumentamos timeout por si el "Server" mockeado tarda
    cy.url({ timeout: 10000 }).should('include', 'onboarding');
  });

  // TEST 3: Seguridad (Route Guard)
  it('3. [Seguridad] Debe proteger rutas privadas', () => {
    cy.visit('/(tabs)/exercises', { failOnStatusCode: false });
    cy.contains(/Iniciar Sesi/i, { timeout: 10000 }).should('be.visible');
  });

  // TEST 4: Login y Navegación a Ejercicios
  it('4. [Navegación] Login exitoso y acceso a Ejercicios', () => {
    cy.visit('/auth/login');
    cy.get('input').eq(0).type('demo@rize.app');
    cy.get('input').last().type('password123');
    cy.contains(/Iniciar Sesi/i).click();

    // Verificamos que ya NO estamos en login (el botón Iniciar Sesión debe desaparecer)
    cy.contains(/Iniciar Sesi/i).should('not.exist');
    
    // Esperamos redirección a tabs
    cy.url({ timeout: 10000 }).should('include', 'tabs');

    // Navegación
    cy.contains('Ejercicios').click();
    cy.contains('Biblioteca completa').should('be.visible');
  });

  // TEST 5: Navegación a Perfil
  it('5. [Navegación] Acceso al Perfil de Usuario', () => {
      cy.visit('/auth/login');
      cy.get('input').eq(0).type('demo@rize.app');
      cy.get('input').last().type('password123');
      cy.contains(/Iniciar Sesi/i).click();
      
      cy.url({ timeout: 10000 }).should('include', 'tabs');

      // Buscar Profile
      cy.contains('Profile').click();
      cy.contains('Perfil', { timeout: 5000 }).should('be.visible');
  });

});`;

fs.writeFileSync('c:\\Users\\Arigo\\OneDrive\\Escritorio\\web-dev\\rize\\mobile\\cypress\\e2e\\critical_flows.cy.ts', content);
