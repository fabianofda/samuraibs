import header from '../../components/header'
import { el } from './elements'

class DashPage {

    constructor() {
        this.header = header
    }

    calendarShoulBeVisible() {

        cy.get(el.calendar, { timeout: 10000 })
            .should('be.visible')
    }

    selectDay(day) {
        const target = new RegExp('^' + day + '$', 'g')

        cy.contains(el.boxDay, target)
            .click({ force: true })
    }

    appointmentShoulBe(customer, hour) {

        cy.contains(el.boxName, customer.name, { timeout: 10000 })
            .should('be.visible')
            .parent()
            .contains(el.boxHour, hour)
            .should('be.visible')
    }
}

export default new DashPage()