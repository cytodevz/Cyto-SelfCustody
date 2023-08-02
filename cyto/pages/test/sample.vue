<template>
  <div class="bg-gray-900 text-white py-5">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">My Portfolio</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="#" class="hover:text-gray-400">Home</a></li>
          <li><a href="#" class="hover:text-gray-400">About</a></li>
          <li><a href="#" class="hover:text-gray-400">Projects</a></li>
          <li><a href="#" class="hover:text-gray-400">Contact</a></li>
        </ul>
      </nav>
    </div>
  </div>

  <main class="container mx-auto py-10">
    <section class="mb-10">
      <h2 class="text-3xl font-bold mb-4">About Me</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </section>

    <section class="mb-10">
      <h2 class="text-3xl font-bold mb-4">Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 shadow-md">
          <h3 class="text-xl font-bold mb-2">Project 1</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="bg-white p-6 shadow-md">
          <h3 class="text-xl font-bold mb-2">Project 2</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-3xl font-bold mb-4">Contact Me</h2>
      <form>
        <div class="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Name" class="border border-gray-300 rounded-md px-4 py-2">
          <input type="email" placeholder="Email" class="border border-gray-300 rounded-md px-4 py-2">
        </div>
        <textarea placeholder="Message" class="border border-gray-300 rounded-md px-4 py-2 mt-4"></textarea>
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mt-4">Submit</button>
      </form>
    </section>
  </main>

  <footer class="bg-gray-900 text-white py-5">
    <div class="container mx-auto text-center">
      &copy; 2023 My Portfolio. All rights reserved.
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>

</style>