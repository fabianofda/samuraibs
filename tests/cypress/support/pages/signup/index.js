import { el } from './elements'

class SignupPage {

    form(user) {
        cy.get(el.name).type(user.name)
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    go() {
        cy.visit(`/signup`)
    }

    submit() {
        cy.contains(el.signupButton).click()
    }

    toastHaveText(expectText) {
        cy.get(el.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }
}
export default new SignupPage()