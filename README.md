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
const validator = require('@navikt/fnrvalidator')
const fnr = validator.fnr('12345678910')
const dnr = validator.dnr('52345678910')
const hnr = validator.hnr('13527248013')
const tnr = validator.tnr('10915596784')
const dnrAndHnr = validator.dnrAndHnr('68467038838')
// eller
const validationResult = validator.idnr('12345678910')
const validationResult = validator.idnr('52345678910')
const validationResult = validator.idnr('13527248013')
const validationResult = validator.idnr('10915596784')
const validationResult = validator.idnr('68467038838')
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
```npm run build && npm publish```

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.
