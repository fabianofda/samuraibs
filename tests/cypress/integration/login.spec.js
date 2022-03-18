import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', function () {

    context('Campos obrigatórios', function () {
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                loginPage.alertHaveText(alert)
            })
        })

    })

    context('Senha incorreta', function () {
        const user = {
            email: "wa@samuraibs.com",
            password: "pwd",
            msg: 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
        }

        it(`deve exibir ` + user.msg.toLowerCase(), function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText(user.msg)
        })

    })

    context('Email no formato inválido', function () {
        const user = {
            email: "wa.samuraibs.com",
            password: "pwd123",
            msg: 'Informe um email válido'
        }

        it('deve exibir ' + user.msg.toLowerCase(), function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            loginPage.alertHaveText(user.msg)
        })
    })

    context('quando usuario é muito bom', function () {

        const user = {
            name: 'Luci Moreira',
            email: 'lsmoreira@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it(`Login com sucesso`, function () {

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)

        })

    })

})

