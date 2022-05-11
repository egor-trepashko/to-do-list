<template>
  <div class="title">
    <div class="title__img">
      <img :src="require('@/assets/img/Illustration.png')" />
    </div>
    <h1 class="title__text">{{$t('Today I need to')}}</h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__img {
    margin-top: 32px;
  }
  &__text {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    margin-top: 48px;
  }
}
</style>