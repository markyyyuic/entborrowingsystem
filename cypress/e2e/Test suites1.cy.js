describe('Login functionality', () => {
  it('should login with correct credentials', () => {
    cy.visit('https://entborrowingsystem.netlify.app/');
    cy.get('button[data-v-47cbab1f]').contains('ADMIN').click();

    // Wait for elements to be visible and interactable
    cy.get('#username').should('be.visible').type('danny');
    cy.get('#password').should('be.visible').type('admin123');
    cy.get('.login').should('be.visible').click();
  });

  it('should not login with incorrect credentials', () => {
    cy.visit('https://entborrowingsystem.netlify.app/');
    cy.get('button[data-v-47cbab1f]').contains('ADMIN').click();
  
    // Wait for elements to be visible and interactable
    cy.get('#username').should('be.visible').type('dandi');
    cy.get('#password').should('be.visible').type('admin123');
    cy.get('.login').should('be.visible').click();
  
    // Verify login failure by checking for error message or other indication
    cy.contains('Invalid username or password'); // Adjust this assertion based on the actual error message displayed
});
});
