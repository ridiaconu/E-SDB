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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { onAuthStateChanged } from "firebase/auth";
import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const Dashboard: React.FC<{ isMember: boolean }> = ({ isMember }) => {
  const fireDb = db;
  const fireAuth = auth;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin Panel</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardTitle>Bun venit Vali</IonCardTitle>
          <IonCardContent>
            <div>Esti presedintele filialei Craiova</div>
            <IonButton routerLink="/memberslist" expand="full">
              Vezi toti membrii
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardTitle>Cereri adeziune</IonCardTitle>
          <IonCardContent>
            <div>Caca</div>
            <div>Maca</div>
            <IonButton routerLink="/cererilist" expand="full">
              Vezi toate cererile de adeziune
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardTitle>Publica un nou anunt</IonCardTitle>
          <IonCardContent>
            <div>Creaza un nou anunt pentru filiala Craiova</div>
            <IonButton routerLink="/createanunt" expand="full">
              Creaza anunt
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
