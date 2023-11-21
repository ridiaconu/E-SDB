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
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

const Avizier: React.FC<{ isMember: boolean }> = ({ isMember }) => {
  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined); // Use state to store the member data
  const [anunturiCentral, setAnunturiCentral] = useState<
    Array<String> | undefined
  >(undefined);

  const db = getFirestore();

  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberData();
      setMemberData(data); // Update the state with the member data
    }

    fetchMemberData();
  }, []); // Call the function when the component mounts

  useEffect(() => {
    async function fetchAnunturiCentral() {
      const anunturi = await getAnunturi("Central");
      setAnunturiCentral(anunturi);
    }

    fetchAnunturiCentral();
  }, []);

  async function getMemberData(): Promise<QueryDocumentSnapshot | undefined> {
    const auth = getAuth();
    let user = auth.currentUser;

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

  async function getAnunturi(filiala: String): Promise<String[] | undefined> {
    const colRef = collection(db, "filiale/" + filiala + "/anunturi");
    try {
      const colSnap = await getDocs(colRef);
      const titles = [];

      for (const doc of colSnap.docs) {
        if (doc.data()?.isInternal == true) {
          let titlu = doc.data()?.titlu;
          titlu = "🟣" + titlu;
          titles.push(titlu);
        } else {
          let titlu = doc.data()?.titlu;
          titlu = "🔴" + titlu;
          titles.push(titlu);
        }
      }

      return titles;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  switch (isMember) {
    case true:
      if (memberData) {
        const prenume = memberData.data()?.nume?.prenume;
        const nivelCotizatie = memberData.data()?.nivelCotizatie;
        let filialaloc = memberData.data()?.filialaLocala;
        const firstThreeAnunturiCentral = anunturiCentral?.slice(0, 3);
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
                  <div>Esti membru in filiala {filialaloc}</div>
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
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonList>
                        <IonItem>
                          <IonSelect
                            aria-label="Judet"
                            interface="action-sheet"
                            placeholder="Judet"
                          >
                            <IonSelectOption value="DJ">Dolj</IonSelectOption>
                            <IonSelectOption value="GJ">Gorj</IonSelectOption>
                            <IonSelectOption value="VL">Valcea</IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonList>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem>
                      {" "}
                      <IonList>
                        <IonItem>
                          <IonSelect
                            aria-label="Oras"
                            interface="action-sheet"
                            placeholder="Oras"
                          >
                            <IonSelectOption value="DJ">
                              Craiova
                            </IonSelectOption>
                            <IonSelectOption value="GJ">
                              Targu Jiu
                            </IonSelectOption>
                            <IonSelectOption value="VL">
                              Ramnicu Valcea
                            </IonSelectOption>
                          </IonSelect>
                        </IonItem>
                      </IonList>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonCard>
                <IonCardTitle>Avizier Central</IonCardTitle>
                <IonCardContent>
                  {anunturiCentral?.slice(0, 3).map((anunt, index) => (
                    <div key={index}>{anunt}</div>
                  ))}
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
                {anunturiCentral
                  ?.filter((anunt) => anunt.startsWith("🔴"))
                  .map((anunt, index) => (
                    <div key={index}>{anunt}</div>
                  ))}
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
