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

        let today = new Date()
        let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        if (today.getDate() === lastDayOfMonth.getDate()) {
            cy.log('e o ultimo dia do mes?')

            cy.get(el.nextMonthButton)
                .should('be.visible')
                .click()
        } else {
            cy.log('nao e o ultimo dia do mes?')
        }


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