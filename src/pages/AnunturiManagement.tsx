import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";

const AnunturiManagement: React.FC = () => {
  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined);
  const [anunturi, setAnunturi] = useState<QueryDocumentSnapshot[] | undefined>(
    undefined
  );

  const fireDb = db;
  const fireAuth = auth;

  const history = useHistory();

  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberData();
      setMemberData(data);
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
    const q = query(colRef, orderBy("timestamp", "desc"));
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
  const [anuntEdit, setAnuntEdit] = useState<number | null>(null);
  const [isInternal, setIsInternal] = useState(false);

  const openEditAnunt = (index: number | null) => setAnuntEdit(index);
  const closeEditAnunt = () => setAnuntEdit(null);

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

  const updateAnunt = async (
    anunt: DocumentSnapshot<DocumentData>,
    event: any
  ) => {
    event.preventDefault();
    console.log("Updating anunt:");
    updateDoc(anunt.ref, {
      titllu: event.target[0].value,
      content: event.target[1].value,
      isInternal: isInternal,
    });
    closeModal();
    closeEditAnunt();
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
              <IonButton onClick={() => openEditAnunt(index)}>
                Editeaza
              </IonButton>
              <IonButton onClick={() => deleteAnunt(anunt)}>Sterge</IonButton>
            </IonModal>
            <IonModal isOpen={anuntEdit === index}>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Editeaza anuntul</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => closeEditAnunt()}>
                      Close
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <div className="ion-padding">
                  <IonCard>
                    <IonCardContent>
                      <form onSubmit={(event) => updateAnunt(anunt, event)}>
                        <IonInput
                          label="Titlu"
                          labelPlacement="floating"
                          fill="outline"
                          value={anunt.data().titlu}
                        />
                        <IonInput
                          label="Continut"
                          labelPlacement="floating"
                          fill="outline"
                          className="ion-margin-top"
                          value={anunt.data().content}
                        />

                        <IonCheckbox
                          labelPlacement="end"
                          onIonChange={(e) => setIsInternal(e.detail.checked)}
                          checked={anunt.data().isInternal}
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
            </IonModal>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default AnunturiManagement;
