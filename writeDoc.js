import { firestore } from "./firebaseConfig.js";

export const writeData = async newData => {
  try {
    const notificationRef = firestore
      .collection("users")
      .doc("croosdev@gmail.com")
      .collection("notifications");
    await notificationRef.add(newData); // Auto-generate a document ID
  } catch (error) {
    console.error("Error adding notification:", error);
  }
};
