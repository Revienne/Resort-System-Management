<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Room List</h1>

    <button @click="showAddModal" class="p-2 bg-green-500 text-white rounded mb-4">
      Add Room
    </button>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 class="text-xl font-semibold mb-4">Add Room</h2>

        <input v-model="newRoom.roomNumber" placeholder="Room Number" class="w-full p-2 border border-gray-300 rounded mb-2" />

        <select v-model="newRoom.roomTypeId" @change="updatePrice" class="w-full p-2 border border-gray-300 rounded mb-2">
          <option disabled value="">Select Room Type</option>
          <option v-for="type in roomTypes" :key="type.id" :value="type.id">
            {{ type.roomType }}
          </option>
        </select>

        <input v-model="newRoom.price" disabled class="w-full p-2 border border-gray-300 rounded mb-4" />

        <div class="flex justify-end">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
          <button @click="submitRoom" class="px-4 py-2 bg-green-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <DataTableComponent
      :headers="['Room Number', 'Room Type', 'Price']"
      :data="roomList"
      @delete="deleteRoom"
    />
  </div>
</template>

<script>
import DataTableComponent from "../components/DataTableComponent.vue";
import {
  fetchRoomTypes
} from "../data/RoomType";
import {
  fetchRooms,
  addRoom,
  deleteRoomById
} from "../data/RoomList";

export default {
  components: { DataTableComponent },
  data() {
    return {
      roomTypes: [],
      roomList: [],
      showModal: false,
      newRoom: {
        roomNumber: "",
        roomTypeId: "",
        price: ""
      }
    };
  },
  async created() {
    await this.loadRoomTypes();
    await this.loadRooms();
  },
  methods: {
    async loadRoomTypes() {
      this.roomTypes = await fetchRoomTypes();
    },
    async loadRooms() {
      const fetched = await fetchRooms();
      this.roomList = fetched.map(room => ({
        id: room.id,
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        price: room.price,
        values: [room.roomNumber, room.roomType, `$${room.price}`]
      }));
    },
    showAddModal() {
      this.newRoom = { roomNumber: "", roomTypeId: "", price: "" };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    updatePrice() {
      const selected = this.roomTypes.find(rt => rt.id === this.newRoom.roomTypeId);
      if (selected) {
        this.newRoom.price = selected.price;
      }
    },
    async submitRoom() {
  const selected = this.roomTypes.find(rt => rt.id === this.newRoom.roomTypeId);
  if (!this.newRoom.roomNumber || !selected) {
    alert("Please enter a room number and select a room type.");
    return;
  }

  // ✅ Check for duplicate room number
  const duplicate = this.roomList.find(
    room => room.roomNumber === this.newRoom.roomNumber
  );

  if (duplicate) {
    alert("This room number already exists.");
    return;
  }

  // ✅ Proceed with adding the room
  const data = {
    roomNumber: this.newRoom.roomNumber,
    roomType: selected.roomType,
    price: selected.price
  };

  await addRoom(data);
  this.closeModal();
  await this.loadRooms();  // Make sure to reload the room list
}
,
    async deleteRoom(id) {
      const confirmDelete = confirm("Do you want to delete this room?");
      if (!confirmDelete) return;

      await deleteRoomById(id);
      await this.loadRooms();
    }
  }
};
</script>

