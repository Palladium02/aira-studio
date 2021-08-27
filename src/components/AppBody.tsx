import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import { Home, Grid, Plus, Gear, SignOut } from 'akar-icons';
import { MouseEvent } from 'react';
import Dashboard from '../pages/Dashboard/Dashboard';
import AddTable from '../pages/AddTable/AddTable';
import Settings from '../pages/Settings/Settings';
import './AppBody.css';

const AppBody = (): JSX.Element => {
  const logout = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await fetch('/auth/logout');
    window.location.reload();
  };

  return (
    <div className="app-body">
      <Router>
        <div className="app-sidebar">
          <NavLink to="/" activeClassName="sidebar-item-active" exact>
            <div className="sidebar-item">
              <Home />
            </div>
          </NavLink>
          <NavLink
            to="/tableOverview"
            activeClassName="sidebar-item-active"
            exact
          >
            <div className="sidebar-item">
              <Grid />
            </div>
          </NavLink>
          <NavLink to="/addTable" activeClassName="sidebar-item-active" exact>
            <div className="sidebar-item">
              <Plus />
            </div>
          </NavLink>
          <NavLink to="/settings" activeClassName="sidebar-item-active" exact>
            <div className="sidebar-item">
              <Gear />
            </div>
          </NavLink>
          <a href="/auth/logout" onClick={logout}>
            <div className="sidebar-item">
              <SignOut />
            </div>
          </a>
        </div>
        <div className="app-pages">
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/addTable" exact>
              <AddTable />
            </Route>
            <Route path="/settings" exact>
              <Settings />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default AppBody;
