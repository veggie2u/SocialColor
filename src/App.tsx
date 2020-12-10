import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ColorPage from './pages/ColorPage';
import Login from './pages/Login';
import Register from './pages/Register'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { getCurrentUser } from './utils/firebaseApi';
import { useDispatch } from 'react-redux';
import { setUserAction } from './redux/actions';
import Config from './pages/Config';

const Routing: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route path="/colorPage" component={ColorPage} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/config" component={Config} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser().then((user: any) => {
      if (user) {
        dispatch(setUserAction(user))    
        window.history.replaceState({}, '', '/colorPage')
      } else {
        dispatch(setUserAction({}))
        window.history.replaceState({}, '', '/')
      }
      setLoading(false)
    })
  })
  
  return (
    <IonApp>
      {loading ? <IonSpinner /> : <Routing /> }
    </IonApp>
  );
}

export default App;
