import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const decreaseValueMonthly = functions.pubsub
  .schedule("0 0 1 * *") // Trigger at midnight on the 1st day of each month
  .timeZone("UTC")
  .onRun(async () => {
    try {
      const collectionRef = admin.firestore().collection("members");
      const snapshot = await collectionRef.get();

      const batch = admin.firestore().batch();

      snapshot.forEach((doc) => {
        const currentValue = doc.data().nivelCotizatie;
        const decreasedValue = currentValue - 1;

        batch.update(collectionRef.doc(doc.id), {
          your_field_name: decreasedValue,
        });
      });

      await batch.commit();

      return null;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  });
