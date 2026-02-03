<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const posts = ref([])

onMounted(() => {
  posts.value = JSON.parse(localStorage.getItem('posts') || '[]')
})

const deletePost = (index) => {
  if (confirm('Bạn muốn xóa bài này?')) {
    posts.value.splice(index, 1)
    localStorage.setItem('posts', JSON.stringify(posts.value))
  }
}

const formatPrice = (value) => {
  if (!value) return null
  return Number(value).toLocaleString('vi-VN')
}

const buyNow = (item) => {
  if (!item.price) {
    alert("Bài viết này không có giá bán")
    return
  }
  alert(`Bạn đã mua "${item.title}" với giá ${formatPrice(item.price)} VNĐ`)
}

// Chuyển sang trang chi tiết
const goDetail = (id) => {
  router.push(`/post/${id}`)
}
</script>

<template>
  <div class="container py-5">
    <h1 class="text-center fw-bold mb-5">📰 Bảng tin bài viết</h1>

    <div v-if="posts.length === 0" class="text-center text-muted">
      <p>Chưa có bài viết nào</p>
      <router-link to="/create-post" class="btn btn-primary">
        Đăng bài ngay
      </router-link>
    </div>

    <div v-else class="row g-4">
      <div 
        v-for="(item, index) in posts" 
        :key="item.id" 
        class="col-md-6 col-lg-4"
      >
        <!-- CLICK TOÀN BỘ CARD -->
        <div 
          class="card h-100 shadow-lg border-0 post-card"
          @click="goDetail(item.id)"
        >

          <!-- ẢNH RÕ HƠN -->
          <div class="image-wrapper">
            <img 
              v-if="item.image"
              :src="item.image"
              alt="post-image"
            >
          </div>

          <div class="card-body d-flex flex-column">

            <h5 class="fw-bold">
              {{ item.title }}
            </h5>

            <span 
              v-if="item.category"
              class="badge bg-info mb-2"
            >
              {{ item.category }}
            </span>

            <p 
              v-if="item.price"
              class="text-danger fw-bold fs-5 mb-1"
            >
              {{ formatPrice(item.price) }} VNĐ
            </p>

            <div v-if="item.rating" class="mb-2">
              <span v-for="star in 5" :key="star">
                {{ star <= item.rating ? '⭐' : '☆' }}
              </span>
            </div>

            <small class="text-muted mb-2">
              👤 {{ item.author }} <br>
              🕒 {{ item.date }}
            </small>

            <p class="text-secondary">
              {{ item.content.substring(0, 100) }}...
            </p>

            <div class="mt-auto d-flex gap-2">
              
              <!-- STOP PROPAGATION -->
              <button 
                v-if="item.price"
                @click.stop="buyNow(item)" 
                class="btn btn-success btn-sm w-100"
              >
                🛒 Mua ngay
              </button>

              <button 
                @click.stop="deletePost(index)" 
                class="btn btn-outline-danger btn-sm"
              >
                Xóa
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-card {
  transition: 0.3s ease;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

/* Khung ảnh cố định */
.image-wrapper {
  height: 250px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-wrapper img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain; /* Quan trọng: không bị cắt ảnh */
}
</style>
