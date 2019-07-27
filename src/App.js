import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import MainPage from './pages/Main/MainPage';
import { Route, Router, Switch } from 'react-router';
import DetailPage from './pages/Detail/DetailPage';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/hero-detail/:heroId" component={DetailPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
