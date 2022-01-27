describe("Navigation", () => {
    it("should visit root", () => {
      cy.visit("/");
    });
    it("should navigate to Tuesday", () => {
        //visit the root
        //get hold of the class="day-list__item"
        //check for the test that contains the day "Tuesday"
        cy.visit("/");
        cy.contains("[data-testid=day]","Tuesday")
        .click()
        .should("have.class", "day-list__item--selected");
    });
  });