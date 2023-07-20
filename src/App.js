import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./Routes";
import { UserContext } from "./UserContext";

function App() {
  const routing = useRoutes(routes);

  return (
    <>
      <UserContext>{routing}</UserContext>
    </>
  );
}
//    https://api.campuskart.co
export default App;
