import faker from '@faker-js/faker'

describe('Cadastro', function () {

    context('Quando usuario é novo', function () {
        const user = {
            name: "fabiano dias",
            email: "fabianofda@samuraibs.com",
            password: "pwd123"
        }

        before(function () {
            cy.task('removeUsers', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it(`deve cadastrar com sucesso [exemplo "Intercept"]`, function () {
            cy.visit(`/signup`)

            cy.get('input[placeholder="Nome"]').type(user.name)
            cy.get('input[placeholder="E-mail"]').type(user.email)
            cy.get('input[placeholder="Senha"]').type(user.password)

            cy.intercept('POST', '/users', {
                statusCode: 200
            }).as('postUser')

            cy.contains('button', 'Cadastrar').click()

            cy.wait('@postUser')

            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })

        it(`deve cadastrar com sucesso [exemplo "PG"]`, function () {
            cy.visit(`/signup`)

            cy.get('input[placeholder="Nome"]').type(user.name)
            cy.get('input[placeholder="E-mail"]').type(user.email)
            cy.get('input[placeholder="Senha"]').type(user.password)

            cy.contains('button', 'Cadastrar').click()

            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })

        it(`deve cadastrar com sucesso [exemplo "Faker"]`, function () {

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
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })

    })

    context('Quando email ja existe', function () {
        const user = {
            name: 'luciana moreira',
            email: 'lsmoreira@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUsers', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it(`não deve cadastrar o usuário`, function () {
            cy.visit(`/signup`)

            cy.get('input[placeholder="Nome"]').type(user.name)
            cy.get('input[placeholder="E-mail"]').type(user.email)
            cy.get('input[placeholder="Senha"]').type(user.password)

            cy.contains('button', 'Cadastrar').click()

            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Email já cadastrado para outro usuário.')
        })

    })
})