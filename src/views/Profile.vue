<template>
  <div class="profile__wrapper">
    <div v-show="editProfileModal" @click="closeEditProfileModal" class="modal">
      <div v-on:click.stop><EditProfileModal /></div>
    </div>
    <NavBar />
    <div class="profile">
      <div class="title">
        <v-icon name="arrow-left" @click="$router.go(-1)" class="back-btn" style="color: rgb(29, 161, 242);" />
        <h3>プロフィール</h3>
      </div>
      <div class="scroll">
        <div class="back-image" />
        <div class="user-info__box">
          <div class="info__head">
            <div class="user-icon__box"><img src="@/assets/face.jpg" class="user-icon" /></div>
            <button @click="showEditProfileModal" v-if="isMyself(uid)" class="edit-btn">プロフィールを編集</button>
            <div v-else class="head__items">
              <v-icon name="ellipsis-h" class="v-icon" />
              <v-icon v-if="isFollowed(uid)" name="envelope" class="v-icon" />
              <v-icon v-if="isFollowed(uid)" name="bell" class="v-icon" />
              <button v-if="isFollowed(uid)" @click="unfollow(uid)" class="unfollow-btn">フォロー<span class="normal">中</span><span class="hover">解除</span></button>
              <button v-else @click="follow(uid)" class="follow-btn">フォロー</button>
            </div>
          </div>
          <h2 class="displayName">{{ displayName }}</h2>
          <p class="atName">{{ atName }}</p>
          <div class="description">東北大学</div>
          <div class="createdAt">
            <v-icon name="calendar-alt" class="v-icon" />
            <div>{{ fromTimestampToDate(createdAt) }}からTwitterを利用しています</div>
          </div>
          <div class="follow-counts__box">
            <div class="follow-counts"><span>1.2万</span>フォロー中</div>
            <div class="follow-counts"><span>1万</span>フォロワー</div>
          </div>
        </div>
        <div class="btns">
          <div class="btn">ツイート</div>
          <div class="btn">ツイートと返信</div>
          <div class="btn">メディア</div>
          <div class="btn">いいね</div>
        </div>
      </div>
    </div>
    <FooBar />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import EditProfileModal from "@/components/EditProfileModal.vue"
import FooBar from "@/components/FooBar.vue"
import firebase from "firebase/app";

export default {
  components: {
    NavBar,
    EditProfileModal,
    FooBar,
  },
  data() {
    return {
      uid: "",
      displayName: "",
      atName: "",
      myFavs: [],
      createdAt: "",
      myFollows: [],
      editProfileModal: false,
    };
  },
  methods: {
    fromTimestampToDate(timestamp) {
      const time = timestamp.toDate();
      const year = time.getFullYear();
      const month = (`${time.getMonth() + 1}`).slice(-2);
      return `${year}年${month}月`;
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
    fetchMyFollows(uid) {
      firebase.firestore().collection("users").doc(uid).onSnapshot((doc) => {
        const userData = doc.data();
        if (userData.follows) {
          this.myFollows = userData.follows;
        }
      });
    },
    fetchUserData(uid) {
      firebase.firestore().collection('users').doc(uid).onSnapshot((doc) => {
        const userData = doc.data();
        if (userData) {
          this.uid = doc.data().uid;
          this.displayName = doc.data().displayName;
          this.atName = doc.data().atName;
          this.createdAt = doc.data().createdAt;
        }
      });
    },
    isMyself(uid) {
      return uid == this.fetchCurrentUserData() ? true : false;
    },
    isFollowed(uid) {
      return this.myFollows.indexOf(uid) >= 0 ? true : false;
    },
    follow(uid) {
      const currentUserId = firebase.auth().currentUser.uid;
      const userDoc = firebase.firestore().collection('users').doc(currentUserId);
      console.log('Adding' + uid + ' to your follows')
      userDoc.update({
        follows: firebase.firestore.FieldValue.arrayUnion(uid)
      });
    },
    unfollow(uid) {
      const currentUserId = firebase.auth().currentUser.uid;
      const userDoc = firebase.firestore().collection('users').doc(currentUserId);
      console.log('Removing' + uid + ' from your favorites')
      userDoc.update({
        follows: firebase.firestore.FieldValue.arrayRemove(uid)
      });
    },
    showEditProfileModal() {
      this.editProfileModal = true;
    },
    closeEditProfileModal() {
      this.editProfileModal = false;
    }
  },
  created() {
    this.fetchMyFavorites(this.fetchCurrentUserData());

    this.fetchMyFollows(this.fetchCurrentUserData());
    
    this.fetchUserData(this.$route.params.uid);
  },
  watch: {
    $route () {
      // ここでページ遷移時に検知したい処理を記述
      this.fetchMyFavorites(this.fetchCurrentUserData());
    
      this.fetchMyFollows(this.fetchCurrentUserData());

      this.fetchUserData(this.$route.params.uid);
    }
  },
}
</script>

<style scoped>
.profile__wrapper {
  display: flex;
}
.profile {
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
.back-image {
  background: grey;
  height: 200px;
}
.user-info__box {
  padding: 15px;
}
.info__head {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 39px;
}
.user-icon__box {
  background: rgb(21, 32, 43);
  width: 142px;
  height: 142px;
  padding: 4px;
  border-radius: 50%;
  margin-right: auto;
}
.user-icon {
  width: 134px;
  height: 134px;
  border-radius: 50%;
}
.edit-btn {
  background: rgb(21, 32, 43);
  color: rgb(29, 161, 242);
  border: thin solid rgb(29, 161, 242);
  border-radius: 30px;
  width: 166px;
  height: 39px;
  font-weight: bold;
}
.edit-btn:hover {
  background: rgba(29, 161, 242, 0.1)
}
.edit-btn:focus {
  outline: none;
}
.head__items {
  display: flex;
  align-items: center;
}
.info__head .v-icon {
  color: rgb(29, 161, 242);
  border: thin solid rgb(29, 161, 242);
  border-radius: 50%;
  width: 39px;
  height: 39px;
  padding: 10px;
  margin-right: 10px;
}
.info__head .v-icon:hover {
  background: rgba(29, 161, 242, 0.1)
}
.follow-btn {
  background:rgb(21, 32, 43);
  border: thin solid rgb(29, 161, 242);
  color: rgb(29, 161, 242);
  font-weight: bold;
  border-radius: 30px;
  width: 122px;
  height: 39px;
}
.follow-btn:hover {
  background: rgba(29, 161, 242, 0.1)
}
.follow-btn:focus {
  outline: none;
}
.unfollow-btn {
  background: rgb(29, 161, 242);
  color: white;
  font-weight: bold;
  border-radius: 30px;
  border: none;
  width: 122px;
  height: 39px;
}
.unfollow-btn:hover {
  background: #e0245E;
}
.unfollow-btn:focus {
  outline: none;
}
.unfollow-btn .hover {
  display: none;
}
.unfollow-btn:hover .normal {
  display: none;
}
.unfollow-btn:hover .hover {
  display: inline;
}
.displayName {
  margin: 5px 0 0;
}
.atName {
  color: #8899A6;
  margin: 0;
}
.createdAt {
  color: #8899A6;
  display: flex;
  align-items: center;
  padding: 5px 0;
}
.createdAt .v-icon {
  margin-right: 5px;
}
.follow-counts__box {
  color: #8899A6;
  display: flex;
  padding: 5px 0;
}
.follow-counts {
  margin-right: 20px;
}
.follow-counts span {
  color: white;
  font-weight: bold;
  margin-right: 5px;
}
.btns {
  color: #8899A6;
  font-weight: bold;
  height: 52px;
  display: flex;
}
.btn {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn:hover {
  background: #1DA1F233;
  color:rgb(29, 161, 242);
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