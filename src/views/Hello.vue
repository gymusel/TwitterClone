<template>
  <div class="hello__wrapper">
    <div v-show="registerModal" @click="closeRegisterModal" class="modal">
      <div v-on:click.stop><RegisterModal /></div>
    </div>
    <div class="body">
      <v-icon name="dove" scale="60" class="background__dove"/>
      <div class="left__box">
        <div>
          <h3><v-icon name="search" class="v-icon"/>あなたの「好き」をフォローしましょう。</h3>
          <h3><v-icon name="user-friends" class="v-icon"/>話題のトピックを追いかけましょう。</h3>
          <h3><v-icon name="comment" class="v-icon"/>会話に参加しましょう。</h3>
        </div>
      </div>
      <div class="right__box">
        <div>
          <v-icon name="dove" scale="2.5" class="v-icon"/>
          <h1>「いま」起きていることを<br>見つけよう</h1>
          <p>Twitterをはじめよう</p>
          <button @click="showRegisterModal" class="register link">アカウント作成</button>
          <router-link to="/signin" class="signin link">ログイン</router-link>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>© 2021 Shigeki Yamaguchi</p>
    </div>
  </div>
</template>

<script>
import RegisterModal from "@/components/RegisterModal.vue"
export default {
  components: {
    RegisterModal
  },
  data() {
    return {
      registerModal: false,
    }
  },
  methods:{
    showRegisterModal() {
      this.registerModal = true;
    },
    closeRegisterModal() {
      this.registerModal = false;
    }
  }
}
</script>

<style scoped>
.background__dove {
  color: rgba(29,161,242,1.00);
  position: fixed;
  top: -210px;
  left: -150px;
  z-index: 1;
}

.hello__wrapper {
  background: rgb(116, 202, 254);
  height: 100vh;
  width: 100vw;
}
.body {
  display: flex;
  flex-wrap: wrap;
  top: 0;
  bottom: 78px;
  position: absolute;
  overflow: auto;
  width: 100vw;
}
.left__box {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.left__box div {
  z-index: 2;
}
.left__box h3 {
  display: flex;
  align-items: center;
  margin: 40px;
}
.left__box .v-icon {
  width: 28.75px;
  height: 28.75px;
  margin-right: 15px;
}
.right__box {
  background: rgb(21, 32, 43);
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.right__box h1 {
  margin-bottom: 50px;;
}
.link {
  border: solid thin rgba(29,161,242,1.00);
  border-radius: 30px;
  height: 47px;
  width: 100%;
  margin: 20px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.register {
  background: rgba(29,161,242,1.00);
  color: white;
}
.register:hover {
  opacity: 0.9;
}
.register:focus {
  outline: none;
}
.signin {
  color: rgba(29,161,242,1.00);
}
.signin:hover {
  background: #1DA1F233;
}
.footer {
  background: rgb(21, 32, 43);
  width: 100vw;
  height: 78px;
  padding: 10px 15px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.footer p {
  margin: 0;
}
.modal {
  background: rgba(0,0,0,0.4);
  z-index: 3;
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
