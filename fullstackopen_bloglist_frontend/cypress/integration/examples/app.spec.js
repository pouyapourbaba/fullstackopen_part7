/// <reference types="Cypress" />

context("Login", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });

  it("should render the login form", function() {
    cy.get("[data-cy=loginForm");
  });

  it("should login successfully", function() {
    cy.get("[data-cy=username]").type("hamid_username");
    cy.get("[data-cy=password]").type("password");
    cy.get("[data-cy=login]").click();
    cy.contains("Blogs");
  });
});

context("Blogs", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=username]").type("hamid_username");
    cy.get("[data-cy=password]").type("password");
    cy.get("[data-cy=login]").click();
  });

  it("should close the blog form without postin a new blog", function() {
    cy.get("[data-cy=newBlogBtn]").click();
    cy.get("[data-cy=cancelNewBlogBtn]").click();
  });

  it("should post a new blog", function() {
    cy.get("[data-cy=newBlogBtn]").click();
    cy.get("[data-cy=title]").type("test blog");
    cy.get("[data-cy=author]").type("test author");
    cy.get("[data-cy=url]").type("test url");
    cy.get("[data-cy=submitNewBlog]").click();
    cy.contains("test blog");
  });

  it("should like a blog", function() {
    cy.get("[data-cy=linkToBlogDetails]:first").click();
    cy.get("[data-cy=likeBlog]").click()
    cy.get("[data-cy=numberOfLikes]").contains("1");
  });
  
  it("should comment on a blog", function() {
    cy.get("[data-cy=linkToBlogDetails]:first").click();
    cy.get("[data-cy=comment]").type("test comment");
    cy.get("[data-cy=submitComment]").click()
    cy.contains("test comment");
  });
  
  it("should delete a blog", function() {
    cy.get("[data-cy=linkToBlogDetails]:first").click();
    cy.get("[data-cy=deleteBlog]").click();
    cy.contains("Blogs");
  });
});
