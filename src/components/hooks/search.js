import { ref, watch, computed } from 'vue';

export default function useSearch(items, filterField) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');
  const availableItems = computed(() => {
    let filteredItems = [];
    if (activeSearchTerm.value) {
      filteredItems = items.value.filter((item) =>
        item[filterField].includes(activeSearchTerm.value)
      );
    } else if (items) {
      filteredItems = items.value;
    }
    return filteredItems;
  });

  watch(enteredSearchTerm, (val) => {
    setTimeout(() => {
      if (val === enteredSearchTerm.value) {
        activeSearchTerm.value = val;
      }
    }, 300);
  });

  function updateSearch(val) {
    enteredSearchTerm.value = val;
  }
  return {
    availableItems,
    enteredSearchTerm,
    updateSearch,
  };
}
