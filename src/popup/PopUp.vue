<script setup>
import { ref } from "vue";

const timer = ref("");
const msg = ref("");

function startTimer() {
  const time = Number.parseInt(timer.value);
  if (time >= 0) {
    setTimeout(() => {
      chrome.notifications.create("", {
        type: "basic",
        title: "到时间啦!",
        message: msg.value,
        iconUrl: "/assets/logo.png",
      });
    }, time * 1000);
  }
}
</script>

<template>
  <div class="input-group mb-3">
    <span class="input-group-text" id="basic-addon1">时间(秒)</span>
    <input
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
    <textarea
      v-model="msg"
      class="form-control"
      aria-label="With textarea"
      id="content"
      rows="5"
      cols="33"
      placeholder="请输入内容"
    ></textarea>
  </div>
  <div class="d-grid gap-2">
    <button type="button" class="btn btn-dark" id="confirm" @click="startTimer">
      确认
    </button>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 300px;
  padding: 20px 20px;
}
</style>
