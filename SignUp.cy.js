let usersdata = [{
  name: 'user',
  lastname: 'useruser',
  email: 'user@testy3.com',
  password: 'Qwerty12'
}, {
  name: 'john',
  lastname: 'silver',
  email: 'silver@testy4.com',
  password: 'Qwerty12'
}];

let carsdata = [{
  carBrandname: 'BMW',
  carModelname: 'X5',
  carMilleage: 3000
}, {
  carBrandname: 'Porsche',
  carModelname: '911',
  carMilleage: 1000
}];

let emptyVerification = function (arr) {
  cy.get('div[class="modal-dialog modal-dialog-centered"]').should('exist');
  for (let inputid of arr) {
    cy.get(`input[id="${inputid}"]`).should('be.visible');
    cy.get(`input[id="${inputid}"]`).should('be.empty');
  };
  cy.get('div[class="invalid-feedback"]').should('not.exist');
  cy.get('button').contains('Register').should('be.visible');
  cy.get('button').contains('Register').should('be.disabled');
};

describe('qauto', () => {
  it('signup', () => {
    cy.visit('https://qauto2.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    })
    for (let i in usersdata) {
      let userdata = usersdata[i]

      userdata.repeatpassword = userdata.password
      let arrVal = Object.values(userdata);

      let haveValue = function (arr2) {
        let j = 0
        for (let input of arr2) {
          cy.get(`input[id="${input}"]`).should('have.value', arrVal[j])
          j++
        };
      };

      cy.get('button').contains('Sign up').click();
      emptyVerification(["signupName", "signupLastName", "signupEmail", "signupPassword", "signupRepeatPassword"]);
      cy.get('input[id="signupName"]').type(userdata.name);
      haveValue(["signupName"])
      emptyVerification(["signupLastName", "signupEmail", "signupPassword", "signupRepeatPassword"]);
      cy.get('input[id="signupLastName"]').type(userdata.lastname);
      haveValue(["signupName", "signupLastName"])
      emptyVerification(["signupEmail", "signupPassword", "signupRepeatPassword"]);
      cy.get('input[id="signupEmail"]').type(userdata.email);
      haveValue(["signupName", "signupLastName", "signupEmail"])
      emptyVerification(["signupPassword", "signupRepeatPassword"]);
      cy.get('input[id="signupPassword"]').type(userdata.password);
      haveValue(["signupName", "signupLastName", "signupEmail", "signupPassword"])
      emptyVerification(["signupRepeatPassword"]);
      cy.get('input[id="signupRepeatPassword"]').type(userdata.password);
      haveValue(["signupName", "signupLastName", "signupEmail", "signupPassword", "signupRepeatPassword"])

      cy.get('button').contains('Register').should('be.enabled');

      cy.get('button').contains('Register').click();
      cy.get('button').contains('Add car').click();
      cy.get('select[name="carBrandId"]').select(carsdata[i].carBrandname);
      cy.get('select[name="carModelId"]').select(carsdata[i].carModelname);
      cy.get('input[name="mileage"]').type(carsdata[i].carMilleage);
      cy.get('div[class="modal-footer d-flex justify-content-end"]').within(() => {
        cy.get('button').contains('Add').click()
      });
      cy.get('a[routerlink="settings"]').click();
      cy.get('button').contains('Remove my account').click();
      cy.get('div[class="modal-content"]').within(() => {
        cy.get('button').contains('Remove').click()
      });
    }
  })
})