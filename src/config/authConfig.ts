import { Configuration, PopupRequest } from '@azure/msal-browser';

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: 'a4e4e9cf-a961-4a49-9262-ef8d7ab3cb6b',
    authority: 'https://login.microsoftonline.com/647bb407-d412-4d48-b7bf-367c871cfca6',
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest: PopupRequest = {
  scopes: ['User.Read', 'https://beredskap360utv.api.crm4.dynamics.com/user_impersonation'],
};

// Dataverse configuration
export const dataverseConfig = {
  environmentUrl: 'https://beredskap360utv.api.crm4.dynamics.com',
  apiVersion: '9.2',
  environmentId: 'd17c0905-0627-e2c7-991f-02c12daadd44',
  organizationId: '2061523f-6d02-f011-b015-0022489e5943',
  discoveryEndpoint: 'https://globaldisco.crm4.dynamics.com/api/discovery/v2.0/Instances'
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
