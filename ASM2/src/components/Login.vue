<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow-lg border-0 login-card">
          
          <div class="card-header bg-primary text-white text-center py-3">
            <h4 class="mb-0 fw-bold">ĐĂNG NHẬP</h4>
          </div>

          <div class="card-body p-4">
            <form @submit.prevent="handleLogin">

              <div class="mb-3">
                <label class="form-label fw-bold">Email</label>
                <input 
                  v-model="email" 
                  type="email" 
                  class="form-control"
                  placeholder="name@example.com"
                  required
                >
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold">Mật khẩu</label>
                <input 
                  v-model="password" 
                  type="password"
                  class="form-control"
                  placeholder="Nhập mật khẩu..."
                  required
                >
              </div>

              <button type="submit" class="btn btn-primary w-100 mb-3">
                Đăng nhập
              </button>

              <div class="text-center">
                <p class="small mb-0">
                  Chưa có tài khoản?
                  <router-link to="/register" class="text-decoration-none">
                    Đăng ký ngay
                  </router-link>
                </p>
              </div>

            </form>
          </div>
        </div>

        <div class="alert alert-info mt-3 small">
          <strong>Gợi ý:</strong><br>
          Email: <code>admin@gmail.com</code> |
          Pass: <code>123</code>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  const savedUser = JSON.parse(localStorage.getItem('registeredUser'))

  // Người dùng đã đăng ký
  if (savedUser && email.value === savedUser.email && password.value === savedUser.password) {
    loginSuccess({
      ...savedUser,
      role: 'user'
    })

  // Admin mặc định
  } else if (email.value === 'admin@gmail.com' && password.value === '123') {
    loginSuccess({
      name: 'Quản trị viên',
      email: 'admin@gmail.com',
      role: 'admin'
    })

  } else {
    alert('Email hoặc mật khẩu không chính xác!')
  }
}

const loginSuccess = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData))
  alert('Đăng nhập thành công!')
  router.push('/')
}
</script>

<style scoped>
.login-card {
  border-radius: 12px;
  overflow: hidden;
  transition: 0.3s ease;
}

.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}
</style>
