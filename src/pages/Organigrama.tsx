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
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useParams } from "react-router-dom";

const Organigrama: React.FC = () => {
  const { context } = useParams<{ context: string }>();

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
