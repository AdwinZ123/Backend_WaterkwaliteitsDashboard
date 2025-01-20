import Keycloak from 'keycloak-js'

// https://keycloak-boeien.agreeablegrass-17468147.westeurope.azurecontainerapps.io/auth/realms/Malik's Realm/
const keycloak = new Keycloak({
  url: 'https://aaad01.avans.nl:8000', // 'http://localhost:8080', // Replace with your Keycloak URL
  realm: 'Boei1', // 'realm', // Replace with your realm name
  clientId: 'ClientBoei1', // 'vue-frontend', // Replace with your client ID
})
export default keycloak
