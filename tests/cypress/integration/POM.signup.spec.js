import signupPage from '../support/pages/signup'

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

        it(`deve cadastrar com sucesso`, function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toastHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
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
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toastHaveText('Email já cadastrado para outro usuário.')
        })
    })
})