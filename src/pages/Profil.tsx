import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";

const Profil = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <div color="primary">
            <h1 className="ion-text-center">Radu Diaconu</h1>
          </div>
          <h2 className="ion-text-center ion-margin-top">Setari cont</h2>
          <IonButton className="ion-padding-top" expand="block">
            Schimba parola
          </IonButton>
          <IonButton
            routerLink="/docs"
            className="ion-padding-top"
            expand="block"
          >
            Grupuri tematice
          </IonButton>
          <IonButton className="ion-padding-top" expand="block">
            Logout
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profil;
