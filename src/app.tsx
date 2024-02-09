import { Router, Route } from "preact-router"
import { Home } from "./page/Home";
import { Codebar } from "./page/Codebar";

export function App() {
  return (
    <Router>
      <Route component={Home} path="/" />
      <Route component={Codebar} path="/:codebar" />
    </Router>
  );
}
