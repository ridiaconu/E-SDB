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
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { auth, db } from "../firebase";
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

let fireDB = db;

const Organigrama: React.FC = () => {
  const { context } = useParams<{ context: string }>();

  const [filialeJudetene, setFilialeJudetene] = useState<
    Array<String> | undefined
  >(undefined);
  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined); // Use state to store the member data
  const [filialeLocale, setFilialeLocale] = useState<Array<String> | undefined>(
    undefined
  );
  const [birouCentral, setBirouCentral] = useState<
    Map<String, any> | undefined
  >(undefined);
  const [birouJudetean, setBirouJudetean] = useState<
    Map<String, any> | undefined
  >(undefined);
  const [birouLocal, setBirouLocal] = useState<Map<String, any> | undefined>(
    undefined
  );

  async function getFilialeJudetene(): Promise<String[] | undefined> {
    const colRef = collection(db, "filiale");
    try {
      const colSnap = await getDocs(colRef);
      const filialeJudetene = [];
      for (const doc of colSnap.docs) {
        if (doc.data()?.context == "judetean") {
          filialeJudetene.push(doc.id);
        }
      }
      return filialeJudetene;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function getFilialeLocale(): Promise<String[] | undefined> {
    const colRef = collection(db, "filiale");
    try {
      const colSnap = await getDocs(colRef);
      const filialeLocale = [];
      for (const doc of colSnap.docs) {
        if (doc.data()?.context == "local") {
          filialeLocale.push(doc.id);
        }
      }
      return filialeLocale;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function getBirou(
    filiala: String
  ): Promise<Map<String, any> | undefined> {
    const docRef = doc(db, "filiale", filiala.toString());
    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log("No such document!");
        return undefined;
      } else {
        const birouData = new Map(Object.entries(docSnap.data().birou));
        //console.log(birouData);
        return birouData;
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function getMemberData(): Promise<QueryDocumentSnapshot | undefined> {
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

  useEffect(() => {
    async function fetchBirouCentral() {
      const data = await getBirou("Central");
      setBirouCentral(data);
    }

    fetchBirouCentral();
  }, []);

  useEffect(() => {
    async function fetchBirouJudetean() {
      const data = await getBirou(
        memberData?.data()?.filialaJudeteana || "Dolj"
      );
      setBirouJudetean(data);
    }

    fetchBirouJudetean();
  }, []);

  useEffect(() => {
    async function fetchBirouLocal() {
      const data = await getBirou(
        memberData?.data()?.filialaLocale || "Craiova"
      );
      setBirouLocal(data);
    }

    fetchBirouLocal();
  }, []);

  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberData();
      setMemberData(data); // Update the state with the member data
    }

    fetchMemberData();
  }, []);

  useEffect(() => {
    async function fetchFilialeJudetene() {
      const data = await getFilialeJudetene();
      setFilialeJudetene(data); // Update the state with the member data
    }

    fetchFilialeJudetene();
  }, []);

  useEffect(() => {
    async function fetchFilialeLocale() {
      const data = await getFilialeLocale();
      setFilialeLocale(data); // Update the state with the member data
    }

    fetchFilialeLocale();
  }, []);

  switch (context) {
    case "Central":
      if (birouCentral) {
        const presedinte = birouCentral.get("presedinte");
        const vicepresedinti = birouCentral.get("vicepresedinti");
        const membrii = birouCentral.get("membriiBirou");
        //console.log(presedinte);
        //console.log(vicepresedinti);
        //console.log(membrii);

        return (
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Birou Central</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonCard>
                <img alt="Silhouette of mountains" src={presedinte.photoURL} />
                <IonCardHeader>
                  <IonCardTitle>{presedinte.nume}</IonCardTitle>
                  <IonCardSubtitle>Presedinte</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonCardTitle className="ion-padding">
                  Vicepresedinti
                </IonCardTitle>
                <IonCardContent>
                  <IonList>
                    {vicepresedinti.map((vicepresedinte: any) => (
                      <IonItem>
                        <IonThumbnail slot="start">
                          <img
                            alt="Silhouette of mountains"
                            src={vicepresedinte.photoURL}
                          />
                        </IonThumbnail>
                        <IonLabel>{vicepresedinte.nume}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Membrii Biroului National</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonList>
                    {membrii.map((membru: any) => (
                      <IonItem>
                        <IonLabel>{membru.nume}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonPage>
        );
      }
      break;
    case "Judetean":
      if (birouJudetean) {
        const presedinte = birouJudetean.get("presedinte");
        const vicepresedinti = birouJudetean.get("vicepresedinti");
        const membrii = birouJudetean.get("membriiBirou");
        return (
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Birou Judetean</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonList>
                <IonItem>
                  <IonSelect
                    aria-label="Judet"
                    interface="action-sheet"
                    placeholder="Judet"
                    value={memberData?.data()?.filialaJudeteana || "Dolj"}
                    onIonChange={(e) => getBirou(e.detail.value)}
                  >
                    {filialeJudetene &&
                      filialeJudetene.map((filiala, index) => (
                        <IonSelectOption key={index} value={filiala}>
                          {filiala}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                </IonItem>
              </IonList>

              <IonCard>
                <img
                  alt="Silhouette of mountains"
                  src="https://static.boredpanda.com/blog/wp-content/uploads/2018/12/ai-image-generation-fake-faces-people-nvidia-5c18b207b7231__700.jpg"
                />
                <IonCardHeader>
                  <IonCardTitle>{presedinte.nume}</IonCardTitle>
                  <IonCardSubtitle>Presedinte</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonCardTitle className="ion-padding">
                  Vicepresedinti
                </IonCardTitle>
                <IonCardContent>
                  <IonList>
                    {vicepresedinti.map((vicepresedinte: any) => (
                      <IonItem>
                        <IonThumbnail slot="start">
                          <img
                            alt="Silhouette of mountains"
                            src={vicepresedinte.photoURL}
                          />
                        </IonThumbnail>
                        <IonLabel>{vicepresedinte.nume}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Membrii Biroului Judetean</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonList>
                    {membrii.map((membru: any) => (
                      <IonItem>
                        <IonLabel>{membru.nume}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonPage>
        );
      }

      break;
    case "Local":
      if (birouLocal) {
        const presedinte = birouLocal.get("presedinte");
        const vicepresedinti = birouLocal.get("vicepresedinti");
        const membrii = birouLocal.get("membriiBirou");
        return (
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Birou Local</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonList>
                <IonItem>
                  <IonSelect
                    aria-label="Judet"
                    interface="action-sheet"
                    placeholder="Judet"
                    value={memberData?.data()?.filialaLocala || "Craiova"}
                    onIonChange={(e) => getBirou(e.detail.value)}
                  >
                    {filialeLocale &&
                      filialeLocale.map((filiala, index) => (
                        <IonSelectOption key={index} value={filiala}>
                          {filiala}
                        </IonSelectOption>
                      ))}
                  </IonSelect>
                </IonItem>
              </IonList>

              <IonCard>
                <img alt="Silhouette of mountains" src={presedinte.photoURL} />
                <IonCardHeader>
                  <IonCardTitle>{presedinte.nume}</IonCardTitle>
                  <IonCardSubtitle>Presedinte</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
              <IonCard>
                <IonCardTitle className="ion-padding">
                  Vicepresedinti
                </IonCardTitle>
                <IonCardContent>
                  <IonList>
                    {vicepresedinti.map((vicepresedinte: any) => (
                      <IonItem>
                        <IonThumbnail slot="start">
                          <img
                            alt="Silhouette of mountains"
                            src={vicepresedinte.photoURL}
                          />
                        </IonThumbnail>
                        <IonLabel>{vicepresedinte.nume}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Membrii Biroului Local</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonList>
                    {membrii.map((membru: any) => (
                      <IonItem>
                        <IonLabel>{membru.nume}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonPage>
        );
      }

      break;
  }
};

export default Organigrama;
