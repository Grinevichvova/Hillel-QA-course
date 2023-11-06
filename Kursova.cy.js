let UsersData = [{
    name: 'Billie',
    lastname: 'Jean',
    email: 'isnotmylover@test.com',
    password: 'Qwerty12',
    repeatpassword: 'Qwerty12'
},{
    name: 'Slim',
    lastname: 'Shady',
    email: 'thereal@test.com',
    password: 'Qwerty12',
    repeatpassword: 'Qwerty12'
}];

let CarData = ["Porsche Cayenne 1323 user1", "Audi R8 12222 user2", "Audi TT 121212 user2", "BMW 3 5000 user2", "BMW 5 50000 user1", "Fiat Ducato 100000 user1", "Fiat Panda 30003 user2", "Porsche 911 2000 user2", "Porsche Panamera 10 user1", "Ford Focus 150050 user1"];

let TestData = [];

for (let elem of CarData) {
    let [brand, model, mileage, user] = elem.split(' ');
    let car = {
        brand: brand,
        model: model,
        mileage: mileage,
        user: Number(user.charAt(user.length - 1))
    };
    TestData.push(car);
};

describe('qauto', () => {
    it('signup', () => {
        cy.visit('https://qauto2.forstudy.space/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
        
        for (let i = 0; i < UsersData.length; i++) {
            let UserData = UsersData[i];
            cy.get('button').contains('Sign up').click();
            cy.get('input[id="signupName"]').type(UserData.name);
            cy.get('input[id="signupLastName"]').type(UserData.lastname);
            cy.get('input[id="signupEmail"]').type(UserData.email);
            cy.get('input[id="signupPassword"]').type(UserData.password);
            cy.get('input[id="signupRepeatPassword"]').type(UserData.password);
            cy.get('button').contains('Register').click();

            for (let car of TestData) {
                if (car.user == i + 1) {
                    cy.get('button').contains('Add car').click();
                    cy.get('select[name="carBrandId"]').select(car.brand);
                    cy.get('select[name="carModelId"]').select(car.model);
                    cy.get('input[name="mileage"]').type(car.mileage);
                    cy.get('div[class="modal-footer d-flex justify-content-end"]').within(() => {
                        cy.get('button').contains('Add').click()
                    });
                };
            };

            for (let car of TestData) {
                if (car.user == i + 1) {
                    cy.get('ul[class="car-list"]').within(() => {
                        cy.get('p[class="car_name h2"]').contains(car.brand + ' ' + car.model).should('exist')
                        cy.get('p[class="car_name h2"]').contains(car.brand + ' ' + car.model).parents('div[class="car jumbotron"]').within(() => {
                            cy.get('input[name="miles"]').should('have.value', car.mileage)
                        });
                    });
                };
            };

            cy.get('a[routerlink="settings"]').click();
            cy.get('button').contains('Remove my account').click();
            cy.get('div[class="modal-content"]').within(() => {
                cy.get('button').contains('Remove').click()
            });
        };
    });
});