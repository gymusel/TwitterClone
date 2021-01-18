<template>
  <div class="form__wrapper">
    <textarea
      class="form__textarea"
      v-model="text"
      ref="area"
      :style="form__textarea"
      placeholder="いまどうしてる？"
    />
    <div class="form__buttons">
      <button v-on:click="postTweet" class="form__submit-button">
        投稿
      </button>
    </div>
    <div>
      <p v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.text }}
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      text: "",
      height:"60px",
      tweets: [],
      unsubscribe: null,
    };
  },
  computed:{
    form__textarea(){
      return {
        "height": this.height,
      }
    }
  },
  watch:{
    text(){
      this.resize();
    },
  },
  methods:{
    postTweet() {
      firebase.firestore().collection("tweets").add({
        text: this.text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    },
    resize(){
      this.height = "auto";
      this.$nextTick(()=>{
        this.height = this.$refs.area.scrollHeight + 'px';
      })
    }
  },
  created() {
    const ref = firebase.firestore().collection("tweets")
      .orderBy("updatedAt", "desc")
      .limit(10);
    // 参照に変更があったときに、お知らせを受け取る関数を onSnapshot() の中に書く
    // 「購読する（subscribe）する」ともいう
    this.unsubscribe = ref.onSnapshot(snapshot => {
      let tweets = [];
      snapshot.forEach(doc => {
        tweets.push(doc.data());
      });
      this.tweets = tweets;
    });
  },
  mounted(){
    this.resize();
  },
  // ページを閉じたり切り替えたりなどで、コンポーネントが破棄される（destroy）ときに実行される関数
  destroyed() {
    // 変更のおしらせを受け取る必要がなくなるので、購読を中止する（unsubscribe）
    this.unsubscribe();
    this.unsubscribe = null;
  }
}
</script>

<style scoped>
.form__wrapper {
  padding: 1rem;
}
.form__textarea {
  width: 100%;
  /* height: calc(1.3rem * 3 + 0.5rem * 2); */
  padding: 0.5rem;
  line-height: 1.3rem;
  border-radius: 5px;
  border: none;
  resize: none;
}
.form__textarea:focus {
  outline: none;
}
.form__buttons {
  display: flex;
  justify-content: flex-end;
}
</style>