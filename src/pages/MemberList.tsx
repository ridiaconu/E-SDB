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
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<QueryDocumentSnapshot[] | undefined>(
    undefined
  );
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const [memberData, setMemberData] = useState<
    QueryDocumentSnapshot | undefined
  >(undefined);
  useEffect(() => {
    async function fetchMembers() {
      const data = await getMembers();
      setMembers(data);
    }

    fetchMembers();
  });

  useEffect(() => {
    async function fetchMemberData() {
      const data = await getMemberData();
      setMemberData(data);
    }

    fetchMemberData();
  }, []);

  async function getMembers(): Promise<QueryDocumentSnapshot[] | undefined> {
    const membersCollection = collection(db, "members");
    const q = query(
      membersCollection,
      where("filialaLocala", "==", memberData?.data()?.president)
    );
    const querySnapshot = await getDocs(q);
    let members: QueryDocumentSnapshot[] = [];
    querySnapshot.forEach((doc) => {
      members.push(doc);
    });
    return members;
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

  const openModal = (index: number | null) => setOpenModalIndex(index);
  const closeModal = () => setOpenModalIndex(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Membri</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {members?.map((member, index) => (
          <IonCard key={index}>
            <IonCardTitle>
              {member.data()?.nume?.prenume} {member.data()?.nume?.numeFamilie}
            </IonCardTitle>
            <IonCardContent>
              <div>{member.data().content}</div>
              <IonButton onClick={() => openModal(index)} expand="full">
                Mai multe informatii
              </IonButton>
            </IonCardContent>
            <IonModal isOpen={openModalIndex === index}>
              {" "}
              <IonHeader>
                <IonToolbar>
                  <IonTitle>
                    {member.data()?.nume?.prenume}{" "}
                    {member.data()?.nume?.numeFamilie}
                  </IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => closeModal()}>Close</IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <div>
                  Informatii despre {member.data()?.nume?.prenume}{" "}
                  {member.data()?.nume?.numeFamilie}:
                </div>
                <div>
                  Adresa: {member.data()?.adresa?.localitate}, Strada{" "}
                  {member.data()?.adresa?.strada}, Numarul{" "}
                  {member.data()?.adresa?.numar}
                </div>
              </IonContent>
            </IonModal>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default MemberList;
