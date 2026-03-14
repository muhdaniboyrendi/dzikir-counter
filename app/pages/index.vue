<script setup>
const isLailatulQadr = ref(false);

const toggleLailatulQadr = () => {
  isLailatulQadr.value = !isLailatulQadr.value;
};
</script>

<template>
  <div class="relative min-h-dvh bg-primary font-primary pb-10">
    <!-- Background image -->
    <NuxtImg
      src="/llq.webp"
      width="400"
      loading="eager"
      quality="80"
      class="absolute top-0 left-0 w-full h-60 object-cover pointer-events-none rounded-b-4xl"
    />

    <!-- main content -->
    <div class="relative z-10 w-full">
      <Counter :is-lailatul-qadr="isLailatulQadr" />
      <Mode
        @lailatul-qadr="toggleLailatulQadr"
        :is-lailatul-qadr="isLailatulQadr"
      />
      <Footer />
    </div>
  </div>
</template>
