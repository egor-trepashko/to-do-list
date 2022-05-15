<template>
  <div class="list" :class="(TODO_LIST.length == 0) ? 'list_none' : ''">
    <div v-if="TODO_LIST.length > 0" class="list__content">
      <draggable v-model="ToDOList" group="to-do" @start="drag=true" @end="drag=false">
        <v-slide-y-transition group class="v-list">
          <template v-for="task of ToDOList">
            <to-do-item :key="task.key" :status="task.status" :text="task.text" :id="task.key" />
          </template>
        </v-slide-y-transition>
      </draggable>
    </div>
    <div v-else class="list__none">
      <img :src="require('@/assets/img/checkmark-done-check.1 1.png')" />
      <span>{{$t('Congrat, you have no more tasks to do')}}</span>
    </div>
    <to-do-footer v-if="TODO_LIST.length > 0" />
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ToDoFooter from "@/components/ToDo/ToDoFooter.vue";
import ToDoItem from "@/components/ToDo/ToDoItem.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["TODO_LIST", "TODO_LIST_VIEW"]),
    ToDOList: {
      get() {
        return this.TODO_LIST_VIEW;
      },
      set(value) {
        this.DRANG_DROP_SORT(value);
      }
    }
  },
  methods: {
    ...mapActions(["DRANG_DROP_SORT"])
  },
  components: {
    ToDoFooter,
    ToDoItem,
    draggable
  }
};
</script>

<style lang="scss">
.list {
  margin-bottom: 36px;
  &_none {
    margin-top: auto;
  }
  &__none {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    span {
      margin-left: 11px;
      color: #8f99a3;
    }
  }
  .v-list {
    margin: 0 auto;
    width: 400px;
    min-height: 130px;
    max-height: calc(100vh - 816px);
    overflow-y: scroll;
    display: block;
    padding: 8px 0;
    position: static;
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    &::-webkit-scrollbar {
      width: 4px;
      background-color: #f9f9fd;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: rgba(32, 36, 39, 0.1);
    }

    &::-webkit-scrollbar-track {
      // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      background-color: #f9f9fd;
    }
  }
}
</style>