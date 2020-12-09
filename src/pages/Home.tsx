import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Home.css';

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
          <IonGrid class="ion-padding">
            <IonRow>
              <IonCol className="cell1"></IonCol>
              <IonCol className="cell2"></IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="cell3"></IonCol>
              <IonCol className="cell4"></IonCol>
            </IonRow>
          </IonGrid>
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
