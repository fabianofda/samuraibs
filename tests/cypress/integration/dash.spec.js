import dashPage from '../support/pages/dash'
import { customer, provider, appointment } from '../support/factories/dash'

describe('dashboard', function () {

    context('quando o cliente faz um agendamento pelo app mobile', function () {

        before(function () {

            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('o mesmo deve ser exibido no dashboard', function () {
            const day = Cypress.env('appointmentDay')

            //  cy.uiLogin(provider)
            cy.apiLogin(provider, true)

            dashPage.calendarShoulBeVisible()
            dashPage.selectDay(day)
            dashPage.appointmentShoulBe(customer, appointment.hour)

        })
    })
})