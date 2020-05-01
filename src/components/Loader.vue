<template>
  <div class="spinner"></div>
</template>
<script>
export default {
  computed: {}
};
</script>
<style lang="scss" scoped>
.spinner {
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border: 3px solid;
  border-radius: 50%;
  border-left-color: transparent;
  border-top-color: #aaa;
  border-right-color: #555;
  border-bottom-color: #000;
  animation: spin 700ms infinite linear;
  margin-bottom: 20px;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>