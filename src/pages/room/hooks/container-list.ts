import { ref } from "vue";
import { getContainers, getItems } from "@/service/store";

export function useContainerList() {
  const containers = ref([]);
  const initList = () => {
    return (containers.value = getContainers());
  };
  initList();
  return {
    containers,
    updateContainers: initList,
  };
}
export function useItemlist() {
  const itemlist = ref([]);
  const initList = () => {
    return (itemlist.value = getItems());
  };
  initList();
  return {
    itemlist,
    updateItemlist: initList,
  };
}
