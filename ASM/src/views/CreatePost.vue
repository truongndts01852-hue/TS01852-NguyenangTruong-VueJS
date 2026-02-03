<template>
  <div class="container mt-4">
    <div class="card p-4 shadow-sm mx-auto" style="max-width: 700px;">
      
      <h2 class="mb-4 text-center">Đăng bài viết mới</h2>

      <form @submit.prevent="handleSubmit">
        
        <!-- Tiêu đề -->
        <div class="mb-3">
          <label class="form-label fw-bold">Tiêu đề</label>
          <input 
            v-model="title" 
            type="text" 
            class="form-control" 
            placeholder="Nhập tiêu đề bài viết..."
            required 
          />
        </div>

        <!-- Upload ảnh -->
        <div class="mb-3">
          <label class="form-label fw-bold">Chọn ảnh</label>
          <input 
            type="file" 
            class="form-control" 
            @change="handleImageUpload" 
            accept="image/*" 
          />
        </div>

        <!-- Preview ảnh -->
        <div v-if="image" class="mb-3 text-center">
          <p class="text-muted small">Xem trước ảnh:</p>
          <img 
            :src="image" 
            class="img-fluid rounded shadow" 
            style="max-height:300px"
          >
        </div>

        <!-- Nội dung -->
        <div class="mb-3">
          <label class="form-label fw-bold">Nội dung</label>
          <textarea 
            v-model="content" 
            class="form-control" 
            rows="5" 
            placeholder="Nhập nội dung chi tiết..."
            required
          ></textarea>
        </div>

        <button class="btn btn-primary w-100">
          Đăng bài
        </button>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Giữ nguyên dữ liệu
const title = ref('')
const content = ref('')
const image = ref('')

// Upload ảnh local
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    image.value = reader.result
  }
  reader.readAsDataURL(file)
}

// Submit bài viết
const handleSubmit = () => {

  const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]')

  const newPost = {
    id: Date.now(),
    title: title.value,
    content: content.value,
    image: image.value,
    author: JSON.parse(localStorage.getItem('user'))?.name || 'Thành viên',
    date: new Date().toLocaleString('vi-VN'),
    comments: []
  }

  existingPosts.unshift(newPost)

  localStorage.setItem('posts', JSON.stringify(existingPosts))

  alert('Đăng bài thành công!')

  // reset form
  title.value = ''
  content.value = ''
  image.value = ''

  router.push('/')
}
</script>
