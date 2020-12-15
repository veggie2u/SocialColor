import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonTitle, IonToggle, IonToolbar } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './ColorPage.css';
import { useHistory } from 'react-router'
import { logOutOutline, settingsOutline } from 'ionicons/icons'
import { ColorResult, SwatchesPicker } from 'react-color';
import { FirebaseContext } from '../utils/firebase';

const ColorPage: React.FC = () => {
  const userUid = useSelector((state: any) => state.user.uid)
  const userEmail = useSelector((state: any) => state.user.email)
  const userName = useSelector((state: any) => state.config.name)

  // pulls in the first color from the list (sorted in reverse)
  const color = useSelector((state: any) => state.colors[0].color)
  
  console.log('color', color)
  const history = useHistory()

  const [loggingOut, setLoggingOut] = useState(false)
  const [isOn, setIsOn] = useState(true)

  const { api } = useContext(FirebaseContext) as ContextType
  
  useEffect(() => {
    // asks firebase for a list of colors and listens for changes
    api.getColors()
  }, [api])
  
  function logout() {
    setLoggingOut(true)
    api.logoutUser()
    setLoggingOut(false)
    history.replace('/')
  }

  function turnOnOff(on: boolean) {
    setIsOn(on)
  }

  function goConfig() {
    history.push("/config")
  }

  function changeColor(color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) {
    // saves colors to firebase
    api.setCurrentColor(color.hex, userUid)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={goConfig}>
              <IonIcon slot="icon-only" icon={settingsOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Social Color</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading message="Kicking you out" duration={0} isOpen={loggingOut} />
        <IonGrid>
            <IonRow>
              <IonCol className="color" style={{backgroundColor: isOn ? color : 'black'}}></IonCol>
            </IonRow>
            <IonRow>
              <IonCol class="ion-text-center"><h3>Hello {userName ? userName : userEmail}</h3></IonCol>
            </IonRow>
          </IonGrid>
        <IonItem>
          <IonLabel>Social Color is {isOn ? 'On' : 'Off'}</IonLabel>
          <IonToggle checked={isOn} onIonChange={(e) => turnOnOff(e.detail.checked)} />
        </IonItem>
        <div className="swatch">
        <SwatchesPicker
          color={color}
          onChangeComplete={changeColor}
          height={565}
        />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ColorPage
