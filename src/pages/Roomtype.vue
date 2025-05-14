<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Room Types</h1>

    <!-- Add Room Form -->
    <form @submit.prevent="addRoom" class="mb-6 space-y-4 max-w-md">
      <input
        v-model="newRoom.roomId"
        type="text"
        placeholder="Room ID or Number"
        class="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        v-model="newRoom.roomType"
        type="text"
        placeholder="Room Type (e.g., Deluxe, Single)"
        class="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        v-model="newRoom.price"
        type="number"
        placeholder="Price"
        class="w-full p-2 border border-gray-300 rounded"
        required
      />
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Room
      </button>
    </form>

    <!-- Room List Table -->
    <DataTableComponent
      :headers="headers"
      :data="rooms"
      @delete="deleteRoom"
      @edit="editRoom"
    />
  </div>
</template>

<script>
import DataTableComponent from "../components/DataTableComponent.vue";
import { addRoomType, fetchRoomTypes, deleteRoomById } from "../data/RoomType";

export default {
  components: { DataTableComponent },
  data() {
    return {
      newRoom: {
        roomId: "",
        roomType: "",
        price: null,
      },
      rooms: [],
      headers: ["Room ID", "Room Type", "Price"],
    };
  },
  async created() {
    await this.loadRooms();
  },
  methods: {
    async addRoom() {
      const data = {
        roomId: this.newRoom.roomId,
        roomType: this.newRoom.roomType,
        price: this.newRoom.price,
      };
      await addRoomType(data);
      this.newRoom = { roomId: "", roomType: "", price: null };
      await this.loadRooms();
    },
    async loadRooms() {
      this.rooms = await fetchRoomTypes();
    },
    async deleteRoom(id) {
      await deleteRoomById(id);
      await this.loadRooms();
    },
    editRoom(id) {
      alert(`Edit room with ID: ${id}`);
      // You can add logic to pre-fill the form with data for editing
    },
  },
};
</script>
