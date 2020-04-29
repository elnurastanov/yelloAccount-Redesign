import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Switch, Route, useHistory } from "react-router-dom"
import { Spin } from 'antd'
import Authenticated from './hooks/auth'


const Register = React.lazy(() => import('./views/pages/register'))
const Login = React.lazy(() => import('./views/pages/login'))
const Main = React.lazy(() => import('./views/pages/main'))
const notAuthorized = React.lazy(() => import('./views/pages/403'))
const notFound = React.lazy(() => import('./views/pages/404'))
const serverError = React.lazy(() => import('./views/pages/500'))

function App() {

  const history = useHistory()
  const auth = Authenticated()

  useEffect(() => {

    if (!auth) {
      history.replace('/Login')
    }

  }, [auth, history])

  return (
    <div className="App">
      <Suspense fallback={<Spin style={{ marginLeft: '50%', marginTop: '25%' }} size="large" />}>
        <Switch>
          <Route exact path='/Register' component={Register} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/403' component={notAuthorized} />
          <Route exact path='/404' component={notFound} />
          <Route exact path='/500' component={serverError} />
          <Route path='/' component={Main} />
          
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;