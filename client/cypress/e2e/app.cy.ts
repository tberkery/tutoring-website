export {};

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    
    cy.visit('http://localhost:3000/', {failOnStatusCode: false });
 
    cy.get('input').click();

    cy.get('input').type("Hello World!");
 
    cy.get('button').click()
 
    cy.get('h1').contains('Hello World!');
  })
})