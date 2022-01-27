describe("book an appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });
  it("should book an interview", () => {
    //visit the root of the web server
    //clicks on the "add" button in the second appointment
    //enters their name
    //chooses an interviewer
    // clicks the save button
    //sees the booked appointment

    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
//   edit
  it("should edit an interview", () => {
    cy.get("[alt='Edit']").first().click({ force: true }); // forces the action, disables waiting for actionability

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
// cancel
  it("should cancel an interview", () => {
    cy.get("[alt='Delete']").first().click({ force: true }); // forces the action, disables waiting for actionability
    cy.contains("Confirm").click()
    //make sure deleting indicator shows before moving to the next step
    cy.contains("Deleting").should("exist");
    //now deleting indicator should vanish
    cy.contains("Deleting").should("not.exist");
    //ensure the appointment is deleted
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
    
  });
});
