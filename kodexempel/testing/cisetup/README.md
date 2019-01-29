## Firebase

Skapa ett Firebase-konto: https://firebase.google.com/pricing/

Skapa ett nytt Firebase-projekt på dashboarden

Installera Firebase CLI: `npm install -g firebase-tools`

---

## GitLab

Skaffa ett konto hos GitLab

Pricing -> Free -> Sign up
https://gitlab.com/users/sign_in

Skapa ett nytt projekt

---

## Klona ditt projekt från ditt GitLab repository

Klona projektet with valfri Git-klient

Kopiera filerna från `arbetsuppgifter/06b` (eller valfritt projekt med tester)

Initiera Firebase i projektet: `firebase init`
  1. Välj `database` samt `hosting`
  2. Välj ditt nyskapade projekt
  3. Default database rules
  4. Sätt "public" directory till "build", det är där Create React App placerar det bygga projektet
  5. Svara "yes" på frågan om det här är en Single Page Application
  6. Skriv INTE över `index.html`, behåll den som finns i projektet

Skapa en `.gitlab-ci.yml` fil i projektroten, med följande innehåll:

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

test:
  image: cypress/base:10
  stage: test
  before_script: 
    - yarn install 
  script:
    - yarn test
```

Pusha nu hela projektet till GitLab-repot och kolla i CI/CD-panelen att testningen går igenom

---

## Testa Merge Request

Fixa några GitLab settings
 -> General -> Merge request -> Only allow merge requests to be merged if the pipeline succeeds

Skapa en ny feature-branch

Gör en ändring som breakar ett test

Publicera branchen till GitLab

I GitLab, skapa en ny Merge Request utifrån den här branchen i Merge Request-panelen

Eftersom testet misslyckats skall det inte vara möjligt att göra en merge

Fixa problemet (rulla tillbaka ändringen, eller skriv om testet), och pusha upp till repot

Nu ska det vara möjligt att merga in din feature branch

---

## Lägg till en staging deploy

Hämta och spara undan din Firebase deploy key: `firebase login:ci`

Fixa några GitLab settings
  -> CI / CD -> Environment variables -> FIREBASE_STAGING_API_KEY + nyckeln du sparade undan tidigare

Vi lägger till ett nytt steg i `.gitlab-ci.yml`

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

Pusha till GitLab, när ditt bygge gått igenom skall projektet finnas och köra på Firebase.
