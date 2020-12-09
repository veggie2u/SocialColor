import React from 'react';
import { IonAvatar, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/react';

const items = [
  {
    name: 'Finn',
    desc: 'This guy rocs'
  },
  {
    name: 'Han',
    desc: 'Trust me.',
  },
  {
    name: 'Rey',
    desc: 'I am done with it'
  }
]

const ListSlideExample: React.FC = () => {

  return (
    <IonList>
      {items.map((elem, i) => (
        
        <IonItemSliding key={i}>
          <IonItem>
          <IonAvatar>
            <img src={`https://ionicframework.com/docs/demos/api/list/avatar-${elem.name.toLocaleLowerCase()}.png`} alt={elem.name}/>
          </IonAvatar>
          <IonLabel className="ion-padding">
            <h2>{elem.name}</h2>
            <h3>{elem.desc}</h3>
          </IonLabel>
          </IonItem>
          <IonItemOptions side="end">
            <IonItemOption onClick={() => alert('delete')}>Delete</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </IonList>
  );
};

export default ListSlideExample;
