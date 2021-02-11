<template>
  <div
    id="nav"
    class="flex flex-row justify-around fixed top-0 p-4 bg-green-700 w-full text-green-200 "
  >
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </div>
  <router-view />
  <!-- <HelloWorld msg="Burgerland.vue" /> -->
  <FlashMessages />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FlashMessages from "./components/FlashMessages.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    FlashMessages
  }
});
</script>

<style>
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
