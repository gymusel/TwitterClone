<template>
  <div class="form__wrapper" :rows="rows">
    <div class="user__icon"></div>
    <div class="form__box">
      <textarea class="form__textarea" v-model="text" :rows="rows" placeholder="いまどうしてる？" />
      <div class="form__buttons">
        <div class="icon__box"><v-icon name="image" class="v-icon" /></div>
        <button v-if="text === ''" class="form__submit-button false">ツイートする</button>
        <button v-on:click="postTweet" v-else class="form__submit-button true">ツイートする</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  data() {
    return {
      user: {},
      atname: "",
      text: "",
    };
  },
  computed:{
    rows:function(){
      return this.text.split("\n").length ;
    },
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      this.atname = "@" + user.email.split("@")[0]
    })
  },
  methods:{
    postTweet() {
      // const userRef = firebase.firestore().collection('users').doc(this.user.uid)
      const postRef = firebase.firestore().collection("posts").doc()
      postRef.set({
        pid: postRef.id,
        uid: this.user.uid,
        text: this.text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        favCount: 0
      });
      this.text = ""
    },
  },
}
</script>

<style scoped>
.form__wrapper {
  border-bottom: thin solid rgb(56, 68, 77);
  min-height: 117px;
  padding: 5px 15px;
  display: flex;
}
.user__icon {
  width: 49px;
  height: 49px;
  border-radius: 50%;
  margin: 5px 10px 0 0;
  background: black;
}
.form__textarea {
  background: rgb(21, 32, 43);
  color: white;
  font-size: 22px;
  width: 505px;
  border: none;
  resize: none;
  margin-top: 15px;
}
.form__textarea:focus {
  outline: none;
}
.form__buttons {
  height: 49px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon__box {
  width: 37px;
  height: 37px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon__box:hover {
  background: #1DA1F233;
}
.v-icon {
  color: rgb(29, 161, 242);
  width: 22.5px;
  height: 22.5px;
}
.form__submit-button {
  background: rgb(29, 161, 242);
  color: white;
  border-radius: 30px;
  border: none;
  width: 121px;
  height: 39px;
  font-weight: bold;
}
.form__submit-button:focus {
  outline: none;
}
.true:hover {
  opacity: 0.9;
}
.false {
  opacity: 0.5;
}
</style>