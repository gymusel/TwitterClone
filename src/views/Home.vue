<template>
  <div class="home__wrapper">
    <NavBar />
    <div class="home">
      <div class="title">
        <h3>ホーム</h3>
      </div>
      <div class="scroll">
        <SubmitForm />
        <div class="gap" />
        <Tweets />
      </div>
    </div>
    <FooBar />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import SubmitForm from "@/components/SubmitForm.vue"
import Tweets from "@/components/Tweets.vue"
import FooBar from "@/components/FooBar.vue"
export default {
  components: {
    NavBar,
    SubmitForm,
    Tweets,
    FooBar,
  },
}
</script>

<style scoped>
.home__wrapper {
  display: flex;
}
.home {
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
.gap {
  background: #192734;
  border-bottom: thin solid rgb(56, 68, 77);
  height: 10px;
}
</style>