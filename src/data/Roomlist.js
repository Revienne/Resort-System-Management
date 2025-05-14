import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

const roomListRef = collection(db, "roomList");

export async function addRoom(data) {
  try {
    const docRef = await addDoc(roomListRef, data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
}

export async function fetchRooms() {
  try {
    const snapshot = await getDocs(roomListRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

export async function deleteRoomById(id) {
  try {
    await deleteDoc(doc(db, "roomList", id));
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
}
