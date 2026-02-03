<template>
  <div class="app-wrapper d-flex flex-column min-vh-100">

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
      <div class="container">

        <!-- Logo -->
        <router-link class="navbar-brand fw-bold fs-4" to="/">
          🚀 FPT Blog
        </router-link>

        <!-- Toggle -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">

          <!-- Left menu -->
          <ul class="navbar-nav me-auto">

            <li class="nav-item">
              <router-link class="nav-link" to="/">
                Trang chủ
              </router-link>
            </li>

            <li class="nav-item" v-if="isLoggedIn">
              <router-link class="nav-link" to="/create-post">
                Đăng bài
              </router-link>
            </li>

            <!-- Admin only -->
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link admin-link" to="/admin">
                Quản trị
              </router-link>
            </li>

          </ul>

          <!-- Right menu -->
          <ul class="navbar-nav align-items-lg-center">

            <!-- Dark mode -->
            <li class="nav-item me-2">
              <button
                @click="toggleDark"
                class="btn btn-sm btn-outline-light"
              >
                {{ isDark ? '☀ Light' : '🌙 Dark' }}
              </button>
            </li>

            <!-- Chưa đăng nhập -->
            <template v-if="!isLoggedIn">
              <li class="nav-item">
                <router-link class="nav-link" to="/register">
                  Đăng ký
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link login-btn" to="/login">
                  Đăng nhập
                </router-link>
              </li>
            </template>

            <!-- Đã đăng nhập -->
            <template v-else>
              <li class="nav-item">
                <router-link class="nav-link user-name" to="/profile">
                  👋 {{ userName }}
                  <span v-if="isAdmin" class="badge bg-warning text-dark ms-1">
                    Admin
                  </span>
                </router-link>
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

    <!-- MAIN -->
    <main class="flex-grow-1 py-4">
      <div class="container">
        <router-view @login-success="checkLoginStatus" />
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="footer mt-auto py-4">
      <div class="container text-center">
        <p class="mb-1 fw-semibold">FPT Polytechnic Blog System</p>
        <small class="text-muted">
          © 2024 - Assignment Vue.js - Nguyễn Đăng Trường
        </small>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isLoggedIn = ref(false)
const isAdmin = ref(false)
const userName = ref('')
const isDark = ref(localStorage.getItem('darkMode') === 'true')

/* ===== LOGIN CHECK ===== */
const checkLoginStatus = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user) {
    isLoggedIn.value = true
    userName.value = user.name
    isAdmin.value = user.role === 'admin'
  } else {
    isLoggedIn.value = false
    userName.value = ''
    isAdmin.value = false
  }
}

onMounted(() => {
  checkLoginStatus()
  applyDark()
})

watch(() => route.fullPath, () => {
  checkLoginStatus()
})

/* ===== LOGOUT ===== */
const handleLogout = () => {
  if (confirm("Bạn có chắc muốn đăng xuất?")) {
    localStorage.removeItem('user')
    checkLoginStatus()
    router.push('/login')
  }
}

/* ===== DARK MODE ===== */
const toggleDark = () => {
  isDark.value = !isDark.value
  localStorage.setItem('darkMode', isDark.value)
  applyDark()
}

const applyDark = () => {
  document.body.classList.toggle('dark-mode', isDark.value)
}
</script>

<style scoped>

/* ===== NAVBAR ===== */
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

.router-link-active {
  color: #00f2fe !important;
  font-weight: 600;
}

.login-btn {
  color: #00f2fe !important;
  font-weight: 500;
}

.user-name {
  font-weight: 600;
  color: #fff !important;
}

.admin-link {
  color: #ffc107 !important;
  font-weight: 600;
}

/* ===== FOOTER ===== */
.footer {
  background: #f8f9fa;
  border-top: 1px solid #ddd;
}

/* ===== DARK MODE ===== */
:global(body.dark-mode) {
  background: #121212;
  color: #ffffff;
}

:global(body.dark-mode .footer) {
  background: #1e1e1e;
  color: #ccc;
}

:global(body.dark-mode .card) {
  background: #1f1f1f;
  color: #fff;
}

/* ===== ANIMATION ===== */
main {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>
