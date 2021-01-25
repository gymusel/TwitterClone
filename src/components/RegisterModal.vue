<template>
  <div class="register__wrapper">
    <div class="header">
      <v-icon name="dove" scale="1.5" />
    </div>
    <form @submit.prevent="registerUser">
      <h2 class="title">アカウントを作成</h2>
      <div>
        <div class="field">
          <label for="name" v-bind:class="{ move: nameOnMove }">名前</label>
          <input type="name" v-model="name" v-on:focus="typeName">
        </div>
        <div class="field">
          <label for="email" v-bind:class="{ move: emailOnMove }">メール</label>
          <input type="email" v-model="email" v-on:focus="typeEmail">
        </div>
        <div class="field">
          <label for="password" v-bind:class="{ move: passwordOnMove }">パスワード</label>
          <input type="password" v-model="password" v-on:focus="typePassword">
        </div>
      </div>
      <!-- <div class="alt">かわりに電話番号を登録する</div> -->
      <!-- <div class="birthday">
        <p class="birthday__title">生年月日</p>
        <p class="birthday__description">この情報は公開されません。このアカウントをビジネス、ペットなどに使う場合でも、ご自身の年齢を確認してください。</p>
      </div> -->
      <div class="error">{{ error }}</div>
      <div class="alert">
        <p>アカウントを作成すると、<span>利用規約</span>、および<span>Cookieの使用</span>を含む<span>プライバシーポリシー</span>に同意したことになります。あなたのメールアドレスや電話番号を連絡先に保存しているTwitterユーザーに通知などが表示されます。<span>プライバシーの設定</span></p>
      </div>
      <button type="submit" class="register">登録する</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/database";
// import db from 'firebase/database';

export default {
  data() {
    return {
      nameOnMove: false,
      emailOnMove: false,
      passwordOnMove: false,
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    typeName:function(){
        this.nameOnMove = true;
    },
    typeEmail:function(){
      this.emailOnMove = true;
    },
    typePassword:function(){
      this.passwordOnMove = true;
    },
    registerUser() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          result.user.updateProfile({
            displayName: this.name
          }).then(() => {
            alert('アカウントの新規作成が完了しました！')
            this.sendEmail(this.email)
          })
        },
        (err) => {
          console.log(err);
          if (err.code == "auth/email-already-in-use") {
            this.error = "入力したメールアドレスは登録済みです。";
          } else {
            this.error = "入力したメールアドレスかパスワードに問題があります。";
          }
        }
      )
    },
    sendEmail() {
      const actionCodeSettings = {
        url: "http://" + location.host + "/signin",
      };
      firebase.auth().languageCode = "ja";
      const user = firebase.auth().currentUser;
      user
        .sendEmailVerification(actionCodeSettings)
        .then(() => alert("認証メールを送信しました。"))
        .catch((e) => console.log(e));
    },
  }
};
</script>

<style lang="scss" scoped>
.register__wrapper {
  background: rgb(21, 32, 43);
  height: 580px;
  width: 600px;
  border-radius: 15px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.header {
  height: 53px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
}

.title {
  height: 30px;
  margin: 15px 0;
}

.field {
  border: thin solid rgb(56, 68, 77);
  border-radius: 5px;
  height: 52px;
  margin: 19px 0;
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

// .alt {
//   margin: 10px 0;
//   color: rgba(29,161,242,1.00);
// }

// .birthday__title {
//   font-weight: bold;
//   margin-bottom: 0;
// }
// .birthday__description {
//   color: rgb(136, 153, 166);
//   margin: 0;
// }

.error {
  color: #E0245E;
  margin: 0;
}

.alert {
  margin-top: auto;
}
.alert p {
  margin: 0;
}
.alert p span {
  color: rgba(29,161,242,1.00);
}

.register {
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
.register:hover {
  opacity: 0.9;
}
.register:focus {
  outline: none;
}
</style>