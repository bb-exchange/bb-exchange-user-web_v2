describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "about" and click it
    cy.get('ul[data-cy="postList"] > li:first').click();

    // The new url should include "/about"
    cy.url().should("include", "/post");

    // The new page should contain an h1 with "About page"
    // cy.get("h1").contains("About Page");
  });
});

// popular_postList__9n1Z5
// https://docs.cypress.io/api/commands/get
// cy.get('[id^=local-]')
