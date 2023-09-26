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
import React, { createContext } from "react";
import Avizier from "./Avizier";
import { Route } from "react-router";
import Docs from "./Docs";
import Profil from "./Profil";
import Plata from "./Plata";

const isMemberContext = createContext<boolean>(false);

const Home: React.FC = () => {
  let isMember = false;
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
          <Route path="/home/profil" component={Profil}></Route>
          <Route path="/plata/">
            <Plata isMember={isMember}></Plata>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Avizier" href="/home/avizier">
            <IonIcon icon={home} />
          </IonTabButton>
          <IonTabButton tab="contact" href="/home/docs">
            <IonIcon icon={document} />
          </IonTabButton>
          <IonTabButton tab="settings" href="/home/profil">
            <IonIcon icon={personCircle} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </isMemberContext.Provider>
  );
};

export default Home;
