import React from 'react';
import { IonButton, IonIcon, IonItem, IonList, IonText } from '@ionic/react';
import { star } from 'ionicons/icons';

const StarButton: React.FC = () => {
  return (
    <IonButton expand="full" color="primary">
      <IonIcon slot="start" icon={star}></IonIcon>
      Hello
    </IonButton>
  );
};

export default StarButton;
