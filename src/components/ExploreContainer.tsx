import { IonButton } from '@ionic/react';
import React from 'react';
import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <strong>Welcome to Social Color</strong>
      <p><IonButton size="large" routerLink="/login">Login</IonButton><IonButton size="large" color="secondary" routerLink="/register">Register</IonButton></p>
    </div>
  );
};

export default ExploreContainer;
