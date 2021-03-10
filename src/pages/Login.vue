<template>
  <div class="warpper">
    <div class="name">
      <span>姓名</span>
      <input type="text" placeholder="请输入姓名" v-model="name" />
    </div>
    <div class="name">
      <span>密码</span>
      <input type="password" placeholder="请输入密码" v-model="password" />
    </div>
    <button @click="submit" :disabled="!name || !password">提交22</button>
  </div>
</template>
<script>

export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: ""
    };
  },
  components: {
  },
  methods: {
    submit() {
        debugger
        console.log(1121)
        this.$router.push({ path: "/list" });
    }
  }
};
</script>
<style scoped>
    .warpper {
        font-size: 24px;
        color: blue;
    }
</style>
