<template>
  <button @click="addNotify" class="btn bg-gray-500 border border-gray-400">
    Test toaster
  </button>
  <form
    @submit.prevent="submitForm"
    class="flex flex-col w-96 m-auto items-center content-center"
  >
    <!-- form group -->
    <div class="flex flex-row w-full items-center space-x-5">
      <div class="flex flex-col flex-shrink items-start content-center">
        <label class="text-indigo-700 font-medium text-xl">Burger Name: </label>
        <input
          class="m-0 border border-blue-300 w-full"
          type="text"
          v-model="name"
        />
      </div>

      <div class="flex flex-col flex-shrink items-start content-center">
        <label class="text-indigo-700 font-medium text-xl">Price: </label>
        <input
          class="m-0 border border-blue-300 w-full"
          type="number"
          v-model="price"
        />
      </div>
    </div>
    <label class="text-indigo-700 font-medium text-xl">Ingredients: </label>
    <label class="text-indigo-500 font-normal">(split by ",")</label>
    <textarea
      class="m-2 border border-blue-300 w-full"
      v-model="ingredients"
    ></textarea>
    <input type="submit" class="btn bg-green-500" value="Pridat burger" />
  </form>
  <section class="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-6xl m-auto my-4">
    <BurgerCard
      v-for="burger in burgers"
      :burger="burger"
      :key="burger.id"
      @click.prevent="toggleOverlay(burger.id)"
      :showOverlayId="showOverlayIdx"
      @delBurger="delBurger"
    ></BurgerCard>
  </section>
</template>

<script lang="ts">
import BurgerCard from "./BurgerCard.vue";
//toastr

// firebase imports
import { db } from "../firebase";
import { BurgerInterface } from "../interfaces/burgerInterface";
import { mapActions } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  components: {
    BurgerCard
  },
  props: {
    msg: String
  },
  data() {
    return {
      showOverlayIdx: "" as string,
      arr: [],
      burgers: [] as any,
      price: 123 as number,
      name: "new burger" as string,
      ingredients: "split, by, comma" as string
    };
  },
  created() {
    db.collection("burgers").onSnapshot((querySnapshot) => {
      this.burgers = [];
      querySnapshot.forEach((doc) => {
        this.burgers.push(doc.data() as BurgerInterface);
      });
    });
  },
  methods: {
    ...mapActions(["addNotification"]),
    addNotify() {
      this.addNotification({
        type: "error",
        title: "Dummy title",
        message: "Dummy"
      });
    },
    submitForm() {
      let id = (Math.random().toString(36) + Date.now().toString(36)).substring(
        2
      );
      this.createBurger(id);
    },
    createBurger(id: string) {
      const image = this.name.replace(" ", "-").toLowerCase() + ".jpg";
      const ingredients = this.ingredients.split(",");
      const data = JSON.stringify(this.arr);
      window.localStorage.setItem("burgers", data);
      db.collection("burgers")
        .doc(id)
        .set({
          id: id,
          name: this.name,
          price: this.price,
          image: image,
          ingredients: ingredients
        })
        .then(() => {
          this.addNotification({
            type: "success",
            title: "Good Job",
            message: "burger created"
          });
        });
    },
    delBurger(id: string) {
      var burgers_query = db.collection("burgers").where("id", "==", id);
      burgers_query
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.data());
            doc.ref.delete();
          });
        })
        .then(() => {
          this.addNotification({
            type: "info",
            title: "Ooops",
            message: "burger deleted"
          });
        });
    },
    toggleOverlay(id: string): void {
      this.showOverlayIdx = this.showOverlayIdx == id ? "" : id;
    }
  }
});
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
