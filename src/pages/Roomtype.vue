<template>
  <div class="p-4 space-x-4">
    <h1 class="text-2xl font-bold mb-4">Room Types</h1>

    <button @click="showAddModal" class="p-2 bg-blue-500 text-white rounded mb-4">
      Add Room Type
    </button>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 class="text-xl font-semibold mb-4">{{ editingId ? "Edit" : "Add" }} Room Type</h2>

        <input v-model="newRoom.roomType" placeholder="Room Type" class="w-full p-2 border border-gray-300 rounded mb-2" />
        <input v-model="newRoom.price" type="number" placeholder="Price" class="w-full p-2 border border-gray-300 rounded mb-4" />

        <div class="flex justify-end">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
          <button @click="submitRoom" class="px-4 py-2 bg-blue-500 text-white rounded">
            {{ editingId ? "Update" : "Save" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <DataTableComponent
      :headers="headers"
      :data="roomTypes"
      @delete="deleteRoom"
      @edit="editRoom"
    />
  </div>
</template>

<script>
import DataTableComponent from "../components/DataTableComponent.vue";
import {
  addRoomType,
  fetchRoomTypes,
  fetchRoomTypeById,
  updateRoomTypeById,
  deleteRoomTypeById,
} from "../data/RoomType";

import { fetchRooms } from "../data/RoomList"; // ✅ Import room list

export default {
  components: { DataTableComponent },
  data() {
    return {
      headers: ["Room Type", "Price", "Number of Rooms"],
      roomTypes: [],
      showModal: false,
      editingId: null,
      newRoom: {
        roomType: "",
        price: ""
      }
    };
  },
  async created() {
    await this.loadRooms();
  },
  methods: {
    async loadRooms() {
      const [roomTypes, rooms] = await Promise.all([fetchRoomTypes(), fetchRooms()]);

      this.roomTypes = roomTypes.map((type) => {
        const count = rooms.filter((room) => room.roomType === type.roomType).length;
        return {
          id: type.id,
          values: [type.roomType, `$${type.price}`, count]
        };
      });
    },
    showAddModal() {
      this.resetForm();
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    async submitRoom() {
  const trimmedType = this.newRoom.roomType.trim().toLowerCase();

  if (!trimmedType || !this.newRoom.price) {
    alert("Please fill in both Room Type and Price.");
    return;
  }

  const isDuplicate = this.roomTypes.some(rt =>
    rt.values[0].toLowerCase() === trimmedType &&
    (!this.editingId || rt.id !== this.editingId)
  );

  if (isDuplicate) {
    alert("This room type already exists.");
    return;
  }

  const data = {
    roomType: this.newRoom.roomType.trim(),
    price: parseFloat(this.newRoom.price)
  };

  if (this.editingId) {
    await updateRoomTypeById(this.editingId, data);
  } else {
    await addRoomType(data);
  }

  this.closeModal();
  await this.loadRooms();
}
,
    async deleteRoom(id) {
      const confirmDelete = confirm("Do you want to delete this room type?");
      if (!confirmDelete) return;

      await deleteRoomTypeById(id);
      await this.loadRooms();
    },
    async editRoom(id) {
      const doc = await fetchRoomTypeById(id);
      this.editingId = id;
      this.newRoom = {
        roomType: doc.roomType,
        price: doc.price
      };
      this.showModal = true;
    },
    resetForm() {
      this.newRoom = { roomType: "", price: "" };
      this.editingId = null;
    }
  }
};
</script>
