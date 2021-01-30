<template>
  <div class="post__wrapper">
    <NavBar />
    <div class="post">
      <div class="title">
        <v-icon name="arrow-left" @click="$router.go(-1)" class="back-btn" style="color: rgb(29, 161, 242);" />
        <h3>ツイートする</h3>
      </div>
      <div class="scroll">
        <div class="tweet__contents">
          <div class="tweet__head">
            <router-link :to="{ name: 'Profile', params: { uid: uid }}" class="user__icon" />
            <router-link :to="{ name: 'Profile', params: { uid: uid }}" class="link">
              <p class="user__name">{{ displayName }}</p>
              <p class="user__id">{{ atName }}</p>
            </router-link>
            <p class="ellipsis-h"><v-icon name="ellipsis-h" /></p>
          </div>
          <div class="tweet__body">
            {{ text }}
          </div>
          <p class="time">{{ fromTimestampToDate(updatedAt) }}</p>
          <div class="counts">
            <p><span>1</span>件のリツイート</p>
            <p><span>{{ favNum }}</span>件のいいね</p>
          </div>
          <div class="tweet__foot">
            <v-icon name="comment" class="v-icon blue-icon" />
            <v-icon name="retweet" class="v-icon green-icon" />
            <v-icon name="heart" v-if="isFavorite(pid)" @click="removeFromFavorite(pid)" class="v-icon red-icon" style="color:#e0245E;" />
            <v-icon name="heart" v-else @click="addToFavorite(pid)" class="v-icon red-icon" />
            <v-icon name="share-square" class="v-icon blue-icon" />
          </div>
        </div>
      </div>
    </div>
    <FooBar />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import FooBar from "@/components/FooBar.vue"
import firebase from "firebase/app";

export default {
  components: {
    NavBar,
    FooBar,
  },
  data() {
    return {
      // post: {},
      pid: "",
      uid: "",
      text: "",
      createdAt: "",
      updatedAt: "",
      displayName: "",
      atName: "",
      favNum: 0,
      myFavs: [],
    };
  },
  methods: {
    fromTimestampToDate(timestamp) {
      const time = timestamp.toDate();
      const year = time.getFullYear();
      const month = (`${time.getMonth() + 1}`).slice(-2);
      const day = (`${time.getDate()}`).slice(-2);
      const hour = (`${time.getHours()}`).slice(-2);
      const min = (`${time.getMinutes()}`).slice(-2);
      if (hour < 12) {
        return `午前${hour}:${min}・${year}年${month}月${day}日`;
      } else {
        return `午後${hour - 12}:${min}・${year}年${month}月${day}日`;
      }
    },
    isFavorite(pid) {
      return this.myFavs.indexOf(pid) >= 0 ? true : false;
    },
    addToFavorite(pid) {
      const currentUserId = firebase.auth().currentUser.uid;
      const userDoc = firebase.firestore().collection('users').doc(currentUserId);
      console.log('Adding' + pid + ' to your favorites')
      userDoc.update({
        favorites: firebase.firestore.FieldValue.arrayUnion(pid)
      });
    },
    removeFromFavorite(pid) {
      const currentUserId = firebase.auth().currentUser.uid;
      const userDoc = firebase.firestore().collection('users').doc(currentUserId);
      console.log('Removing' + pid + ' from your favorites')
      userDoc.update({
        favorites: firebase.firestore.FieldValue.arrayRemove(pid)
      });
    },
    countsFavorites(pid) {
      firebase.firestore().collection('users').where('favorites','array-contains',pid).get().then(snap => {
        this.favNum = snap.size;
      });
    },
    fetchCurrentUserData() {
      return firebase.auth().currentUser.uid;
    },
    fetchMyFavorites(uid) {
      firebase.firestore().collection("users").doc(uid).onSnapshot((doc) => {
        const userData = doc.data();
        if (userData.favorites) {
          this.myFavs = userData.favorites;
        }
      });
    },
    fetchPostData(pid) {
      firebase.firestore().collection("posts").doc(pid).get().then(doc => {
        this.uid = doc.data().uid;
        this.text = doc.data().text;
        this.createdAt = doc.data().createdAt;
        this.updatedAt = doc.data().updatedAt;
        this.fetchUserData(this.uid);
      }).catch(function(error) {
        console.log(error);
      });
    },
    fetchUserData(uid) {
      firebase.firestore().collection('users').doc(uid).onSnapshot((doc) => {
        const userData = doc.data();
        if (userData) {
          this.displayName = doc.data().displayName;
          this.atName = doc.data().atName;
        }
      });
    }
  },
  created() {
    this.fetchMyFavorites(this.fetchCurrentUserData());
    this.pid = this.$route.params.pid;
    this.fetchPostData(this.pid);
  },
  updated() {
    this.countsFavorites(this.pid);
  },
  watch: {
    $route () {
      // ここでページ遷移時に検知したい処理を記述
      this.fetchMyFavorites(this.fetchCurrentUserData());
      this.pid = this.$route.params.pid;
      this.fetchPostData(this.pid);
      this.countsFavorites(this.pid);
    }
  },
}
</script>

<style scoped>
.post__wrapper {
  display: flex;
}
.post {
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
  z-index: 10;
}
.back-btn {
  width: 32px;
  height: 32px;
  padding: 8px;
  border-radius: 50%;
  margin-right: 20px;
}
.back-btn:hover {
  background: #1DA1F233;
}
.scroll {
  margin-top: 53px;
}
.tweet__contents {
  border-bottom: thin solid rgb(56, 68, 77);
  padding: 0 15px;
}
.tweet__head {
  padding: 10px 0;
  display: flex;
  align-items: center;
}
.user__icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  background: black;
}
.link {
  text-decoration: none;
}
.user__name {
  color: white;
  font-weight: bold;
  margin: 0;
  text-decoration: none;
}
.user__name:hover {
  text-decoration: underline;
}
.user__id {
  color: #8899A6;
  margin: 0;
  text-decoration: none;
}
.ellipsis-h {
  color: #8899A6;
  margin-left: auto;
}
.tweet__body {
  font-size: 23px;
}
.time {
  color: #8899A6;
}
.counts {
  color: #8899A6;
  border-top: thin solid rgb(56, 68, 77);
  border-bottom: thin solid rgb(56, 68, 77);
  display: flex;
}
.counts p {
  margin-right: 20px;
}
.counts span {
  color: white;
  font-weight: bold;
  margin-right: 2px;
}
.tweet__foot {
  color: #8899A6;
  margin: 8px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* if not counts */
  /* border-top: thin solid rgb(56, 68, 77);
  padding-top: 8px; */
}
.tweet__foot .v-icon {
  width: 32px;
  height: 32px;
  padding: 8px;
  border-radius: 50%;
}
.blue-icon:hover {
  background: #1DA1F233;
}
.green-icon:hover {
  background: rgba(45, 183, 112, 0.2);
}
.red-icon:hover {
  background: rgba(224, 36, 94, 0.2);
}
</style>