import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import Calculate from './Calculate';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/calculate' component={Calculate} />
        <Route path='*' component={ () => 'Error 404: Page not found.'} />
      </Switch>
    </div>
  );
}

export default App;
