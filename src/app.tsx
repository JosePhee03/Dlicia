import { Router, Route, } from "preact-router"
import { Home } from "./page/Home";
import AsyncRoute from "preact-async-route";

export function App() {
  return (
    <Router>
      <Route component={Home} path="/" />
      <AsyncRoute
        path="/:codebar"
        getComponent={() => import('./page/Codebar').then(module => module.Codebar)}
        loading={() => <h1 class="text-gray-800 dark:text-white">Loading...</h1>}
      />
    </Router>
  );
}
