import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonTitle, IonToggle, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './ColorPage.css';
import { logoutUser } from '../utils/firebaseApi'
import { useHistory } from 'react-router'
import { logOutOutline, settingsOutline } from 'ionicons/icons'
import { ColorResult, TwitterPicker } from 'react-color';
import { setColorAction } from '../redux/actions';
import { useDispatch } from 'react-redux';

const ColorPage: React.FC = () => {
  const userEmail = useSelector((state: any) => state.user.email)
  const userName = useSelector((state: any) => state.config.name)
  const color = useSelector((state: any) => state.data.color)

  const history = useHistory()
  const dispatch = useDispatch()

  const [loggingOut, setLoggingOut] = useState(false)
  const [isOn, setIsOn] = useState(true)
  // const [color, setColor] = useState('green')

  function logout() {
    setLoggingOut(true)
    logoutUser()
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
    // setColor(color.hex)
    dispatch(setColorAction({ color: color.hex, user: userName ? userName : userEmail }))
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
          </IonGrid>
        <p>Hello {userName ? userName : userEmail}</p>
        <IonItem>
          <IonLabel>Social Color is {isOn ? 'On' : 'Off'}</IonLabel>
          <IonToggle checked={isOn} onIonChange={(e) => turnOnOff(e.detail.checked)} />
        </IonItem>
        <TwitterPicker
          color={color}
          onChangeComplete={changeColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default ColorPage
