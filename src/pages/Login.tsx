import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Home.css';
import { toast } from '../utils/toast'
import { setUserAction } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { FirebaseContext } from '../utils/firebase';

const Login: React.FC = () => {
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const { api } = useContext(FirebaseContext) as ContextType
  async function login() {
    setLoading(true)
    const res: any = await api.loginUser(email, password)
    setLoading(false)
    if (res) {
      dispatch(setUserAction(res.user))
      history.replace('/colorPage')
      toast('Succesfully logged in')
    } else {
      toast('User/Password not found')
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading message="Hang on!" duration={0} isOpen={loading} />
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput onIonChange={(e: any) => setEmail(e.target.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" onIonChange={(e: any) => setPassword(e.target.value)} />
        </IonItem>
        <IonButton className="ion-margin-top" type="submit" expand="block" onClick={login}>Login</IonButton>
        <p>Need an account? <Link to="/register">Register</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
