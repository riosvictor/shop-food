describe('Login Test', () => {
  const loginPage = 'http://localhost:5173/'
  const tablesRoute = '/tables'

  it('should login with invalid credentials', () => {
    cy.visit(loginPage)
    cy.get('#input_email').type('unknown.user@email.com')
    cy.get('#input_password').type('password123')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.url().should('include', loginPage)
  })

  it('should login with valid credentials and logout', () => {
    cy.visit(loginPage)
    cy.get('#input_email').type('test.user@email.com')
    cy.get('#input_password').type('password123')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.url().should('include', tablesRoute)

    cy.get('#btn_menu_bar').should('be.visible')
    cy.get('#btn_menu_bar').click()
    cy.get('#btn_logout').should('be.visible')
    cy.get('#btn_logout').click()
    cy.reload()
    cy.url().should('include', loginPage)
  })
})
