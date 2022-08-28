<script setup>
import { ref, watch, onMounted } from "vue";
import { NSpace, NSwitch, NCollapseTransition, NButton } from "naive-ui";

// const timer = ref("");
// const msg = ref("");

// function startTimer() {
//   const time = Number.parseInt(timer.value);
//   if (time >= 0) {
//     chrome.runtime.sendMessage("", {
//       type: "timer",
//       title: msg.value,
//       time: timer.value,
//     });
//   }
// }

const showBtn = ref(false);
const showColor = ref(true);

onMounted(() => {
  chrome.storage.sync.get(["catShow", "catColor"], (res) => {
    showBtn.value = res.catShow;
    showColor.value = res.catColor;
  });
});

watch(showBtn, (newVal) => {
  chrome.storage.sync.set({ catShow: newVal }, () => {
    console.log("Cat Show:", newVal);
  });
});

watch(showColor, (newVal) => {
  chrome.storage.sync.set({ catColor: newVal }, () => {
    console.log("Cat Color:", newVal);
  });
});

const reload = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.reload(tab.id);
  });
};
</script>

<template>
  <div class="section">
    <div class="label">宠物开关</div>
    <n-space vertical>
      <n-switch v-model:value="showBtn">
        <template #checked> 开启 </template>
        <template #unchecked> 关闭 </template>
      </n-switch>
      <n-collapse-transition :show="showBtn">
        <div class="label">宠物颜色</div>
        <n-switch v-model:value="showColor">
          <template #checked> 白色 </template>
          <template #unchecked> 黑色 </template>
        </n-switch>
      </n-collapse-transition>
      <n-button strong secondary round type="info" @click="reload">
        应用
      </n-button>
    </n-space>
  </div>
</template>

<style>
body {
  width: 300px;
  padding: 20px 20px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
}

.section {
  margin: 12px 10px;
}

.label {
  font-size: 1.1rem;
  border-bottom: 1px solid gray;
  margin: 6px 0;
}
</style>
