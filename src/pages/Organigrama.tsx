import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Organigrama: React.FC = (context) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Birou National</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="https://usr.ro/wp-content/uploads/2017/04/Catalin-Drula.jpg"
          />
          <IonCardHeader>
            <IonCardTitle>Catalin Drula</IonCardTitle>
            <IonCardSubtitle>Presedinte</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardTitle className="ion-padding">Vicepresedinti</IonCardTitle>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonThumbnail slot="start">
                  <img
                    alt="Silhouette of mountains"
                    src="https://usr.ro/wp-content/uploads/2017/04/Sibiu_Dan-Barna.jpg"
                  />
                </IonThumbnail>
                <IonLabel>Dan Barna</IonLabel>
              </IonItem>
              <IonItem>
                <IonThumbnail slot="start">
                  <img
                    alt="Silhouette of mountains"
                    src="https://usr.ro/wp-content/uploads/2017/04/9__Cristian-Ghinea.png"
                  />
                </IonThumbnail>
                <IonLabel>Cristian Ghinea</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Membrii Biroului National</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              <IonItem>Ion frizeru</IonItem>
              <IonItem>Un smecher</IonItem>
              <IonItem>Un hardicapat</IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Organigrama;
