<template>
  <div class="container mt-5">
    <div class="card mx-auto shadow" style="max-width: 500px;">
      <div class="card-body text-center">

        <!-- Ảnh đại diện -->
        <img 
          :src="profile.avatar || 'https://via.placeholder.com/150'" 
          class="rounded-circle mb-3 border"
          style="width:150px;height:150px;object-fit:cover"
        >

        <h3>Hồ sơ của tôi</h3>

        <!-- Upload avatar -->
        <input 
          type="file" 
          class="form-control mt-3"
          accept="image/*"
          @change="handleAvatarUpload"
        >

        <div class="text-start mt-4">

          <label>Tên hiển thị:</label>
          <input v-model="profile.name" class="form-control mb-2">

          <label>Email:</label>
          <input v-model="profile.email" class="form-control mb-2">

          <!-- Đổi mật khẩu -->
          <label>Mật khẩu mới:</label>
          <input v-model="newPassword" type="password" class="form-control mb-2">

          <label>Xác nhận mật khẩu:</label>
          <input v-model="confirmPassword" type="password" class="form-control mb-2">

          <!-- Thống kê bài viết -->
          <div class="alert alert-info mt-3">
            📝 Bạn đã đăng <strong>{{ postCount }}</strong> bài viết
          </div>

          <button 
            @click="updateProfile" 
            class="btn btn-warning w-100 mt-2"
          >
            Cập nhật thông tin
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const profile = reactive({
  name: '',
  email: '',
  password: '',
  avatar: ''
})

const newPassword = ref('')
const confirmPassword = ref('')
const postCount = ref(0)

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user) {
    router.push('/login')
    return
  }

  profile.name = user.name
  profile.email = user.email
  profile.password = user.password || ''
  profile.avatar = user.avatar || ''

  // Đếm số bài viết của user
  const posts = JSON.parse(localStorage.getItem('posts') || '[]')
  postCount.value = posts.filter(
    post => post.author === user.name
  ).length
})

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    profile.avatar = reader.result
  }
  reader.readAsDataURL(file)
}

const updateProfile = () => {

  if (newPassword.value) {
    if (newPassword.value !== confirmPassword.value) {
      alert("Mật khẩu xác nhận không khớp!")
      return
    }
    profile.password = newPassword.value
  }

  // Giữ nguyên các dữ liệu khác nếu có
  const oldUser = JSON.parse(localStorage.getItem('user')) || {}

  const updatedUser = {
    ...oldUser,
    name: profile.name,
    email: profile.email,
    password: profile.password,
    avatar: profile.avatar
  }

  localStorage.setItem('user', JSON.stringify(updatedUser))

  alert('Đã cập nhật thông tin!')
  newPassword.value = ''
  confirmPassword.value = ''
}
</script>
