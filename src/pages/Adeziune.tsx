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
  IonCard,
  IonCardContent,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";

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
      // docSnap.data() will be undefined in this case
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
      console.log(event.target[0].value);
      console.log(event.target[1].value);
      console.log(event.target[2].value);
      console.log(event.target[3].value);
      console.log(event.target[4].value);
      console.log(event.target[5].value);
    }
  }
};
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
                            >
                              <IonSelectOption value="Dolj">
                                Dolj
                              </IonSelectOption>
                              <IonSelectOption value="Gorj">
                                Gorj
                              </IonSelectOption>
                              <IonSelectOption value="Valcea">
                                Valcea
                              </IonSelectOption>
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
                              <IonSelectOption value="Craiova">
                                Craiova
                              </IonSelectOption>
                              <IonSelectOption value="Targu Jiu">
                                Targu Jiu
                              </IonSelectOption>
                              <IonSelectOption value="Ramnicu Valcea">
                                Ramnicu Valcea
                              </IonSelectOption>
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
