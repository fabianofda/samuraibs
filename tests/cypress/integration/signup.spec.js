

it(`deve cadastrar novo usuario`, function () {

    const name = "fabiano dias"
    const email = "fabianofda@samuraibs.com"
    const password = "pwd123"

    cy.visit(`/signup`)

    cy.get('input[placeholder="Nome"]').type(name)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(password)

})