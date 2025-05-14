<template>
  <div class="p-4 space-x-4">
    <h1 class="text-2xl font-bold mb-4">Reservations</h1>

    <!-- Search -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by name, phone, or passport"
      class="w-full max-w-md mb-4 p-2 border border-gray-800 rounded "
    />

    <!-- Add Button -->
    <button @click="showAddModal" class="p-2 bg-blue-500 text-white rounded mb-4 ">
      Add Reservation
    </button>

    <!-- Modal Form -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 class="text-xl font-semibold mb-4">{{ editingId ? "Edit" : "Add" }} Reservation</h2>

        <input v-model="newReservation.name" placeholder="Name" class="w-full p-2 border border-gray-300 rounded mb-2" />

        <div class="mb-2">
          <label class="mr-2">
            <input type="radio" v-model="newReservation.isKhmer" :value="true" /> Khmer
          </label>
          <label class="ml-4">
            <input type="radio" v-model="newReservation.isKhmer" :value="false" /> Foreigner
          </label>
        </div>

        <div v-if="newReservation.isKhmer" class="mb-2">
          <input v-model="newReservation.phoneNumber" placeholder="Phone Number" class="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div v-else class="mb-2">
          <input v-model="newReservation.passportNumber" placeholder="Passport Number" class="w-full p-2 border border-gray-300 rounded mb-2" />
          <input v-model="newReservation.nationality" placeholder="Nationality" class="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div class="mb-2">
          <label class="block text-sm mb-1">Check-In Date:</label>
          <input type="date" v-model="newReservation.checkInDate" class="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-sm mb-1">Check-Out Date:</label>
          <input type="date" v-model="newReservation.checkOutDate" class="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div class="flex justify-end">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
          <button @click="submitReservation" class="px-4 py-2 bg-blue-500 text-white rounded">
            {{ editingId ? "Update" : "Save" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <DataTableComponent
      :headers="headers"
      :data="filteredReservations"
      @delete="deleteReservation"
      @edit="editReservation"
    />
  </div>
</template>

<script>
import DataTableComponent from "../components/DataTableComponent.vue";
import {
  addReservation,
  updateReservationById,
  fetchReservations,
  deleteReservationById,
  fetchReservationById,
} from "../data/Reservation";

export default {
  components: { DataTableComponent },
  data() {
    return {
      showModal: false,
      editingId: null,
      searchQuery: "",
      reservations: [],
      headers: ["Name", "Type", "Contact", "Check-In", "Check-Out"],
      newReservation: {
        name: "",
        isKhmer: true,
        phoneNumber: "",
        passportNumber: "",
        nationality: "",
        checkInDate: "",
        checkOutDate: "",
      },
    };
  },
  computed: {
    filteredReservations() {
      const query = this.searchQuery.toLowerCase();
      return this.reservations.filter((res) => {
        const name = res.values[0]?.toLowerCase() || "";
        const contact = res.values[2]?.toLowerCase() || "";
        return name.includes(query) || contact.includes(query);
      });
    },
  },
  async created() {
    await this.loadReservations();
  },
  methods: {
    async loadReservations() {
      const fetched = await fetchReservations();
      this.reservations = fetched.map((doc) => ({
        id: doc.id,
        values: [
          doc.name,
          doc.isKhmer ? "Khmer" : "Foreigner",
          doc.isKhmer
            ? doc.phoneNumber
            : `${doc.passport?.passportNumber} (${doc.passport?.nationality})`,
          doc.checkInDate,
          doc.checkOutDate,
        ],
      }));
    },
    showAddModal() {
      this.resetForm();
      this.showModal = true;
      this.editingId = null;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    async submitReservation() {
      const data = {
        name: this.newReservation.name,
        isKhmer: this.newReservation.isKhmer,
        checkInDate: this.newReservation.checkInDate,
        checkOutDate: this.newReservation.checkOutDate,
        phoneNumber: this.newReservation.isKhmer ? this.newReservation.phoneNumber : null,
        passport: !this.newReservation.isKhmer
          ? {
              passportNumber: this.newReservation.passportNumber,
              nationality: this.newReservation.nationality,
            }
          : null,
      };

      if (this.editingId) {
        await updateReservationById(this.editingId, data);
      } else {
        await addReservation(data);
      }

      this.closeModal();
      await this.loadReservations();
    },
    async deleteReservation(id) {
  const confirmDelete = confirm("Do you want to delete this reservation?");
  if (!confirmDelete) return;

  await deleteReservationById(id);
  await this.loadReservations();
},

    async editReservation(id) {
      const doc = await fetchReservationById(id);
      this.editingId = id;
      this.newReservation = {
        name: doc.name,
        isKhmer: doc.isKhmer,
        phoneNumber: doc.phoneNumber || "",
        passportNumber: doc.passport?.passportNumber || "",
        nationality: doc.passport?.nationality || "",
        checkInDate: doc.checkInDate,
        checkOutDate: doc.checkOutDate,
      };
      this.showModal = true;
    },
    resetForm() {
      this.newReservation = {
        name: "",
        isKhmer: true,
        phoneNumber: "",
        passportNumber: "",
        nationality: "",
        checkInDate: "",
        checkOutDate: "",
      };
    },
  },
};
</script>
