import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Avizier: React.FC = (isMember) => {
  isMember = false;
  switch (isMember) {
    case true:
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Home</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <IonCard>
              <IonCardTitle>Bun venit Radu</IonCardTitle>
              <IonCardContent>
                <div>Esti nembru in filiala Craiova</div>
                <div>Situatia cotizatiei: Achitat la zi</div>
                <IonButton expand="full">
                  Plateste cotizatia cu cardul
                </IonButton>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardTitle>Avizier Central</IonCardTitle>
              <IonCardContent>
                <div>🔴Reprezentarea femeilor in politica</div>
                <div>🔴Pozitia SDB legata de deficitul bugetar</div>
                <div>🟣Hai la teambuilding</div>
                <IonButton expand="full">Vezi toate mesajele</IonButton>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardTitle>Avizier Judetean</IonCardTitle>
              <IonCardContent>
                <div>🟣Convocare sedinta Birou Judetean</div>
                <div>🔴Top 5 proiecte SDB in Dolj</div>
                <div>🔴Conferinta "Dolj la puterea 100"</div>
                <IonButton expand="full">Vezi toate mesajele</IonButton>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardTitle>Avizier Local</IonCardTitle>
              <IonCardContent>
                <div>🟣Actiune "Vrem pietonala"</div>
                <div>🔴Pozitia SDB legata de festivalul Intencity</div>
                <div>🔴Hai sa ne cunosti - SDB Open Day</div>
                <IonButton expand="full">Vezi toate mesajele</IonButton>
              </IonCardContent>
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
              <IonTitle>Home</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <IonCard>
              <IonCardTitle>Bun venit Radu</IonCardTitle>
              <IonCardContent>
                <div>Esti nembru in filiala Craiova</div>
                <div>Situatia cotizatiei: Achitat la zi</div>
                <IonButton routerLink="/plata" expand="full">
                  Doneaza SDB
                </IonButton>
                <IonButton routerLink="/adeziune" expand="full">
                  Alatura-te SDB
                </IonButton>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardTitle>Avizier Central</IonCardTitle>
              <IonCardContent>
                <div>🔴Reprezentarea femeilor in politica</div>
                <div>🔴Pozitia SDB legata de deficitul bugetar</div>
                <IonButton expand="full">Vezi toate mesajele</IonButton>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardTitle>Avizier Judetean</IonCardTitle>
              <IonCardContent>
                <div>🔴Top 5 proiecte SDB in Dolj</div>
                <div>🔴Conferinta "Dolj la puterea 100"</div>
                <IonButton expand="full">Vezi toate mesajele</IonButton>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardTitle>Avizier Local</IonCardTitle>
              <IonCardContent>
                <div>🔴Pozitia SDB legata de festivalul Intencity</div>
                <div>🔴Hai sa ne cunosti - SDB Open Day</div>
                <IonButton expand="full">Vezi toate mesajele</IonButton>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      );
  }
};

export default Avizier;
