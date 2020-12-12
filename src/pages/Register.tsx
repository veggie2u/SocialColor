import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from '../utils/toast';
import './Home.css';
import { FirebaseContext } from '../utils/firebase';

const Register: React.FC = () => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { api } = useContext(FirebaseContext) as ContextType
  
  async function register() {
    if (password !== confirmPassword) {
      return toast('Passwords do not match')
    }
    if (email.trim() === '' || password.trim() === '') {
      return toast('Email and password are required')
    }

    setLoading(true)
    const res = await api.registerUser(email, password)
    setLoading(false)
    if (res) {
      toast("You are now registered", 3000)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent  className="ion-padding">
        <IonLoading message="Hang on!" duration={0} isOpen={loading} />
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput onIonChange={(e: any) => setEmail(e.target.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" onIonChange={(e: any) => setPassword(e.target.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirm password</IonLabel>
          <IonInput type="password" onIonChange={(e: any) => setConfirmPassword(e.target.value)} />
        </IonItem>
        <IonButton className="ion-margin-top" type="submit" expand="block" onClick={register}>Register</IonButton>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
