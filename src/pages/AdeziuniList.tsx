import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonHeader,
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
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const AdeziuniList: React.FC = () => {
  const [adeziuni, setAdeziuni] = useState<QueryDocumentSnapshot[] | undefined>(
    undefined
  );
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined); // Use state to store the member data

  useEffect(() => {
    async function fetchAdeziuni() {
      const data = await getAdeziuni();
      setAdeziuni(data);
    }

    fetchAdeziuni();
  });

  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberData();
      setMemberData(data);
    }

    fetchMemberData();
  }, []);

  async function getAdeziuni(): Promise<QueryDocumentSnapshot[] | undefined> {
    const membersCollection = collection(db, "members");
    try {
      const colSnap = await getDocs(membersCollection);
      const adeziuni: QueryDocumentSnapshot[] = [];

      for (const doc of colSnap.docs) {
        if (doc.data()?.filialaLocala == memberData?.data()?.president) {
          if (!doc.data().nivelCotizatie) {
            let nume = doc.data().nume + " " + doc.data().prenume;
            adeziuni.push(doc);
          }
        }
      }

      return adeziuni;
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

  async function admitMember(adeziune: DocumentSnapshot<DocumentData>) {
    updateDoc(adeziune.ref, {
      nivelCotizatie: "0",
    });
    if (doc) {
      const usrRef = doc(db, "users", adeziune.id);
      updateDoc(usrRef, {
        isMember: true,
      });
    }

    console.log("Member has been admited");
  }
  async function refuseMember(adeziune: DocumentSnapshot<DocumentData>) {
    console.log("Member has been refused");
    deleteDoc(doc(db, "members", adeziune.id));
  }

  const openModal = (index: number | null) => setOpenModalIndex(index);
  const closeModal = () => setOpenModalIndex(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cereri de adeziune</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {adeziuni?.map((adeziune, index) => (
          <IonCard key={index}>
            <IonCardTitle>
              {adeziune.data()?.nume?.prenume}{" "}
              {adeziune.data()?.nume?.numeFamilie}
            </IonCardTitle>
            <IonCardContent>
              <div>{adeziune.data().content}</div>
              <IonButton onClick={() => openModal(index)} expand="full">
                Deschide adeziunea
              </IonButton>
            </IonCardContent>
            <IonModal isOpen={openModalIndex === index}>
              {" "}
              <IonHeader>
                <IonToolbar>
                  <IonTitle>
                    {adeziune.data()?.nume?.prenume}{" "}
                    {adeziune.data()?.nume?.numeFamilie}
                  </IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => closeModal()}>Close</IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <div>
                  Informatii despre {adeziune.data()?.nume?.prenume}{" "}
                  {adeziune.data()?.nume?.numeFamilie}:
                </div>
                <div>
                  Adresa: {adeziune.data()?.adresa?.localitate}, Strada{" "}
                  {adeziune.data()?.adresa?.strada}, Numarul{" "}
                  {adeziune.data()?.adresa?.numar}
                </div>
                <div>
                  <IonButton onClick={() => admitMember(adeziune)}>
                    Admite in organizatia {memberData?.data()?.president}
                  </IonButton>
                  <IonButton onClick={() => refuseMember(adeziune)}>
                    Refuza cererea de adeziune
                  </IonButton>
                </div>
              </IonContent>
            </IonModal>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default AdeziuniList;
