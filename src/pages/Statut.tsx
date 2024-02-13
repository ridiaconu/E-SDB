import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/react";

const Statut: React.FC = () => {
  const articles = [
    {
      title: "Capitolul I - DISPOZIȚII GENERALE",
      content:
        "Art. 1 Cadrul legal (1) Partidul este persoană juridică română de drept public...",
    },
    // Add more articles here
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statut</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonAccordionGroup>
          {articles.map((article, index) => (
            <IonAccordion title={article.title}>
              <IonCard>
                <IonCardTitle>{article.title}</IonCardTitle>
                <IonCardContent>{article.content}</IonCardContent>
              </IonCard>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default Statut;
