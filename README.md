fnrvalidator
================

[![Build Status](https://travis-ci.com/navikt/fnrvalidator.svg?branch=master)](https://travis-ci.com/navikt/fnrvalidator)

Validering for fødselsnummer og D-nummer. Alle fødselsnumre som forekommer her er autogenererte.

# Komme i gang

### Installasjon
Publiseres plutselig på npmjs.com, inntil da kan man bruke `npm link`

### Bruk
```
const validator = require('fnrvalidator')
const result = validator.fnr('12345678910')
const result = validator.dnr('52345678910')
```

### Resultat
```
{
   status: "valid"
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

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #område-helse.
