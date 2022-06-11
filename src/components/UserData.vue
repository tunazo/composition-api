<template>
  <h2>{{ fullName }}</h2>
  <h3>{{ age }}</h3>
  <button @click="changeAge">change Age</button>
</template>

<script>
import { computed, inject } from 'vue';
export default {
  props: ['firstName', 'lastName'],
  emits: ['changeAge'],
  // computed: {
  //   fullName() {
  //     return this.firstName + ' ' + this.lastName;
  //   },
  // },
  setup(props, context) {
    const fullName = computed(() => props.firstName + ' ' + props.lastName);

    const age = inject('uAge');

    function changeAge() {
      context.emit('changeAge', 98);
    }
    return {
      fullName,
      age,
      changeAge,
    };
  },
};
</script>
