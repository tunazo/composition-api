<template>
  <section class="container">
    <user-data v-bind="user" @change-age="cAge"></user-data>
    <input type="text" placeholder="First Name" v-model="user.firstName" />
    <input type="text" placeholder="Last Name" ref="lastNameInput" />
    <button @click="setName">change Last Name</button>
  </section>
</template>

<script>
import UserData from './components/UserData.vue';
import { ref, reactive, provide } from 'vue';
export default {
  components: {
    UserData,
  },
  setup() {
    const user = reactive({
      firstName: '',
      lastName: '',
    });

    const age = ref(32);

    provide('uAge', age);

    function cAge(value) {
      age.value = value;
    }

    const lastNameInput = ref(null);

    function setName() {
      user.lastName = lastNameInput.value.value;
    }

    // const fullName = computed(() => {
    //   return `${user.firstName} ${user.lastName}`;
    // });

    // watch(fullName, (currVal, oldVal) => {
    //   if (currVal && currVal !== oldVal) {
    //     console.log('name changed!');
    //   }
    // });
    return {
      setName,
      lastNameInput,
      user,
      cAge,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>
