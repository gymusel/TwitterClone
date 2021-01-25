<template>
  <div class="app__wrapper">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)

export default {
  components: {
    
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", sans-serif;
  font-size: 15px;
  background: rgb(21, 32, 43);
  color: white;
  overflow: hidden;
}
.app__wrapper {
  display: flex;
  justify-content: center;
}
</style>