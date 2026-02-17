describe('Flujos Críticos de RIZE', () => {

  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
  });

  // TEST 1: Validación de Registro (Contraseñas)
  it('1. [Registro] Debe validar coincidencia de contraseñas', () => {
    cy.visit('/auth/register');
    
    cy.get('input').eq(0).type('Test Name');     
    cy.get('input').eq(1).type('testuser');      
    cy.get('input').eq(2).type('valid@email.com');
    cy.get('input').eq(3).type('password123');   
    cy.get('input').eq(4).type('password999');   // Mismatch

    cy.contains('Crear Cuenta').click();
    
    // We expect NO navigation (stay on register page)
    cy.wait(1000);
    cy.url().should('include', 'register');
  });

  // TEST 2: Flujo de Registro Exitoso (Mocked)
  it('2. [Registro] Debe redirigir al Home/Tabs tras registro exitoso', () => {
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

    // Add stats mock because Home screen loads them
    cy.intercept('GET', '**/workouts/my/recent', { statusCode: 200, body: { success: true, data: { workouts: [] } } });
    cy.intercept('GET', '**/users/me/stats', { statusCode: 200, body: { success: true, data: { workouts: {thisWeek:0}, volume: {total:0}, user: {streak:0, level:1, xp:0}, records: {thisMonth:0} } } });
    cy.intercept('GET', '**/notifications/unread/count', { statusCode: 200, body: { success: true, data: { count: 0 } } });

    cy.visit('/auth/register');
    
    cy.get('input').eq(0).type('New User Name'); 
    cy.get('input').eq(1).type('newuser');       
    cy.get('input').eq(2).type('new@rize.app');  
    cy.get('input').eq(3).type('password123');   
    cy.get('input').eq(4).type('password123');   
    
    cy.contains('Crear Cuenta').click();
    
    cy.wait('@registerReq', { timeout: 10000 });
    
    // Note: _layout.tsx redirects authenticated users to (tabs)/index (Home)
    // So we check for Home elements
    cy.url({ timeout: 10000 }).should('not.include', 'register');
    cy.contains('Tu Progreso', { timeout: 15000 }).should('be.visible');
  });

  // TEST 3: Seguridad
  it('3. [Seguridad] Debe proteger rutas privadas', () => {
    cy.visit('/(tabs)/exercises', { failOnStatusCode: false });
    cy.contains(/Iniciar Sesi|Bienvenido/i, { timeout: 10000 }).should('be.visible');
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
    cy.intercept('GET', '**/notifications/unread/count', { statusCode: 200, body: { success: true, data: { count: 0 } } });

    cy.visit('/auth/login');
    cy.get('input').eq(0).type('demo@rize.app');
    cy.get('input').last().type('password123'); 
    cy.contains('Iniciar Sesión').click();

    cy.wait('@loginReq', { timeout: 15000 });
    cy.contains('Tu Progreso', { timeout: 15000 }).should('be.visible');

    // Check Exercises Tab
    cy.contains('Ejercicios').click();
    cy.contains('Biblioteca completa de calistenia', { timeout: 10000 }).should('be.visible');
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
      cy.intercept('GET', '**/users/me/stats', { statusCode: 200, body: { success: true, data: { workouts: {thisWeek:0}, volume: {total:0}, user: {streak:0, level:1, xp:0}, records: {thisMonth:0} } } });

      cy.visit('/auth/login');
      cy.get('input').eq(0).type('demo@rize.app');
      cy.get('input').last().type('password123');
      cy.contains('Iniciar Sesión').click();
      
      cy.wait('@loginReq');
      cy.contains('Tu Progreso', { timeout: 15000 }).should('be.visible');

      // Click Profile Tab (Correct name is 'Profile')
      cy.contains('Profile').click();
      
      // Wait for profile screen content
      // Could be 'Perfil', 'Settings', or User Name
      cy.contains(/Profile|Perfil|Ajustes/i, { timeout: 5000 }).should('be.visible');
  });

});
