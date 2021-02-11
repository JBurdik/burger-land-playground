<template>
  <div
    :class="getClass(notification.type)"
    @click="closeNotification"
    @mouseenter="mouseIn"
    @mouseleave="mouseOut"
    class="relative flex flex-row items-center content-center bottom-3 right-3 px-5 py-3 mt-1 rounded-lg"
  >
    <!-- icons -->
    <div class="icons flex-grow-0">
      <div class="icon text-3xl" v-if="notification.type == 'success'">
        <i class="fas fa-check-circle"></i>
      </div>
      <div class="icon text-3xl" v-if="notification.type == 'error'">
        <i class="fas fa-exclamation-circle"></i>
      </div>
      <div class="icon text-3xl" v-if="notification.type == 'info'">
        <i class="fas fa-info-circle"></i>
      </div>
    </div>
    <!-- text of flashmessage -->
    <div class="text flex flex-col items-start flex-grow ml-5">
      <h1 class="text-md font-bold">{{ notification.title }}</h1>
      <h2 class="text-sm">{{ notification.message }}</h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["notification"],
  data() {
    return {
      timeout: null
    };
  },
  created() {
    this.timeout = setTimeout(() => {
      this.removeNotification(this.notification);
    }, 3000);
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  methods: {
    ...mapActions(["removeNotification"]),
    //mouse in and out
    mouseIn() {
      clearTimeout(this.timeout);
      console.log("mousein");
    },
    mouseOut() {
      this.timeout = setTimeout(() => {
        this.removeNotification(this.notification);
      }, 3000);

      console.log("mouseout");
    },
    //get class color and bg
    getClass(type) {
      switch (type) {
        case "success":
          console.log("success");
          return "bg-green-200 border border-green-300 text-green-500";
          break;
        case "error":
          console.log("error");
          return "bg-red-200 border border-red-300 text-red-500";
          break;
        case "info":
          console.log("info");
          return "bg-blue-200 border border-blue-300 text-blue-500";
          break;
      }
    },
    closeNotification() {
      this.removeNotification(this.notification);
    }
  }
};
</script>

<style lang="scss" scoped></style>
