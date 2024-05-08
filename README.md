fnrvalidator
================


![](https://github.com/navikt/fnrvalidator/workflows/master/badge.svg)
[![npm version](https://badge.fury.io/js/%40navikt%2Ffnrvalidator.svg)](https://badge.fury.io/js/%40navikt%2Ffnrvalidator)

Validering for fødselsnummer, D-nummer, H-nummer og nummer generert av Test Norge (T-nummer). Alle fødselsnumre som forekommer her er autogenererte.

# Komme i gang

### Installasjon
```
npm install @navikt/fnrvalidator
```

### Bruk
```
import { fnr, dnr, hnr, tnr, dnrAndHnr } from '@navikt/fnrvalidator'
```

```
const fnr = fnr('12345678910')
const dnr = dnr('52345678910')
const hnr = hnr('13527248013')
const tnr = tnr('10915596784')
const dnrAndHnr = validator.dnrAndHnr('68467038838')
// eller
const validationResult = idnr('12345678910')
const validationResult = idnr('52345678910')
const validationResult = idnr('13527248013')
const validationResult = idnr('10915596784')
const validationResult = idnr('68467038838')
```

### Resultat
```
{
   status: "valid"
   type: "fnr" || "dnr" || "hnr" || "tnr" || "dnrAndHnr"
}
```

eller 

```
{
   status: "invalid",
   reasons: ["some reason", "another reason"]
}
```

---


### Bygg og publisering
For å publisere en ny npm-pakke, lag en [release](https://github.com/navikt/fnrvalidator/releases) her på GitHub. En workflow vil plukke opp den nye releasen og publisere. Versjonen på pakken blir den samme som i `package.json`, så husk å oppdatere der først.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub. 
