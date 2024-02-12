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
import { useParams } from "react-router-dom";

const Anunturi: React.FC = () => {
  let isMember: boolean;
  const { context } = useParams<{ context: string }>();

  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined); // Use state to store the member data
  const [anunturiCentral, setAnunturiCentral] = useState<
    QueryDocumentSnapshot[] | undefined
  >(undefined);
  const [anunturiJudetean, setAnunturiJudetean] = useState<
    QueryDocumentSnapshot[] | undefined
  >(undefined);
  const [anunturiLocal, setAnunturiLocal] = useState<
    QueryDocumentSnapshot[] | undefined
  >(undefined);
  const [filialeJudetene, setFilialeJudetene] = useState<
    Array<String> | undefined
  >(undefined);
  const [filialeLocale, setFilialeLocale] = useState<Array<String> | undefined>(
    undefined
  );

  const fireDb = db;
  const fireAuth = auth;

  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberData();
      setMemberData(data); // Update the state with the member data
    }

    fetchMemberData();
  }, []);

  useEffect(() => {
    async function fetchAnunturiCentral() {
      const anunturi = await getAnunturi("Central");
      setAnunturiCentral(anunturi);
    }

    fetchAnunturiCentral();
  }, []);
  useEffect(() => {
    async function fetchAnunturiJudetean() {
      if (memberData) {
        const anunturi = await getAnunturi(memberData.data()?.filialaJudeteana);
        setAnunturiJudetean(anunturi);
      } else {
        const anunturi = await getAnunturi("Dolj");
        setAnunturiJudetean(anunturi);
      }
    }

    fetchAnunturiJudetean();
  }, []);
  useEffect(() => {
    async function fetchAnunturiLocal() {
      if (memberData) {
        const anunturi = await getAnunturi(memberData.data()?.filialaLocala);
        setAnunturiLocal(anunturi);
      } else {
        const anunturi = await getAnunturi("Craiova");
        setAnunturiLocal(anunturi);
      }
    }

    fetchAnunturiLocal();
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
    try {
      const colSnap = await getDocs(colRef);
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

  if (memberData == undefined) {
    isMember = false;
  } else {
    isMember = true;
  }

  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const openModal = (index: number | null) => setOpenModalIndex(index);
  const closeModal = () => setOpenModalIndex(null);

  switch (isMember) {
    case true:
      switch (context) {
        case "Central":
          return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Anunturi</IonTitle>
                </IonToolbar>
              </IonHeader>

              <IonContent className="ion-padding">
                {anunturiCentral?.map((anunt, index) => (
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
                            <IonButton onClick={() => closeModal()}>
                              Close
                            </IonButton>
                          </IonButtons>
                        </IonToolbar>
                      </IonHeader>
                      <IonContent className="ion-padding">
                        <div>{anunt.data().content}</div>
                      </IonContent>
                    </IonModal>
                  </IonCard>
                ))}
              </IonContent>
            </IonPage>
          );
          break;
        case "Judetean":
          return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Anunturi</IonTitle>
                </IonToolbar>
              </IonHeader>

              <IonContent className="ion-padding">
                <IonList>
                  <IonItem>
                    <IonSelect
                      aria-label="Judet"
                      interface="action-sheet"
                      placeholder="Judet"
                      value={memberData?.data()?.filialaJudeteana || ""}
                      onIonChange={(e) => getAnunturi(e.detail.value)}
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
                {anunturiJudetean?.map((anunt, index) => (
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
                            <IonButton onClick={() => closeModal()}>
                              Close
                            </IonButton>
                          </IonButtons>
                        </IonToolbar>
                      </IonHeader>
                      <IonContent className="ion-padding">
                        <div>{anunt.data().content}</div>
                      </IonContent>
                    </IonModal>
                  </IonCard>
                ))}
              </IonContent>
            </IonPage>
          );
          break;
        case "Local":
          return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Anunturi</IonTitle>
                </IonToolbar>
              </IonHeader>

              <IonContent className="ion-padding">
                <IonList>
                  <IonItem>
                    <IonSelect
                      aria-label="Oras"
                      interface="action-sheet"
                      placeholder="Oras"
                      value={memberData?.data()?.filialaLocala || ""}
                      onIonChange={(e) => getAnunturi(e.detail.value)}
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
                {anunturiLocal?.map((anunt, index) => (
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
                            <IonButton onClick={() => closeModal()}>
                              Close
                            </IonButton>
                          </IonButtons>
                        </IonToolbar>
                      </IonHeader>
                      <IonContent className="ion-padding">
                        <div>{anunt.data().content}</div>
                      </IonContent>
                    </IonModal>
                  </IonCard>
                ))}
              </IonContent>
            </IonPage>
          );
          break;
      }

      break;
    case false:
      switch (context) {
        case "Central":
          return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Anunturi</IonTitle>
                </IonToolbar>
              </IonHeader>

              <IonContent className="ion-padding">
                {anunturiCentral
                  ?.filter((anunt) => isMember || !anunt.data().isInternal)
                  .map((anunt, index) => (
                    <IonCard key={index}>
                      <IonCardTitle>
                        {anunt.data().isInternal ? "🟣 " : "🔴 "}
                        {anunt.data().titlu}
                      </IonCardTitle>
                      <IonCardContent>
                        <div>{anunt.data().content}</div>
                        <IonButton
                          onClick={() => openModal(index)}
                          expand="full"
                        >
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
                              <IonButton onClick={() => closeModal()}>
                                Close
                              </IonButton>
                            </IonButtons>
                          </IonToolbar>
                        </IonHeader>
                        <IonContent className="ion-padding">
                          <div>{anunt.data().content}</div>
                        </IonContent>
                      </IonModal>
                    </IonCard>
                  ))}
              </IonContent>
            </IonPage>
          );
          break;
        case "Judetean":
          return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Anunturi</IonTitle>
                </IonToolbar>
              </IonHeader>

              <IonContent className="ion-padding">
                <IonList>
                  <IonItem>
                    <IonSelect
                      aria-label="Judet"
                      interface="action-sheet"
                      placeholder="Judet"
                      value={memberData?.data()?.filialaJudeteana || ""}
                      onIonChange={(e) => getAnunturi(e.detail.value)}
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
                {anunturiJudetean
                  ?.filter((anunt) => isMember || !anunt.data().isInternal)
                  .map((anunt, index) => (
                    <IonCard key={index}>
                      <IonCardTitle>
                        {anunt.data().isInternal ? "🟣 " : "🔴 "}
                        {anunt.data().titlu}
                      </IonCardTitle>
                      <IonCardContent>
                        <div>{anunt.data().content}</div>
                        <IonButton
                          onClick={() => openModal(index)}
                          expand="full"
                        >
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
                              <IonButton onClick={() => closeModal()}>
                                Close
                              </IonButton>
                            </IonButtons>
                          </IonToolbar>
                        </IonHeader>
                        <IonContent className="ion-padding">
                          <div>{anunt.data().content}</div>
                        </IonContent>
                      </IonModal>
                    </IonCard>
                  ))}
              </IonContent>
            </IonPage>
          );
          break;
        case "Local":
          return (
            <IonPage>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Anunturi</IonTitle>
                </IonToolbar>
              </IonHeader>

              <IonContent className="ion-padding">
                <IonList>
                  <IonItem>
                    <IonSelect
                      aria-label="Oras"
                      interface="action-sheet"
                      placeholder="Oras"
                      value={memberData?.data()?.filialaLocala || ""}
                      onIonChange={(e) => getAnunturi(e.detail.value)}
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
                {anunturiLocal
                  ?.filter((anunt) => isMember || !anunt.data().isInternal)
                  .map((anunt, index) => (
                    <IonCard key={index}>
                      <IonCardTitle>
                        {anunt.data().isInternal ? "🟣 " : "🔴 "}
                        {anunt.data().titlu}
                      </IonCardTitle>
                      <IonCardContent>
                        <div>{anunt.data().content}</div>
                        <IonButton
                          onClick={() => openModal(index)}
                          expand="full"
                        >
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
                              <IonButton onClick={() => closeModal()}>
                                Close
                              </IonButton>
                            </IonButtons>
                          </IonToolbar>
                        </IonHeader>
                        <IonContent className="ion-padding">
                          <div>{anunt.data().content}</div>
                        </IonContent>
                      </IonModal>
                    </IonCard>
                  ))}
              </IonContent>
            </IonPage>
          );
          break;
      }
  }
};

export default Anunturi;
