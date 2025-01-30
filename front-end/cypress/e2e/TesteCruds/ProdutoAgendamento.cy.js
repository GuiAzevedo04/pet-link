describe('Crud Produto', () => {

  it('CRUD Produto', () => {
    cy.visit('http://localhost:5173/admin')

    //Login
    cy.get('.butao-header').click()
    cy.get('[name=email]').first().type('mateus@gmail.com')
    cy.get('[name=password]').first().type('12345')
    cy.get('[data-cy=button-login]').click()
    cy.wait(6000)

    //Cadastra Produto
    cy.get('[data-cy=adicionar-produto]').click()
    cy.get('[name=name]').type("Produto Teste")
    cy.get('[name=price').type("20")
    cy.get('[name=imageLink]').type("linkimage.com")
    cy.get('[name=amount]').type("10")
    cy.get('[name=description]').type("Produto adicionado com Cypress")
    cy.get('[data-cy=adicionar-produto-confirma]').click()

    // Edita Produto
    cy.get('[data-cy=editar-produto]').last().click()
    cy.get('[name=name]').clear().type("Produto Teste Editado")
    cy.get('[name=price]').clear().type("40")
    cy.get('[name=imageLink]').clear().type("linkimage.com")
    cy.get('[name=description]').clear().type("Produto editado com Cypress")
    cy.get('[data-cy=salvar-produto-editado]').click();

    //Apaga Produto
    cy.get('[data-cy=apagar-produto]').last().click()
    cy.get('[data-cy=apagar-produto-confirma]').click()
  })

  it('CRUD Agendamento', () => {
    cy.visit('http://localhost:5173/banho-tosa')

    //Login
    cy.get('.butao-header').click()
    cy.get('[name=email]').first().type('mateus@gmail.com')
    cy.get('[name=password]').first().type('12345')
    cy.get('[data-cy=button-login]').click()
    cy.wait(6000)

    //Cadastrar Agendamento
    cy.get('[name=petName]').type("Nome Pet Teste")
    cy.get('[name=datateste]').first().type('15/02/2025');
    cy.wait(2000)
    cy.get('select[name="timeOfSchedule"]').select(1);
    cy.get('[name=description]').type("Descrição teste")
    cy.get('[name=serviceId]').first().click()
    cy.get('[data-cy=agendar]').click()

    //Edita Agendamento
    cy.visit('http://localhost:5173/admin')
    cy.wait(2000)
    cy.get('[data-cy=editar-horario]').last().click()
    cy.get('.MuiModal-root').should('be.visible')
    cy.get('.MuiSelect-select').click()
    cy.get('.MuiMenu-paper .MuiMenuItem-root').contains('Concluido').click()
    cy.wait(1100)
    cy.get('[data-cy=salvar-horario]').click()
    
    //Deletar Agendamento
    cy.get('[data-cy=deletar-horario]').last().click()
    cy.get('[data-cy=deletar-horario-confirma').click()
  })
})
