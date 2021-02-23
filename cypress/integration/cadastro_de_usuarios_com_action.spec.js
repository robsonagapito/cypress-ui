/// <reference types="cypress" />

import testStore from "../support/commands"

context('CRUD of the user with action', () => {
    beforeEach(() => {
        cy.visit('http://agapito-server.herokuapp.com/')
    })


    it('Read a user',() => {
        cy.create_user()
        cy.read_user()
    })


})