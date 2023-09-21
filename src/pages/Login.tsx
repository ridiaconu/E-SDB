import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { logoGoogle } from "ionicons/icons";

const Login: React.FC = () => {
  const doLogin = (event: any) => {
    event.preventDefault();
    console.log("doLogin");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>E-SDB</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <IonCard>
          <IonCardContent>
            <form onSubmit={doLogin}>
              <IonInput
                label="E-mail"
                type="email"
                labelPlacement="floating"
                fill="outline"
              />
              <IonInput
                label="Password"
                type="password"
                labelPlacement="floating"
                fill="outline"
                className="ion-margin-top"
              />
              <IonButton
                routerLink="/home/avizier"
                type="button"
                className="ion-margin-top"
                expand="full"
              >
                Login
              </IonButton>
              <IonButton
                routerLink="/profil"
                type="button"
                className="ion-margin-top"
                expand="full"
              >
                Login cu Google
                <IonIcon icon={logoGoogle} slot="star" />
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
