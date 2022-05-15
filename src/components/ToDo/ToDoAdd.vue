<template>
  <div class="todo-add">
    <v-text-field
      v-model="input"
      :label="$t('Add new todo...')"
      height="40px"
      dense
      solo
      @keydown.enter="() => {input !== '' ? AddToDoList() : false}"
    ></v-text-field>
    <v-slide-x-reverse-transition>
      <v-btn v-if="input != ''" color="primary" @click="AddToDoList">{{$t('Submit')}}</v-btn>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["TODO_NEW"]),
    input: {
      get() {
        return this.TODO_NEW;
      },
      set(value) {
        this.CHANGE_TODO_NEW(value);
        this.inn = value;
      }
    }
  },
  methods: {
    ...mapMutations(["CHANGE_TODO_NEW"]),
    ...mapActions(["ADD_TODO_LIST"]),
    AddToDoList() {
      this.ADD_TODO_LIST();
    }
  }
};
</script>

<style lang="scss">
.todo-add {
  display: flex;
  justify-content: center;
  transition: 0.3s;
  margin-top: 52px;
  margin-bottom: 38px;
  @include _510 {
    margin-left: 5px;
    margin-right: 5px;
  }
  .v-input {
    font-size: 14px;
    font-weight: 400;
    color: #202427;
    max-width: 317px;
    .v-label {
      font-size: 14px;
    }
    .v-input__slot {
      box-shadow: none !important;
      border: 1px solid #c7ccd1;
      border-radius: 8px;
      line-height: 1em;
    }
    .v-text-field__details {
      display: none;
    }
  }
  .v-btn {
    height: 40px;
    padding: 12px 16px;
    margin-left: 16px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;

    &:not(.v-btn--round).v-size--default {
      height: 40px;
    }
  }
}
</style>