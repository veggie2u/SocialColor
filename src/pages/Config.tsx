import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { saveConfigToFirebase } from '../firebaseApi'
import { toast } from '../utils/toast'
import { setConfigState } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Config: React.FC = () => {
  
  const userName = useSelector((state: any) => state.config.name)
  const [name, setName] = useState<string>(userName)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const history = useHistory()

  // setName(userName)

  async function saveConfig() {
    setLoading(true)
    // const res: any = await saveConfigToFirebase({ name: name })
    setLoading(false)
    // if (res) {
    dispatch(setConfigState({ name: name }))
    toast('Got it!')
    goBack()
    // } else {
    // toast('Oopsy Daisy!')
    // }
  }

  function goBack() {
      history.goBack()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Config</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading message="Hang on!" duration={0} isOpen={loading} />
        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput value={name} onIonChange={(e: any) => setName(e.target.value)} />
        </IonItem>
        <IonButton className="ion-margin-top" type="submit" onClick={saveConfig}>Save</IonButton>
        <IonButton className="ion-margin-top" color="secondary" onClick={goBack}>Cancel</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Config;
