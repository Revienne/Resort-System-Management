<!-- Roomtype.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Room Types</h1>
    <form @submit.prevent="addRoomType" class="mb-4">
      <input
        v-model="newRoomType"
        placeholder="Enter room type"
        class="p-2 border border-gray-300 rounded"
        required
      />
      <button type="submit" class="ml-2 p-2 bg-blue-500 text-white rounded">
        Add Room Type
      </button>
    </form>
    <DataTableComponent :headers="headers" :data="roomTypes" />
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
      newRoomType: "",
      roomTypes: [],
      headers: ["Room Type"],
    };
  },
  async created() {
    await this.fetchRoomTypes();
  },
  methods: {
    async addRoomType() {
      if (this.newRoomType.trim()) {
        await addDoc(collection(db, "roomTypes"), {
          name: this.newRoomType,
        });
        this.newRoomType = "";
        await this.fetchRoomTypes();
      }
    },
    async fetchRoomTypes() {
      const querySnapshot = await getDocs(collection(db, "roomTypes"));
      this.roomTypes = querySnapshot.docs.map((doc) => [doc.data().name]);
    },
  },
};
</script>