<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Bai2 from './components/Bai2.vue'
import Bai3 from './components/Bai3.vue'
import Bai4 from './components/Bai4.vue'

const page = ref('home')
</script>

<template>
  <!-- MENU -->
  <div class="menu">
    <button @click="page = 'home'">Trang chính</button>
    <button @click="page = 'bai2'">Lab 4 - Bài 2</button>
    <button @click="page = 'bai3'">Lab 4 - Bài 3</button>
    <button @click="page = 'bai4'">Lab 4 - Bài 4</button>
  </div>

  <!-- TRANG CHÍNH (GIỮ NGUYÊN CODE CŨ) -->
  <div v-if="page === 'home'">
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
  </div>

  <!-- LAB 2 -->
  <Bai2 v-if="page === 'bai2'" />

  <!-- LAB 3 -->
  <Bai3 v-if="page === 'bai3'" />

  <!-- LAB 4 -->
  <Bai4 v-if="page === 'bai4'" />
</template>

<style scoped>
/* menu */
.menu {
  margin-bottom: 20px;
}
.menu button {
  margin-right: 10px;
  padding: 6px 12px;
  cursor: pointer;
}

/* GIỮ NGUYÊN STYLE CŨ */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>