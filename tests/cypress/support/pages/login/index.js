import { el } from './elements'

import toast from '../../components/toast'

class LoginPage {

    constructor() {
        this.toast = toast

    }

    form(user) {
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    go() {
        cy.visit(`/`)
    }

    submit() {
        cy.contains(el.loginButton).click()
    }

    alertHaveText(expectText) {
        cy.contains('.alert-error', expectText)
            .should('be.visible')
    }

}
export default new LoginPage()