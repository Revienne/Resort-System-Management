<template>
    <div class="flex min-h-screen">
      <!-- Left Side (Logo & Branding) -->
      <div class="hidden lg:flex items-center justify-center w-1/2 bg-white">
        <div class="text-center">
          <img src="../assets/images/LogoResort.jpg" alt="NSOC Dashboard Logo" class="h-30 mx-auto">
          <h1 class="mt-4 text-2xl font-bold text-blue-600">Vimean Sovannaphoum Resort</h1>
          <p class="text-gray-500 mt-2">System Manangment</p>
        </div>
      </div>
   
      <!-- Right Side (Login Form) -->
      <div class="flex w-full lg:w-1/2 items-center justify-center bg-blue-600 px-8 py-12">
        <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>
  
          <form class="mt-6 space-y-4">
            <!-- Email Input -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Your email</label>
              <input type="email" id="email" class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your email">
            </div>
  
            <!-- Password Input -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your password">
            </div>
  
            <!-- Remember Me & Recover Password -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center space-x-2">
                <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
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
