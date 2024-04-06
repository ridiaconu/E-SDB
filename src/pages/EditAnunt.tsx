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
import { logoGoogle } from "ionicons/icons";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  getDocs,
  QueryDocumentSnapshot,
  addDoc,
} from "firebase/firestore";

const EditAnunt = () => {
  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined); // Use state to store the member data
  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberData();
      setMemberData(data); // Update the state with the member data
    }

    fetchMemberData();
  }, []);
  const [isInternal, setIsInternal] = useState(false);
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
  const anuntCreation = async (event: any) => {
    event.preventDefault();
    const user = auth.currentUser;

    const date = new Date();
    const colref = collection(
      db,
      "filiale",
      memberData?.data().president,
      "anunturi"
    );

    await addDoc(colref, {
      titlu: event.target[0].value,
      content: event.target[1].value,
      isInternal: isInternal,
      timestamp: date,
    });
    console.log("Anunt Published has been created");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Creaza un nou anunt pentru Filiala {memberData?.data().president}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonCard>
            <IonCardContent>
              <form onSubmit={anuntCreation}>
                <IonInput
                  label="Titlu"
                  labelPlacement="floating"
                  fill="outline"
                />
                <IonInput
                  label="Continut"
                  labelPlacement="floating"
                  fill="outline"
                  className="ion-margin-top"
                />

                <IonCheckbox
                  labelPlacement="end"
                  onIonChange={(e) => setIsInternal(e.detail.checked)}
                >
                  <IonLabel className="ion-text-wrap">
                    Doresc ca acest anunt sa fie vizibil doar pentru{" "}
                    <b>membrii </b>
                    filialei {memberData?.data().president}
                  </IonLabel>
                </IonCheckbox>
                <IonButton
                  routerLink="/home/dash"
                  type="submit"
                  className="ion-margin-top"
                  expand="full"
                >
                  Posteaza anuntul
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditAnunt;
