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
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getFunctions } from "firebase/functions";
import { getApp } from "firebase/app";
import { httpsCallable } from "firebase/functions";

const Dashboard: React.FC<{ isMember: boolean }> = ({ isMember }) => {
  const fireDb = db;
  const fireAuth = auth;

  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined);
  const [adeziuni, setAdeziuni] = useState<Number | undefined>(undefined);

  const [noMembers, setNoMembers] = useState<Number | undefined>(undefined);

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
      setMemberData(data);
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
    const q = query(
      membersCollection,
      where("filialaLocala", "==", memberData?.data()?.president),
      where("nivelCotizatie", "!=", null)
    );
    const memberCount = await getCountFromServer(q);
    console.log("Member count:", memberCount, Number(memberCount));
    return memberCount.data().count;
  }

  async function getAdeziuni() {
    const membersCollection = collection(db, "members");
    const q = query(
      membersCollection,
      where("filialaLocala", "==", memberData?.data()?.president),
      where("nivelCotizatie", "==", null)
    );

    const adeziuniCount = await getCountFromServer(q);
    console.log("Adeziuni count:", adeziuniCount, Number(adeziuniCount));

    return adeziuniCount.data().count;
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

  async function callDecreaseValueMonthly() {
    try {
      const app = getApp();
      const functions = getFunctions(app);
      const decreaseValueMonthly = httpsCallable(
        functions,
        "decreaseValueMonthly"
      );
      await decreaseValueMonthly();
      console.log("DecreaseValueMonthly function called successfully");
    } catch (error) {
      console.error("Error calling DecreaseValueMonthly function:", error);
      throw error;
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
              {adeziuni ?? 0 > 0
                ? `Exista ${adeziuni ?? 0} cereri de adeziune`
                : "Nu exista cereri de adeziune"}
            </div>
            <IonButton routerLink="/cererilist" expand="full">
              Vezi toate cererile de adeziune
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardTitle>Managementul anunturilor</IonCardTitle>
          <IonCardContent>
            <div>
              Editeaza sau sterge anunturi pentru filiala{" "}
              {memberData?.data().president}
            </div>
            <IonButton routerLink="/anunturimanagement" expand="full">
              Vezi toate anunturile
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardTitle>Publica un nou anunt</IonCardTitle>
          <IonCardContent>
            <div>
              Creaza un nou anunt pentru filiala {memberData?.data().president}
            </div>
            <IonButton routerLink="/createanunt" expand="full">
              Creaza anunt
            </IonButton>
          </IonCardContent>
        </IonCard>
        {memberData?.data().president === "Central" && (
          <IonCard>
            <IonCardTitle>Creeaza o noua filiala</IonCardTitle>
            <IonCardContent>
              <div>Creeaza o noua filiala SDB</div>
              <IonButton routerLink="/createfiliala" expand="full">
                Creeaza filiala
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}

        <IonCard>
          <IonCardTitle>Management financiar</IonCardTitle>
          <IonCardContent>
            <div>
              Creaza o noua luna fiscala pentru filiala{" "}
              {memberData?.data().president}
            </div>
            <IonButton onClick={callDecreaseValueMonthly} expand="full">
              Creaza luna fiscala
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
