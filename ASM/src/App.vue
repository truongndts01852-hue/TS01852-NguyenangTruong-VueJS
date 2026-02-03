<template>
  <div class="app-wrapper d-flex flex-column min-vh-100">

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
      <div class="container">

        <!-- Logo -->
        <a class="navbar-brand fw-bold fs-4" href="#" @click.prevent="currentPage = 'home'">
          🚀 FPT Blog
        </a>

        <!-- Toggle mobile -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">

            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="currentPage = 'home'">
                Trang chủ
              </a>
            </li>

            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link" href="#" @click.prevent="currentPage = 'create-post'">
                Đăng bài
              </a>
            </li>

          </ul>

          <!-- Right menu -->
          <ul class="navbar-nav align-items-lg-center">

            <template v-if="!isLoggedIn">
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="currentPage = 'register'">
                  Đăng ký
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link login-btn" href="#" @click.prevent="currentPage = 'login'">
                  Đăng nhập
                </a>
              </li>
            </template>

            <template v-else>
              <li class="nav-item">
                <span class="nav-link user-name">
                  👋 {{ userName }}
                </span>
              </li>
              <li class="nav-item">
                <button
                  @click="handleLogout"
                  class="btn btn-sm btn-outline-light ms-lg-2"
                >
                  Đăng xuất
                </button>
              </li>
            </template>

          </ul>
        </div>
      </div>
    </nav>

    <!-- MAIN CONTENT -->
    <main class="flex-grow-1 py-4">
      <div class="container">

        <div v-if="currentPage === 'home'">
          <h2>Trang chủ</h2>
        </div>

        <div v-if="currentPage === 'login'">
          <h2>Trang đăng nhập</h2>
        </div>

        <div v-if="currentPage === 'register'">
          <h2>Trang đăng ký</h2>
        </div>

        <div v-if="currentPage === 'create-post'">
          <h2>Trang đăng bài</h2>
        </div>

      </div>
    </main>

    <!-- FOOTER -->
    <footer class="footer mt-auto py-4">
      <div class="container text-center">
        <p class="mb-1 fw-semibold">FPT Polytechnic Blog System</p>
        <small class="text-muted">
          © 2024 - Assignment Vue.js - FPT Polytechnic
        </small>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)
const userName = ref('')
const currentPage = ref('home')

const checkLoginStatus = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user) {
    isLoggedIn.value = true
    userName.value = user.name
  } else {
    isLoggedIn.value = false
    userName.value = ''
  }
}

onMounted(() => {
  checkLoginStatus()
})

const handleLogout = () => {
  if (confirm("Bạn có chắc muốn đăng xuất?")) {
    localStorage.removeItem('user')
    checkLoginStatus()
    currentPage.value = 'login'
  }
}
</script>

<style scoped>
.custom-navbar {
  background: linear-gradient(90deg, #1e3c72, #2a5298);
}

.nav-link {
  color: rgba(255, 255, 255, 0.85) !important;
  transition: 0.3s ease;
}

.nav-link:hover {
  color: #ffffff !important;
  transform: translateY(-2px);
}

.login-btn {
  color: #00f2fe !important;
  font-weight: 500;
}

.user-name {
  font-weight: 600;
  color: #fff !important;
}

.footer {
  background: #f8f9fa;
  border-top: 1px solid #ddd;
}
</style>
