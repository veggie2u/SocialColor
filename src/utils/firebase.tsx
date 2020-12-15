import React, { createContext } from 'react'
import { useDispatch } from 'react-redux';
import { config } from './firebaseConfig'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { toast } from './toast'
import { setColorsAction } from '../redux/actions';

const FirebaseContext = createContext<ContextType | undefined>(undefined)

const FirebaseProvider: React.FC = ({children}) => {
  const dispatch = useDispatch()
  let firebase: ContextType 
  app.initializeApp(config)
  firebase = {
    app: app,
    database: app.database(),
    api: {
      logoutUser,
      loginUser,
      getCurrentUser,
      registerUser,
      getColors,
      setCurrentColor,
    }
  }

  function getCurrentUser() : Promise<firebase.default.User | null> {
    return new Promise((resolve, reject) => {
      const unsubscribe = app.auth().onAuthStateChanged(function(user) {
        if (user) {
            resolve(user)
        } else {
            resolve(null)
        }
        unsubscribe()
      })
    })
  }
  
  function logoutUser() {
    app.auth().signOut().then(function() {
    }).catch(function(error) {
    })
  }
  
  async function loginUser(email: string, password: string): Promise<firebase.default.auth.UserCredential | null> {
    try {
      const user = await app.auth().signInWithEmailAndPassword(email, password)
      return user
    } catch (error) {
      return null
    }
  }
  
  async function registerUser(email: string, password: string): Promise<firebase.default.auth.UserCredential | null> {
    try {
      const res = await app.auth().createUserWithEmailAndPassword(email, password)
      return res
    } catch (error) {
      toast(error.message)
      return null
    }
  }

  function getColors() {
    app.database().ref('colors').orderByChild('timestamp').limitToLast(5).on('value', (snapshot) => {
      const vals = snapshot.val()
      console.log('vals', vals)
      let colors = [];
      for(var key in vals) {
        colors.unshift({
          ...vals[key],
          id: key
        })
      }
      console.log('colors ecords', colors)
      dispatch(setColorsAction({colors}))
    })
  }

  function setCurrentColor(color: string, userUid: string) {
    const data: IColor = {
      color: color,
      user: userUid,
      timestamp: Date.now()
    }
    app.database().ref('colors').push(data)
    .then((response) => {
      console.log('response', response)
    })
    .catch((error) => {
      console.log('error')
    })
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}

export { FirebaseContext, FirebaseProvider }
