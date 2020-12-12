import React, { createContext } from 'react'
import { config } from './firebaseConfig'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { toast } from './toast'

const FirebaseContext = createContext<ContextType | undefined>(undefined)

const FirebaseProvider: React.FC = ({children}) => {
    let firebase: ContextType 
    app.initializeApp(config)
    firebase = {
      app: app,
      database: app.database(),
      api: {
        logoutUser,
        loginUser,
        getCurrentUser,
        registerUser
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

    return (
      <FirebaseContext.Provider value={firebase}>
        {children}
      </FirebaseContext.Provider>
    )
}

export { FirebaseContext, FirebaseProvider }