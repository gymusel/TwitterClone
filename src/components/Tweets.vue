<template>
  <div class="tweets__wrapper">
    <div v-for="tweet in tweets" :key="tweet.id" class="tweet__box">
      <div class="user__icon"></div>
      <div class="tweet__contents">
        <div class="tweet__head">
          <p class="head__item user__name">UserName</p>
          <p class="head__item user__id">@user_id</p>
          <p class="head__item dot">・</p>
          <p class="head__item time">30</p>
          <p class="head__item v-icon"><v-icon name="ellipsis-h" /></p>
        </div>
        <div class="tweet__body">
          {{ tweet.text }}
        </div>
        <div class="tweet__foot">
          <div class="foot__item">
            <v-icon name="comment" class="v-icon" />
            <p class="digits">100</p>
          </div>
          <div class="foot__item">
            <v-icon name="retweet" class="v-icon" />
            <p class="digits">1000</p>
          </div>
          <div class="foot__item">
            <v-icon name="heart" class="v-icon" />
            <p class="digits">10</p>
          </div>
          <div class="foot__item">
            <v-icon name="share-alt" class="v-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      tweets: [],
      unsubscribe: null,
    };
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
  // ページを閉じたり切り替えたりなどで、コンポーネントが破棄される（destroy）ときに実行される関数
  destroyed() {
    // 変更のおしらせを受け取る必要がなくなるので、購読を中止する（unsubscribe）
    this.unsubscribe();
    this.unsubscribe = null;
  }
}
</script>

<style scoped>
.tweet__box {
  border-bottom: thin solid rgb(56, 68, 77);
  padding: 10px 15px;
  display: flex;
}
.user__icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 5px 10px 0 0;
  background: black;
}
.tweet__contents {
  width: 90%;
}
.tweet__head {
  color: #8899A6;
  display: flex;
  align-items: center;
}
.head__item {
  margin: 0;
}
.user__name {
  color: white;
  font-weight: bold;
  padding-right: 5px;
}
.v-icon {
  margin-left: auto;
}
.tweet__body {

}
.tweet__foot {
  color: #8899A6;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
}
.foot__item {
  display: flex;
  align-items: center;
  /* width: 25em; */
}
.foot__item p {
  margin: 0;
}
.tweet__foot .v-icon {
  width: 18.75px;
  height: 18.75px;
  margin-right: 10px;
}
</style>