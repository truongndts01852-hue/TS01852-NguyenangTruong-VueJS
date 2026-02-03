<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const post = ref(null)
const comments = ref([])
const newComment = ref('')

const loadData = () => {
  const posts = JSON.parse(localStorage.getItem('posts') || '[]')
  post.value = posts.find(p => p.id == route.params.id)

  const allComments = JSON.parse(localStorage.getItem('comments') || '[]')
  comments.value = allComments.filter(c => c.postId == route.params.id)
}

onMounted(() => {
  loadData()
})

const addComment = () => {
  if (!newComment.value) return

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const comment = {
    id: Date.now(),
    postId: route.params.id,
    username: user?.name || "Khách",
    content: newComment.value,
    date: new Date().toLocaleString()
  }

  const allComments = JSON.parse(localStorage.getItem('comments') || '[]')
  allComments.push(comment)
  localStorage.setItem('comments', JSON.stringify(allComments))

  newComment.value = ''
  loadData()
}
</script>

<template>
  <div class="container py-5" v-if="post">
    <h2 class="fw-bold mb-3">{{ post.title }}</h2>

    <img 
      v-if="post.image"
      :src="post.image"
      class="img-fluid mb-3"
    >

    <p>{{ post.content }}</p>

    <hr>

    <h4>Bình luận</h4>

    <div 
      v-for="c in comments"
      :key="c.id"
      class="border p-2 mb-2 rounded"
    >
      <strong>{{ c.username }}</strong>
      <p class="mb-1">{{ c.content }}</p>
      <small class="text-muted">{{ c.date }}</small>
    </div>

    <div class="mt-3">
      <textarea 
        v-model="newComment"
        class="form-control"
        placeholder="Nhập bình luận..."
      ></textarea>
      <button 
        class="btn btn-primary mt-2"
        @click="addComment"
      >
        Gửi bình luận
      </button>
    </div>
  </div>
</template>
