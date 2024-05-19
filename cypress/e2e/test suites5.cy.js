describe('Login functionality', () => {
    it('should login with correct credentials', () => {
      cy.visit('https://entborrowingsystem.netlify.app/');
      cy.get('button[data-v-47cbab1f]').contains('ADMIN').click();
  
      // Wait for elements to be visible and interactable
      cy.get('#username').should('be.visible').type('danny');
      cy.get('#password').should('be.visible').type('admin123');
      cy.get('.login').should('be.visible').click();
      cy.get('a[data-v-e6ac6a55][href="/requests"]').click();
      cy.get('button[data-v-53b8abd0].approve-button').first().click();
      cy.get('button[data-v-53b8abd0].decline-button').first().click(); 
    });
});
