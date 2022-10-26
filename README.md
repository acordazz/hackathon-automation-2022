
# Hackaton / Trondheim

Vi har benyttet av oss rammeverket: Playwright, for å automatisere: ```https://hackatonwebapp.azurewebsites.net/```
Playwright er et node.js bibliotek hvor man kan interakte med page-elements ved å skrive JS/TS-kode.

### Bibliotek

| Navn | Beskrivelse |
| ---  | ---     |
| Luxon | A powerful, modern, and friendly wrapper for JavaScript dates and times |

### Kjør opp testene

Klon repositoriet vårt:

```https://github.com/acordazz/https://github.com/acordazz/hackathon-automation-2022.git```

Naviger inn til prosjektet: ```hackathon-automation-2022```.
Installer alle biblioteker (krever npm):
```npm install```

Kjør Playwright testene:
```npx playwright test```
```npx playwright test --project='chromium'``` - kun chromium browser