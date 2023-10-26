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
import { getAuth } from "firebase/auth";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Avizier: React.FC<{ isMember: boolean }> = ({ isMember }) => {
  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined); // Use state to store the member data

  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberData();
      setMemberData(data); // Update the state with the member data
    }

    fetchMemberData();
  }, []); // Call the function when the component mounts

  async function getMemberData(): Promise<QueryDocumentSnapshot | undefined> {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "members", uid);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Member data:", docSnap.data());
          return docSnap;
        } else {
          console.log("Member does not exist");
          return undefined;
        }
      } catch (error) {
        console.error("Error getting member data:", error);
        throw error;
      }
    } else {
      console.log("User is not authenticated");
      return undefined;
    }
  }
  const [filiala, setFiliala] = useState<QueryDocumentSnapshot | undefined>(
    undefined
  );
  useEffect(() => {
    async function fetchFiliala() {
      const data = await getFiliala(memberData?.data().filialaLocala);
      setFiliala(data);
    }
    fetchFiliala();
  }, []);
  async function getFiliala(
    codFiliala: string
  ): Promise<QueryDocumentSnapshot | undefined> {
    const db = getFirestore();

    const docRef = doc(db, "filiale-locale", codFiliala);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Filiala data:", docSnap.data());
        return docSnap;
      } else {
        console.log("Filiala does not exist");
        return undefined;
      }
    } catch (error) {
      console.error("Error getting filiala data:", error);
      throw error;
    }
  }
  switch (isMember) {
    case true:
      if (memberData) {
        const prenume = memberData.data()?.nume?.prenume;
        const nivelCotizatie = memberData.data()?.nivelCotizatie;
        const filialaLocala = filiala?.data()?.Localitate;
        return (
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Home</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
              <IonCard>
                <IonCardTitle>Bun venit {prenume}</IonCardTitle>
                <IonCardContent>
                  <div>Esti nembru in filiala {filialaLocala}</div>
                  <div>
                    Situatia cotizatiei:{" "}
                    {nivelCotizatie < 0
                      ? `Restant ${Math.abs(nivelCotizatie)} luni`
                      : nivelCotizatie > 0
                      ? `${nivelCotizatie} luni în avans`
                      : "Achitat la zi"}
                  </div>
                  <IonButton routerLink="/plata/cotizatie" expand="full">
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
      }

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
              <IonCardTitle>Bun venit</IonCardTitle>
              <IonCardContent>
                <div>Nu esti inca membru SDB</div>
                <IonButton routerLink="/plata/" expand="full">
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
