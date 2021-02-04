<template>
  <figure
    class="burger-card"
    :style="{
      backgroundImage: 'url(/imgs/cheeseburger.jpg)'
    }"
  >
    <h1 class="text-xl text-white p-2 mt-2 font-light">
      {{ burger.name }}
      <span class="text-yellow-500 font-bold">{{ burger.price }}</span>
    </h1>
    <button
      class="flex items-center content-center bg-red-600 border border-red-900 px-4 py-1 absolute right-3 top-3 text-red-200 shadow-2xl focus:outline-none rounded-full"
      @click="delBurger(burger.id)"
    >
      Delete
    </button>
    <transition name="overlay">
      <div v-if="showOverlayId === burger.id" class="overlay">
        <ul class="list ingredients">
          <li v-for="(ingredient, idx) in burger.ingredients" :key="idx">
            {{ ingredient }}
          </li>
        </ul>
      </div>
    </transition>
  </figure>
</template>

<script>
export default {
  name: "BurgerCard",
  props: ["burger", "showOverlayId"],
  methods: {
    delBurger(id) {
      this.$emit("delBurger", id);
    }
  }
};
</script>

<style scoped>
.overlay {
  background: rgba(31, 31, 31, 0.75);
  color: #fff;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(3px);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  height: 60%;
  bottom: 0;
  overflow: hidden;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: height 0.5s ease-in-out, opacity 0.3s ease-in-out;
}
.overlay-enter-from,
.overlay-leave-to {
  height: 0%;
  opacity: 0;
}
</style>
