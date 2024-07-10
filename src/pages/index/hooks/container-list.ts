import { ref } from "vue";
import { getContainers } from "@/service/store";

export function useContainerList() {
  const containers = ref([]);
  const initContainers = () => {
    return (containers.value = getContainers());
  };
  return {
    containers,
    updateContainers: initContainers,
  };
}
