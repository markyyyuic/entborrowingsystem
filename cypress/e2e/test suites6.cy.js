describe('Borrowers name', () => {
    it('should login with correct credentials', () => {
      cy.visit('https://entborrowingsystem.netlify.app/');
      cy.get('[data-v-47cbab1f]').contains('Borrow Now!').click();
      cy.wait(6000);
      // Wait for elements to be visible and interactable
      cy.get('input#userid[name="userid"]').type('45124')
      cy.get('input#usernames').type('Rogelio');
    cy.get('select#role-dp').select('teacher');
      cy.get('button[type="submit"].btn').click();

      cy.get(':nth-child(1) > .available').click();
      cy.get(':nth-child(1) > .quantity-dialog').within(() => {
        cy.get('input[type="number"][min="1"]').should('be.visible').click().type('5');
    });
      cy.get(':nth-child(1) > .quantity-dialog > :nth-child(3)').click();
      cy.get('button.nextButton[data-v-a1f2e85f]').should('be.visible').click();
      cy.get('.submit').click();
    })
})  