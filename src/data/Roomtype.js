import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc
} from "firebase/firestore";

const roomTypeRef = collection(db, "roomTypes");

export async function addRoomType(data) {
  try {
    const docRef = await addDoc(roomTypeRef, data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding room type:", error);
    throw error;
  }
}

export async function fetchRoomTypes() {
  try {
    const snapshot = await getDocs(roomTypeRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching room types:", error);
    return [];
  }
}

export async function fetchRoomTypeById(id) {
  try {
    const docSnap = await getDoc(doc(db, "roomTypes", id));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("Room type not found");
    }
  } catch (error) {
    console.error("Error fetching room type by ID:", error);
    throw error;
  }
}

export async function updateRoomTypeById(id, data) {
  try {
    await updateDoc(doc(db, "roomTypes", id), data);
  } catch (error) {
    console.error("Error updating room type:", error);
    throw error;
  }
}

export async function deleteRoomTypeById(id) {
  try {
    await deleteDoc(doc(db, "roomTypes", id));
  } catch (error) {
    console.error("Error deleting room type:", error);
    throw error;
  }
}
