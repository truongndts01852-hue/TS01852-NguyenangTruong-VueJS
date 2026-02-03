<template>
  <div class="container mt-4">
    <div class="card p-4 shadow mx-auto" style="max-width: 750px;">
      
      <h2 class="text-center mb-4">Đăng sản phẩm mới</h2>

      <form @submit.prevent="handleSubmit">

        <!-- Tiêu đề -->
        <div class="mb-3">
          <label class="form-label fw-bold">Tên sản phẩm</label>
          <input v-model="title" type="text" class="form-control" required>
        </div>

        <!-- Giá tiền -->
        <div class="mb-3">
          <label class="form-label fw-bold">Giá tiền (VNĐ)</label>
          <input v-model.number="price" type="number" class="form-control" min="0" required>
          <small class="text-danger fw-bold">
            {{ formatPrice(price) }} VNĐ
          </small>
        </div>

        <!-- Danh mục -->
        <div class="mb-3">
          <label class="form-label fw-bold">Danh mục</label>
          <select v-model="category" class="form-select" required>
            <option value="">-- Chọn danh mục --</option>
            <option>Công nghệ</option>
            <option>Thời trang</option>
            <option>Giáo dục</option>
            <option>Khác</option>
          </select>
        </div>

        <!-- Đánh giá sao -->
        <div class="mb-3">
          <label class="form-label fw-bold">Đánh giá</label>
          <div>
            <span 
              v-for="star in 5" 
              :key="star"
              @click="rating = star"
              style="cursor:pointer; font-size:22px;"
            >
              {{ star <= rating ? '⭐' : '☆' }}
            </span>
          </div>
        </div>

        <!-- Upload ảnh -->
        <div class="mb-3">
          <label class="form-label fw-bold">Chọn ảnh</label>
          <input type="file" class="form-control" @change="handleImageUpload" accept="image/*">
        </div>

        <!-- Preview -->
        <div v-if="image" class="text-center mb-3">
          <img :src="image" class="img-fluid rounded shadow" style="max-height:300px">
        </div>

        <!-- Nội dung -->
        <div class="mb-3">
          <label class="form-label fw-bold">Mô tả</label>
          <textarea v-model="content" class="form-control" rows="4" required></textarea>
        </div>

        <button class="btn btn-primary w-100">Đăng sản phẩm</button>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('')
const content = ref('')
const image = ref('')
const price = ref(0)
const category = ref('')
const rating = ref(5)

const formatPrice = (value) => {
  return Number(value || 0).toLocaleString('vi-VN')
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    image.value = reader.result
  }
  reader.readAsDataURL(file)
}

const handleSubmit = () => {
  const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]')

  const newPost = {
    id: Date.now(),
    title: title.value,
    content: content.value,
    image: image.value,
    price: price.value,
    category: category.value,
    rating: rating.value,
    author: JSON.parse(localStorage.getItem('user'))?.name || 'Thành viên',
    date: new Date().toLocaleString('vi-VN'),
    comments: []
  }

  existingPosts.unshift(newPost)
  localStorage.setItem('posts', JSON.stringify(existingPosts))

  alert('Đăng sản phẩm thành công!')
  router.push('/')
}
</script>
