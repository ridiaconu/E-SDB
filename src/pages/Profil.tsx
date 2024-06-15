import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { useHistory } from "react-router";
import { auth } from "../firebase";

const Profil: React.FC<{ isMember: boolean }> = ({ isMember }) => {
  const fireAuth = auth;
  const history = useHistory();
  const Logout = () => {
    try {
      signOut(auth);
      console.log("Logout successful");
      history.push("/");
      document.location.reload();
    } catch {
      console.log("ERR");
    }
  };
  const ChangePassword = async () => {
    try {
      const userEmail = auth.currentUser?.email;

      if (userEmail) {
        await sendPasswordResetEmail(auth, userEmail);

        await signOut(auth);

        console.log("Password reset email sent and user signed out");
        history.push("/");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  switch (isMember) {
    case true:
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Profil</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="ion-padding">
              <div color="primary">
                <h1 className="ion-text-center">
                  {auth.currentUser?.displayName}
                </h1>
              </div>
              <h2 className="ion-text-center ion-margin-top">Setari cont</h2>
              <IonButton
                className="ion-padding-top"
                expand="block"
                onClick={ChangePassword}
              >
                Schimba parola
              </IonButton>

              <IonButton
                className="ion-padding-top"
                expand="block"
                onClick={Logout}
              >
                Logout
              </IonButton>
            </div>
          </IonContent>
        </IonPage>
      );
    case false:
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Profil</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="ion-padding">
              <div color="primary">
                <h1 className="ion-text-center">
                  {auth.currentUser?.displayName}
                </h1>
              </div>
              <h2 className="ion-text-center ion-margin-top">Setari cont</h2>
              <IonButton
                className="ion-padding-top"
                expand="block"
                onClick={ChangePassword}
              >
                Schimba parola
              </IonButton>

              <IonButton
                className="ion-padding-top"
                expand="block"
                onClick={Logout}
              >
                Logout
              </IonButton>
            </div>
          </IonContent>
        </IonPage>
      );
  }
};

export default Profil;
