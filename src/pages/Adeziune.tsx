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
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";

const Adeziune = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Adeziune</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h1 className="ion-text-center">Hai alaturi de noi!</h1>
          <h2 className="ion-text-center ion-margin-top">
            Te rugam sa completezi rubricile de mai jos
          </h2>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Nume</IonLabel>
              <IonInput />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Prenume</IonLabel>
              <IonInput />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Telefon</IonLabel>
              <IonInput />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">E-mail</IonLabel>
              <IonInput />
            </IonItem>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Oras</IonLabel>
                    <IonInput />
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Judet</IonLabel>
                    <IonInput />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonList>
          <IonButton expand="full" color="primary">
            Trimite
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Adeziune;
