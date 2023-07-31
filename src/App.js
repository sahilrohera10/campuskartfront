import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import { UserContext } from "./UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import configData from './config.json'
function App() {
  const routing = useRoutes(routes);

  return (
    <>
      <UserContext>
        <GoogleOAuthProvider clientId={configData.GOOGLE_CLIENT_ID}>
          {routing}
        </GoogleOAuthProvider>
      </UserContext>
    </>
  );
}
//    https://api.campuskart.co
export default App;
