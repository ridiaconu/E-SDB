import React, { useEffect, useState } from "react";
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
  IonCard,
  IonCardContent,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from "@ionic/react";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, setDoc, getDocs } from "firebase/firestore";

const createMember = async (event: any) => {
  event.preventDefault();
  const user = auth.currentUser;
  const uid = user ? user.uid : null;

  if (uid) {
    const docref = doc(db, "members", uid);

    const docSnap = await getDoc(docref);

    const colref = collection(db, "members");

    if (docSnap.exists()) {
      console.log("Member already exists");
    } else {
      await setDoc(doc(colref, uid), {
        nume: {
          numeFamilie: event.target[1].value,
          prenume: event.target[0].value,
        },
        email: auth.currentUser?.email,
        adresa: {
          localitate: event.target[2].value,
          strada: event.target[3].value,
          numar: event.target[4].value,
        },
        filialaJudeteana: event.target[5].value,
        filialaLocala: event.target[6].value,
      });
      console.log("Member has been created");
    }
  }
};
const Adeziune = () => {
  const [filialeJudetene, setFilialeJudetene] = useState<
    Array<String> | undefined
  >(undefined);
  const [filialeLocale, setFilialeLocale] = useState<Array<String> | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchFilialeJudetene() {
      const data = await getFilialeJudetene();
      setFilialeJudetene(data);
    }

    fetchFilialeJudetene();
  }, []);

  useEffect(() => {
    async function fetchFilialeLocale() {
      const data = await getFilialeLocale();
      setFilialeLocale(data);
    }

    fetchFilialeLocale();
  }, []);

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
          <IonCard>
            <IonCardContent>
              <form onSubmit={createMember}>
                <IonInput
                  label="Nume"
                  labelPlacement="floating"
                  fill="outline"
                />
                <IonInput
                  label="Prenume"
                  labelPlacement="floating"
                  fill="outline"
                  className="ion-margin-top"
                />
                <IonInput
                  label="Localitate"
                  labelPlacement="floating"
                  fill="outline"
                  className="ion-margin-top"
                />
                <IonInput
                  label="Strada"
                  labelPlacement="floating"
                  fill="outline"
                  className="ion-margin-top"
                />
                <IonInput
                  label="Numar"
                  labelPlacement="floating"
                  fill="outline"
                  className="ion-margin-top"
                />

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
                              value="Dolj"
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
                              value="Craiova"
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
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                <IonCheckbox labelPlacement="end">
                  <IonLabel className="ion-text-wrap">
                    Sunt de acord ca partidul SDB sa imi prelucreze datele
                    personale in conformitate cu reglementarile nationale si
                    europene in domeniul acesta
                  </IonLabel>
                </IonCheckbox>
                <IonButton
                  routerLink="/home/avizier"
                  type="submit"
                  className="ion-margin-top"
                  expand="full"
                >
                  Trimite
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Adeziune;
