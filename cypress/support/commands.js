Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('rodrigoteste1305@gmail.com')
    cy.get('#phone').type('123456789')
    cy.get('#open-text-area').type('Teste de Automação')
    cy.contains('button', 'Enviar').click()
   
})