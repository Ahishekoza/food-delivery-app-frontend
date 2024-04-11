/* eslint-disable react/prop-types */
import { Auth0Provider  } from "@auth0/auth0-react";
import {useNavigate} from 'react-router-dom'


const Auth0ProviderWithNavigate = ({children}) => {

  const domain = String(import.meta.env.VITE_DOMAIN_ID)
  const clientId = import.meta.env.VITE_CLIENT_ID
  const redirectUrl = import.meta.env.VITE_CALLBACK_URL
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE

  const navigate = useNavigate()

  if (!domain || !clientId || !redirectUrl ) {
    throw new Error("unable to initialise auth");
  }

  // onRedirectCallback() is a custom event to handle behaviours occurring after the login page takes you back to the app.
  // we have created a page where once login is done and user gets saved in the database
  
  const onRedirectCallback = (appState) => {
    navigate(appState && appState.returnTo ? appState.returnTo : "/auth-callback");
  };

  return (
    <Auth0Provider 
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: redirectUrl,
      audience:audience

    }}
    onRedirectCallback={onRedirectCallback}
    >{children}</Auth0Provider>
  )
}

export default Auth0ProviderWithNavigate
