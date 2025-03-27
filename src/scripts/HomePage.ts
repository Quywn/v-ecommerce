import { ref } from "vue";

export default function useHeader() {
  const menuOpen = ref(false);
  const searchDialog = ref(false);
  const searchQuery = ref("");

  const toggleSearch = () => {
    searchDialog.value = !searchDialog.value;
  };

  const toggleCart = () => {
    console.log("Cart clicked");
  };

  return {
    menuOpen,
    searchDialog,
    searchQuery,
    toggleSearch,
    toggleCart,
  };
}
