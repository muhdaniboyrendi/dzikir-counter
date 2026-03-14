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
      class="w-fit mx-auto rounded-full flex justify-center items-center gap-1 p-1 border border-black/15 dark:border-white/15 mb-4"
    >
      <button
        v-for="mode in modes"
        :key="mode.value"
        type="button"
        :title="mode.label"
        :class="[
          'w-7 h-7 aspect-square rounded-full flex justify-center items-center text-sm transition-colors',
          colorMode.preference === mode.value
            ? 'bg-blue-500 text-white'
            : 'bg-transparent text-black/50 dark:text-white/50 hover:bg-black/10 dark:hover:bg-white/10',
        ]"
        @click="colorMode.preference = mode.value"
      >
        <i :class="`bi ${mode.icon}`"></i>
      </button>
    </div>

    <div class="mb-4 text-center">
      <a
        href="#"
        target="_blank"
        class="text-sm text-blue-600/80 dark:text-blue-500/60 hover:underline"
        >/source</a
      >
    </div>

    <div class="text-center">
      <p class="text-xs text-black/60 dark:text-white/60">
        &copy; 2026
        <a
          href="https://erlanazhari.my.id"
          target="_blank"
          class="font-semibold text-blue-500 dark:text-blue-600 hover:underline"
          >Muhdani Boyrendi Erlan Azhari</a
        >. All Right Reserved.
      </p>
    </div>
  </footer>
</template>
