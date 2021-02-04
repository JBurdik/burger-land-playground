<template>
  <h1>{{ msg }}</h1>
  <form
    @submit.prevent="submitForm"
    class="flex flex-col w-96 m-auto items-center content-center"
  >
    <!-- form group -->
    <div class="flex flex-row w-full items-center space-x-5">
      <div class="flex flex-col flex-shrink items-start content-center">
        <label class="text-indigo-700 font-black text-xl">Burger Name: </label>
        <input
          class="m-0 border border-blue-300 w-full"
          type="text"
          v-model="name"
        />
      </div>

      <div class="flex flex-col flex-shrink items-start content-center">
        <label class="text-indigo-700 font-black text-xl">Price: </label>
        <input
          class="m-0 border border-blue-300 w-full"
          type="number"
          v-model="price"
        />
      </div>
    </div>
    <label class="text-indigo-700 font-black text-xl">Ingredients: </label>
    <label class="text-indigo-500 font-light">(split by ",")</label>
    <textarea
      class="m-2 border border-blue-300 w-full"
      v-model="ingredients"
    ></textarea>
    <input
      type="submit"
      class="bg-green-500 text-white p-3 m-2 rounded"
      value="Pridat burger"
    />
  </form>
  <section class="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-6xl m-auto my-4">
    <BurgerCard
      v-for="burger in lSBurgers"
      :burger="burger"
      :key="burger.id"
      @click.prevent="toggleOverlay(burger.id)"
      :showOverlayId="showOverlayIdx"
      @delBurger="delBurger"
    ></BurgerCard>
  </section>
</template>

<script>
import burgerjson from "../assets/burgers.json";
import BurgerCard from "./BurgerCard.vue";

export default {
  name: "HelloWorld",
  components: {
    BurgerCard
  },
  props: {
    msg: String
  },
  data() {
    return {
      burgerData: burgerjson,
      showOverlayIdx: null,
      arr: [],
      localStorage: window.localStorage,
      lSBurgers: JSON.parse(window.localStorage.getItem("burgers")),
      price: 123,
      name: "new burger",
      ingredients: "split, by, comma"
    };
  },
  created() {
    if (window.localStorage.getItem("burgers") === null) {
      const data = JSON.stringify(this.burgerData);
      window.localStorage.setItem("burgers", data);
      console.log("insert on mount done!");
      window.location.reload();
    }
  },
  methods: {
    submitForm() {
      const image = this.name.replace(" ", "-").toLowerCase() + ".jpg";
      const burgers = this.lSBurgers;
      const burgersLength = burgers.length;
      let id = 0;
      if (burgersLength >= 1) {
        id = burgers[burgersLength - 1].id + 1;
      }
      this.arr = burgers;
      const ingredients = this.ingredients.split(",");
      const data = {
        id: id,
        name: this.name,
        price: this.price,
        ingredients: ingredients,
        image: image
      };
      this.arr.push(data);
      this.createBurger();
    },
    createBurger() {
      const data = JSON.stringify(this.arr);
      window.localStorage.setItem("burgers", data);
      alert("Burger Added");
    },
    delBurger(data) {
      this.arr = this.lSBurgers;
      let index = this.arr.findIndex((item) => item.id === data);
      this.arr.splice(index, 1);
      const saveData = JSON.stringify(this.arr);
      window.localStorage.setItem("burgers", saveData);
    },
    getBurgersLS() {
      console.log(JSON.parse(window.localStorage.getItem("burgers")));
    },
    toggleOverlay(id) {
      this.showOverlayIdx = this.showOverlayIdx == id ? null : id;
    }
  }
};
</script>

<style lang="scss" scoped>
.burgers-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
.burger-card {
  background-position: center 70%;
  background-size: cover;
  display: flex;
  flex-flow: column;
  position: relative;
  border-radius: 20px;
  box-shadow: 5px 5px 5px #000, -2px -2px 10px rgba(255, 255, 255, 0.05);
  color: #000;
  height: 300px;
  width: 100%;
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
