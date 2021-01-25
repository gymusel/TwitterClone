<template>
  <div class="signin__wrapper">
    <div v-show="registerModal" @click="closeRegisterModal" class="modal">
      <div v-on:click.stop><RegisterModal /></div>
    </div>
    <div class="title">
      <v-icon name="dove" scale="2" />
      <h2>Twitterにログイン</h2>
    </div>
    <div class="error">{{ error }}</div>
    <form @submit.prevent="signIn">
      <div class="field">
        <label for="email" v-bind:class="{ move: emailOnMove }">メール</label>
        <input type="email" v-model="email" v-on:focus="typeEmail">
      </div>
      <div class="field">
        <label for="password" v-bind:class="{ move: passwordOnMove }">パスワード</label>
        <input type="password" v-model="password" v-on:focus="typePassword">
      </div>
      <button type="submit" class="signin">ログイン</button>
    </form>
    <div class="etc">
      <span>パスワードをお忘れですか？</span>・<span @click="showRegisterModal">アカウント作成</span>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import RegisterModal from "@/components/RegisterModal.vue"

export default {
  components: {
    RegisterModal
  },
  data() {
    return {
      emailOnMove: false,
      passwordOnMove: false,
      email: "",
      password: "",
      error: "",
      registerModal: false,
    };
  },
  methods: {
    typeEmail:function(){
      this.emailOnMove = true;
    },
    typePassword:function(){
      this.passwordOnMove = true;
    },
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => this.$router.push("/"))
        .catch(() => {
          this.password = "";
          this.error = "入力されたユーザー名やパスワードが正しくありません。確認してからやりなおしてください。";
        });
    },
    showRegisterModal() {
      this.registerModal = true;
    },
    closeRegisterModal() {
      this.registerModal = false;
    }
  },
};
</script>

<style scoped>
.signin__wrapper {
  width: 570px;
  height: 369px;
  margin: 20px;
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 109px;
}
.title h2 {
  margin: 30px 0 10px;
}

.error {
  color: #E0245E;
  margin: 0;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.field {
  border: thin solid rgb(56, 68, 77);
  border-radius: 5px;
  height: 52px;
  margin: 12px 0;
  position: relative;
}
label {
  cursor: text;
  position: absolute;
  top: 10px;
  left: 5px;
  font-size: 19px;
  transform-origin: left;
  transform: translateY(0);
  color: rgb(136, 153, 166);
  transition: all .15s;
}
.move {
  transform: translateY(-12px) scale(.6);
}
input {
  background: rgb(21, 32, 43);
  color: white;
  border: none;
  padding: 20px 5px 5px;
  font-size: 19px;
  width: 99%;
  height: 99%;
}
input:focus {
  border: 2px solid rgba(29,161,242,1.00);
  border-radius: 5px;
  outline: none;
  width: 100%;
  height: 100%;
}

.signin {
  background: rgba(29,161,242,1.00);
  color: white;
  border: solid thin rgba(29,161,242,1.00);
  border-radius: 30px;
  height: 47px;
  width: 100%;
  margin: 20px 0;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.signin:hover {
  opacity: 0.9;
}
.signin:focus {
  outline: none;
}

.etc {
  color: rgb(136, 153, 166);
  display: flex;
  justify-content: center;
}
.etc span {
  color: rgba(29,161,242,1.00);
}
.etc span:hover {
  text-decoration-line: underline;
}

.modal {
  background: rgba(0,0,0,0.4);
  z-index: 3;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>