<template>
  <div class="main">
    <div
      class="main-page"
      v-loading="loading"
      element-loading-text="登录中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <div class="root-login">
        <div class="title">
          <h3>root 登录页</h3>
        </div>
        <div class="form-box">
          <el-form ref="rootForm" :model="rootForm" :rules="rootRules">
            <el-form-item prop="rootName">
              <span class="svg-container">
                <i class="el-icon-user-solid"></i>
              </span>
              <el-input
                ref="rootName"
                v-model="rootForm.rootName"
                placeholder="Root"
                type="text"
                tabindex="1"
                auto-complete="off"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <i class="el-icon-view"></i>
              </span>
              <el-input
                ref="password"
                v-model="rootForm.password"
                placeholder="Password"
                tabindex="2"
                auto-complete="off"
                show-password
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
          </el-form>
          <div>
            <el-button
              type="primary"
              style="width: 100%; margin-bottom: 20px"
              @click.native.prevent="handleLogin"
              >登录</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rootLogin",
  props: {
    orderList:{
      type: Array,
      default: () => [],
    }
  },
  created(){
    console.log(this.orderList);
  },
  data() {
    const valiRootName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入正确的管理员账号"));
      } else {
        callback();
      }
    };
    const valipassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      rootForm: {
        rootName: "",
        password: null,
      },
      rootRules: {
        rootName: [
          { required: true, trigger: "blur", validator: valiRootName },
        ],
        password: [
          { required: true, trigger: "blur", validator: valipassword },
        ],
      },
      loading: false,
      managePage: false,
    };
  },
  methods: {
    handleLogin() {
      this.$refs.rootForm.validate((valid) => {
        // 如果符合验证规则
        if (valid) {
          this.loading = true;
          if (
            this.rootForm.rootName === "root" &&
            this.rootForm.password === "123"
          ) {
            setTimeout(() => {
              this.loading = false;
              const orderList = [
                ...this.orderList
              ];
              this.$router.push({
                name: 'toyManagement',
                query: {
                  orderList
                },
              })
              this.$message({
                message: "管理员已认证",
                type: "success",
              });
            }, 1500);
          } else {
            setTimeout(() => {
              this.loading = false;
              this.$message.error("管理员认证失败");
            }, 1500);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
.main {
  width: 100%;
  padding: 0;
  margin: 0;
  .main-page {
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
    background: url("../assets/rootLogin.jpg");
    background-size: 100% 100%;
    .root-login {
      width: 400px;
      height: 350px;
      margin-top: 25px;
      margin-right: 20px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border: 1px solid gray;
      .title {
        height: 50px;
        line-height: 50px;
        margin: 0 auto;
      }
      .form-box {
        height: 275px;
      }
    }
  }
}
</style>
