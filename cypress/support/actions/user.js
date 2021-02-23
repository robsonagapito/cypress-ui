
Cypress.Commands.add("create_user", () => { 
    cy.log('<<<<<<<<< CREATE USER >>>>>>>>>')
    cy.get('#users').click()
    cy.get('#btn-new').click()
    cy.get('#user_login').type('robsonagapito')
    cy.get('#user_full_name').type('Robson Agapito Correa')
    cy.get('#user_email').type('robsonagapito@gmail.com')
    cy.get('#user_age').type('28')
    cy.get('#btn-save').click()
    cy.get('#codigo').then(($cod) => {            
        Cypress.env('userCode', $cod.text())                        
    })
    cy.get('.ls-ico-dashboard').click()
})

Cypress.Commands.add("read_user", () => { 
    cy.log('<<<<<<<<< READ USER >>>>>>>>>')
    const buttonShow = `#btn-show_${Cypress.env('userCode')}`
    cy.get('#users').click()
    cy.get(buttonShow).click()
    cy.get('#codigo').should('have.text', Cypress.env('userCode'))
    cy.get('#login').should('have.text', 'robsonagapito')
    cy.get('#full_name').should('have.text', 'Robson Agapito Correa')
    cy.get('#email').should('have.text', 'robsonagapito@gmail.com')
})