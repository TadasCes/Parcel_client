<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import locations from "../../data/locations.json";
import { computed, Ref, ref, watch } from "vue";
export default {
  setup() {
    const allLocations = computed(() => locations);
    let filteredLocations: any = ref([]);
    const searchInput = ref("");
    const searchResult: Ref<Array<string>> = ref([]);
    const showResults = ref(false);

    function addToSearchResults(filtered: any) {
      searchResult.value.length = 0;
      filtered.forEach((location: { name: string }) => {
        searchResult.value.push(location.name);
      });
    }

    function filterArray(searchText: string) {
      filteredLocations = allLocations.value.filter(locations =>
        locations.name
          .toLowerCase()
          .includes(searchText.toString().toLowerCase())
      );
      if (filteredLocations.length > 0) {
        addToSearchResults(filteredLocations);
      }
    }

    function selectResult(value: string) {
      searchInput.value = value;
    }

    watch(searchInput, (searchInput: string) => {
      if (searchInput.length >= 3) {
        filterArray(searchInput);
        console.log(searchResult);
      } else {
        searchResult.value.length = 0;
      }
    });

    console.log(allLocations.value);
    return {
      searchInput,
      filterArray,
      searchResult,
      selectResult,
      showResults
    };
  }
};
</script>

<template>
  <div id="city-search">
    <input
      v-model="searchInput"
      type="text"
      placeholder="Location search"
      @change="filterArray"
      @focus="showResults = true"
      @blur="showResults = false"
    />
    <div
      v-if="searchResult.length > 0 && showResults == true"
      class="search-result"
    >
      <div
        v-for="result in searchResult"
        :key="result"
        class="search-result-row"
        @click="selectResult"
      >
        {{ result }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";

#city-search {
  width: 220px;

  input {
    width: 100%;
  }

  .search-result {
    position: fixed;
    width: inherit;

    .search-result-row {
      width: 100%;
      background: white;
      padding: 8px 4px;
      border-bottom: 1px solid $primary-color;
      text-align: start;
      padding-left: 8px;

      &:hover {
        background: $primary-color;
        color: white;
      }
    }
  }
}
</style>
