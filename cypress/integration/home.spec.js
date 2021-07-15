/// <reference types="cypress" />

context("Home", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should find the title of the homepage", () => {
    cy.get("title").contains("Babitz");
  });
});
