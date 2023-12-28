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

const Docs: React.FC<{ isMember: boolean }> = ({ isMember }) => {
  switch (isMember) {
    case true:
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
                    <IonButton routerLink="/organigrama/Local">Local</IonButton>
                  </IonCol>
                  <IonCol className="ion-text-center">
                    <IonButton routerLink="/organigrama/Judetean">
                      Judetean
                    </IonButton>
                  </IonCol>
                  <IonCol className="ion-text-center">
                    <IonButton routerLink="/organigrama/Central">
                      Central
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardHeader>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="ion-text-center">
                  Statut SDB
                </IonCardTitle>
                <IonButton>Citeste aici</IonButton>
              </IonCardHeader>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="ion-text-center">
                  Documente SDB
                </IonCardTitle>
                <IonRow className="ion-align-items-stretch">
                  <IonCol className="ion-text-center">
                    <IonButton routerLink="/organigrama/Local">Local</IonButton>
                  </IonCol>
                  <IonCol className="ion-text-center">
                    <IonButton routerLink="/organigrama/Judetean">
                      Judetean
                    </IonButton>
                  </IonCol>
                  <IonCol className="ion-text-center">
                    <IonButton routerLink="/organigrama/Central">
                      National
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardHeader>
            </IonCard>
          </IonContent>
        </IonPage>
      );
      break;

    case false:
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
                    <IonButton routerLink="/organigrama/Local">Local</IonButton>
                  </IonCol>
                  <IonCol className="ion-text-center">
                    <IonButton routerLink="/organigrama/Judetean">
                      Judetean
                    </IonButton>
                  </IonCol>
                  <IonCol className="ion-text-center">
                    <IonButton routerLink="/organigrama/Central">
                      National
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardHeader>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="ion-text-center">
                  Statut SDB
                </IonCardTitle>
                <IonButton>Citeste aici</IonButton>
              </IonCardHeader>
            </IonCard>
          </IonContent>
        </IonPage>
      );
      break;
  }
};

export default Docs;
