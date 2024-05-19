describe('Login functionality', () => {
    it('should login with correct credentials', () => {
        cy.visit('https://entborrowingsystem.netlify.app/');
        cy.get('button[data-v-47cbab1f]').contains('ADMIN').click();

        // Wait for elements to be visible and interactable
        cy.get('#username').should('be.visible').type('danny');
        cy.get('#password').should('be.visible').type('admin123');
        cy.get('.login').should('be.visible').click();
        cy.get('[data-v-e6ac6a55]').contains('Tool Settings').click();



        cy.get('button.add1').click();  
        cy.get('input#item_name').type('Laptop');
        cy.get('input#quantity').type('1');
        cy.get('select#itemstatus').select('Available');
        cy.get('button.add').click();

        //DELETING SEQUENCE
        cy.wait(2000);
        cy.get('.del3').click();
        cy.get('#delete_item_id').should('be.visible').select('Laptop');
        cy.get('.delete').click();


        //EDIT SEQUENCE
        cy.get('button.edit2').click();
        cy.get('input#edit_quantity').type('5');
        cy.get('select#editItemStatus').select('Available');
        cy.get('button.edit').click(); 
    });
});
