describe('Login functionality', () => {
    it('should login with correct credentials', () => {
        cy.visit('https://entborrowingsystem.netlify.app/');
        cy.get('button[data-v-47cbab1f]').contains('ADMIN').click();

        // Wait for elements to be visible and interactable
        cy.get('#username').should('be.visible').type('danny');
        cy.get('#password').should('be.visible').type('admin123');
        cy.get('.login').should('be.visible').click();
        cy.get('[data-v-e6ac6a55]').contains('Tool Settings').click();
        cy.get('[data-v-68cea6f1]').contains('Add Item').click();
        cy.get('#item_name').should('be.visible').type('Zeuel');
        cy.get('#quantity').should('be.visible').type('1');
        cy.get('[data-v-68cea6f1].add').click();
    });
});
