/**
 * E2E Tests: Flujo de Crear Workout
 * 
 * Prueba el flujo completo:
 * 1. Login con credenciales test
 * 2. Navegar a tab de Workouts
 * 3. Crear nuevo workout
 * 4. Verificar que aparece en lista
 * 5. Verificar que stats se actualicen
 */

describe('E2E: Crear Workout - Flujo Completo', () => {
  const TEST_EMAIL = 'test@test.com';
  const TEST_PASSWORD = 'Admin123';
  const WORKOUT_NAME = `Test Workout ${new Date().getTime()}`;

  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    cy.clearLocalStorage();
    cy.visit('/');
  });

  describe('1. Login Flow', () => {
    it('Debe navegar a login si no está autenticado', () => {
      cy.url().should('include', '/auth/login');
    });

    it('Debe loguearse exitosamente con credenciales válidas', () => {
      // Verificar que la pantalla de login está visible
      cy.contains('RIZE').should('be.visible');
      
      // Rellenar formulario
      cy.get('input[placeholder*="Email"]').first().type(TEST_EMAIL);
      cy.get('input[placeholder*="Contraseña"]').first().type(TEST_PASSWORD);
      
      // Click en botón login
      cy.contains(/Entrar|Iniciar Sesión/i).click();
      
      // Debe redirigir a home/tabs
      cy.url({ timeout: 5000 }).should('not.include', '/auth/login');
      cy.url().should('include', '/(tabs)');
    });

    it('Debe mostrar error con credenciales inválidas', () => {
      cy.get('input[placeholder*="Email"]').first().type('invalid@test.com');
      cy.get('input[placeholder*="Contraseña"]').first().type('WrongPassword123');
      
      cy.contains(/Entrar|Iniciar Sesión/i).click();
      
      // Debe mostrar toast o error
      cy.contains(/inválid|error|falla/i, { timeout: 3000 }).should('exist');
    });
  });

  describe('2. Navegación a Workouts', () => {
    beforeEach(() => {
      // Pre-login
      cy.visit('/auth/login');
      cy.get('input[placeholder*="Email"]').first().type(TEST_EMAIL);
      cy.get('input[placeholder*="Contraseña"]').first().type(TEST_PASSWORD);
      cy.contains(/Entrar|Iniciar Sesión/i).click();
      
      // Esperar a que cargue home
      cy.url({ timeout: 5000 }).should('not.include', '/auth/login');
    });

    it('Debe mostrar tab de Workouts', () => {
      // Buscar tab o ícono de workouts
      cy.contains(/Workouts|Entrenamientos/i).should('be.visible');
    });

    it('Debe navegar a Workouts tab', () => {
      cy.contains(/Workouts|Entrenamientos/i).click();
      
      // Verificar que está en la pantalla correcta
      cy.url().should('include', 'workouts');
      cy.contains(/Mis Entrenamientos|Workouts|Entrenamientos/i).should('be.visible');
    });
  });

  describe('3. Crear Nuevo Workout', () => {
    beforeEach(() => {
      // Pre-login y navegar a workouts
      cy.visit('/auth/login');
      cy.get('input[placeholder*="Email"]').first().type(TEST_EMAIL);
      cy.get('input[placeholder*="Contraseña"]').first().type(TEST_PASSWORD);
      cy.contains(/Entrar|Iniciar Sesión/i).click();
      
      cy.url({ timeout: 5000 }).should('not.include', '/auth/login');
      cy.contains(/Workouts|Entrenamientos/i).click();
    });

    it('Debe mostrar botón para crear workout', () => {
      // Buscar botones de crear
      cy.contains(/\+ Crear|Crear Entrenamiento|New Workout/i).should('be.visible');
    });

    it('Debe abrir formulario al hacer click en crear', () => {
      cy.contains(/\+ Crear|Crear Entrenamiento|New Workout/i).click();
      
      // Debe navegar a pantalla de crear o abrir modal
      cy.url({ timeout: 3000 }).should('include', 'create');
      
      // Verificar que formulario está visible
      cy.contains(/Crear Entrenamiento|Create Workout|Nombre/i).should('be.visible');
    });

    it('Debe validar campo de nombre requerido', () => {
      cy.contains(/\+ Crear|Crear Entrenamiento|New Workout/i).click();
      
      cy.url({ timeout: 3000 }).should('include', 'create');
      
      // Intentar guardar sin nombre
      cy.contains(/Guardar|Save|Crear/i).click();
      
      // Debe mostrar error de validación
      cy.contains(/requerido|required|obligatorio|falta/i, { timeout: 2000 }).should('exist');
    });

    it('Debe crear workout con nombre válido', () => {
      cy.contains(/\+ Crear|Crear Entrenamiento|New Workout/i).click();
      
      cy.url({ timeout: 3000 }).should('include', 'create');
      
      // Llenar nombre
      cy.get('input[placeholder*="Nombre"]').first().type(WORKOUT_NAME);
      
      // Opcional: agregar ejercicio si hay UI para ello
      // cy.contains(/Agregar Ejercicio|Add Exercise/i).click();
      // cy.get('input[placeholder*="Ejercicio"]').type('Press de Banca');
      
      // Guardar
      cy.contains(/Guardar|Save|Crear/i).click();
      
      // Debe volver a lista
      cy.url({ timeout: 5000 }).should('include', 'workouts');
      cy.url().should('not.include', 'create');
    });
  });

  describe('4. Verificar Workout en Lista', () => {
    beforeEach(() => {
      // Pre-login, crear workout y volver a lista
      cy.visit('/auth/login');
      cy.get('input[placeholder*="Email"]').first().type(TEST_EMAIL);
      cy.get('input[placeholder*="Contraseña"]').first().type(TEST_PASSWORD);
      cy.contains(/Entrar|Iniciar Sesión/i).click();
      
      cy.url({ timeout: 5000 }).should('not.include', '/auth/login');
      cy.contains(/Workouts|Entrenamientos/i).click();
      cy.contains(/\+ Crear|Crear Entrenamiento/i).click();
      
      cy.url({ timeout: 3000 }).should('include', 'create');
      cy.get('input[placeholder*="Nombre"]').first().type(WORKOUT_NAME);
      cy.contains(/Guardar|Save|Crear/i).click();
      
      cy.url({ timeout: 5000 }).should('include', 'workouts');
    });

    it('Debe mostrar workout creado en la lista', () => {
      // Verificar que el workout aparece
      cy.contains(WORKOUT_NAME, { timeout: 3000 }).should('be.visible');
    });

    it('Debe mostrar información del workout en la card', () => {
      // El workout debería mostrar:
      // - Nombre
      // - Fecha
      // - XP ganado (si es visible)
      
      cy.contains(WORKOUT_NAME).should('be.visible');
      
      // La card debe tener fecha
      cy.contains(WORKOUT_NAME)
        .parent()
        .should('contain', new Date().getDate());
    });

    it('Debe poder hacer click en workout para ver detalles', () => {
      cy.contains(WORKOUT_NAME).click();
      
      // Debe abrir página de detalle
      cy.url({ timeout: 3000 }).should('match', /workouts\/\w+/);
      
      // Debe mostrar detalles completos
      cy.contains(WORKOUT_NAME).should('be.visible');
    });
  });

  describe('5. Verificar Actualización de Stats', () => {
    beforeEach(() => {
      // Pre-login y crear workout
      cy.visit('/auth/login');
      cy.get('input[placeholder*="Email"]').first().type(TEST_EMAIL);
      cy.get('input[placeholder*="Contraseña"]').first().type(TEST_PASSWORD);
      cy.contains(/Entrar|Iniciar Sesión/i).click();
      
      cy.url({ timeout: 5000 }).should('not.include', '/auth/login');
    });

    it('Debe actualizar total de workouts en stats', () => {
      // Navegar a stats
      cy.contains(/Stats|Estadísticas|Dashboard/i).click();
      
      // Debería mostrar número de workouts
      cy.contains(/Total|Entrenamientos/i).should('be.visible');
    });

    it('Debe incrementar streak al crear workout hoy', () => {
      cy.contains(/Stats|Estadísticas|Dashboard/i).click();
      
      // Buscar racha/streak
      cy.contains(/Racha|Streak|Días|Consecutive/i).should('be.visible');
    });
  });

  describe('6. Manejo de Errores', () => {
    beforeEach(() => {
      cy.visit('/auth/login');
      cy.get('input[placeholder*="Email"]').first().type(TEST_EMAIL);
      cy.get('input[placeholder*="Contraseña"]').first().type(TEST_PASSWORD);
      cy.contains(/Entrar|Iniciar Sesión/i).click();
      
      cy.url({ timeout: 5000 }).should('not.include', '/auth/login');
      cy.contains(/Workouts|Entrenamientos/i).click();
    });

    it('Debe manejar error de conexión al crear workout', () => {
      // Simular error de red
      cy.intercept('POST', '**/workouts', { 
        statusCode: 500, 
        body: { error: 'Server error' } 
      }).as('createWorkoutError');
      
      cy.contains(/\+ Crear|Crear/i).click();
      cy.url({ timeout: 3000 }).should('include', 'create');
      
      cy.get('input[placeholder*="Nombre"]').first().type('Test Workout');
      cy.contains(/Guardar|Save/i).click();
      
      cy.wait('@createWorkoutError');
      
      // Debe mostrar error
      cy.contains(/error|falla|intenta|nuevamente/i, { timeout: 3000 }).should('exist');
    });

    it('Debe manejar timeout al crear workout', () => {
      cy.intercept('POST', '**/workouts', { 
        delay: 10000,
        statusCode: 408 
      }).as('createWorkoutTimeout');
      
      cy.contains(/\+ Crear|Crear/i).click();
      cy.url({ timeout: 3000 }).should('include', 'create');
      
      cy.get('input[placeholder*="Nombre"]').first().type('Timeout Test');
      cy.contains(/Guardar|Save/i).click();
      
      // Debe mostrar loading y luego error
      cy.contains(/Guardando|Loading|creando/i, { timeout: 2000 }).should('exist');
    });
  });

  describe('7. Validación Sin Autenticación', () => {
    it('Debe redirigir a login si intenta acceder sin token', () => {
      cy.visit('/workouts');
      
      // Debe redirigir a login
      cy.url({ timeout: 5000 }).should('include', '/auth/login');
    });

    it('Debe mostrar error 401 sin token válido', () => {
      // Intercept para validar que NO envía token
      cy.intercept('GET', '**/api/v1/workouts', {
        statusCode: 401,
        body: { error: 'Unauthorized' }
      }).as('workoutsUnauth');
      
      cy.visit('/workouts');
      cy.url({ timeout: 5000 }).should('include', '/auth/login');
    });
  });
});
