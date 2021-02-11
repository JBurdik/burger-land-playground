<template>
  <form @submit.prevent class="max-w-4xl">
    <div class="flex flex-col">
      <p class="text-lg">Email:</p>
      <input
        v-model="email"
        type="email"
        class="block border border-black focus:outline-none focus:bg-gray-50 p-1 m-4"
      />
    </div>
    <div class="flex flex-col">
      <p class="text-lg">Password:</p>
      <input
        v-model="password"
        type="password"
        class="block border border-black focus:outline-none focus:bg-gray-50 p-1 m-4"
      />
    </div>
    <div class="flex flex-col w-52 space-y-2 mx-auto">
      <button @click="login" class="btn bg-green-500 border-green-900">
        Login
      </button>
      <button
        @click="logWithG"
        class="btn text-black bg-white border-gray-900 rounded"
      >
        <img
          src="https://developers-dot-devsite-v2-prod.appspot.com/identity/sign-in/g-normal.png"
          alt="G"
        />
        Login
      </button>
      <button @click="register" class="btn text-gray-500 border-none">
        Register
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

import { auth, db, provider } from "../firebase";

export default defineComponent({
  data() {
    return {
      email: "" as string,
      password: "" as string
    };
  },

  methods: {
    ...mapActions(["addNotification"]),
    async register() {
      try {
        const user = auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    },
    async login() {
      try {
        const user = auth.signInWithEmailAndPassword(this.email, this.password);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    },
    async logWithG() {
      try {
        const res = await auth.signInWithPopup(provider);
        const user = res.user;
        console.log(user);

        let id = (
          Math.random().toString(36) + Date.now().toString(36)
        ).substring(2);

        db.collection("users")
          .doc(user?.uid)
          .set({
            id: user?.uid,
            displayName: user?.displayName,
            email: user?.email
          })
          .then(() => {
            this.addNotification({
              type: "success",
              title: "Logged in wia google",
              message: "Awesome work"
            });
          });
      } catch (err) {
        console.log(err);
      }
    }
  }
});
</script>

<style scoped></style>
