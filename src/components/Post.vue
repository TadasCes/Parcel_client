<script lang="ts">
import moment from "moment";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import router from "@/router";

export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  setup(props: any) {
    const store = useStore();
    const user = computed(() => store.state.loggedUser);
    const showOptions = ref(false);
    if (props.post.author.id == user.value._id) showOptions.value = true;

    function deletePost() {
      console.log(props.post._id);
      store.dispatch("posts/deleteAPost", props.post._id);
    }

    function goToEdit() {
      if (showOptions.value) {
        router.push({ name: "EditPost", params: { id: props.post._id } });
      }
    }

    const timeStart = moment(moment(props.post.timeStart).format()).format(
      "ddd: HH:mm"
    );
    const timeEnd = moment(moment(props.post.timeEnd).format()).format(
      "ddd: HH:mm"
    );

    return {
      timeStart,
      timeEnd,
      showOptions,
      deletePost,
      goToEdit
    };
  }
};
</script>

<template>
  <div class="post">
    <div class="row">
      <div class="col-6 main">
        <h4 class="grow">{{ post.cityStart }} - {{ post.cityEnd }}</h4>
        <h5 class="grow">{{ timeStart }} - ~{{ timeEnd }}</h5>
      </div>
      <div class="col-6 second">
        <div>
          <h5>{{ post.author.firstName }} {{ post.author.lastName }}</h5>
          <h6>{{ post.author.rating }} stars</h6>
          <h6>{{ post.author.countDelivered }} delivered</h6>
        </div>
        <div class="options ">
          <button
            v-if="showOptions"
            class="btn btn-sm btn-info"
            @click="goToEdit"
          >
            Edit
          </button>
          <button
            v-if="showOptions"
            class="btn btn-sm btn-danger"
            @click="deletePost"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.post {
  height: 30%;
  background: #fff;
  margin-bottom: 20px;

  box-shadow: 3px 5px 5px rgb(206, 206, 206);
  border-radius: 12px;

  .row {
    height: 100%;
  }

  span {
    display: block;
  }
}

.options {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-self: right;
  text-align: start;
  margin: 0 60px 0 0;
}

.main {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-self: center;
  text-align: start;

  h4,
  h5 {
    margin: 0 0 4px 24px;
  }
}

.second {
  display: flex;
  flex-direction: column;
  align-self: center;
  text-align: end;

  h5,
  h6 {
    margin: 0 60px 0 0;
  }
}
</style>
