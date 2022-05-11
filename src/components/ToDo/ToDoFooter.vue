<template>
  <div class="footer-container">
    <div class="footer-stat">
      <stat 
        v-for="item of stat"
        :key="item.title"
        :title="item.title"
        :total="item.total"
        :progress="item.progress"
        :color="item.color"
      />
    </div>
    <control/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Control from "@/components/ToDo/footer/FooterControl.vue"
import Stat from "@/components/ToDo/footer/FooterStat.vue"
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["TODO_LIST"]),
    stat() {
      let statInfo = [
        {
          title: "Completed",
          total: this.TODO_LIST.filter(el => el.status === true).length,
          progress: this.TODO_LIST.filter(el => el.status === true).length / this.TODO_LIST.length * 100,
          color: "#5D5FEF"
        },
        {
          title: "To be finished",
          total: this.TODO_LIST.filter(el => el.status !== true).length,
          progress: this.TODO_LIST.filter(el => el.status !== true).length / this.TODO_LIST.length * 100,
          color: "#EF5DA8"
        }
      ];
      

      return statInfo
    }
  },
  components: {
    Stat,
    Control
  }
};
</script>

<style lang="scss">
.footer {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &-stat {
    display: flex;
    &__item {
      margin: 15px 8px;
    }
  }
}
</style>