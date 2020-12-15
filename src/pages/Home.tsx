import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Home.css';
import icon from '../images/colorsplash_transparent.png';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Social Color</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <strong>Welcome to Social Color</strong>
          <div className="imgCenter">
            <img src={icon} alt="Color Splash"/>
          </div>
          <p>
            <IonButton size="large" routerLink="/login">Login</IonButton>
            <IonButton size="large" color="secondary" routerLink="/register">Register</IonButton>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
