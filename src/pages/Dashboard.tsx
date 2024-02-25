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

  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined); // Use state to store the member data

  const [adeziuni, setAdeziuni] = useState<string[] | undefined>(undefined);

  const [noMembers, setNoMembers] = useState<number | undefined>(undefined);

  useEffect(() => {
    async function fetchNoMembers() {
      const data = await getNoMembers();
      setNoMembers(data);
    }

    fetchNoMembers();
  });

  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberData();
      setMemberData(data); // Update the state with the member data
    }

    fetchMemberData();
  }, []);

  useEffect(() => {
    async function fetchAdeziuni() {
      const data = await getAdeziuni();
      setAdeziuni(data);
    }

    fetchAdeziuni();
  });

  async function getNoMembers() {
    const membersCollection = collection(db, "members");
    try {
      const colSnap = await getDocs(membersCollection);
      let noMembers = 0;

      for (const doc of colSnap.docs) {
        if (doc.data()?.filialaLocala == memberData?.data()?.president) {
          if (doc.data()?.nivelCotizatie) {
            noMembers = noMembers + 1;
          }
        }
      }

      return noMembers;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function getAdeziuni() {
    const membersCollection = collection(db, "members");
    try {
      const colSnap = await getDocs(membersCollection);
      const titles = [];

      for (const doc of colSnap.docs) {
        if (doc.data()?.filialaLocala == memberData?.data()?.president) {
          if (!doc.data().nivelCotizatie) {
            let nume = doc.data().nume + " " + doc.data().prenume;
            titles.push(nume);
          }
        }
      }

      return titles;
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin Panel - {memberData?.data().president}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardTitle>Managementul membrilor</IonCardTitle>
          <IonCardContent>
            <div>
              Filiala {memberData?.data().president} are {noMembers} membrii
            </div>
            <IonButton routerLink="/memberslist" expand="full">
              Vezi toti membrii
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardTitle>Cereri adeziune</IonCardTitle>
          <IonCardContent>
            <div>
              {adeziuni?.length
                ? `Exista ${adeziuni.length} cereri de adeziune`
                : "Nu exista cereri de adeziune"}
            </div>
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
