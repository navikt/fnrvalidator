fnrvalidator
================

Validering for fødselsnummer og D-nummer

# Komme i gang

### Installasjon
```
npm i fnrvalidator
```

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

Spørsmål knyttet til koden eller prosjektet kan rettes mot:

* Navn på Person, navn.person@nav.no

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #minkanal.
