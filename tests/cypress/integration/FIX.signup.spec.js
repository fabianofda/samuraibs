import signupPage from '../support/pages/signup'

describe('signup', function () {

    before(function () {
        cy.fixture('users').then(function (users) {
            this.users = users
        })
    })

    context('Quando usuario é novo', function () {
        before(function () {
            cy.task('removeUsers', this.users.fabiano.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it(`deve cadastrar com sucesso`, function () {
            signupPage.go()
            signupPage.form(this.users.fabiano)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Quando email ja existe', function () {
        before(function () {
            cy.task('removeUsers', this.users.luci.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                this.users.luci
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it(`não deve cadastrar o usuário`, function () {
            signupPage.go()
            signupPage.form(this.users.luci)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando o email é invalido', function () {
        const message = "Informe um email válido"

        it(`deve exibir mensagem de alerta ` + message, function () {
            signupPage.go()
            signupPage.form(this.users.welton)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })
    })
})