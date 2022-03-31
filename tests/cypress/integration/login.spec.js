import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', function () {

    context('quando nao preencho nenhum dos campo', function () {
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
                loginPage.alert.haveText(alert)
            })
        })

    })

    context('quando usuario eh bom mais a senha esta incorreta', function () {
        let user = {
            name: 'welton andrade',
            email: "wa@samuraibs.com",
            password: "pwd123",
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
                .then(function () {
                    user.password = "abc123"
                })

        })

        it('deve notificar erro de credenciais ', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.toast.shouldHaveText(message)
        })

    })

    context('quando o formato do email é inválido', function () {

        const emails = [
            'gmail.com',
            '@yahoo.com',
            '@',
            'fabiano',
            '123456',
            'ábcdefg',
            '!@#$$%'
        ]

        before(function () {
            loginPage.go()
        })

        emails.forEach(function (email) {
            it('nao deve logar com o email: ' + email.toLowerCase(), function () {
                const user = { email: email, password: 'pwd123' }

                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            })
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