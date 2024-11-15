import { Routes as Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* Rest of the routes bellow: */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Switch>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
