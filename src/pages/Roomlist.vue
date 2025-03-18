<!-- Roomlist.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Room List</h1>
    <form @submit.prevent="addRoom" class="mb-4">
      <input
        v-model="newRoomId"
        placeholder="Enter Room ID"
        class="p-2 border border-gray-300 rounded"
        required
      />
      <select
        v-model="selectedRoomType"
        class="ml-2 p-2 border border-gray-300 rounded"
        required
      >
        <option disabled value="">Select Room Type</option>
        <option v-for="(roomType, index) in roomTypes" :key="index">
          {{ roomType }}
        </option>
      </select>
      <button type="submit" class="ml-2 p-2 bg-blue-500 text-white rounded">
        Add Room
      </button>
    </form>
    <DataTableComponent :headers="headers" :data="rooms" />
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
      newRoomId: "",
      selectedRoomType: "",
      roomTypes: [],
      rooms: [],
      headers: ["Room ID", "Room Type"],
    };
  },
  async created() {
    await this.fetchRoomTypes();
    await this.fetchRooms();
  },
  methods: {
    async addRoom() {
      if (this.newRoomId.trim() && this.selectedRoomType) {
        await addDoc(collection(db, "rooms"), {
          roomId: this.newRoomId,
          roomType: this.selectedRoomType,
        });
        this.newRoomId = "";
        this.selectedRoomType = "";
        await this.fetchRooms();
      }
    },
    async fetchRoomTypes() {
      const querySnapshot = await getDocs(collection(db, "roomTypes"));
      this.roomTypes = querySnapshot.docs.map((doc) => doc.data().name);
    },
    async fetchRooms() {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      this.rooms = querySnapshot.docs.map((doc) => [
        doc.data().roomId,
        doc.data().roomType,
      ]);
    },
  },
};
</script>