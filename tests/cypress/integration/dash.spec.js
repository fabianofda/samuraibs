

describe('dashboard', function () {



    context('quando o cliente faz um agendamento pelo app mobile', function () {
        const data = {
            customer: {
                name: 'Nikki Sixx',
                email: 'sixx@motleycrue.com',
                password: 'pwd123',
                is_provider: false
            },
            samurai: {
                name: 'Ramon Valdes',
                email: 'ramon@televisa.com',
                password: 'pwd123',
                is_provider: true
            }
        }

        before(function () {

            cy.postUser(data.customer)
            cy.apiLogin(data.customer)

            cy.postUser(data.samurai)


        })

        it('o mesmo deve ser exibido no dashboard', function () {
            
            console.log(data)
        })
    })
})

Cypress.Commands.add('apiLogin', function (user) {

    var payload = {
        email: user.email,
        password: user.password
    }

    cy.request({

        method: 'POST',
        url: 'http://localhost:3333/sessions',
        failOnStatusCode: false,
        body: payload

    }).then(function (response) {
        expect(response.status).to.eql(200)
        console.log(response.body)
    })
})