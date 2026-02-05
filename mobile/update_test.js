const fs = require('fs');

const content = `describe('Autenticación en RIZE', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('1. Debe cargar la UI de login correctamente', () => {
    cy.contains('RIZE').should('be.visible');
    cy.contains(/Bienvenido/i).should('be.visible');
    cy.get('input').should('have.length.at.least', 2);
  });

  it('2. Debe validar campos vacíos', () => {
      const stub = cy.stub();  
      cy.on('window:alert', stub);
      cy.contains(/Iniciar Sesi/i).click();
  });

  it('3. Debe tener un enlace visible para registro', () => {
     cy.contains(/No tienes cuenta/i).should('be.visible');
     cy.contains(/Reg.strate/i).should('be.visible');
  });
});`;

fs.writeFileSync('c:\\Users\\Arigo\\OneDrive\\Escritorio\\web-dev\\rize\\mobile\\cypress\\e2e\\auth.cy.ts', content);
console.log('File updated');