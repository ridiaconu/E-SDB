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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonRow,
  IonCol,
} from "@ionic/react";

const Docs = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Docs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">
              Organigrama SDB
            </IonCardTitle>
            <IonRow className="ion-align-items-stretch">
              <IonCol className="ion-text-center">
                <IonButton>Local</IonButton>
              </IonCol>
              <IonCol className="ion-text-center">
                <IonButton>Judetean</IonButton>
              </IonCol>
              <IonCol className="ion-text-center">
                <IonButton>Central</IonButton>
              </IonCol>
            </IonRow>
          </IonCardHeader>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">Statut SDB</IonCardTitle>
            <IonButton>Citeste aici</IonButton>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Docs;
