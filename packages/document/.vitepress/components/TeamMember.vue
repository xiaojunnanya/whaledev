<template>
  <div class="team-card">
    <img :src="avatar" class="avatar" />
    <h3 class="name">{{ name }}</h3>
    <p class="role">{{ role }}</p>
    <div class="social">
      <a v-if="github" :href="github" target="_blank" rel="noopener noreferrer">
        <svg class="icon" viewBox="0 0 1024 1024">
          <path
            d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
            fill="currentColor"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  role: String,
  avatar: String,
  github: String,
})
</script>

<style scoped>
.team-card {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  width: 33%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 1rem;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  margin-bottom: 10px;
}
.name {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}
.role {
  color: #666;
  margin: 0.2rem 0 0.8rem;
}
.social {
  display: flex;
  justify-content: center;
}
.icon {
  width: 20px;
  height: 20px;
  fill: #333;
}
</style>
