<template>
  <div class="notification__wrapper">
    <NavBar />
    <div class="notification">
      <div class="title">
        <h3>通知</h3>
      </div>
      <div class="scroll">
      </div>
    </div>
    <FooBar />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import FooBar from "@/components/FooBar.vue"
export default {
  components: {
    NavBar,
    FooBar,
  },
}
</script>

<style scoped>
.notification__wrapper {
  display: flex;
}
.notification {
  overflow: auto;
  height: 100vh;
  width: 600px;
}
.title {
  background: rgb(21, 32, 43);
  border-bottom: thin solid rgb(56, 68, 77);
  position: absolute;
  height: 53px;
  width: 600px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.scroll {
  margin-top: 53px;
}
</style>