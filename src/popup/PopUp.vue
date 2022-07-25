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
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">时间(秒)</span>
    <n-input
      v-model="timer"
      type="text"
      class="form-control"
      id="time"
      placeholder="例如 10"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </div>
  <div class="input-group mb-3">
    <n-input
      type="textarea"
      v-model="msg"
      class="form-control"
      aria-label="With textarea"
      id="content"
      placeholder="请输入内容"
    ></n-input>
  </div>
  <div class="d-grid gap-2">
    <n-button flat class="btn btn-dark" id="confirm" @click="startTimer">
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
  text-align: center;
}
</style>
