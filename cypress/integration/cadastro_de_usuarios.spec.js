/// <reference types="cypress" />

import testStore from "../support/commands"

context('CRUD of the user', () => {
    beforeEach(() => {
        cy.visit('http://agapito-server.herokuapp.com/')
    })

    it('Create an user', () => {

        cy.intercept('**/users').as('users')
        cy.get('#users').click()
        cy.wait('@users').its('response.statusCode').should('eq', 200)

        cy.get('#btn-new').click()
        cy.get('#user_login').type('robsonagapito')
        cy.get('#user_full_name').type('Robson Agapito Correa')
        cy.get('#user_email').type('robsonagapito@gmail.com')
        cy.get('#user_age').type('28')
        cy.get('#btn-save').click()
        cy.get('#notice').should('have.text', 'Usuário foi criado com sucesso.')

        cy.get('#codigo').then(($cod) => {            
            Cypress.env('userCode', $cod.text())                        
        })
    })

    it('Read an user',() => {
        const buttonShow = `#btn-show_${Cypress.env('userCode')}`
        cy.get('#users').click()
        cy.get(buttonShow).click()
        cy.get('#codigo').should('have.text', Cypress.env('userCode'))
        cy.get('#login').should('have.text', 'robsonagapito')
        cy.get('#full_name').should('have.text', 'Robson Agapito Correa')
        cy.get('#email').should('have.text', 'robsonagapito@gmail.com')
    })

    it('Update an user',() => {
        const buttonEdit = `#btn-edit_${Cypress.env('userCode')}`
        cy.get('#users').click()
        cy.get(buttonEdit).click()
        cy.get('#user_age').clear().type('35')
        cy.get('#btn-save').click()
        cy.get('#age').should('have.text', '35')
    })

    it ('Delete an user',() => {
        const buttonDelete = `#btn-delete_${Cypress.env('userCode')}`
        cy.get('#users').click()
        cy.get(buttonDelete).click()
        cy.on('window:confirm', () => true)
        cy.get(buttonDelete).should('not.exist')
    })

})