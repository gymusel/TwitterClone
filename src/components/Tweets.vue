<template>
  <div class="tweets__wrapper">
    <router-link :to="{ name: 'Post', params: { pid: post.pid }}" v-for="post in posts" :key="post.id" class="tweet__box">
      <router-link :to="{ name: 'Profile', params: { uid: post.uid }}" class="user__icon" />
      <div class="tweet__contents">
        <div class="tweet__head">
          <router-link :to="{ name: 'Profile', params: { uid: post.uid }}" class="head__item user__name">{{ post.displayName }}</router-link>
          <router-link :to="{ name: 'Profile', params: { uid: post.uid }}" class="head__item user__id">{{ post.atName }}</router-link>
          <p class="head__item dot">・</p>
          <p class="head__item time">{{ howOld(post.updatedAt) }}</p>
          <p class="head__item v-icon"><v-icon name="ellipsis-h" /></p>
        </div>
        <div class="tweet__body">
          {{ post.text }}
        </div>
        <div class="tweet__foot">
          <div class="foot__item">
            <v-icon name="comment" class="v-icon cmt-btn" />
            <!-- <p class="digits">100</p> -->
          </div>
          <div class="foot__item">
            <v-icon name="retweet" class="v-icon ret-btn" />
            <!-- <p class="digits">1000</p> -->
          </div>
          <div class="foot__item">
            <v-icon name="heart" v-if="isFavorite(post)" @click.prevent="removeFromFavorite(post)" class="v-icon fav-btn" style="color:#e0245E;" />
            <v-icon name="heart" v-else @click.prevent="addToFavorite(post)" class="v-icon fav-btn" />
            <!-- <p class="digits">{{ post.favNum }}</p> -->
          </div>
          <div class="foot__item">
            <v-icon name="share-square" class="v-icon cmt-btn" />
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import firebase from "firebase/app";
// import db from 'firebase/database';

export default {
  data() {
    return {
      posts: [],
      myFavs: [],
      // myFollows: [],
      unsubscribe: null,
    };
  },
  methods: {
    howOld(timestamp) {
      const now = new Date();
      const nowHour = (`${now.getHours()}`).slice(-2);
      const nowMin = (`${now.getMinutes()}`).slice(-2);
      const nowSec = (`${now.getSeconds()}`).slice(-2);

      const time = timestamp.toDate();
      const year = time.getFullYear();
      const month = (`${time.getMonth() + 1}`).slice(-2);
      const day = (`${time.getDate()}`).slice(-2);
      const hour = (`${time.getHours()}`).slice(-2);
      const min = (`${time.getMinutes()}`).slice(-2);
      const sec = (`${time.getSeconds()}`).slice(-2);

      const hourDiff = nowHour - hour;
      const minDiff = nowMin - min;
      const secDiff = nowSec - sec;

      const diff = now - time;

      if (diff < 60000) {
        return secDiff < 0 ? `${secDiff + 60}秒` : `${secDiff}秒`;
      } else if (diff < 3600000) {
        return minDiff < 0 ? `${minDiff + 60}分` : `${minDiff}分`;
      } else if (diff < 86400000) {
        return hourDiff < 0 ? `${hourDiff + 24}時間` : `${hourDiff}時間`;
      } else if (diff < 2592000000) {
        return `${month}月${day}日`;
      } else {
        return `${year}年${month}月${day}日`;
      }
    },
    isFavorite(post) {
      return this.myFavs.indexOf(post.pid) >= 0 ? true : false;
    },
    addToFavorite(post) {
      const currentUserId = firebase.auth().currentUser.uid;
      const userDoc = firebase.firestore().collection('users').doc(currentUserId);
      console.log('Adding ' + post.pid + ' to your favorites')
      userDoc.update({
        favorites: firebase.firestore.FieldValue.arrayUnion(post.pid)
      });
      // firebase.firestore().collection('posts').doc(post.pid).update({
      //   favCount: post.favCount + 1
      // });
    },
    removeFromFavorite(post) {
      const currentUserId = firebase.auth().currentUser.uid;
      const userDoc = firebase.firestore().collection('users').doc(currentUserId);
      console.log('Removing ' + post.pid + ' from your favorites')
      userDoc.update({
        favorites: firebase.firestore.FieldValue.arrayRemove(post.pid)
      });
      // firebase.firestore().collection('posts').doc(post.pid).update({
      //   favCount: post.favCount - 1
      // });
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
    // fetchMyFollows(uid) {
    //   firebase.firestore().collection("users").doc(uid).onSnapshot((doc) => {
    //     const userData = doc.data();
    //     if (userData.follows) {
    //       this.myFollows = userData.follows;
    //     }
    //   });
    // },
  },
  created() {
    // this.fetchMyFollows(this.fetchCurrentUserData());
    this.fetchMyFavorites(this.fetchCurrentUserData());

    const postRef = firebase.firestore().collection("posts")
      // .where("uid","array-contains-any",this.myFollows)
      .orderBy("updatedAt", "desc").limit(10);
    this.unsubscribe = postRef.onSnapshot(snapshot => {
      let fakePosts = [];
      snapshot.forEach(postDoc => {
        firebase.firestore().collection('users').doc(postDoc.data().uid).get().then(function(userDoc) {
          let fakePostDoc = {};
          fakePostDoc = postDoc.data()
          fakePostDoc["atName"] = userDoc.data().atName;
          fakePostDoc["displayName"] = userDoc.data().displayName;
          // firebase.firestore().collection('users').where('favorites','array-contains',postDoc.data().pid).get().then(snap => {
          //   fakePostDoc["favNum"] = snap.size;
          // });
          fakePosts.push(fakePostDoc);
        }).catch(function(error) {
          console.log(error);
        });
      });
      this.posts = fakePosts;
    });
  },
  destroyed() {
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
  text-decoration: none;
  color: white;
}
.tweet__box:hover {
  background: rgba(255, 255, 255, 0.03)
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
  text-decoration: none;
}
.user__name:hover {
  text-decoration: underline;
}
.user__id {
  color: #8899A6;
  text-decoration: none;
}
.v-icon {
  margin-left: auto;
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
}
.foot__item p {
  margin: 0;
}
.tweet__foot .v-icon {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  padding: 8px;
  border-radius: 50%;
}
.cmt-btn:hover {
  background: #1DA1F233;
}
.ret-btn:hover {
  background: rgba(45, 183, 112, 0.2);
}
.fav-btn:hover {
  background: rgba(224, 36, 94, 0.2);
}
</style>