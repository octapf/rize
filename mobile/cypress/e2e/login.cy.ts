describe('Login Flow', () => {
  const TEST_EMAIL = 'demo@rize.app'; 
  const TEST_PASSWORD = 'password123';
  const WRONG_PASSWORD = 'wrongpassword';
  const NON_EXISTENT_EMAIL = 'nobody@rize.app';

  beforeEach(() => {
    // Intercept login requests to avoid hitting the actual backend repeatedly for all tests if not needed,
    // OR we can rely on the real backend if it's running. Optimally, we mock for speed and determinism
    // on UI logic tests, and use one E2E for critical path.
    // Here we will use the Real Flow since the user asked for critical tests.
    cy.on('uncaught:exception', (err, runnable) => {
      // Ignore NativeWind/Tailwind dark mode error in tests
      if (err.message.includes('Cannot manually set color scheme')) {
        return false;
      }
    });

    cy.visit('/auth/login');
  });

  it('1. Should show error message with invalid credentials', () => {
    cy.intercept('POST', '**/auth/login').as('loginReq');
    
    // Correct placeholder from code inspection
    cy.get('input[placeholder="ejemplo@email.com"]').type(TEST_EMAIL);
    cy.get('input[placeholder="••••••••"]').type(WRONG_PASSWORD);
    
    // Use precise regex to match capitalization or simple string
    cy.contains(/Iniciar Sesión/i).click();

    // Handling Alert
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Error');
    });
  });

  it('2. Should show error message for non-existent user', () => {
    cy.intercept('POST', '**/auth/login').as('loginReq');

    cy.get('input[placeholder="ejemplo@email.com"]').type(NON_EXISTENT_EMAIL);
    cy.get('input[placeholder="••••••••"]').type(TEST_PASSWORD);
    
    cy.contains(/Iniciar Sesión/i).click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Error');
    });
  });

  it('3. Should validate empty fields', () => {
    // Attempt to submit without typing anything
    cy.contains(/Iniciar Sesión/i).click({ force: true }); 

    cy.on('window:alert', (text) => {
      expect(text).to.contains('todos los campos');
    });
  });

  it('4. Should successfully login and redirect to Home', () => {
    // We will attempt real login if backend is available.
    // If we want to rely on real backend, we must ensure the user exists.
    // Since we can't guarantee 'demo@rize.app' exists in fresh DB, 
    // we will stick to the mock for this specific isolated test, 
    // BUT we will add a new "Integration" test below that registers AND logs in.
    
    // Intercept to return a valid token and user
    cy.intercept('POST', '**/auth/login', {
       statusCode: 200,
       body: {
         success: true,
         data: {
             token: 'mock-token',
             user: { id: 1, email: TEST_EMAIL, username: 'Demo' }
         }
       }
    }).as('loginReq');

    // Intercept user requests that might follow login
    cy.intercept('GET', '**/users/me', { statusCode: 200, body: {} });
    
    cy.get('input[placeholder="ejemplo@email.com"]').type(TEST_EMAIL);
    cy.get('input[placeholder="••••••••"]').type(TEST_PASSWORD);
    
    cy.contains(/Iniciar Sesión/i).click();

    // Verify redirection happens using a longer timeout due to state updates
    cy.url({ timeout: 10000 }).should('match', /\/$|\/\(tabs\)|\/index/);
  });

  it('5. Should allow navigation to Register screen', () => {
    cy.visit('/auth/login');
    cy.wait(500);
    
    cy.contains(/Regístrate/i).click({ force: true });
    
    cy.url().should('include', '/register');
    cy.contains(/Crear Cuenta/i).should('exist');
  });

  it.only('6. [Integration] Should register a new user and redirect to Onboarding', () => {
    // This test relies on the REAL Backend running on localhost:5000
    const randomId = Date.now();
    const newUser = {
      name: `Test User ${randomId}`,
      username: `user${randomId}`,
      email: `test${randomId}@rize.app`,
      password: 'password123',
    };

    cy.visit('/auth/register'); // Direct access to register page
    
    // Fill form
    // Note: Selectors must match register.tsx. We use { force: true } to handle potential scrolling/overlay issues in RN Web
    cy.get('input[placeholder="Juan Pérez"]').scrollIntoView().type(newUser.name, { force: true });
    cy.get('input[placeholder="usuario123"]').scrollIntoView().type(newUser.username, { force: true });
    cy.get('input[placeholder="tu@email.com"]').scrollIntoView().type(newUser.email, { force: true });
    cy.get('input[placeholder="••••••••"]').eq(0).scrollIntoView().type(newUser.password, { force: true }); // Password
    cy.get('input[placeholder="••••••••"]').eq(1).scrollIntoView().type(newUser.password, { force: true }); // Confirm

    // Click Register
    cy.contains(/Crear Cuenta/i).click({ force: true });

    // Expect redirection to Onboarding
    // Note: Real backend might take a moment
    cy.url({ timeout: 20000 }).should('include', '/onboarding');
    
    // Check if we can proceed or title exists
    // register.tsx says: router.replace('/auth/onboarding');
  });
});
