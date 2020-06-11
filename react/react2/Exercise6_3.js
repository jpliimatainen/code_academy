/* 
 * Webkäyttöliittymäkirjastot
 * 6. Routing, SPA (Tehtävät 29-34)
 * 
 * Juha-Pekka Liimatainen 18.11.2019
*/

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Cars from './Cars';
import Customers from './Customers';
import LoginPage from './LoginPage';
import './index.css';
import './custom4.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      customers : [],
    };
  }

  componentDidMount() {
    // fetch customers from server
    this.fetchCustomers();
  }

  fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3003/customers');

      if (response.status !== 404) {
        const data = await response.json();
        this.setState({
          customers: data,
        });
      }
    }
    catch (error) {
      console.error('Error: ', error);
    }
  }

  handleRegister = (name, pid) => {
    this.setState({
      user: { name: name, pid: pid },
    });
  }

  render() {
    return (
      <Router>
        <div id="navigation">
          <NavLink to="/">Koti</NavLink>
          <NavLink to="/asiakkaat">Asiakkaat</NavLink>
          <NavLink to="/autot">Autot</NavLink>
        </div>

        <AuthButton user={this.state.user} />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/asiakkaat">
            <Customers data={this.state.customers} />
          </Route>
          <PrivateRoute path="/autot" user={this.state.user}>
            <Cars />
          </PrivateRoute>
          <Route path="/login">
            <LoginPage handleRegister={this.handleRegister} />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const AuthButton = (props) => {
  const user = props.user;

  return user !== null ?
    (
      <div>
        <p>Nimi: {user.name}, Henkilönumero: {user.pid}</p>
      </div>
    ) :
    (
      <p>Et ole rekisteröitynyt.</p>
    );
}

const Home = () => {
  return (
    <div>
      <h2>Savonia AMK</h2>
      <p>Microkatu 1<br />70210 Kuopio</p>
      <DateInfo date={new Date()} />
    </div>
  );
}

const DateInfo = (props) => {
  const dateStr = props.date.getDate() + '.' + (props.date.getMonth() + 1)
    + '.' + props.date.getFullYear();
  const hour = props.date.getHours();

  return <div><p>Tänään on {dateStr} {hour > 5 && hour < 15 ? "(aamupäivä)" : "(iltapäivä)"}</p></div>;
}

const PrivateRoute = ({ children, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user !== null ? (
          children
        ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          )
      }
    />
  );
}

const NoMatch = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      <h3>Yritit navigoida sivulle <code>{location.pathname}</code></h3>
      <button onClick={() => { history.push("/") }}>Koti</button>
    </div>
  );
}
