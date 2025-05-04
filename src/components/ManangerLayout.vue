<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r dark:bg-gray-800 dark:border-gray-700 fixed h-screen transition-transform duration-300 ease-in-out" :class="{ '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }">
      <div class="px-4 py-6">
        <!-- Logo -->
        <a href="#" class="flex items-center space-x-2">
          <img class="w-12 h-12" src="../assets/images/LogoResort.jpg" alt="Logo" />
          <span class="text-xl font-semibold text-gray-800 dark:text-white">System Management</span>
        </a>

        <!-- Navigation Links -->
        <nav class="mt-6">
          <ul class="space-y-2">
            <li v-for="item in navigation" :key="item.name">
              <RouterLink :to="item.to" class="flex items-center px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" :class="{ 'bg-gray-100 dark:bg-gray-700': isActive(item.to) }">
                <component :is="item.icon" class="w-5 h-5" />
                <span class="ml-3">{{ item.name }}</span>
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Sign Out Button -->
        <div class="mt-6">
          <button @click="signOut" class="flex items-center px-4 py-2 text-gray-700 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
            <ArrowLeftIcon class="w-5 h-5" />
            <span class="ml-3">Sign out</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 ml-64 transition-all duration-300 ease-in-out">
      <!-- Header -->
      <header class="bg-white shadow dark:bg-gray-900">
        <div class="px-4 py-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <!-- Toggle Sidebar Button (Mobile) -->
            <button @click="toggleSidebar" class="p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bars3Icon class="w-6 h-6" />
            </button>

            <!-- User Profile -->
            <div class="flex items-center space-x-4">
              <button class="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <BellIcon class="w-6 h-6" />
              </button>
              <div class="relative">
                <button @click="toggleUserMenu" class="flex items-center space-x-2 focus:outline-none">
                  <img class="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-200">John Doe</span>
                </button>

                <!-- User Dropdown Menu -->
                <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                  <ul class="py-2">
                    <li v-for="item in userNavigation" :key="item.name">
                      <a href="#" @click.prevent="item.action" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                        {{ item.name }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { Bars3Icon, BellIcon, HomeIcon, BuildingOfficeIcon, CalendarIcon, DocumentTextIcon, CogIcon, UserGroupIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';



// Sidebar state
const isSidebarOpen = ref(true);
const toggleSidebar = () => { isSidebarOpen.value = !isSidebar.value; };

// User menu state
const isUserMenuOpen = ref(false);
const toggleUserMenu = () => { isUserMenuOpen.value = !isUserMenuOpen.value; };

// Define the router
const router = useRouter();

// Sign out function
const signOut = () => {
  // Clear session or authentication data here if needed
  localStorage.removeItem("auth_token"); // Assuming you're storing auth data in localStorage
  router.push("/login");  // Redirect to login page
};



// Navigation links
const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: HomeIcon },  // Updated to match the path
  { name: 'Roomlist', to: '/roomlist', icon: BuildingOfficeIcon },
  { name: 'Roomtype', to: '/roomtype', icon: HomeIcon },
  { name: 'Staff', to: '/staff', icon: UserGroupIcon },
  { name: 'Reports', to: '/reports', icon: DocumentTextIcon },
  { name: 'Reservation', to: '/reservation', icon: CalendarIcon },
  { name: 'Settings', to: '/settings', icon: CogIcon },
];


// Check active route
const route = useRoute();
const isActive = (path) => route.path === path;
</script>
