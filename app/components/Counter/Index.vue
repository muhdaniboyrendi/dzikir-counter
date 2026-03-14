<script setup>
const count = ref(0);
const animKey = ref(0);
const showReset = ref(false);

// ── LocalStorage ─────────────────────────────────────────
onMounted(() => {
  const saved = localStorage.getItem("counter_count");
  if (saved !== null) count.value = parseInt(saved, 10);
});

watch(count, (val) => {
  localStorage.setItem("counter_count", String(val));
});

// ── Counter logic ─────────────────────────────────────────
function increment() {
  count.value++;
  animKey.value++;
  if (navigator?.vibrate) navigator.vibrate(12);
}

function decrement() {
  count.value--;
  animKey.value--;
  if (navigator?.vibrate) navigator.vibrate(12);
}

// ── Reset ─────────────────────────────────────────────────
function confirmReset() {
  showReset.value = true;
}

function doReset() {
  count.value = 0;
  showReset.value = false;
}
</script>

<template>
  <div class="pt-28 mb-10 px-4 flex flex-col justify-center">
    <div class="flex items-center justify-center mb-12">
      <!-- Counter Card -->
      <div
        class="w-full max-w-50 aspect-square rounded-4xl bg-amber-100/50 dark:bg-amber-900/50 border-2 border-amber-600/20 dark:border-amber-500/20 flex flex-col items-center justify-center shadow-lg shadow-amber-600/20 dark:shadow-amber-500/20"
      >
        <!-- Number -->
        <div
          :key="animKey"
          class="font-semibold text-6xl text-amber-600 dark:text-amber-500"
        >
          {{ count }}
        </div>
      </div>
    </div>

    <div
      class="relative w-full max-w-100 h-20 mx-auto rounded-3xl bg-amber-700 dark:bg-amber-800 mb-4"
    >
      <button
        @click="increment"
        class="absolute w-full h-20 rounded-3xl bg-amber-500 dark:bg-amber-600 flex items-center border-2 border-amber-600 dark:border-amber-700 -translate-y-2 active:translate-y-0 justify-center transition duration-150"
      >
        <i class="bi bi-plus-lg text-white text-4xl"></i>
      </button>
    </div>

    <div class="w-full max-w-100 mx-auto grid grid-cols-2 gap-4">
      <button
        @click="decrement"
        class="w-full h-20 rounded-3xl bg-amber-50 dark:bg-amber-950 flex items-center border-2 border-amber-500 dark:border-amber-600 active:scale-97 justify-center transition duration-150"
      >
        <i
          class="bi bi-dash-lg text-amber-500 dark:text-amber-600 text-4xl"
        ></i>
      </button>
      <button
        @click="confirmReset"
        class="w-full h-20 rounded-3xl bg-amber-50 dark:bg-amber-950 flex items-center border-2 border-amber-500 dark:border-amber-600 active:scale-97 justify-center transition duration-150 text-amber-500 dark:text-amber-600 uppercase font-semibold"
      >
        Reset
      </button>
    </div>

    <!-- ─── Reset Confirm Modal ─── -->
    <Transition name="fade">
      <div
        v-if="showReset"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        @click.self="showReset = false"
      >
        <div
          v-motion
          :initial="{ scale: 0.85, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1, transition: { duration: 250 } }"
          class="bg-ground-white dark:bg-ground-black border border-black/10 dark:border-white/10 rounded-3xl p-4 flex flex-col items-center gap-5 max-w-[280px] w-full mx-4"
        >
          <p class="text-white/70 text-sm text-center leading-relaxed mt-2">
            Reset hitungan ke 0?
          </p>
          <div class="flex gap-3 w-full">
            <button
              @click="showReset = false"
              class="flex-1 py-2.5 rounded-xl border border-amber-600 text-amber-600 text-sm active:scale-95"
            >
              Batal
            </button>
            <button
              @click="doReset"
              class="flex-1 py-2.5 rounded-xl bg-amber-600 text-ground-white text-sm active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
