
# Hackaton / Trondheim

Vi har benyttet av oss rammeverket: Playwright, for å automatisere: ```https://hackatonwebapp.azurewebsites.net/```
Playwright er et node.js bibliotek hvor man kan interakte med page-elements ved å skrive JS/TS-kode.

### Bibliotek

| Navn | Beskrivelse |
| ---  | ---     |
| Lucxon | A powerful, modern, and friendly wrapper for JavaScript dates and times |

### Kjør opp testene

Klon repositoriet vårt:

```https://github.com/acordazz/https://github.com/acordazz/hackathon-automation-2022.git.git```

Naviger inn til prosjektet: ```hackathon-automation-2022```.

Installer Playwright i path'en:
```npm i -D @playwright/test```

Installer Luxon:
```npm i luxon```

Kjør Playwright testene:
```npx playwright test --project='chromium'```