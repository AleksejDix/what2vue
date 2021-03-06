<template>
  <div>
    <div class="bg-gray-800 h-64">
      <div class="flex items-center justify-center h-32">
        <h1 class="text-white text-5xl font-extralight">
          <portal-target name="title"></portal-target>
        </h1>
      </div>
    </div>
    <main class="-mt-32">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow px-4 py-6 sm:px-4">
          <slot></slot>
        </div>
      </div>
    </main>
  </div>
</template>
