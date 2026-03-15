<script setup>
const props = defineProps({
  isLailatulQadr: {
    type: Boolean,
  },
});

const emit = defineEmits(["lailatulQadr"]);
</script>

<template>
  <div class="px-4 mb-10">
    <button
      @click="emit('lailatulQadr')"
      type="button"
      class="w-full max-w-lg mx-auto h-15 bg-secondary dark:bg-dark-secondary rounded-2xl flex justify-center items-center active:scale-97 transition text-primary dark:text-dark-text-primary text-xl cursor-pointer"
    >
      {{ props.isLailatulQadr ? "Mode Biasa" : "Mode Lailatul Qodar" }}
    </button>
  </div>
</template>
