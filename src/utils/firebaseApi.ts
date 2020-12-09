import firebase from 'firebase'
import { toast } from './toast'

import { config } from './firebaseConfig'

firebase.initializeApp(config)
firebase.analytics()

export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                resolve(user)
            } else {
                resolve(null)
            }
            unsubscribe()
        })
    })
}

export function logoutUser() {
    firebase.auth().signOut().then(function() {
        console.log('signout success')
    }).catch(function(error) {
        console.log('signout error')
    })
}

export async function loginUser(email: string, password: string) {
    try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log('logging in', user)
        return user
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function registerUser(email: string, password: string) {
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.log('registering', res)
        return true
    } catch (error) {
        toast(error.message)
        return false
    }
}

export async function saveConfigToFirebase(config: any) {
    
}