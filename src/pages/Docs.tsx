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
import { AppLauncher } from "@capacitor/app-launcher";

const Docs: React.FC<{ isMember: boolean }> = ({ isMember }) => {
  const openStatut = async () => {
    const { value } = await AppLauncher.canOpenUrl({
      url: "https://firebasestorage.googleapis.com/v0/b/e-sdb-739c9.appspot.com/o/statut.pdf?alt=media&token=d192538a-462e-4724-afb2-83e8a6b5a7ea",
    });

    value === false ? console.log("Can open url: ", value) : null;
    if (value === true) {
      await AppLauncher.openUrl({
        url: "https://firebasestorage.googleapis.com/v0/b/e-sdb-739c9.appspot.com/o/statut.pdf?alt=media&token=d192538a-462e-4724-afb2-83e8a6b5a7ea",
      });
    }
  };

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
                <IonButton onClick={openStatut}>Citeste aici</IonButton>
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
                <IonButton onClick={openStatut}>Citeste aici</IonButton>
              </IonCardHeader>
            </IonCard>
          </IonContent>
        </IonPage>
      );
      break;
  }
};

export default Docs;
