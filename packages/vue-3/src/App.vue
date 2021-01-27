<script>
import AppBar from "./components/Navbar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  render() {
    return (
      <>
        <AppBar />
        <router-view />
      </>
    );
  },
});
</script>

