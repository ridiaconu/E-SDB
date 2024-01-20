import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

let fireDB = db;

const Organigrama: React.FC = () => {
  const { context } = useParams<{ context: string }>();

  const [filialeJudetene, setFilialeJudetene] = useState<
    Array<String> | undefined
  >(undefined);
  const [filialeLocale, setFilialeLocale] = useState<Array<String> | undefined>(
    undefined
  );

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

  switch (context) {
    case "Central":
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Birou National</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonCard>
              <img
                alt="Silhouette of mountains"
                src="https://static.boredpanda.com/blog/wp-content/uploads/2018/12/ai-image-generation-fake-faces-people-nvidia-5c18b207b7231__700.jpg"
              />
              <IonCardHeader>
                <IonCardTitle>Presedinte</IonCardTitle>
                <IonCardSubtitle>Un smecher</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <IonCardTitle className="ion-padding">
                Vicepresedinti
              </IonCardTitle>
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <img
                        alt="Silhouette of mountains"
                        src="https://2.bp.blogspot.com/-wUD2SGHiBCg/XGVk3D2_6FI/AAAAAAACkqc/LWNsgSdN5YwQNqy7IsRj95GrjqauK5ZzACLcBGAs/s1600/thispersondoesnotexist-2.jpg"
                      />
                    </IonThumbnail>
                    <IonLabel>Dan Bazatu</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <img
                        alt="Silhouette of mountains"
                        src="https://i.redd.it/hcpu7df05tg21.jpg"
                      />
                    </IonThumbnail>
                    <IonLabel>Cristy</IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Membrii Biroului National</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonList>
                  <IonItem>Ion frizeru</IonItem>
                  <IonItem>Un smecher</IonItem>
                  <IonItem>Un hardicapat</IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      );
      break;
    case "Judetean":
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Birou Judetean</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              <IonItem>
                <IonSelect interface="action-sheet" placeholder="Select fruit">
                  <IonSelectOption value="apples">Apples</IonSelectOption>
                  <IonSelectOption value="oranges">Oranges</IonSelectOption>
                  <IonSelectOption value="bananas">Bananas</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>

            <IonCard>
              <img
                alt="Silhouette of mountains"
                src="https://static.boredpanda.com/blog/wp-content/uploads/2018/12/ai-image-generation-fake-faces-people-nvidia-5c18b207b7231__700.jpg"
              />
              <IonCardHeader>
                <IonCardTitle>Presedinte</IonCardTitle>
                <IonCardSubtitle>Un smecher</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <IonCardTitle className="ion-padding">
                Vicepresedinti
              </IonCardTitle>
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <img
                        alt="Silhouette of mountains"
                        src="https://2.bp.blogspot.com/-wUD2SGHiBCg/XGVk3D2_6FI/AAAAAAACkqc/LWNsgSdN5YwQNqy7IsRj95GrjqauK5ZzACLcBGAs/s1600/thispersondoesnotexist-2.jpg"
                      />
                    </IonThumbnail>
                    <IonLabel>Dan Bazatu</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <img
                        alt="Silhouette of mountains"
                        src="https://i.redd.it/hcpu7df05tg21.jpg"
                      />
                    </IonThumbnail>
                    <IonLabel>Cristy</IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Membrii Biroului Judetean</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonList>
                  <IonItem>Ion frizeru</IonItem>
                  <IonItem>Un smecher</IonItem>
                  <IonItem>Un hardicapat</IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      );
      break;
    case "Local":
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Birou Local</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              <IonItem>
                <IonSelect interface="action-sheet" placeholder="Select fruit">
                  <IonSelectOption value="apples">Apples</IonSelectOption>
                  <IonSelectOption value="oranges">Oranges</IonSelectOption>
                  <IonSelectOption value="bananas">Bananas</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>

            <IonCard>
              <img
                alt="Silhouette of mountains"
                src="https://static.boredpanda.com/blog/wp-content/uploads/2018/12/ai-image-generation-fake-faces-people-nvidia-5c18b207b7231__700.jpg"
              />
              <IonCardHeader>
                <IonCardTitle>Presedinte</IonCardTitle>
                <IonCardSubtitle>Un smecher</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
            <IonCard>
              <IonCardTitle className="ion-padding">
                Vicepresedinti
              </IonCardTitle>
              <IonCardContent>
                <IonList>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <img
                        alt="Silhouette of mountains"
                        src="https://2.bp.blogspot.com/-wUD2SGHiBCg/XGVk3D2_6FI/AAAAAAACkqc/LWNsgSdN5YwQNqy7IsRj95GrjqauK5ZzACLcBGAs/s1600/thispersondoesnotexist-2.jpg"
                      />
                    </IonThumbnail>
                    <IonLabel>Dan Bazatu</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <img
                        alt="Silhouette of mountains"
                        src="https://i.redd.it/hcpu7df05tg21.jpg"
                      />
                    </IonThumbnail>
                    <IonLabel>Cristy</IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Membrii Biroului Local</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonList>
                  <IonItem>Ion frizeru</IonItem>
                  <IonItem>Un smecher</IonItem>
                  <IonItem>Un hardicapat</IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      );
      break;
  }
};

export default Organigrama;
