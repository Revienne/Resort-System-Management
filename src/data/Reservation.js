import { db } from "../firebase"; // adjust the path if needed
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const reservationRef = collection(db, "reservations");

export async function addReservation(data) {
  try {
    const docRef = await addDoc(reservationRef, data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding reservation:", error);
    throw error;
  }
}

export async function fetchReservations() {
  try {
    const snapshot = await getDocs(reservationRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
}

export async function fetchReservationById(id) {
  try {
    const docSnap = await getDoc(doc(db, "reservations", id));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("Reservation not found");
    }
  } catch (error) {
    console.error("Error fetching reservation by ID:", error);
    throw error;
  }
}

export async function updateReservationById(id, data) {
  try {
    await updateDoc(doc(db, "reservations", id), data);
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
}

export async function deleteReservationById(id) {
  try {
    await deleteDoc(doc(db, "reservations", id));
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
}
