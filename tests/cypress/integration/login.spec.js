import loginPage from '../support/pages/login'
import signupPage from '../support/pages/signup'

context('Senha incorreta', function () {
    const user = {
        email: "wa@samuraibs.com",
        password: "pwd"
    }

    it(`deve exibir mensagem de alerta`, function () {
        loginPage.go()
        loginPage.form(user)
        loginPage.submit()
        loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
    })

})

context('Email no formato inválido', function () {
    const user = {
        email: "wa.samuraibs.com",
        password: "pwd123"
    }

    it(`deve exibir mensagem de alerta`, function () {
        loginPage.go()
        loginPage.form(user)
        loginPage.submit()
        loginPage.alertHaveText('Informe um email válido')
    })
})

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

context('Login com sucesso', function () {
    const user = {
        name: 'lsmoreira',
        email: 'lsmoreira@samuraibs.com',
        password: 'pwd123'
    }

    before(function () {
        cy.visit(`/signup`)

        cy.task('removeUsers', user.email)
            .then(function (result) {
                console.log(result)
            })

        signupPage.go()
        signupPage.form(user)
        signupPage.submit()
        signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    })

    it(`deve ver a area logada`, function () {

        loginPage.go()
        loginPage.form(user)
        loginPage.submit()

        cy.contains('span', 'Bem-vindo,')
            .should('be.visible')

    })

})