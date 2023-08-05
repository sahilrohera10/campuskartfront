import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import { UserContext } from "./UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import configData from './config.json'
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'

function App() {
  const routing = useRoutes(routes);

  return (
    <>
    <Provider config={configData.rollbarConfig}>
      <ErrorBoundary>
      <UserContext>
        <GoogleOAuthProvider clientId={configData.GOOGLE_CLIENT_ID}>
          {routing}
        </GoogleOAuthProvider>
      </UserContext>
      </ErrorBoundary>
    </Provider>
    </>
  );
}
//    https://api.campuskart.co
export default App;
