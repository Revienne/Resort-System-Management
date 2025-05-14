import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

const roomCollection = collection(db, "roomTypes");

export async function addRoomType(data) {
  try {
    await addDoc(roomCollection, data);
  } catch (error) {
    console.error("Error adding room type:", error);
    throw error;
  }
}

export async function fetchRoomTypes() {
  try {
    const snapshot = await getDocs(roomCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      roomId: doc.data().roomId,
      roomType: doc.data().roomType,
      price: doc.data().price,
    }));
  } catch (error) {
    console.error("Error fetching room types:", error);
    return [];
  }
}

export async function deleteRoomById(id) {
  try {
    const roomRef = doc(db, "roomTypes", id);
    await deleteDoc(roomRef);
  } catch (error) {
    console.error("Error deleting room:", error);
  }
}
