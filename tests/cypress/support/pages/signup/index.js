import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class SignupPage {

    constructor() {
        this.toast = toast
        this.alert = alert

    }

    form(user) {
        cy.get(el.name).type(user.name)
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    go() {
        cy.visit(`/signup`)

        cy.contains(el.title).should('be.visible')
    }

    submit() {
        cy.contains(el.signupButton).click()
    }
}

export default new SignupPage()