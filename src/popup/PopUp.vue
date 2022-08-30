<script setup>
import { ref, watch, onMounted } from "vue";
import {
  NSpace,
  NSwitch,
  NCollapseTransition,
  NButton,
  NDropdown,
  NTag,
  NDivider,
} from "naive-ui";

const options = [
  {
    label: "静态猫猫",
    key: "flat",
    children: [
      {
        label: "cat-1",
        key: "cat-1",
      },
      {
        label: "cat-2",
        key: "cat-2",
      },
      {
        label: "cat-3",
        key: "cat-3",
      },
      {
        label: "cat-4",
        key: "cat-4",
      },
      {
        label: "cat-5",
        key: "cat-5",
      },
      {
        label: "cat-6",
        key: "cat-6",
      },
    ],
  },
  {
    label: "动态猫猫",
    key: "live",
    children: [
      {
        label: "White Cat",
        key: "whitecat",
      },
      {
        label: "Black Cat",
        key: "blackcat",
      },
    ],
  },
];

const arr = options[0].children.concat(options[1].children);
const showBtn = ref(false);

onMounted(() => {
  chrome.storage.sync.get(["catShow", "catStyle"], (res) => {
    showBtn.value = res.catShow;
    handleSelect(res.catStyle);
  });
});

watch(showBtn, (newVal) => {
  chrome.storage.sync.set({ catShow: newVal }, () => {
    console.log("Cat Show:", newVal);
  });
});

const selected = ref("");
const handleSelect = function (key) {
  chrome.storage.sync.set({ catStyle: key }, () => {
    console.log("Cat Style:", key);
  });
  const label = arr.filter((v) => v.key === key);
  selected.value = label.length === 1 ? label[0].label : "未选择";
};

const reload = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.reload(tab.id);
  });
};
</script>

<template>
  <div class="section">
    <n-space vertical>
      <div class="label">宠物开关</div>
      <n-switch v-model:value="showBtn">
        <template #checked> 开启 </template>
        <template #unchecked> 关闭 </template>
      </n-switch>
      <n-collapse-transition :show="showBtn">
        <div class="label">宠物样式</div>
        <n-dropdown
          trigger="hover"
          size="small"
          :options="options"
          :show-arrow="true"
          @select="handleSelect"
        >
          <n-button>选择样式</n-button>
        </n-dropdown>
        <n-divider vertical />
        当前选择：<n-tag :bordered="false" type="success">
          {{ selected }}
        </n-tag>
      </n-collapse-transition>
    </n-space>
    <n-divider />
    <n-button strong secondary round type="info" @click="reload">
      应用
    </n-button>
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
