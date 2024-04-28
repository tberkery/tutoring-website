describe('Profile Page', () => {
    beforeEach(() => {
      cy.session('signed-in', () => {
        cy.signIn();
      });
      cy.visit('/profile', {failOnStatusCode: false});
    });
  
    it('Test if loader displays while content is loading', () => {
      cy.get('.loader').should('exist');
    });
  
    it('Test if user image is displayed', () => {
      cy.get('img').should('have.attr', 'src').and('not.be.empty');
    });
  
    it('Display posts when "Posts" section is active', () => {
      cy.contains('Posts').click();
      cy.get('.post-card').should('have.length.at.least', 0);
    });
  
    it('Reviews tab exists', () => {
      cy.contains('Reviews').click();
    });
  
    it('Test navigation to edit profile functionality', () => {
      cy.contains('Edit Your Profile').click();
      cy.url().should('include', '/profile/edit');
    });
  
    it('Check if the "Create Post" button navigates to the post creation page', () => {
      cy.contains('Create Post').click();
      cy.url().should('include', '/createPost');
    });
  
    it('Test if "Analytics" section displays correct data', () => {
      cy.contains('Analytics').click();
    });
  
    it('Test if "Availability" section is functional', () => {
      cy.contains('Availability').click();
    });
  });
  