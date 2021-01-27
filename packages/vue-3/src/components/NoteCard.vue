<template>
  <div class="row shadow-1 note-card">
    <div class="icon" @click="handleCheckClick">
      <i class="material-icons">check</i>
    </div>
    <div class="col-xs-12 title">{{ note.title }}</div>
    <div class="col-xs-12 value">{{ note.value }}</div>
  </div>
</template>


<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ["note"],
  setup(props, ctx) {
    function handleCheckClick() {
      console.log('hhhhhhh===')
      ctx.emit("check", props.note);
    }
    return { handleCheckClick };
  },
});
</script>

<style lang="scss" scoped>
.note-card {
  padding: 15px;
  padding-top: 35px;
  border-radius: 2px;
  width: 100%;
  position: relative;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
  color: rgba(0, 0, 0, 0.8);
}

.value {
  text-align: left;
  font-size: 1.4rem;
  font-weight: 200;
}

.icon {
  position: absolute;
  color: black;
  border: 1px solid lightgrey;
  background-color: white;
  font-size: 30px;
  top: -10px;
  left: -10px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  cursor: pointer;
}
</style>
