import React from 'react'
import { Switch, Route } from "react-router-dom";
import './App.css'

import Home from './components/page/Home';
import Detail from './components/page/Detail';

const App = () => (
    <div className='App'>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/people/:id" component={Detail} />
        </Switch>
    </div>
)
export default App
