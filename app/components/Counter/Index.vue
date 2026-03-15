<script setup>
const props = defineProps({
  isLailatulQadr: {
    type: Boolean,
  },
});

const count = ref(0);
const animKey = ref(0);
const showReset = ref(false);

// ── Storage key ───────────────────────────────────────────
const storageKey = computed(() =>
  props.isLailatulQadr ? "counter_count_lq" : "counter_count",
);

// ── LocalStorage ─────────────────────────────────────────
onMounted(() => {
  const saved = localStorage.getItem(storageKey.value);
  if (saved !== null) count.value = parseInt(saved, 10);
});

watch(storageKey, (newKey) => {
  const saved = localStorage.getItem(newKey);
  count.value = saved !== null ? parseInt(saved, 10) : 0;
});

watch(count, (val) => {
  localStorage.setItem(storageKey.value, String(val));
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

// ── Target ────────────────────────────────────────────────
const TARGET = 1000;
const showTarget = ref(false);

watch(count, (val) => {
  if (props.isLailatulQadr && val >= TARGET) {
    showTarget.value = true;
  }
});
</script>

<template>
  <div class="pt-6 mb-4 px-4 flex flex-col justify-center">
    <h1
      class="font-secondary text-center text-primary dark:text-dark-text-primary text-3xl font-medium mb-6"
    >
      Dzikir Counter
    </h1>
    <div
      class="bg-primary dark:bg-dark-primary w-full max-w-lg mx-auto rounded-3xl p-1 shadow-lg shadow-secondary/50 mb-2"
    >
      <div
        class="bg-secondary dark:bg-dark-secondary w-full h-full rounded-[1.3rem] p-1"
      >
        <div
          class="bg-primary dark:bg-dark-primary w-full h-full rounded-[1.1rem] p-6 text-center"
        >
          <span
            class="font-semibold text-6xl text-secondary dark:text-dark-text-primary"
          >
            {{ count }}
          </span>
          <p
            v-if="props.isLailatulQadr"
            class="text-secondary/60 dark:text-dark-text-primary/60 text-sm font-medium mt-1"
          >
            {{ count }} / {{ TARGET }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="props.isLailatulQadr"
      class="bg-primary dark:bg-dark-primary w-full max-w-lg mx-auto rounded-3xl p-1 shadow-lg shadow-secondary/50 mb-2"
    >
      <div
        class="bg-secondary dark:bg-dark-secondary w-full h-full rounded-[1.3rem] p-1"
      >
        <div
          class="bg-primary dark:bg-dark-primary w-full h-full rounded-[1.1rem] p-2 text-center"
        >
          <h2
            class="font-semibold text-xl text-secondary dark:text-dark-text-primary/60"
          >
            Do'a Lailatul Qadar
          </h2>
          <div
            class="w-50 h-0.5 mx-auto bg-linear-to-r from-transparent via-tertiary dark:via-dark-tertiary to-transparent mt-2 mb-4"
          ></div>
          <p
            class="text-2xl text-secondary dark:text-dark-text-primary font-arabic font-bold"
          >
            اَللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ اَلْعَفْوَ فَاعْفُ عَنِّي
          </p>
          <p
            class="font-semibold font-arabic text-sm text-secondary dark:text-dark-text-primary/60"
          >
            (رواه ابن مجه)
          </p>
        </div>
      </div>
    </div>
    <div
      class="bg-primary dark:bg-dark-primary w-full max-w-lg mx-auto rounded-3xl p-1 shadow-lg shadow-secondary/50"
    >
      <div
        class="bg-secondary dark:bg-dark-secondary w-full h-full rounded-[1.3rem] p-1"
      >
        <div
          class="bg-primary dark:bg-dark-primary w-full h-full rounded-[1.1rem] p-2 text-center"
        >
          <button
            @click="increment"
            type="button"
            class="w-full h-15 bg-secondary dark:bg-dark-secondary rounded-xl flex justify-center items-center active:scale-97 transition mb-2 cursor-pointer"
          >
            <i
              class="bi bi-plus-lg text-primary dark:text-dark-text-primary text-4xl"
            ></i>
          </button>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="decrement"
              type="button"
              class="w-full h-15 border-3 border-secondary dark:border-dark-secondary rounded-xl flex justify-center items-center active:scale-97 transition cursor-pointer"
            >
              <i
                class="bi bi-dash-lg text-secondary dark:text-dark-secondary text-4xl"
              ></i>
            </button>
            <button
              @click="confirmReset"
              type="button"
              class="w-full h-15 border-3 border-secondary dark:border-dark-secondary rounded-xl flex justify-center items-center active:scale-97 transition uppercase text-lg text-secondary dark:text-dark-secondary font-medium cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
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
          class="bg-primary dark:bg-dark-primary border border-black/10 dark:border-white/10 rounded-3xl p-4 flex flex-col items-center gap-5 max-w-[280px] w-full mx-4"
        >
          <p
            class="text-secondary dark:text-dark-text-primary text-sm text-center font-medium leading-relaxed mt-2"
          >
            Reset hitungan ke 0?
          </p>
          <div class="flex gap-3 w-full">
            <button
              @click="showReset = false"
              class="flex-1 py-2.5 rounded-xl border border-secondary dark:border-dark-secondary text-secondary dark:text-dark-secondary text-sm active:scale-95"
            >
              Batal
            </button>
            <button
              @click="doReset"
              class="flex-1 py-2.5 rounded-xl bg-secondary dark:bg-dark-secondary text-ground-white text-sm active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ─── Target Reached Modal ─── -->
    <Transition name="fade">
      <div
        v-if="showTarget"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        @click.self="showTarget = false"
      >
        <div
          v-motion
          :initial="{ scale: 0.85, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1, transition: { duration: 250 } }"
          class="bg-primary dark:bg-dark-primary border border-black/10 dark:border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4 max-w-[280px] w-full mx-4"
        >
          <p class="text-4xl">🎉</p>
          <p class="text-secondary font-semibold text-base text-center">
            Alhamdulillah!
          </p>
          <p class="text-secondary/70 text-sm text-center leading-relaxed">
            Kamu telah mencapai target 1000 dzikir.
          </p>
          <button
            @click="showTarget = false"
            class="w-full py-2.5 rounded-xl bg-secondary dark:bg-dark-secondary text-ground-white text-sm active:scale-95"
          >
            Tutup
          </button>
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
