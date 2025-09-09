# Beredskap360 Master

En master-applikasjon som fungerer som cockpit for øvelsesansvarlige i Beredskap360-systemet.

## Funksjoner

- **Entra ID Autentisering**: Sikker pålogging med Microsoft Entra ID
- **Dashboard**: Oversikt over aktive øvelser, deltakere og hendelser
- **Hendelsesadministrasjon**: Mulighet til å iverksette nye hendelser
- **Moderne UI**: Material-UI basert grensesnitt

## Installasjon

1. Installer avhengigheter:
```bash
npm install
```

2. Konfigurer Entra ID:
   - Oppdater `src/config/authConfig.ts` med din faktiske Client ID
   - Registrer applikasjonen i Azure Portal med redirect URI

3. Start utviklingsserveren:
```bash
npm run dev
```

## Konfigurasjon

### Entra ID Setup

1. Gå til Azure Portal
2. Naviger til "Azure Active Directory" > "App registrations"
3. Klikk "New registration"
4. Fyll inn:
   - Name: Beredskap360 Master
   - Supported account types: Accounts in this organizational directory only
   - Redirect URI: http://localhost:3000 (for utvikling)
5. Noter ned "Application (client) ID"
6. Oppdater `clientId` i `src/config/authConfig.ts`

### Dataverse Integration

For å koble til Dataverse, legg til følgende i `src/config/authConfig.ts`:

```typescript
export const dataverseConfig = {
  environmentUrl: 'https://your-org.crm.dynamics.com',
  apiVersion: '9.2'
};
```

## Utvikling

- `npm run dev` - Start utviklingsserver
- `npm run build` - Bygg for produksjon
- `npm run preview` - Forhåndsvis produksjonsbygget

## Arkitektur

- **React 18** med TypeScript
- **Vite** som build tool
- **Material-UI** for komponenter
- **MSAL** for autentisering
- **Dataverse SDK** for dataoperasjoner (kommende)

## Neste steg

- [ ] Implementere Dataverse CRUD operasjoner
- [ ] Legge til hendelsesadministrasjon
- [ ] Implementere notifikasjoner
- [ ] Legge til rapportering
- [ ] Mobile responsivitet
