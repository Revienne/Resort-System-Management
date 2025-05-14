<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-300 rounded">
      <thead class="bg-blue-900">
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="px-4 py-2 border-b border-gray-300 text-left text-white"
          >
            {{ header }}
          </th>
          <th class="px-4 py-2 border-b border-gray-300 text-left text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          :class="{'bg-white': rowIndex % 2 === 0, 'bg-gray-100': rowIndex % 2 !== 0}"
        >
          <td
            v-for="(cell, cellIndex) in row.values"
            :key="cellIndex"
            class="px-4 py-2 border-b border-gray-300"
          >
            {{ cell }}
          </td>
          <td class="px-4 py-2 border-b border-gray-300">
            <button
              class="text-blue-500 hover:underline mr-2"
              @click="$emit('edit', row.id)"
            >
              Edit
            </button>
            <button
              class="text-red-500 hover:underline"
              @click="$emit('delete', row.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
      // Each row: { id: FirebaseDocID, values: [col1, col2, col3...] }
    },
  },
};
</script>
