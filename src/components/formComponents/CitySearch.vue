<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import locations from "../../data/locations.json";
import { computed, Ref, ref, watch } from "vue";
export default {
  props: {
    city: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    isValid: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  emits: ["update:city"],
  setup(props: any, { emit }: any) {
    const allLocations = computed(() => locations);
    let filteredLocations: any = ref([]);

    const inputValue = ref("");

    const inputSearch = ref("");
    const searchResult: Ref<Array<string>> = ref([]);

    const inputResult = ref("");
    const showResults = ref(false);

    // Adds filtered locations to new array
    function addToSearchResults(filtered: any) {
      searchResult.value.length = 0;
      filtered.forEach((location: { name: string }) => {
        searchResult.value.push(location.name);
      });
    }

    // Searches for locations
    function filterMainArray(searchText: string) {
      filteredLocations = allLocations.value.filter(locations =>
        locations.name
          .toLowerCase()
          .includes(searchText.toString().toLowerCase())
      );
      if (filteredLocations.length > 0) addToSearchResults(filteredLocations);
    }

    function selectResult(value: string) {
      inputResult.value = value;
      inputValue.value = inputResult.value;
      showResults.value = false;
      searchResult.value.length = 0;
      document.getElementById("searchBar")?.blur();
      emit("update:city", inputResult.value);
    }

    function startSearch() {
      if (inputResult.value === "") {
        inputValue.value = inputSearch.value;
      }
      showResults.value = true;
    }

    console.log(props.isValid);

    watch(inputValue, (inputSearch: string) => {
      if (inputSearch.length >= 3) {
        filterMainArray(inputSearch);
      } else {
        searchResult.value.length = 0;
      }
    });

    return {
      inputValue,
      inputSearch,
      filterMainArray,
      searchResult,
      selectResult,
      showResults,
      startSearch
    };
  }
};
</script>

<template>
  <div id="city-search">
    <input
      v-model="inputValue"
      type="text"
      :placeholder="title"
      class="input-field"
      @change="filterMainArray"
      @focus="startSearch"
      @blur="showResults = false"
    />
    <span class="focus-border"></span>
    <div
      v-if="inputValue.length > 0 && showResults == true"
      class="search-result"
    >
      <div
        v-for="result in searchResult"
        :key="result"
        class="search-result-row"
        @mousedown.prevent="selectResult(result)"
      >
        {{ result }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";

#city-search {
  width: 175px;

  input {
    width: 100%;
  }

  .search-result {
    position: absolute;
    width: inherit;

    .search-result-row {
      width: 100%;
      background: white;
      padding: 8px 4px;
      border-bottom: 1px solid $primary-color;
      text-align: start;
      padding-left: 8px;
      z-index: 100;

      &:hover {
        background: $primary-color;
        color: white;
      }
    }
  }
}

@media (max-width: $breakpoint-extra-small) {
  #city-search {
    width: 100%;
  }
}
</style>
