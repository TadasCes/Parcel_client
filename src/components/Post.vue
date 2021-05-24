<script lang="ts">
import moment from "moment";
import { useStore } from "vuex";
import { computed, onBeforeMount, ref } from "vue";
import { monthToLT } from "../utility/utils";
import router from "@/router";
import IUser from "@/interfaces/IUser";
import { addView, getPostAuthor } from "@/services/post.api.service";

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
    const doneLoading = ref(false);
    let author: IUser;
    if (props.post.authorId === user.value._id) showOptions.value = true;
    const dueToday = ref(false);

    function deletePost() {
      console.log(props.post._id);
      if (confirm("Ar tikrai norite ištrinti įrašą?")) {
        store.dispatch("posts/deleteAPost", props.post._id);
        location.reload();
        alert("Įrašas ištrintas!");
      }
    }
    function goToEdit() {
      if (showOptions.value) {
        router.push({ name: "EditPost", params: { id: props.post._id } });
      }
    }
    async function goToDetails() {
      await addView(props.post._id).then(() => {
        localStorage.setItem("postInMemory", JSON.stringify(props.post));
        localStorage.setItem("postAuthorInMemory", JSON.stringify(author));
        router.push({
          name: "Details",
          params: {
            id: props.post._id,
            postProp: JSON.stringify(props.post),
            authorProp: JSON.stringify(author)
          }
        });
      });
    }

    const timeStart = moment(moment(props.post.timeStart).format()).format(
      "HH:mm"
    );
    const timeEnd = moment(moment(props.post.timeEnd).format()).format("HH:mm");
    const menuo = monthToLT(
      moment(moment(props.post.timeStart).format()).format("MMMM")
    );
    const diena = moment(moment(props.post.timeStart).format()).format("DD");
    const day = menuo + " " + diena + "      ";

    function veryUrgent() {
      const postDate = moment(props.post.timeStart).format("YYYY-MM-DD");
      const nowDate = moment().format("YYYY-MM-DD");
      if (postDate == nowDate) {
        dueToday.value = true;
      }
    }

    onBeforeMount(async () => {
      await getPostAuthor(props.post.authorId).then(result => {
        author = result.result;
        doneLoading.value = true;
      });
      veryUrgent();
    });

    return {
      timeStart,
      timeEnd,
      day,
      showOptions,
      deletePost,
      goToEdit,
      goToDetails,
      author: computed(() => author),
      doneLoading,
      dueToday
    };
  }
};
</script>

<template>
  <div
    class="post"
    :class="[
      dueToday == true ? 'urgent' : '',
      post.isActive == false ? 'not-active' : ''
    ]"
  >
    <div v-if="doneLoading == true" class="row">
      <div class="col-12">
        <div class="top-post-header">
          <div>
            <span class="post-type" v-if="post.type == 1">Siunčiu</span>
            <span class="post-type" v-else>Keliauju</span>
          </div>
          <div>
            <div v-if="dueToday == true">
              <span class="post-type-urgent">Šiandien</span>
            </div>

            <div v-if="post.isActive == false">
              <span class="post-type-not-active">Neaktyvus</span>
            </div>

            <div
              class="icons"
              :class="dueToday == true || post.isActive == false ? 'iSona' : ''"
            >
              <div v-if="post.urgent == true">
                <i class="fas fa-fire"></i>
              </div>
              <div v-if="post.fragile == true">
                <i class="fas fa-wine-glass"></i>
              </div>
              <div v-if="post.animal == true">
                <i class="fas fa-paw"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-11 main" @click="goToDetails">
        <div class="ride-info">
          <span class="grow">{{ post.cityStart }} - {{ post.cityEnd }}</span>
          <div class="date">
            <span class="grow">{{ day }}</span>
            <span class="grow laikas">{{ timeStart }} - {{ timeEnd }}</span>
          </div>
        </div>
        <div class="author-info">
          <span>{{ author.firstName }} {{ author.lastName }}</span>
          <span>Įvertinimas: {{ author.rating }}/5</span>
        </div>
      </div>
      <div class="col-1">
        <div class="options ">
          <button
            v-if="showOptions"
            class="btn btn-sm btn-info "
            @click="goToEdit"
          >
            <span class="material-icons">edit</span>
          </button>
          <button
            v-if="showOptions"
            class="btn btn-sm btn-outline-danger"
            @click="deletePost"
          >
            <span class="material-icons">delete</span>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>...</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.col-12,
.col-11 {
  padding-left: 60px;
}

.col-11 {
  padding-right: 20px !important;
}

.btn-info {
  background-color: $primary-color;
}

.urgent {
  // border: 5px solid rgb(255, 189, 189) !important;
  box-shadow: 0px 0px 10px rgb(255, 61, 61) !important;
}

.post {
  height: 150px;
  background: #fff;
  margin: 20px auto;
  box-shadow: 0px 0px 10px rgb(206, 206, 206);
  // box-shadow: 3px 5px 5px rgb(206, 206, 206);
  transition: box-shadow 0.3s ease-in-out;

  border-radius: 12px;
  padding: 16px 20px;

  .row {
    padding: 16px, 20px;
    height: 100%;
    z-index: 1;
  }

  .date {
    display: flex;
    justify-content: space-between;

    .laikas {
      padding-right: 50px;
    }
  }

  .post-type {
    font-size: 20px;
    float: left;
    border-bottom: 1px solid rgb(117, 117, 117);
  }

  .post-type-urgent {
    font-size: 20px;
    float: right;
    margin-right: 60px;
    border-bottom: 1px solid rgb(255, 61, 61);
  }

  .post-type-not-active {
    font-size: 20px;
    float: right;
    margin-right: 60px;
    border-bottom: 1px solid rgb(117, 117, 117);
  }

  span {
    display: block;
  }

  &:hover {
    box-shadow: 0px 0px 5px rgb(109, 109, 109);
    transition: box-shadow 0.3s ease-in-out;
    cursor: pointer;
  }
}

.top-post-header {
  display: flex;
  justify-content: space-between;
}

.icons {
  margin-right: 80px;
  display: flex;

  i {
    padding-left: 10px;
    font-size: 20px;
  }

  .fa-fire {
    color: rgb(255, 107, 61);
  }
  .fa-wine-glass {
    color: rgb(134, 134, 134);
  }
  .fa-paw {
    color: rgb(122, 85, 3);
  }
}

.iSona {
  padding-top: 5px;
  margin-right: 180px;
}

.main {
  display: flex;
  align-items: center;
  text-align: start;
  padding-right: 0px;
}

.not-active {
  background-color: rgb(212, 212, 212);
}

.ride-info {
  display: inline-block;
  width: 50%;
  justify-content: space-around;
  flex-direction: column;
  align-self: center;
  text-align: start;
  padding-bottom: 10px;

  h5,
  h6 {
    margin: 0 0 4px 32px;
  }
}
.author-info {
  width: 50%;
  padding-top: 10px;
  display: inline-block;
  flex-direction: column;
  align-self: center;
  text-align: end;
  padding-right: 0px;
  margin-bottom: 20px;
  h5,
  h6 {
    margin: 0 12px 0 0;
  }
}

.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 12px;
  padding-top: 5px;
  z-index: 10;

  span {
    font-size: 16px;
    right: 12px;
    text-align: center;
  }

  button:nth-child(1) {
    outline: none;
    border: none;
    margin-top: 4px;
    margin-bottom: 4px;
  }
}

.col-1 {
  align-content: center;
}
</style>
