import faker from '@faker-js/faker'

it(`deve cadastrar novo usuario exemplo "Intercept"`, function () {

    const name = "fabiano andrade"
    const email = "fabiano-andrade@samuraibs.com"
    const password = "pwd123"

    cy.visit(`/signup`)

    cy.get('input[placeholder="Nome"]').type(name)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(password)

    cy.intercept('POST', '/users', {
        statusCode: 200
    }).as('postUser')

    cy.contains('button', 'Cadastrar').click()

    cy.wait('@postUser')

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

})

it(`deve cadastrar novo usuario exemplo "Faker"`, function () {

    var firstName = faker.name.firstName()
    var lastName = faker.name.lastName()

    const name = `${firstName} ${lastName}`
    const email = faker.internet.email(firstName)
    const password = "pwd123"

    cy.visit(`/signup`)

    cy.get('input[placeholder="Nome"]').type(name)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(password)

    cy.contains('button', 'Cadastrar').click()

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

})

it(`deve cadastrar novo usuario exemplo "PG"`, function () {

    const name = "fabiano dias"
    const email = "fabianofda@samuraibs.com"
    const password = "pwd123"

    cy.task('removeUsers', email)
        .then(function (result) {
            console.log(result)

        })

    cy.visit(`/signup`)

    cy.get('input[placeholder="Nome"]').type(name)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(password)

    cy.contains('button', 'Cadastrar').click()

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

})

it(`deve tentar cadastrar Email já cadastrado para outro usuário`, function () {

    const name = "fabiano dias"
    const email = "fabianofda@samuraibs.com"
    const password = "pwd123"

    cy.visit(`/signup`)

    cy.get('input[placeholder="Nome"]').type(name)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(password)

    cy.contains('button', 'Cadastrar').click()

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Email já cadastrado para outro usuário.')

})