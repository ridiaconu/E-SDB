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
import { faker } from "@faker-js/faker";

const CreateFiliala = () => {
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
  const filialaCreation = async (event: any) => {
    event.preventDefault();
    const user = auth.currentUser;

    const colref = collection(db, "filiale");

    if (event.target[0].value) {
      const docRef = doc(db, "filiale", event.target[0].value);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Filiala already exists");
      } else {
        await setDoc(doc(colref, event.target[0].value), {
          context: event.target[1].value,
          birou: {
            vicepresedinti: [
              {
                cvURL: faker.internet.url(),
                nume: faker.person.firstName() + " " + faker.person.lastName(),
                photoURL: faker.image.urlLoremFlickr(),
              },
              {
                cvURL: faker.internet.url(),
                nume: faker.person.firstName() + " " + faker.person.lastName(),
                photoURL: faker.image.urlLoremFlickr(),
              },
            ],
            membriiBirou: [
              {
                cvURL: faker.internet.url(),
                nume: faker.person.firstName() + " " + faker.person.lastName(),
                photoURL: faker.image.urlLoremFlickr(),
              },
              {
                cvURL: faker.internet.url(),
                nume: faker.person.firstName() + " " + faker.person.lastName(),
                photoURL: faker.image.urlLoremFlickr(),
              },
              {
                cvURL: faker.internet.url(),
                nume: faker.person.firstName() + " " + faker.person.lastName(),
                photoURL: faker.image.urlLoremFlickr(),
              },
            ],
            presedinte: {
              cvURL: faker.internet.url(),
              nume: faker.person.firstName() + " " + faker.person.lastName(),
              photoURL: faker.image.urlLoremFlickr(),
            },
          },
        });
        // Create "anunturi" subcollection
        const anunturiRef = collection(
          db,
          "filiale",
          event.target[0].value,
          "anunturi"
        );
        await setDoc(doc(anunturiRef), {});

        // Create "documente" subcollection
        const documenteRef = collection(
          db,
          "filiale",
          event.target[0].value,
          "documente"
        );
        await setDoc(doc(documenteRef), {});

        console.log("Filiala has been created");
      }
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Creeaza o noua filiala SDB</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonCard>
            <IonCardContent>
              <form onSubmit={filialaCreation}>
                <IonInput
                  label="Nume Filiala"
                  labelPlacement="floating"
                  fill="outline"
                />
                <IonSelect
                  aria-label="Judet"
                  interface="action-sheet"
                  placeholder="Context"
                  value="judetean"
                >
                  <IonSelectOption value="judetean">judetean</IonSelectOption>
                  <IonSelectOption value="local">local</IonSelectOption>
                </IonSelect>
                <IonButton
                  routerLink="/home/dash"
                  type="submit"
                  className="ion-margin-top"
                  expand="full"
                >
                  Creaza filiala
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateFiliala;
