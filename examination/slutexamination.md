# Examination
> Enhetstesta samt integrationstesta en JavaScript-applikation
> 
> **Individuellt eller i par**
> Individuell inlämning krävs för VG
> 
> **Betygsnivå: IG/G/VG**

## Mål

Målet med examinationen är främst att skriva **enhetstester samt integrationstester** samt lära oss vilka delar av en applikation som är värda att testa och vilka test som tillför stabilitet och värde till en frontend-applikation.

## Krav

### G

* Enhetstestar och integrationstestar en valfri applikation med valfritt _MV*-ramverk_ samt visar förståelse över hur detta _MV*-ramverk_ fungerar. 
* Utför enhetstester och integrationstester med valfritt test-ramverk. Det som vi går igenom i kursen är i huvudsak **Jest**, men andra test-ramverk får även användas.
* Utför enhetstester och integrationstester så att den totala kodtäckningen är **över 50%**. Kodtäckningen säkrar inte att du har skrivit väldefinierade tester men ger en fingervisning om hur mycket som måste testas.
* Enhetstestar och integrationstestar den viktigaste interaktionen i applikationen. Detta varierar från applikation till applikation men som exempel: om du t.ex. har en kommenteringsfunktion på din sida vill du säkertställa att kommenteringsfunktionen klarar av att kommentera samt vad som händer om vi skickar med felaktiga värden till kommentarsfunktionen.
* Projektet ska versionshanteras och laddas upp via GitHub eller liknande tjänst. Om ni jobbar i par så ska man tydligt kunna se att båda personerna har bidragit i lika stor grad att skriva testerna.

### VG

* Självständigt genomföra **väldefinierade** enhetstester.
* Kan utan handledning köra tester med lyckade resultat.
* Kunna avgöra när ett test är tillförlitligt och nå tillräckligt hög testtäckning för detta.
* Har en kodtäckning på **80-100%**.
* Utför på egen hand ett eller flera E2E-tester.
* Projektet ska köra testerna via en **CI-server** som automatiskt kollar om testerna går igenom (_Travis_, _Jenkins_, _CircleCI_, _GitLab CI_). Testerna ska alltså inte enbart gå igenom på din egen dator.

## Presentation

Demonstration av applikation och **tester** inför mig sista lektionstillfället. 

I demonstrationen ska du/ni presentera applikationen som ni har testat först men sedan ska du/ni lägga fokusen på att presentera de olika tester som ni har skapat. Välj ut en några tester som ni tycker har tillfört mest till applikationen och motivera varför du/ni har skrivit de testerna.

## Inlämning

* **Lämnas in via studentportalen**
* **Lämnas in som `.zip` utan `node_modules`**