<template>
  <div class="footer-control">
    <div>
      <v-btn
        v-for="(btn, index) of btnControler"
        :key="btn.title"
        :color="btn.color ? btn.color : 'white'"
        :class="`${btn.class} ${btn.classDefault}`"
        @click="btn.event(index)"
      >{{$t(btn.title)}}</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      color: {
        active: "primary"
      }
    };
  },
  methods: {
    ...mapActions(["CLEAR_ALL_TODO_LIST", "CHECK_ALL_TODO_LIST"]),
    ...mapMutations(["CHANGE_VIEW"]),
    changeControlView(value) {
      this.CHANGE_VIEW(value);
    }
  },
  computed: {
    ...mapGetters(["TODO_LIST", "TODO_VIEW_STATE"]),
    btnControler() {
      let controler = {
        checkAll: {
          title: "Check all",
          classDefault: "margin-rigth",
          class: "view-hide",
          disabled: true,
          event: this.CHECK_ALL_TODO_LIST
        },
        all: {
          title: "All",
          class: "view-hide",
          classDefault: "",
          disabled: true,
          event: this.changeControlView
        },
        active: {
          title: "Active",
          class: "view-hide",
          disabled: true,
          event: this.changeControlView
        },
        complited: {
          title: "Complited",
          class: "view-hide",
          disabled: true,
          event: this.changeControlView
        },
        clear: {
          title: "Clear complited",
          classDefault: "margin-left",
          class: "view-hide",
          disabled: true,
          event: this.CLEAR_ALL_TODO_LIST
        }
      };
      if (this.TODO_LIST.length > 0) {
        controler.all.class = "";
        controler.all.disabled = false;
        if (
          this.TODO_LIST.filter(el => el.status == true).length !==
            this.TODO_LIST.length &&
          this.TODO_LIST.filter(el => el.status == true).length !== 0
        ) {
          controler.active.class = "";
          controler.active.disabled = false;
          controler.complited.class = "";
          controler.complited.disabled = false;
        }
        if (this.TODO_LIST.filter(el => el.status == true).length !== 0) {
          controler.clear.class = "";
          controler.clear.disabled = false;
        }
        if (
          this.TODO_LIST.filter(el => el.status == true).length !==
          this.TODO_LIST.length
        ) {
          controler.checkAll.class = "";
          controler.checkAll.disabled = false;
        }
      }
      let state = this.TODO_VIEW_STATE;
      controler[state].color = this.color.active;
      return controler;
    }
  }
};
</script>

<style lang="scss">
.footer-control {
  display: flex;
  margin-top: 17px;
  .v-btn {
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    @include _510 {
      font-size: 0.75em;
      padding: 0 10px !important;
    }
    @include _430 {
      font-size: 0.7em;
      padding: 0 3px !important;
      min-width: 60px !important;
    }
    &.view-hide {
      opacity: 0;
    }
    &.margin-rigth {
      margin-right: 10px;
      @include _510 {
        margin-right: 7px;
      }
      @include _430 {
        margin-right: 5px;
      }
    }
    &.margin-left {
      margin-left: 10px;
      @include _510 {
        margin-left: 7px;
      }
      @include _430 {
        margin-left: 5px;
      }
    }
  }
}
</style>