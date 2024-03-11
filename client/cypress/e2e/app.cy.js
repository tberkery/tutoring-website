describe('Authentication', () => {
  beforeEach(() => {
    cy.session('signed-in', () => {
      cy.signIn();
    })
  });

  it('Access restricted page with test credentials', () => {
    cy.visit('/profile', {failOnStatusCode: false });

    cy.contains("Matthew Flynn");
  });
});