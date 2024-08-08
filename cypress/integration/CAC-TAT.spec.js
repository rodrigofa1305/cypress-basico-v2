//// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {


    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Uma funcionalidade que pode ser usada em conjunto com comando o .type(), é o .clear(), o qual limpa um campo, para posterior digitação, por exemplo. /n Portanto, crie um teste chamado preenche e limpa os campos nome, sobrenome, email e telefone Tal teste deve verificar o valor (value) após a digitação (.type(...).should("have.value", "valor-aqui")), e após a limpeza do campo (.clear().should("have.value", ")) Por fim, execute o novo teste no Test Runner, e quando o mesmo estiver passando, siga adiante para o próximo exercício'
        cy.get('#firstName').type('Rodrigo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('rodrigoteste1305@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 1 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Rodrigo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('rodrigoteste1305@gmail,com')
        cy.get('#open-text-area').type('Texte')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone conitnua vazio quando preenchido com valor não numérico', function () {
        cy.get('#phone')
            .type('numero de telefone')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName')
            .type('Rodrigo')
            .should('have.value', 'Rodrigo')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Santos').
            should('have.value', 'Santos')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('rodrigoteste1305@gmail.com')
            .should('have.value', 'rodrigoteste1305@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type('Teste')
            .should('have.value', 'Teste')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio)
                    .check()
                    .should('be.checked')
            })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        //cy.contains('#privacy a', 'Política de Privacidade').invoke('removeAttr', 'target')
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

})


