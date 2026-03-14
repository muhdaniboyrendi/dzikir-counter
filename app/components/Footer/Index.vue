<script setup>
const colorMode = useColorMode();

const modes = [
  { value: "light", label: "Light", icon: "bi-sun" },
  { value: "dark", label: "Dark", icon: "bi-moon" },
  { value: "system", label: "System", icon: "bi-display" },
];
</script>

<template>
  <footer class="w-full py-6 px-4">
    <div
      class="w-fit mx-auto rounded-full flex justify-center items-center gap-1 p-1 border border-tertiary mb-4"
    >
      <button
        v-for="mode in modes"
        :key="mode.value"
        type="button"
        :title="mode.label"
        :class="[
          'w-7 h-7 aspect-square rounded-full flex justify-center items-center text-sm transition-colors',
          colorMode.preference === mode.value
            ? 'bg-secondary text-white'
            : 'bg-transparent text-secondary hover:bg-tertiary/20',
        ]"
        @click="colorMode.preference = mode.value"
      >
        <i :class="`bi ${mode.icon}`"></i>
      </button>
    </div>

    <div class="mb-4 text-center">
      <a href="#" target="_blank" class="text-sm text-tertiary hover:underline"
        >/source</a
      >
    </div>

    <div class="text-center">
      <p class="text-xs text-tertiary">
        &copy; 2026
        <a
          href="https://erlanazhari.my.id"
          target="_blank"
          class="font-semibold text-secondary hover:underline"
          >Muhdani Boyrendi Erlan Azhari</a
        >. All Right Reserved.
      </p>
    </div>
  </footer>
</template>
