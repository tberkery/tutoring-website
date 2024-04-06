describe('Post  Page', () => {

    beforeEach(() => {
        cy.session('signed-in', () => {
            cy.signIn();
        })
    });

    it('Test visiting the browse page', () => {
        cy.visit('/browse', {failOnStatusCode: false});
    });

    it('Test clicking into a post', () => {
        cy.visit('/browse', {failOnStatusCode: false});

        cy.get('.post').first().click();
        cy.url().should('include', '/post');
    });

    it('Test post contains Post Comment Button', () => {
        cy.visit('/browse', {failOnStatusCode: false});

        cy.get('.post').first().click();
        cy.get('#button').should('exist');
    });

});