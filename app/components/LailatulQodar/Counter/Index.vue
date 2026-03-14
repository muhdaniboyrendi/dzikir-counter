<script setup>
const router = useRouter();

const count = ref(0);
const animKey = ref(0);
const showReset = ref(false);
const TARGET = 1000;

// ── LocalStorage ─────────────────────────────────────────
onMounted(() => {
  const saved = localStorage.getItem("counter_count_lq");
  if (saved !== null) count.value = parseInt(saved, 10);
});

watch(count, (val) => {
  localStorage.setItem("counter_count_lq", String(val));
});

// ── Computed ──────────────────────────────────────────────
const progress = computed(() => Math.min((count.value / TARGET) * 100, 100));
const isReached = computed(() => count.value >= TARGET);

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

const handleBack = () => {
  router.back();
};
</script>

<template>
  <div class="my-10 px-4 flex flex-col justify-center">
    <div class="flex items-center justify-center mb-12">
      <!-- Counter Card -->
      <div
        class="w-full max-w-50 aspect-square rounded-4xl flex flex-col items-center justify-center shadow-lg transition-all duration-500"
        :class="
          isReached
            ? 'bg-green-100/50 dark:bg-green-900/50 border-2 border-green-500/40 shadow-green-500/20'
            : 'bg-blue-100/50 dark:bg-blue-900/50 border-2 border-blue-600/20 dark:border-blue-500/20 shadow-blue-600/20 dark:shadow-blue-500/20'
        "
      >
        <!-- Number -->
        <div
          :key="animKey"
          class="font-semibold text-6xl transition-colors duration-500"
          :class="
            isReached ? 'text-green-500' : 'text-blue-600 dark:text-blue-500'
          "
        >
          {{ count }}
        </div>

        <!-- Target label -->
        <div
          class="mt-2 text-sm font-medium transition-colors duration-500"
          :class="
            isReached ? 'text-green-500' : 'text-blue-400 dark:text-blue-400'
          "
        >
          {{ isReached ? "🎉 Target tercapai!" : `Target: ${TARGET}` }}
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="w-full max-w-100 mx-auto mb-4">
      <div
        class="flex justify-between text-xs font-medium mb-1.5"
        :class="
          isReached ? 'text-green-500' : 'text-blue-500 dark:text-blue-400'
        "
      >
        <span>Progress</span>
        <span>{{ count }} / {{ TARGET }} ({{ Math.floor(progress) }}%)</span>
      </div>
      <div
        class="w-full h-3 rounded-full bg-blue-100 dark:bg-blue-950 overflow-hidden border border-blue-200 dark:border-blue-800"
      >
        <div
          class="h-full rounded-full transition-all duration-300"
          :class="isReached ? 'bg-green-500' : 'bg-blue-500 dark:bg-blue-600'"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>

    <div
      class="relative w-full max-w-100 h-20 mx-auto rounded-3xl mb-4 transition-colors duration-500"
      :class="
        isReached
          ? 'bg-green-700 dark:bg-green-800'
          : 'bg-blue-700 dark:bg-blue-800'
      "
    >
      <button
        @click="increment"
        class="absolute w-full h-20 rounded-3xl flex items-center border-2 -translate-y-2 active:translate-y-0 justify-center transition duration-150"
        :class="
          isReached
            ? 'bg-green-500 dark:bg-green-600 border-green-600 dark:border-green-700'
            : 'bg-blue-500 dark:bg-blue-600 border-blue-600 dark:border-blue-700'
        "
      >
        <i class="bi bi-plus-lg text-white text-4xl"></i>
      </button>
    </div>

    <div class="w-full max-w-100 mx-auto grid grid-cols-2 gap-4 mb-10">
      <button
        @click="decrement"
        class="w-full h-20 rounded-3xl bg-blue-50 dark:bg-blue-950 flex items-center border-2 border-blue-500 dark:border-blue-600 active:scale-97 justify-center transition duration-150"
      >
        <i class="bi bi-dash-lg text-blue-500 dark:text-blue-600 text-4xl"></i>
      </button>
      <button
        @click="confirmReset"
        class="w-full h-20 rounded-3xl bg-blue-50 dark:bg-blue-950 flex items-center border-2 border-blue-500 dark:border-blue-600 active:scale-97 justify-center transition duration-150 text-blue-500 dark:text-blue-600 uppercase font-semibold"
      >
        Reset
      </button>
    </div>

    <button
      @click="handleBack"
      type="button"
      class="w-full p-6 rounded-3xl bg-blue-500 dark:bg-blue-600 flex justify-center items-center gap-4 text-xl text-white font-semibold"
    >
      Kembali
    </button>

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
              class="flex-1 py-2.5 rounded-xl border border-blue-600 text-blue-600 text-sm active:scale-95"
            >
              Batal
            </button>
            <button
              @click="doReset"
              class="flex-1 py-2.5 rounded-xl bg-blue-600 text-ground-white text-sm active:scale-95"
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
