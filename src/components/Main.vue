<template>
  <div class="page page__background">
    <div class="page__layer">
        <ToDoTitle/>
        <ToDoAdd/>
        <ToDoList/>
    </div>
  </div>
</template>

<script>
import ToDoTitle from "@/components/ToDo/ToDoTitle.vue";
import ToDoAdd from "@/components/ToDo/ToDoAdd.vue"
import ToDoList from "@/components/ToDo/ToDoList.vue"
import { mapActions } from 'vuex';

export default {
    components: {
        ToDoTitle,
        ToDoAdd,
        ToDoList
    },
    methods: {
        ...mapActions(['GET_TODO_LIST_LOCAL_STORAGE']),
    },
    mounted() {
        this.GET_TODO_LIST_LOCAL_STORAGE();
    }
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  &__background {
    min-width: 100vw;
    min-height: 100vh;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        303.79deg,
        #f0c3fc -53.74%,
        #d7befc -4.64%,
        #bcb1fc 40.96%,
        #a1aefc 83.05%,
        #94bdfc 127.47%,
        #8ec5fc 170.73%
      ),
      linear-gradient(
        0deg,
        #84fab0 0%,
        #85f9bc 21.87%,
        #88f8d7 42.19%,
        #8bf6f5 60.94%,
        #8eddf5 80.73%,
        #8fd3f4 100%
      );
  }
  &__layer {
    max-width: 730px;
    min-height: calc(100vh - 91px - 90px);
    margin: 90px;
    width: 100%;
    background: #ffffff;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>