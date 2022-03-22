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
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
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
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando o email é invalido', function () {
        const user = {
            name: "welton andrade",
            email: "wa.samuraibs.com",
            password: "pwd123"
        }

        it(`deve exibir mensagem de alerta`, function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })
    })

    context('Quando a senha é muito curta', function () {
        const passwords = ['1', '2a', '3ab', '4abc', '5432d']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            const user = { name: "ivan d a", email: "ivan.d.a@samuraibs.com", password: p }

            it('nao deve cadastrar a senha: ' + p, function () {
                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })

    })

    context('quando não preencho nenhum dos campos', function () {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                signupPage.alert.haveText(alert)
            })
        })

    })
})