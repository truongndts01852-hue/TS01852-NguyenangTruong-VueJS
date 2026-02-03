<template>
  <div class="app-wrapper d-flex flex-column min-vh-100">

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
      <div class="container">

        <!-- Logo -->
        <router-link class="navbar-brand fw-bold fs-4" to="/">
          🚀 FPT Blog
        </router-link>

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
              <router-link class="nav-link" to="/">
                Trang chủ
              </router-link>
            </li>

            <li class="nav-item" v-if="isLoggedIn">
              <router-link class="nav-link" to="/create-post">
                Đăng bài
              </router-link>
            </li>

          </ul>

          <!-- Right menu -->
          <ul class="navbar-nav align-items-lg-center">

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

    <!-- MAIN CONTENT -->
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
          © 2024 - Assignment Vue.js - FPT Polytechnic
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
const userName = ref('')

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

watch(() => route.fullPath, () => {
  checkLoginStatus()
})

const handleLogout = () => {
  if (confirm("Bạn có chắc muốn đăng xuất?")) {
    localStorage.removeItem('user')
    checkLoginStatus()
    router.push('/login')
  }
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

/* Login button */
.login-btn {
  color: #00f2fe !important;
  font-weight: 500;
}

/* Username */
.user-name {
  font-weight: 600;
  color: #fff !important;
}

/* ===== FOOTER ===== */
.footer {
  background: #f8f9fa;
  border-top: 1px solid #ddd;
}

/* Smooth fade */
main {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>
