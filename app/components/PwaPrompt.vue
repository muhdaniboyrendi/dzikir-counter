<script setup>
const { $pwa } = useNuxtApp();

const isIos = computed(() => {
  if (!import.meta.client) return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
});

const isStandalone = computed(() => {
  if (!import.meta.client) return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && navigator.standalone === true)
  );
});

const showIosHint = computed(() => isIos.value && !isStandalone.value);

const isDismissed = ref(false);

onMounted(() => {
  isDismissed.value = localStorage.getItem("pwa-ios-dismissed") === "true";
});

function dismissIos() {
  isDismissed.value = true;
  localStorage.setItem("pwa-ios-dismissed", "true");
}
</script>

<template>
  <!-- ✅ Banner Android / Chrome -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    leave-active-class="transition-all duration-300 ease-in"
    leave-to-class="opacity-0 translate-y-8"
  >
    <div
      v-if="$pwa?.showInstallPrompt && !$pwa?.isPWAInstalled"
      class="fixed bottom-4 left-4 right-4 z-[9999] bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-3"
    >
      <!-- Content -->
      <div class="flex items-center gap-3">
        <img
          src="/icon.png"
          alt="App Icon"
          class="w-13 h-13 rounded-xl flex-shrink-0"
        />
        <div>
          <p class="font-semibold text-gray-900">Install Aplikasi</p>
          <p class="text-xs text-gray-500 mt-0.5">
            Tambahkan ke layar utama untuk akses lebih cepat
          </p>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex gap-2">
        <button
          class="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-colors"
          @click="$pwa?.install()"
        >
          Install
        </button>
        <button
          class="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
          @click="$pwa?.cancelInstall()"
        >
          Nanti
        </button>
      </div>
    </div>
  </Transition>

  <!-- ✅ Banner iOS / Safari -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    leave-active-class="transition-all duration-300 ease-in"
    leave-to-class="opacity-0 translate-y-8"
  >
    <div
      v-if="showIosHint && !isDismissed"
      class="fixed bottom-4 left-4 right-4 z-[9999] bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-3"
    >
      <!-- Tombol Close -->
      <button
        class="absolute top-3 right-3 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full text-xs text-gray-600 flex items-center justify-center transition-colors"
        @click="dismissIos"
      >
        ✕
      </button>

      <!-- Content -->
      <div class="flex items-center gap-3">
        <img
          src="/icon.png"
          alt="App Icon"
          class="w-13 h-13 rounded-xl flex-shrink-0"
        />
        <div>
          <p class="font-semibold text-gray-900">Install Aplikasi</p>
          <p class="text-xs text-gray-500 mt-0.5">
            Tambahkan ke layar utama untuk akses lebih cepat
          </p>
        </div>
      </div>

      <!-- Langkah-langkah -->
      <div class="bg-gray-50 rounded-xl p-3 flex flex-col gap-2">
        <!-- Step 1 -->
        <div class="flex items-center gap-2 text-sm text-gray-700">
          <span
            class="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          >
            1
          </span>
          <span>
            Tap ikon
            <svg
              class="inline w-3.5 h-3.5 mx-0.5 text-blue-500 align-middle"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            <strong>Share</strong> di toolbar Safari
          </span>
        </div>

        <!-- Step 2 -->
        <div class="flex items-center gap-2 text-sm text-gray-700">
          <span
            class="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          >
            2
          </span>
          <span>Scroll lalu tap <strong>"Add to Home Screen"</strong></span>
        </div>

        <!-- Step 3 -->
        <div class="flex items-center gap-2 text-sm text-gray-700">
          <span
            class="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          >
            3
          </span>
          <span>Tap <strong>"Add"</strong> di pojok kanan atas</span>
        </div>
      </div>

      <!-- Panah bawah -->
      <p class="text-center text-blue-500 text-xl animate-bounce">▼</p>
    </div>
  </Transition>
</template>
