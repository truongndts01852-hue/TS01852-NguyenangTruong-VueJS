import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/Home.vue'; // sửa lại đây

const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: HomeView 
  },
  { 
    path: '/login', 
    name: 'Login',
    component: () => import('../components/Login.vue') 
  },
  { 
    path: '/register', 
    name: 'Register',
    component: () => import('../components/Register.vue') 
  },
  { 
    path: '/profile', 
    name: 'Profile',
    component: () => import('../components/Profile.vue'),
    meta: { requiresAuth: true }
  },
  { 
    path: '/create-post', 
    name: 'CreatePost',
    component: () => import('../components/CreatePost.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: () => import('../components/PostDetail.vue'),
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('user');
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    alert('Vui lòng đăng nhập để sử dụng tính năng này!');
    next('/login');
  } else {
    next();
  }
});


export default router;
