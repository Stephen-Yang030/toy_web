<template>
  <div class="manage-box">
    <el-container>
      <el-header>
        <div class="box1">
          <span>TOY 后台管理</span>
        </div>
        <div class="box2">
          <span>Welcome To Home,master</span>
          <el-popconfirm
            title="确定要离开管理界面吗？"
            @confirm="withdrawManage"
          >
            <el-button
              slot="reference"
              type="info"
              icon="el-icon-user-solid"
              circle
            ></el-button>
          </el-popconfirm>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @select="getMenuIndex"
          >
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">订单信息管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">会员用户管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-chat-line-round"></i>
              <span slot="title">用户反馈信息详情</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <mainPage v-if="mainShow == 1" />
          <GoodsManagement
            v-if="mainShow == 2"
            :userOrderList="userOrderList"
            @updateOrderState="updateOrderState"
          />
          <UsersManagement v-if="mainShow == 3" :userForm="userForm"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import mainPage from "./components/mainPage.vue";
import GoodsManagement from "./components/GoodsManagement.vue";
import UsersManagement from "./components/UsersManagement.vue";
export default {
  name: "toyManageMent",
  components: {
    mainPage,
    GoodsManagement,
    UsersManagement,
  },
  data() {
    return {
      mainShow: 1,
      userOrderList: [],
      userForm: [],
    };
  },
  mounted() {
    this.userOrderList = this.$route.query.orderList;
    this.userForm = this.$route.query.userForm;
  },
  methods: {
    withdrawManage() {
      // this.$router.replace("/toy-main"); //点击路由跳转到首页
      const userOrderList = this.userOrderList
      const userForm = this.userForm;
      this.$router.push({
        name: "toyMain",
        query: {
          code: 0,
          userOrderList,
          userForm,
        },
      });
    },
    getMenuIndex(val) {
      console.log(val);
      this.mainShow = val;
    },
    updateOrderState(tableData,waitFinishList,hasFinishList) {
      console.log(tableData,waitFinishList,hasFinishList);
      this.userOrderList = [];
      this.userOrderList.push(tableData,waitFinishList,hasFinishList);
      console.log(this.userOrderList,1234123423);
    },
  },
};
</script>

<style lang="scss">
.manage-box {
  width: 100%;
  height: 100%;
  .el-header {
    .box1 {
      line-height: 50px;
      font-size: 20px;
      color: azure;
    }
    .box2 {
      line-height: 50px;
      font-size: 14px;
      .el-button {
        margin-left: 15px;
      }
    }
    display: flex;
    justify-content: space-between;
    background: #545c64;
    // opacity:0.5 ;
  }
  .el-main {
    background: #fff;
  }
  .el-menu {
    height: 100%;
  }
}
</style>
