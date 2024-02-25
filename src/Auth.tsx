import { QueryDocumentSnapshot, doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

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

export const currentMember = await getMemberData();
