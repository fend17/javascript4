# jest-react-testing

>Exempel-app byggd med [`create-react-app`](https://github.com/facebookincubator/create-react-app) för integrations- och snapshot-testning. Appen hämtar växlingskurs från en lokal [json-server](https://github.com/typicode/json-server) och visar datan i en lista. Den har också en uppdateringsknapp som kan testas separat. **CSS-ramverket är [Tailwind](https://tailwindcss.com/)**

Projektet är förberett med ett antal paket för att testa React-komponenter: [**`enzyme`**](http://airbnb.io/enzyme/docs/api/), `enzyme-adapter-react-16`, `react-test-renderer` samt `enzyme-to-json` för snapshot.testning. 

## Installation
Ställ dig i rotfoldern och kör `yarn` eller `npm install`

## Kör tester
Jest kör alla tester som finns i `__test__`-mappar, eller filer döpta enligt mönstret `*.test.js`

Kör igenom testerna en gång:
`yarn test` eller `npm run test`

Kör testerna i "watch"-läge (kör när antingen källfilen eller testfilen sparas):
`yarn test:watch` eller `npm run test:watch`

# Övningsuppgifter

## Uppgift 1

Testa följande scenarion:

* Listan blir **inte** fylld
* Ett felmeddelande visas när fetch får ett error
* Testa funktionerna in `api/index.js`
  * `loadRates()` ska returnera json när anropad med korrekt url
  * `loadRates()` ska kasta eller returna error när anropad utan url
  * `mapObjectToArray()` ska konvertera object till array
  * `mapObjectToArray()` ska faila när den anropas med något som inte är ett object
  * Kommer du på andra scenarion, skriv gärna tester för dem också

## Uppgift 2

Just nu returneras växelkursen med basen **EUR**. Du kan också välja att istället anropa med basen **SEK**

Du kan ändra detta genom att skicka props till `<App />`

```jsx
//index.js
ReactDOM.render(<App base="SEK" />, document.getElementById('root'));
```

Ändra på props så att applikationen fetchar med SEK som base. Skriv tester som kontrollerar att rätt data hämtas och skrivs ut korrekt i DOMen. 

## Övning 3

Det finns ett inmatningsfält som filtrerar ut vilka valutor som visas i listan. Skriv tester som dubbelkollar att inmatningsfältet fungerar. Testa följande:

* Statets search-fält blir uppdaterat på onChange på inmatningsfältet
* Kolla att listans nya längd stämmer
* Kolla att en korrekt filtrering görs
