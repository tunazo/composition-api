<template>
  <base-container v-if="user">
    <h2>{{ user.fullName }}: Projects</h2>
    <base-search
      v-if="hasProjects"
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    ></base-search>
    <ul v-if="hasProjects">
      <project-item
        v-for="prj in availableProjects"
        :key="prj.id"
        :title="prj.title"
      ></project-item>
    </ul>
    <h3 v-else>No projects found.</h3>
  </base-container>
  <base-container v-else>
    <h3>No user selected.</h3>
  </base-container>
</template>

<script setup>
import { computed, watch, defineProps, toRefs } from 'vue';
import useSearch from '../hooks/search';
import ProjectItem from './ProjectItem.vue';
const props = defineProps(['user']);
const { user } = toRefs(props);

const projects = computed(() => (user.value ? user.value.projects : []));

const {
  availableItems: availableProjects,
  enteredSearchTerm,
  updateSearch,
} = useSearch(projects, 'title');

const hasProjects = computed(
  () => props.user.projects && availableProjects.value.length > 0
);

watch(user, () => (enteredSearchTerm.value = ''));

// export default {
// components: {
//   ProjectItem,
// },
// props: ['user'],
// data() {
//   return {
//     enteredSearchTerm: '',
//     activeSearchTerm: '',
//   };
// },
// computed: {
//   hasProjects() {
//     return this.user.projects && this.availableProjects.length > 0;
//   },
//   availableProjects() {
//     if (this.activeSearchTerm) {
//       return this.user.projects.filter((prj) =>
//         prj.title.includes(this.activeSearchTerm)
//       );
//     }
//     return this.user.projects;
//   },
// },
// methods: {
//   updateSearch(val) {
//     this.enteredSearchTerm = val;
//   },
// },
// watch: {
//   enteredSearchTerm(val) {
//     setTimeout(() => {
//       if (val === this.enteredSearchTerm) {
//         this.activeSearchTerm = val;
//       }
//     }, 300);
//   },
//   user() {
//     this.enteredSearchTerm = '';
//   },
// },
// };
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
