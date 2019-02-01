# End to End testing med Cypress

>Utgå från projektet där vi satte upp Continuous Integration i GitLab och hosting på Firebase. 

## Autentisering med Firebase

### Lägg till autentisering och användare i Firebase

Gå till dashboarden för ditt Firebase-projekt på https://console.firebase.google.com

Gå till Authentication-panelen och gå till Sign-in method-panelen

Ändra så att Email/Password är Enabled

Gå till Users-panelen och lägg till en ny user: `user.name@domain.com`, `MyPass99`

Gå till Develop-översikten, klicka på +Add app och script-ikonen (</>)

Kopiera konfigurations-blocket och spara undan till senare


### Modifiera projektet för att kunna logga in mot Firebase

Installera Firebase i projektet: `yarn add firebase --dev`

Skapa en ny fil i `utils`-mappen, och kalla den `firebase.js`

```
import * as firebase from 'firebase/app';
import 'firebase/auth';

// Use your own config
const config = {
  apiKey: ...,
  authDomain: ...,
  databaseURL: ...,
  projectId: ...,
  storageBucket: ...,
  messagingSenderId: ...
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);

    this.auth = firebase.auth();
  }

  signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  
};

const api = new Firebase();

export default api;

```

Modifiera `components/Login.js`:
```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import { validateLogin } from '../utils/validation';
import api from '../utils/firebase';

class Login extends Component {
  static propTypes = {
    loginSuccessful: PropTypes.func.isRequired
  };

  state = {
    email: '',
    password: '',
    message: {
      type: '',
      body: ''
    }
  };

  componentDidMount() {
    api.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState(
          {
            message: { type: 'SUCCESS', body: 'Logged in' },
            email: '',
            password: ''
          },
          () => {
            this.props.loginSuccessful(authUser.email);
          }
        );
      }
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (validateLogin(email, password)) {
      api.signIn(email, password)
        .catch(({message}) => {
          this.setState({
            message: { type: 'ERROR', body: message },
            email: '',
            password: ''
          });
        });
    } else {
      this.setState({
        message: { type: 'ERROR', body: 'Wrong password or email' },
        email: '',
        password: ''
      });
    }
  };

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        data-test="form"
        className="flex flex-col items-center w-1/2 mx-auto mt-8"
      >
        <Message message={this.state.message} />
        <label htmlFor="email" className="mb-4 w-full">
          Email <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={this.handleChange}
            value={this.state.email}
            placeholder="zero@cool.gg"
            className="my-4 p-2 rounded shadow border w-full"
          />
        </label>
        <label htmlFor="password" className="mb-4  w-full">
          Password <br />
          <input
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="8 length, 1 uppercase, 1 digit"
            className="mb-8 mt-4 p-2 rounded shadow border  w-full"
          />
        </label>
        <input
          type="submit"
          value="Login"
          className="bg-purple hover:bg-purple-dark text-white font-bold py-2 px-4 rounded"
        />
      </form>
    );
  }
}

export default Login;

```

Testa att logga in med fel lösenord (men som fortfarande klarar av valideringen)

Testa att logga in med korrekt lösenord

Om du vill rensa att du är inloggad i Chrome, gå till Application i Chrome Developer Tools, klicka på Clear storage och längst ned på Clear site data i panelen

---

## Installera Cypress

Lägg till Cypress i projektet: `yarn add cypress --dev`

Lägg till ett Cypress-kommando i package.json-scripten: 
```
"cypress:open": "cypress open"
```

Kör Cypress första gången för att initialisera Cypress och se Cypress köra igenom alla exempel-testerna:
`yarn cypress:open`

Cypress kommer nu att lägga till en `cypress`-mapp och en `cypress.json` i din projekt-rot

Sedan kommer Cypress grafiska klient att köras

Lägg till en `baseUrl` i din `cypress.json`, som är den url Cypress kommer att utgå ifrån i sina tester:
```
{
  "baseUrl": "http://localhost:3000"
}

``` 

Vi vill kunna köra vårt projekt och Cypress samtidigt, så vi installerar ett paket som hjälper oss att göra detta: `yarn add start-server-and-test --dev`

Vi lägger sedan till ett nytt script-kommando i package.json
```
"cypress:e2e": "start-server-and-test start http://localhost:3000 cypress:open"
```

Stäng ned Cypress-klienten

## Skriv ett Cypress-test

Test i Cypress läggs i `cypress/integration`-mappen, skapa en ny fil där som heter `login.spec.js`

```
describe('Login Test', function() {
  it('Visits my local host', function() {
    cy.visit('/');
  });
});
```

Starta Cypress-klienten igen med det nya script-kommandot: `yarn cypress:e2e`

Leta upp `login.spec.js` i listan över test och klicka på den för att köra testet

Cypress kommer nu starta Chrome och sedan gå till localhost:3000 samt visa resultatet av testet

## Ett End to End-test med Cypress

Skriv om login.spec.js:

```
before(function() {
  cy.clearLocalStorage();
  indexedDB.deleteDatabase('firebaseLocalStorageDb');
});

describe('Login Test', function() {
  it('Visits my local host and logs in', function() {
    cy.visit('/');

    cy.get('input[name="email"]')
      .type('user.name@domain.com')
      .should('have.value', 'user.name@domain.com');

    cy.get('input[name="password"]')
      .type('MyPass99')
      .should('have.value', 'MyPass99');
    
    cy.server();
    cy.route('POST', '**/verifyPassword**').as('verifyPassword');
    cy.route('POST', '**/getAccountInfo**').as('getAccountInfo');

    cy.get('input[type="submit"]')
      .click();

    cy.wait('@verifyPassword');
    cy.wait('@getAccountInfo');

    cy.get('.user')
      .should('contain', 'user.name@domain.com');
  });
});

```

## Lägg till Cypress till GitLab CI/CD

För att köra Cypress headless med Electron, så behöver vi lägga till några kommandon i package.json:
```
"cypress:run": "cypress run",
"cypress:e2e:ci": "start-server-and-test start http://localhost:3000 cypress:run"
```

Innan vi pushar till vårt repo, bör vi också flytta vår Firebase API-key från vårt repo

Vi kan flytta nyckeln till en `.env`-fil i vår root folder, så skapa en fil som heter `.env` med följande innehåll:
```
REACT_APP_FIREBASE_API_KEY=dinnyckelhär
```

Alla variables som börjar med  `REACT_APP_` är sedan tillgängliga i din app via `process.env` när Create-React-App kör i Development mode eller i byggsteget. Ändra config i `src/api/firebase.js` till:

```
apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
```

Vi behöver också lägga till den här nyckeln i GitLab, så gå till GitLab, öppna ditt projekt och sen:
GitLab settings -> CI / CD -> Environment variables
Lägg till REACT_APP_FIREBASE_API_KEY + nyckeln 

Nu behöver vi uppdatera `.gitlab-ci.yml`-filen så att den kör Cypress-testerna som en del av test-steget:

```
image: node:10.15.0

variables:
  CYPRESS_CACHE_FOLDER: "$CI_PROJECT_DIR/cache/Cypress"

cache:
  paths:
    - node_modules/
    - cache/Cypress

stages:
  - test
  - staging

test:
  image: cypress/base:10
  stage: test
  before_script: 
    - yarn install 
  script:
    - yarn test
    - yarn cypress:e2e:ci

staging: 
  stage: staging
  type: deploy
  script:
    - yarn global add firebase-tools
    - yarn build
    - firebase deploy -m "Pipeline $CI_PIPELINE_ID, build $CI_BUILD_ID" --non-interactive --token $FIREBASE_STAGING_API_KEY
  only:
    - master
```

Om vi pushar in till GitLab-repot nu, så borde även Cypress-testerna köras, och sedan lanseras den nya inloggningsfunktionen på din Firebase


