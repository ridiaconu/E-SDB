import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useHistory } from "react-router";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  persistentLocalCache,
} from "firebase/firestore";

import { db, auth } from "../firebase";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fireAuth = auth;
  const history = useHistory(); // Initialize useHistory
  const fireDb = db;
  auth.setPersistence(browserLocalPersistence);

  const checkUserDocument = async () => {
    // Get the current user's UID
    const user = auth.currentUser;
    const uid = user ? user.uid : null;

    if (uid) {
      const docref = doc(db, "users", uid);

      const docSnap = await getDoc(docref);

      const colref = collection(db, "users");

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        await setDoc(doc(colref, uid), {
          isMember: false,
          isAdmin: false,
        });
        console.log("User has been created");
      }
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      // Signed in with Google
      const user = userCredential.user;
      console.log("User signed in with Google:", user);
      checkUserDocument();
      history.push("/home/avizier");
    } catch (error) {
      // Handle errors
      console.error("Error signing in with Google:", error);
    }
  };

  const doLogin = (event: React.FormEvent) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in:", user);
        checkUserDocument();
        history.push("/home/avizier");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error signing in:", error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>E-SDB</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <IonCard>
          <IonCardContent>
            <form onSubmit={doLogin}>
              <IonInput
                label="E-mail"
                type="email"
                labelPlacement="floating"
                fill="outline"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
              <IonInput
                label="Password"
                type="password"
                labelPlacement="floating"
                fill="outline"
                className="ion-margin-top"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
              <IonButton type="submit" className="ion-margin-top" expand="full">
                Login
              </IonButton>
            </form>
            <IonButton
              type="button"
              className="ion-margin-top"
              expand="full"
              onClick={signInWithGoogle}
            >
              Login cu Google
              <IonIcon icon={logoGoogle} slot="start" />
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
