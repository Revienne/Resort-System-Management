<!-- Reservation.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Reservations</h1>
    <form @submit.prevent="addReservation" class="mb-4">
      <input
        v-model="newName"
        placeholder="Enter Name"
        class="p-2 border border-gray-300 rounded"
        required
      />
      <input
        v-model="newPhoneNumber"
        placeholder="Enter Phone Number"
        class="ml-2 p-2 border border-gray-300 rounded"
        required
      />
      <input
        v-model="newReservationDate"
        type="date"
        class="ml-2 p-2 border border-gray-300 rounded"
        required
      />
      <button type="submit" class="ml-2 p-2 bg-blue-500 text-white rounded">
        Add Reservation
      </button>
    </form>
    <DataTableComponent :headers="headers" :data="reservations" />
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import DataTableComponent from "../components/DataTableComponent.vue";


export default {
  components: {
    DataTableComponent,
  },
  data() {
    return {
      newName: "",
      newPhoneNumber: "",
      newReservationDate: "",
      reservations: [],
      headers: ["Name", "Phone Number", "Reservation Date"],
    };
  },
  async created() {
    await this.fetchReservations();
  },
  methods: {
    async addReservation() {
      if (this.newName.trim() && this.newPhoneNumber.trim() && this.newReservationDate) {
        await addDoc(collection(db, "reservations"), {
          name: this.newName,
          phoneNumber: this.newPhoneNumber,
          reservationDate: this.newReservationDate,
        });
        this.newName = "";
        this.newPhoneNumber = "";
        this.newReservationDate = "";
        await this.fetchReservations();
      }
    },
    async fetchReservations() {
      const querySnapshot = await getDocs(collection(db, "reservations"));
      this.reservations = querySnapshot.docs.map((doc) => [
        doc.data().name,
        doc.data().phoneNumber,
        doc.data().reservationDate,
      ]);
    },
  },
};
</script>