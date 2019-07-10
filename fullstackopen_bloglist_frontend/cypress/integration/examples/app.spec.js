/// <reference types="Cypress" />

context("Login ", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });

  it("should render the login form", function() {
    cy.get("[data-cy=loginForm")
  })
  
  it("should login successfully", function() {
    cy.get("[data-cy=username]").type("hamid_username");
    cy.get("[data-cy=password]").type("password");
    cy.get("[data-cy=login]").click();
    cy.contains("Blogs");
  });
});
