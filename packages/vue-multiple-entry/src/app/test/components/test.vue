<template>
  <form action="">
    <input type="text" placeholder="Username">
    <input type="password" placeholder="Password">
    <button class="submit" type="submit">Submit</button>
  </form>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import 'styles/helper.scss';

.submit {
  height: px2rem(120px);
  width: px2rem(300px);
  background: lightblue;
  color: white;
}
</style>
