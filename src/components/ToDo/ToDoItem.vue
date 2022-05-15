<template>
  <v-list-item class="todo_item">
    <v-checkbox @change="(value) => changeStatus(id, value)" :input-value="status" :label="text"></v-checkbox>
    <div class="active-btn">
      <div class="icon icon-change" @click="() => openDialog()">
        <img src="@/assets/img/pencil 1.svg" />
      </div>
      <div class="icon icon-delete" @click="() => deleteItem(id)">
        <img src="@/assets/img/bin 1.svg" />
      </div>
    </div>
    <v-icon></v-icon>
    <v-dialog content-class="dialog-change" v-model="dialog" persistent max-width="400px">
      <div class="change-row">
        <v-text-field
          :label="$t('Change todo...')"
          height="40px"
          dense
          solo
          v-model="inputChange"
          @keydown.enter="enterInput"
        />
        <v-btn
          v-if="inputChange == text"
          color="primary"
          text
          @click="dialog = false"
        >{{$t("Cancel")}}</v-btn>
        <v-btn 
          v-else 
          color="primary" 
          @click="changeItem"
          :disabled="inputChange == ''"
        >{{$t("Save")}}</v-btn>
      </div>
    </v-dialog>
  </v-list-item>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      inputChange: ""
    };
  },
  props: ["id", "status", "text"],
  methods: {
    ...mapActions([
      "DELETE_ITEM_TODO_LIST",
      "CHANGE_STATUS_ITEM_TODO_LIST",
      "CHANGE_TEXT_ITEM_TODO_LIST"
    ]),
    openDialog() {
      this.inputChange = this.text;
      this.dialog = true;
    },
    deleteItem() {
      this.DELETE_ITEM_TODO_LIST(this.id);
    },
    changeStatus(id, value) {
      this.CHANGE_STATUS_ITEM_TODO_LIST({ key: id, value });
    },
    enterInput() {
      if (this.inputChange == "") {
        return false;
      }
      if (this.inputChange == this.text) {
        this.dialog = false;
      } else {
        this.changeItem();
      }
    },
    changeItem() {
      this.CHANGE_TEXT_ITEM_TODO_LIST({ key: this.id, text: this.inputChange });
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss">
.todo_item.v-list-item {
  display: flex;
  align-items: flex-start;
  position: relative;
  margin: 2px;
  padding: 2px 20px;
  .v-input {
    margin-top: 0px;
    &__slot {
      margin-top: 2px;
      align-items: flex-start;
    }
    .v-messages {
      display: none;
    }
    &--selection-controls__input {
      .v-input--selection-controls__ripple:before {
        transition: 0.3s;
        transform: scale(0.2);
      }
      &:hover {
        .v-input--selection-controls__ripple:before {
          transform: scale(1);
        }
      }
    }
  }
  .active-btn {
    margin-left: auto;
    display: flex;
    .icon {
      margin: 4px;
      padding: 4px;
      cursor: pointer;
      transition: 0.3s;
      &:hover,
      &:focus {
        // filter: brightness(2);
        // transform: scale(1.1);
      }
    }
  }
  &::after {
    content: "";
    display: block;
    width: 15px;
    height: 16px;
    min-height: 16px;
    position: absolute;
    left: 0px;
    top: 12px;
    background-image: url("~@/assets/img/Frame415.svg");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    opacity: 0;
    transition: 0.3s;
  }
  &:hover {
    &::after {
      opacity: 1;
    }
  }
}
.dialog-change.v-dialog {
  background: #ffffff;
  border-radius: 17px;
  box-shadow: none;
  padding: 40px 30px;
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
  .change-row {
    display: flex;
    justify-content: center;
  }
  .v-btn {
    margin-left: 16px;
    width: 90px;
    height: 40px;
  }
}
</style>