<template>
  <div class="flex min-h-screen">
    <!-- Left Side (Logo & Branding) -->
    <div class="hidden lg:flex items-center justify-center w-1/2 bg-white">
      <div class="text-center">
        <img src="../assets/images/LogoResort.jpg" alt="NSOC Dashboard Logo" class="h-30 mx-auto">
        <h1 class="mt-4 text-2xl font-bold text-blue-600">Vimean Sovannaphoum Resort</h1>
        <p class="text-gray-500 mt-2">System Management</p>
      </div>
    </div>

    <!-- Right Side (Login Form) -->
    <div class="flex w-full lg:w-1/2 items-center justify-center bg-blue-600 px-8 py-12">
      <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>

        <form @submit.prevent="login" class="mt-6 space-y-4">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Your email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <!-- Remember Me -->
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center space-x-2">
              <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <span class="text-gray-600">Remember me</span>
            </label>
          </div>

          <!-- Sign-in Button -->
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router' 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter() 

    const login = async () => {
      const login = async () => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('Login successful!');
    localStorage.setItem("auth_token", "your-auth-token-here");  // Set the token here
    router.push('/dashboard');
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
}

  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    // Set a flag or token in localStorage after successful login
    localStorage.setItem("auth_token", "your-auth-token-here");  // Example
    alert('Login successful!');
    router.push('/dashboard');  // This should redirect to the dashboard
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
}


    return {
      email,
      password,
      login
    }
  }
}
</script>
