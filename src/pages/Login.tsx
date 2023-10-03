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
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router";

const firebaseConfig = {
  apiKey: "AIzaSyD4FNczbTvmEg_84IB3OdC61dSvjeKRSYI",
  authDomain: "e-sdb-739c9.firebaseapp.com",
  projectId: "e-sdb-739c9",
  storageBucket: "e-sdb-739c9.appspot.com",
  messagingSenderId: "668871241198",
  appId: "1:668871241198:web:4aa2cd1a908e059b1d72ff",
  measurementId: "G-DNGK4D0Q9V",
};

const app = initializeApp(firebaseConfig);

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const history = useHistory(); // Initialize useHistory

  const doLogin = (event: React.FormEvent) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in:", user);
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
              <IonButton
                routerLink="/profil"
                type="button"
                className="ion-margin-top"
                expand="full"
              >
                Login cu Google
                <IonIcon icon={logoGoogle} slot="star" />
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
