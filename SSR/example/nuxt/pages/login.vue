<template>
  <div>
    <h2>用户登录</h2>
    <input v-model="user.username"></input>
    <input type="password" v-model="user.password"></input>
    <button @click="onLogin">登录</button>
  </div>
</template>

<script>
export default {
  layout: "blank",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onLogin() {
      this.$store.dispatch("user/login", this.user).then(ok => {
        // 登录成功重定向
        if (ok) {
          const redirect = this.$route.query.redirect || "/";
          this.$router.push(redirect);
        }
      });
    }
  }
};
</script>
