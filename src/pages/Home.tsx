import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  person,
  call,
  settings,
  home,
  document,
  personCircle,
} from "ionicons/icons";
import React, { createContext, useEffect, useState } from "react";
import Avizier from "./Avizier";
import { Route } from "react-router";
import Docs from "./Docs";
import Profil from "./Profil";
import Plata from "./Plata";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import Dashboard from "./Dashboard";

const isMemberContext = createContext<boolean>(false);
const isAdminContext = createContext<boolean>(false);

const Home: React.FC = () => {
  const fireAuth = auth;
  auth.setPersistence(browserLocalPersistence);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  async function getMemberStatus(): Promise<boolean> {
    const fireDb = db;

    const user = auth.currentUser;
    const uid = user ? user.uid : null;
    let memberStatus: boolean;

    if (uid) {
      const docref = doc(db, "users", uid);

      const docSnap = await getDoc(docref);

      if (docSnap.exists()) {
        memberStatus = docSnap.data().isMember;
        if (memberStatus == true) {
          //console.log("membru");
          return true;
        } else {
          //console.log("numembu");
          return false;
        }
      } else {
        console.log("User has been created");
        return false;
      }
    } else {
      console.log("user does not exist");
      return false;
    }
  }

  async function getAdminStatus(): Promise<boolean> {
    let user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "users", uid);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          //console.log("Member data:", docSnap.data());
          return docSnap.data()?.isAdmin;
        } else {
          console.log("Member does not exist");
          return false;
        }
      } catch (error) {
        console.error("Error getting member data:", error);
        throw error;
      }
    } else {
      console.log("User is not authenticated");
      return false;
    }
  }

  useEffect(() => {
    async function fetchMemberStatus() {
      const memberStatus = await getMemberStatus();
      //localStorage.setItem(isMember, memberStatus);
      setIsMember(memberStatus);
    }
    fetchMemberStatus();
  }, []);
  useEffect(() => {
    async function fetchAdminStatus() {
      const adminStatus = await getAdminStatus();
      setIsAdmin(adminStatus);
    }
    fetchAdminStatus();
  }, []);
  return (
    <isMemberContext.Provider value={isMember}>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home/avizier">
            <Avizier isMember={isMember} />
          </Route>
          <Route path="/home/docs">
            <Docs isMember={isMember} />
          </Route>
          <Route path="/home/profil">
            <Profil isMember={isMember} />
          </Route>
          <Route path="/plata/">
            <Plata isMember={isMember}></Plata>
          </Route>
          <Route path="/home/dash">
            <Dashboard isMember={isMember && isAdmin} />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Avizier" href="/home/avizier">
            <IonIcon icon={home} />
          </IonTabButton>
          <IonTabButton tab="contact" href="/home/docs">
            <IonIcon icon={document} />
          </IonTabButton>
          {isAdmin && isMember ? (
            <IonTabButton tab="admin" href="/home/dash">
              <IonIcon icon={settings} />
            </IonTabButton>
          ) : null}
          <IonTabButton tab="settings" href="/home/profil">
            <IonIcon icon={personCircle} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </isMemberContext.Provider>
  );
};

export default Home;
