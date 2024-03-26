import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonList,
  IonModal,
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
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useHistory, useParams } from "react-router-dom";

const AnunturiManagement: React.FC = () => {
  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined); // Use state to store the member data
  const [anunturi, setAnunturi] = useState<QueryDocumentSnapshot[] | undefined>(
    undefined
  );

  const fireDb = db;
  const fireAuth = auth;

  const history = useHistory();

  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberData();
      setMemberData(data); // Update the state with the member data
    }

    fetchMemberData();
  }, []);

  useEffect(() => {
    if (memberData) {
      async function fetchAnunturi() {
        const filiala = memberData?.data()?.president;
        console.log("Filiala:", filiala);
        const anunturi = await getAnunturi(filiala);
        setAnunturi(anunturi);
      }

      fetchAnunturi();
    }
  }, [memberData]);

  async function getMemberData(): Promise<QueryDocumentSnapshot | undefined> {
    let user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "members", uid);
      const docRef2 = doc(db, "users", uid);

      try {
        const docSnap = await getDoc(docRef);
        const docSnap2 = await getDoc(docRef2);
        if (docSnap.exists()) {
          if (docSnap2.exists()) {
            if (docSnap2.data()?.isMember == false) {
              console.log("User is not a member");
              return undefined;
            } else {
              console.log("User is a member");
              console.log("Member data:", docSnap.data());
              return docSnap;
            }
          }
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

  async function getAnunturi(
    filiala: string
  ): Promise<QueryDocumentSnapshot[] | undefined> {
    const colRef = collection(db, "filiale/" + filiala + "/anunturi");
    const q = query(colRef, orderBy("timestamp", "desc")); // Order by timestamp in descending order

    try {
      const colSnap = await getDocs(q);
      const anunturi: QueryDocumentSnapshot[] = [];

      for (const doc of colSnap.docs) {
        if (doc.data()?.isInternal == true) {
          doc.data().titlu = "🟣" + doc.data()?.titlu;
          anunturi.push(doc);
        } else {
          doc.data().titlu = "🔴" + doc.data()?.titlu;
          anunturi.push(doc);
        }
      }

      return anunturi;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const openModal = (index: number | null) => setOpenModalIndex(index);
  const closeModal = () => setOpenModalIndex(null);

  const deleteAnunt = async (anunt: DocumentSnapshot<DocumentData>) => {
    console.log("Deleting anunt:");
    deleteDoc(
      doc(
        db,
        "filiale/" + memberData?.data()?.president + "/anunturi",
        anunt.id
      )
    );
    closeModal();
    history.push("/home/dash/");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Anunturi</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {anunturi?.map((anunt, index) => (
          <IonCard key={index}>
            <IonCardTitle>
              {anunt.data().isInternal ? "🟣 " : "🔴 "}
              {anunt.data().titlu}
            </IonCardTitle>
            <IonCardContent>
              <div>{anunt.data().content}</div>
              <IonButton onClick={() => openModal(index)} expand="full">
                Deschide anuntul
              </IonButton>
            </IonCardContent>
            <IonModal isOpen={openModalIndex === index}>
              {" "}
              <IonHeader>
                <IonToolbar>
                  <IonTitle>
                    {anunt.data().isInternal ? "🟣 " : "🔴 "}
                    {anunt.data().titlu}
                  </IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => closeModal()}>Close</IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <div>{anunt.data().content}</div>
              </IonContent>
              <IonButton onClick={() => deleteAnunt(anunt)}>Sterge</IonButton>
            </IonModal>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default AnunturiManagement;
