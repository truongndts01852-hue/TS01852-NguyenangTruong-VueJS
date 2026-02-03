<script setup>
import { ref, onMounted } from 'vue'

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
        <div class="card h-100 shadow-lg border-0 post-card">

          <img 
            v-if="item.image"
            :src="item.image"
            class="card-img-top"
            style="height:220px; object-fit:cover;"
          >

          <div class="card-body d-flex flex-column">
            <h5 class="fw-bold">{{ item.title }}</h5>

            <small class="text-muted mb-2">
              👤 {{ item.author }} <br>
              🕒 {{ item.date }}
            </small>

            <p class="text-secondary">
              {{ item.content.substring(0, 100) }}...
            </p>

            <div class="mt-auto">
              <button 
                @click="deletePost(index)" 
                class="btn btn-outline-danger btn-sm w-100"
              >
                Xóa bài
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
}
.post-card:hover {
  transform: translateY(-5px);
}
</style>
