<script setup>
import { ref } from "vue";
import { NInput, NButton } from "naive-ui";

const timer = ref("");
const msg = ref("");

function startTimer() {
  const time = Number.parseInt(timer.value);
  if (time >= 0) {
    chrome.runtime.sendMessage("", {
      type: "timer",
      title: msg.value,
      time: timer.value,
    });
  }
}
</script>

<template>
  <div class="section">
    <span class="section-text" id="basic-addon1">时间(秒)</span>
    <n-input
      v-model:value="timer"
      type="number"
      class="form-control"
      id="time"
      placeholder="例如 10"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </div>
  <div class="section">
    <n-input
      v-model:value="msg"
      type="textarea"
      class="form-control"
      aria-label="With textarea"
      id="content"
      placeholder="请输入内容"
    />
  </div>
  <div class="section">
    <n-button strong secondary round type="primary" @click="startTimer">
      确认
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
  margin: 10px 10px;
}
</style>
