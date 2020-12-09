import React from 'react';
import { IonItem, IonList, IonText } from '@ionic/react';

const ListExample: React.FC = () => {
  const items = Array(10).fill(0);
  return (
    <IonList>
      {items.map((_, i) => (
        <IonItem key={i}>
          <IonText>List Item {i}</IonText>
        </IonItem>
      ))}
    </IonList>
  );
};

export default ListExample;
