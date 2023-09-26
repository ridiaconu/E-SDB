import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonText,
} from "@ionic/react";

const Plata: React.FC<{ isMember: boolean }> = ({ isMember }) => {
  const doLogin = (event: any) => {
    event.preventDefault();
    console.log("doLogin");
  };
  switch (isMember) {
    case true:
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Plata cotizatie</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="ion-padding">
              <h1 className="ion-text-center">Plata Cotizatie</h1>
              <h2 className="ion-text-center ion-margin-top">Date Platitor</h2>
              <IonCard>
                <IonCardContent>
                  <form onSubmit={doLogin}>
                    <IonInput
                      label="Nume"
                      labelPlacement="floating"
                      fill="outline"
                    />
                    <IonInput
                      label="Prenume"
                      labelPlacement="floating"
                      fill="outline"
                      className="ion-margin-top"
                    />
                    <IonInput
                      label="Adresa de E-mail"
                      labelPlacement="floating"
                      type="email"
                      fill="outline"
                      className="ion-margin-top"
                    />
                    <IonInput
                      label="Telefon"
                      labelPlacement="floating"
                      type="tel"
                      fill="outline"
                      className="ion-margin-top"
                    />

                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          {" "}
                          <IonInput
                            label="Oras de domiciliu"
                            labelPlacement="floating"
                            fill="outline"
                          />
                        </IonCol>
                        <IonCol>
                          <IonItem className="ion-margin-top">
                            {" "}
                            <IonList>
                              <IonItem>
                                <IonSelect
                                  className="never-flip"
                                  aria-label="Tara"
                                  interface="action-sheet"
                                  placeholder="Tara"
                                >
                                  <IonSelectOption value="RO">
                                    Romania
                                  </IonSelectOption>
                                  <IonSelectOption value="EU">
                                    Spatiul Economic European
                                  </IonSelectOption>
                                  <IonSelectOption value="NOEU">
                                    Tara in afara spatiului econimic european
                                  </IonSelectOption>
                                </IonSelect>
                              </IonItem>
                            </IonList>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonInput
                            label="Suma"
                            labelPlacement="floating"
                            type="number"
                            fill="outline"
                          />
                        </IonCol>
                        <IonCol className="ion-align-self-center">
                          <IonText>
                            {" "}
                            <h2>RON</h2>
                          </IonText>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                    <IonButton
                      routerLink="/home/avizier"
                      type="button"
                      className="ion-margin-top"
                      expand="full"
                    >
                      Plateste
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </div>
          </IonContent>
        </IonPage>
      );
      break;
    case false:
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Donatie</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="ion-padding">
              <h1 className="ion-text-center">Doneaza SDB</h1>
              <h2 className="ion-text-center ion-margin-top">Date Platitor</h2>
              <IonCard>
                <IonCardContent>
                  <form onSubmit={doLogin}>
                    <IonInput
                      label="Nume"
                      labelPlacement="floating"
                      fill="outline"
                    />
                    <IonInput
                      label="Prenume"
                      labelPlacement="floating"
                      fill="outline"
                      className="ion-margin-top"
                    />
                    <IonInput
                      label="Adresa de E-mail"
                      labelPlacement="floating"
                      type="email"
                      fill="outline"
                      className="ion-margin-top"
                    />
                    <IonInput
                      label="Telefon"
                      labelPlacement="floating"
                      type="tel"
                      fill="outline"
                      className="ion-margin-top"
                    />

                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          {" "}
                          <IonInput
                            label="Oras de domiciliu"
                            labelPlacement="floating"
                            fill="outline"
                          />
                        </IonCol>
                        <IonCol>
                          <IonItem className="ion-margin-top">
                            {" "}
                            <IonList>
                              <IonItem>
                                <IonSelect
                                  className="never-flip"
                                  aria-label="Tara"
                                  interface="action-sheet"
                                  placeholder="Tara"
                                >
                                  <IonSelectOption value="RO">
                                    Romania
                                  </IonSelectOption>
                                  <IonSelectOption value="EU">
                                    Spatiul Economic European
                                  </IonSelectOption>
                                  <IonSelectOption value="NOEU">
                                    Tara in afara spatiului econimic european
                                  </IonSelectOption>
                                </IonSelect>
                              </IonItem>
                            </IonList>
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonInput
                            label="Suma"
                            labelPlacement="floating"
                            type="number"
                            fill="outline"
                          />
                        </IonCol>
                        <IonCol className="ion-align-self-center">
                          <IonText>
                            {" "}
                            <h2>RON</h2>
                          </IonText>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                    <IonButton
                      routerLink="/home/avizier"
                      type="button"
                      className="ion-margin-top"
                      expand="full"
                    >
                      Plateste
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </div>
          </IonContent>
        </IonPage>
      );
      break;
  }
};

export default Plata;
