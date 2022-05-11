<template>
  <div class="footer-stat__item item">
    <div class="item__total">{{`${total} ${$t('tasks')}`}}</div>
    <div class="item__title">{{$t(title)}}</div>
    <div class="item__progress">
      <v-progress-linear :color="color" :value="progress"></v-progress-linear>
    </div>
  </div>
</template>

<script>
export default {
  props: ["total", "title", "color", "progress"]
};
</script>

<style lang="scss">
.footer-stat__item {
  background: rgba(32, 36, 39, 0.05);
  border-radius: 8px;
  width: 190px;
  height: 85px;
  padding: 16px;
  .item {
    &__total {
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      color: #202427;
      opacity: 0.5;
    }
    &__title {
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: -0.02em;
      color: #202427;
      margin-top: 4px;
    }
    &__progress {
      margin-top: 12px;
      .v-progress-linear {
        background: #20242712;
        border-radius: 8px;
        &__background {
          background: none !important;
        }
        &__determinate {
          border-radius: 8px;
        }
      }
    }
  }
}
</style>