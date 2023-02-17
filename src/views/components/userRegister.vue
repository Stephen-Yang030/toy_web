<template>
  <div
    v-loading="loading"
    element-loading-text="用户注册中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
    class="login-container"
  >
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="login-form"
      auto-complete="off"
      label-position="left"
    >
      <!-- 头像区域 -->
      <div class="title-container">
        <span
          class="el-icon-back"
          style="float: left; width: 20px; height: 20px"
          @click="loginBack"
        ></span>
        <h3 class="title">用 户 注 册</h3>
      </div>

      <el-form-item prop="username" label="用户名">
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="请输入用户名"
          type="text"
          tabindex="1"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input
          ref="password"
          v-model="registerForm.password"
          type="password"
          placeholder="请输入密码"
          tabindex="2"
          autocomplete="off"
          show-password
        />
      </el-form-item>
      <el-form-item prop="checkPass" label="确认密码">
        <el-input
          ref="checkPass"
          v-model="registerForm.checkPass"
          type="password"
          placeholder="请输入密码"
          tabindex="3"
          autocomplete="off"
          show-password
        />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input
          v-model.number="registerForm.age"
          placeholder="请输入年龄"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input
          v-model.number="registerForm.sex"
          placeholder="男/女"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNumber">
        <el-input
          v-model.number="registerForm.phoneNumber"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <div>
        <el-button
          type="primary"
          style="width: 100%; margin-bottom: 20px"
          @click.native.prevent="handleRegister"
          >注册</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "userRegister",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value.length > 8) {
          callback(new Error("用户名长度不能超过8个字符"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateSex = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error("性别不能为空"));
      } else if (value !== "男" && value !== "女") {
        callback(new Error("请输入男/女!"));
      } else {
        callback();
      }
    };
    var validateNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      loading: false,
      registerForm: {
        username: "",
        password: null,
        checkPass: null,
        age: null,
        sex: "",
        phoneNumber: null,
      },
      registerRules: {
        username: [{ required: true, validator: checkUser, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        age: [{ required: true, validator: checkAge, trigger: "blur" }],
        sex: [{ required: true, validator: validateSex, trigger: "blur" }],
        phoneNumber: [
          { required: true, validator: validateNumber, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        // 如果符合验证规则
        if (valid) {
          this.loading = true;
          // console.log(this.registerForm);
          setTimeout(() => {
            this.$message({
              message: `注册成功`,
              type: "success",
            });
            this.$emit("okayRegister", this.registerForm);
            this.loading = false;
          }, 1500);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginBack() {
      this.$emit("okayRegister", this.registerForm);
    },
  },
};
</script>

<style lang="scss">
.login-container {
  height: 100vh;
  overflow: auto;
  .login-form {
    position: relative;
    width: 530px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .title-container {
      text-align: center;
    }
  }
}
</style>
