<template>
  <div class="fixed top-4 right-0 w-52">
    <transition-group name="flash" tag="span">
      <flash-message
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      ></flash-message>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FlashMessage from "./FlashMessage.vue";
export default {
  components: { FlashMessage },
  data() {
    return {
      message: ""
    };
  },
  computed: mapState(["notifications"])
};
</script>

<style lang="scss" scoped>
.flash-enter-active,
.flash-leave-active {
  transition: all 0.5s ease-in-out;
}
.flash-enter-from,
.flash-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
