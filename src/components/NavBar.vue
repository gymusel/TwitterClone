<template>
  <div class="nav__bar">
    <router-link to="/" class="nav__logo nav__link" exact-active-class="">
      <v-icon name="dove" scale="1.5" class="v-icon"/>
    </router-link>
    <div class="nav__items">
      <router-link to="/" class="nav__link">
        <p><v-icon name="home" scale="1.5" class="v-icon"/>ホーム</p>
      </router-link>
      <router-link to="/hashtag" class="nav__link">
        <p><v-icon name="hashtag" scale="1.5" class="v-icon"/>話題を検索</p>
      </router-link>
      <router-link to="/notification" class="nav__link">
        <p><v-icon name="bell" scale="1.5" class="v-icon"/>通知</p>
      </router-link>
      <router-link to="/message" class="nav__link">
        <p><v-icon name="envelope" scale="1.5" class="v-icon"/>メッセージ</p>
      </router-link>
      <!-- <router-link to="/bookmark" class="nav__link">
        <p><v-icon name="bookmark" scale="1.5" class="v-icon"/>ブックマーク</p>
      </router-link>
      <router-link to="/list" class="nav__link">
        <p><v-icon name="list-alt" scale="1.5" class="v-icon"/>リスト</p>
      </router-link> -->
      <router-link :to="{ name: 'Profile', params: { uid: user.uid }}" class="nav__link">
        <p><v-icon name="user" scale="1.5" class="v-icon"/>プロフィール</p>
      </router-link>
      <router-link to="/preference" class="nav__link">
        <p><v-icon name="cog" scale="1.5" class="v-icon"/>設定</p>
      </router-link>
    </div>
    <button id="tweetModal" class="tweetModal-button">
      <p>ツイートする</p>
    </button>
    <button @click="account" class="account-button">
      <div class="user-icon"/>
      <div class="account__info">
        <p>{{ user.displayName }}</p>
        <p class="opacity">{{ atName }}</p>
      </div>
      <v-icon name="ellipsis-h" scale="1.5"/>
    </button>
  </div>
</template>

<script>
import firebase from "firebase/app";
// import db from 'firebase/database';

export default {
  data() {
    return {
      user: {},
      atName: ""
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      this.atName = "@" + user.email.split("@")[0]
    })
  },
  methods: {
    account() {
      firebase.auth().signOut();
      this.$router.push('/hello');
    }
  }
}
</script>

<style scoped>
.nav__bar {
  color: white;
  border-right: thin solid rgb(56, 68, 77);
  height: 100vh;
  width: 275px;
  /* overflow: hidden; */
  /* left: 0;
  position: fixed; */
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 19px;
}

.nav__logo {
  padding: 10px;
  margin: 5px;
}

.nav__link {
  color: white;
  text-decoration: none;
}
.router-link-exact-active {
  color:rgb(29, 161, 242);
}
.nav__link:hover {
  color: rgb(29, 161, 242);
}
.nav__link p {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px;
  border-radius: 30px;
}
.nav__link p:hover {
  background: #1DA1F233;
}

.v-icon {
  margin-right: 10px;
  width: 45px;
}

.tweetModal-button {
  background: rgb(29, 161, 242);
  color: white;
  border-radius: 30px;
  border: none;
  display: flex;
  justify-content: center;
  margin: 5px 20px;
}
.tweetModal-button:hover {
  opacity: 0.90;
}
.tweetModal-button:focus {
  outline: none;
}

.account-button {
  background: rgb(21, 32, 43);
  color: white;
  border-radius: 30px;
  border: none;
  display: flex;
  align-items: center;
  margin: auto 10px 5px;
  padding: 8px;
  height: 50px;
}
.account-button:hover {
  background: #1DA1F233;
}
.account-button:focus {
  outline: none;
}
.account__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.user-icon {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: black;
}
.account__info {
  margin: auto auto auto 5px;
}
.account__info p {
  margin: 1px;
}
.opacity {
  opacity: 0.5;
}
</style>