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

    selectDay(appointmentDate) {

        let today = new Date()
        let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

         if (today.getDate() === lastDayOfMonth.getDate()) {

      //  if (today.getDate() === today.getDate()) {
            cy.log('e o ultimo dia do mes?')

            cy.get(el.nextMonthButton).should('be.visible')
                .click()

            let monthName
            switch (appointmentDate.getMonth()) {
                case 0:
                    monthName = 'Janeiro'
                    break
                case 1:
                    monthName = 'Fevereiro'
                    break
                case 2:
                    monthName = 'Março'
                    break
                case 3:
                    monthName = 'Abril'
                    break
                case 4:
                    monthName = 'Maio'
                    break
                case 5:
                    monthName = 'Junho'
                    break
                case 6:
                    monthName = 'Julho'
                    break
                case 7:
                    monthName = 'Agosto'
                    break
                case 8:
                    monthName = 'Setembro'
                    break
                case 9:
                    monthName = 'Outubro'
                    break
                case 10:
                    monthName = 'Novembro'
                    break
                case 11:
                    monthName = 'Dezembro'
                    break
            }

            cy.contains(el.monthYearName, monthName)
                .should('be.visible')

        } else {
            cy.log('nao e o ultimo dia do mes?')
        }


        const target = new RegExp('^' + appointmentDate.getDate() + '$', 'g')

        cy.contains(el.boxDay, target)
            .click({ force: true })
    }

    appointmentShoulBe(customer, hour) {

        cy.contains(el.boxName, customer.name, { timeout: 15000 })
            .should('be.visible')
            .parent()
            .contains(el.boxHour, hour)
            .should('be.visible')
    }
}

export default new DashPage()