<template>
  <div class="toy-body"
  v-loading="loading"
   element-loading-text="root准备中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.6)">
    <el-container v-if="!isRoot">
      <el-header>
        <div>
          <h4>Toy CICY WEB</h4>
        </div>
        <el-link
          v-for="i in linkList"
          :key="i"
          type="primary"
          @click="getUrlName(i)"
          >{{ i }}</el-link
        >
      </el-header>
      <el-main>
        <div v-if="ishow === -1 ? true : false">
          <el-carousel
            :interval="4000"
            type="card"
            height="300px"
            style="margin-top: 25px; margin-bottom: 25px"
          >
            <el-carousel-item v-for="(item, index) in imgList" :key="index">
              <img
                :src="item.url"
                alt=""
                style="height: 350px; width: 900px"
                @click="getToyClass(index)"
              />
            </el-carousel-item>
          </el-carousel>
          <el-row type="flex" justify="space-between">
            <el-col
              :span="6"
              v-for="(c, index) in cardList"
              :key="index"
              :offset="index > 0 ? 2 : 0"
            >
              <el-card style="height: 300px">
                <img
                  :src="c.url"
                  class="image"
                  style="height: 50px; width: 50px"
                />
                <div class="bottom clearfix">
                  <el-descriptions
                    v-if="index === 0"
                    title="个人信息"
                    :column="1"
                    size="small"
                    border
                  >
                    <template slot="extra">
                      <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        @click="updateInfo"
                        >修改</el-button
                      >
                    </template>
                    <el-descriptions-item label="用户名">{{
                      userForm.username
                    }}</el-descriptions-item>
                    <el-descriptions-item label="年龄">{{
                      userForm.age
                    }}</el-descriptions-item>
                    <el-descriptions-item label="手机号" :span="2">{{
                      userForm.phoneNumber
                    }}</el-descriptions-item>
                  </el-descriptions>
                  <el-descriptions
                    title="订单信息"
                    :column="1"
                    v-if="index === 1"
                    border
                    size="small"
                  >
                    <template slot="extra">
                      <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        @click="showShopInfo"
                        >订单详情</el-button
                      >
                    </template>
                    <el-descriptions-item label="订单数量">{{
                      orderList.length
                    }}</el-descriptions-item>
                    <el-descriptions-item label="发货数量">
                      {{ hasFinishList.length }}
                    </el-descriptions-item>
                    <el-descriptions-item label="待发货数量">
                      {{ waitFinishList.length }}
                    </el-descriptions-item>
                  </el-descriptions>
                  <el-descriptions
                    title="联系我们"
                    :column="1"
                    v-if="index === 2"
                    border
                    size="small"
                  >
                    <template slot="extra">
                      <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        @click="submitMsg"
                        >提交反馈</el-button
                      >
                    </template>
                    <template slot="extra">
                      <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-user"
                        @click="enterRoot"
                        >管理员</el-button
                      >
                    </template>
                  </el-descriptions>
                  <div v-if="index === 2">
                    <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入反馈内容"
                      resize="none"
                      :show-word-limit="ShowWord"
                      v-model="contentSubmit"
                      @change="dataChanage"
                    >
                    </el-input>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="content" v-if="ishow !== -1 ? true : false">
          <class-content
            :className="className"
            :ishow="ishow"
            @getShopList="getShopList"
          />
        </div>
        <div>
          <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
            <el-form :model="userForm">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input
                  v-model="userForm.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话号码" :label-width="formLabelWidth">
                <el-input
                  v-model="userForm.phoneNumber"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input v-model="userForm.age" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false"
                >保 存</el-button
              >
            </div>
          </el-dialog>
          <el-dialog
            title="订单信息"
            :visible.sync="shopShow"
            width="40%"
            height="300px"
          >
            <el-tabs type="border-card">
              <el-tab-pane label="订单数量">
                <el-table
                  :data="orderList"
                  style="width: 100%"
                  max-height="250"
                >
                  <el-table-column fixed prop="name" label="名称" width="150">
                  </el-table-column>
                  <el-table-column prop="sale" label="价格" width="120">
                  </el-table-column>
                  <el-table-column prop="className" label="备注">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="发货数量">
                <el-table
                  :data="hasFinishList"
                  style="width: 100%"
                  max-height="250"
                >
                  <el-table-column label="已发货商品数量" prop="hasShopNumber">
                    <el-table-column
                      fixed
                      prop="name"
                      label="已发货商品名称"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column prop="shopTime" label="发货时间">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                      <el-button
                        @click="applyDelOrder(scope.$index, orderList)"
                        type="text"
                        size="small"
                      >
                        取消订单申请
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="待发货数量">
                <el-table
                  :data="waitFinishList"
                  style="width: 100%"
                  max-height="250"
                >
                  <el-table-column label="待发货商品数量" prop="waitShopNumber">
                    <el-table-column
                      fixed
                      prop="name"
                      label="待发货商品名称"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column prop="forecast" label="预计发货时间">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                      <el-button
                        @click="deleteOrder(scope.$index, orderList)"
                        type="text"
                        size="small"
                      >
                        取消订单
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
              <el-button @click="shopShow = false">取 消</el-button>
              <el-button type="primary" @click="shopShow = false"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </div>
      </el-main>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>请确认进入管理员登录页</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="enterRootLogin">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
    <rootLogin v-if="isRoot" :orderList="orderList" :userForm="userForm" />
  </div>
</template>

<script>
import ClassContent from "./components/classContent.vue";
import rootLogin from "./rootLogin.vue";
export default {
  name: "toyMain",
  components: {
    ClassContent,
    rootLogin,
  },
  data() {
    return {
      contentSubmit: "",
      clickNumber: 0,
      ShowWord: true,
      ishow: -1, //控制跳转
      loading: false,
      linkList: [
        "首页",
        "玩具车系列",
        "飞机系列",
        "娃娃系列",
        "玩具枪系列",
        "高达系列",
      ],
      className: "", // 玩具标签类
      // 轮播图
      imgList: [
        {
          name: "高达系列",
          url: "https://img2.baidu.com/it/u=2767393205,3270467419&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        },
        {
          name: "高达系列",
          url: "https://img-baofun.zhhainiao.com/fs/7c06845e06c3010fc3c95ad5d110e7bf.jpg",
        },
        {
          name: "娃娃系列",
          url: "https://u.thsi.cn/imgsrc/sns/c11dbc6f7d1e84f8522490761e6b7d46_3130_1593.jpg",
        },
        {
          name: "娃娃系列",
          url: "https://p9.itc.cn/q_70/images01/20210908/098b3fd130544b16bbe23a3eede62562.png",
        },
        {
          name: "娃娃系列",
          url: "https://n.sinaimg.cn/sinakd10112/600/w1920h1080/20210428/9e50-kphwumr7628658.jpg",
        },
      ],
      // 首页-卡片模块
      cardList: [
        {
          name: "个人信息",
          url: require("../assets/icon/personal.png"),
        },
        {
          name: "玩具分类",
          url: require("../assets/icon/class.png"),
        },
        {
          name: "联系方式",
          url: require("../assets/icon/women.png"),
        },
      ],
      dialogFormVisible: false, //修改个人信息弹窗
      userForm: {
        username: "",
        age: "",
        phoneNumber: 0,
      },
      formLabelWidth: "80px",
      shopShow: false,
      orderList: [], //订单列表
      waitFinishList: [], //待发货表
      hasFinishList: [], //已发货表
      isRoot: false,
      dialogVisible: false,
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.userForm = this.$route.query;
    console.log(this.$route.query);
    if (this.$route.query.code === 0) {
      this.orderList = this.$route.query.userOrderList[0];
      this.userForm = this.$route.query.userForm;
      this.waitFinishList = this.$route.query.userOrderList[1];
      this.hasFinishList = this.$route.query.userOrderList[2];
    }
    // if (this.$route.query) {
    //   this.orderList = this.$route.query;
    //   console.log(this.orderList);
    // }
  },
  methods: {
    // 点击事件，跳转对应界面
    getUrlName(e) {
      console.log(e);
      if (e === "玩具车系列") {
        this.ishow = 0;
        this.className = e;
      } else if (e === "飞机系列") {
        this.ishow = 1;
        this.className = e;
      } else if (e === "娃娃系列") {
        this.ishow = 2;
        this.className = e;
      } else if (e === "玩具枪系列") {
        this.ishow = 3;
        this.className = e;
      } else if (e === "高达系列") {
        this.ishow = 4;
        this.className = e;
      } else {
        this.ishow = -1;
      }
    },
    //更新个人信息
    updateInfo() {
      this.dialogFormVisible = true;
    },
    // 轮播图跳转
    getToyClass(data) {
      console.log(data);
      if (data < 2) {
        this.ishow = 4;
        this.className = "高达系列";
      } else {
        this.ishow = 2;
        this.className = "娃娃系列";
      }
    },
    // 订单详情展示
    showShopInfo() {
      this.shopShow = true;
    },
    // 接收事件
    getShopList(data) {
      data.forEach((val) => {
        this.orderList.push(val);
      });
      console.log(this.orderList);
      // this.orderList = data;
    },
    submitMsg() {
      if (this.contentSubmit === "" && this.clickNumber == 0) {
        this.$message.error("请输入反馈内容");
      } else if (this.clickNumber < 1) {
        console.log(this.contentSubmit);
        this.contentSubmit === "";
        this.clickNumber++;
        console.log(this.clickNumber);
        this.$message({
          message: "反馈提交成功",
          type: "success",
        });
      } else {
        this.$message.error("请勿重复提交");
      }
    },
    dataChanage() {
      // console.log(this.contentSubmit);
    },
    //
    deleteOrder(index, val) {
      this.orderList = this.orderList.filter((i) => i !== val[index]);
      // console.log(index,val);
      // val.splice(index,1)
    },
    applyDelOrder() {},
    enterRoot() {
      this.dialogVisible = true;
    },
    enterRootLogin() {
      this.dialogVisible = false;
      this.loading = true;
      setTimeout(() => {
        this.isRoot = true;
        this.loading = false;
      }, 1500);
    },
  },
};
</script>

<style>
* {
  margin: 0;
}
h4 {
  font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
  color: red;
  line-height: 60px;
}
/* .toy-body {
  background: url("../assets/background.jpg");
  background-size: 100% 100%;
} */
.el-container {
  background: url("../assets/background.jpg");
  background-size: 100% 100%;
}
.el-main {
  /* background: yellow; */
  height: calc(100vh - 60px);
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-header {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* background: #99a9bf; */
}
.el-link {
  margin-left: 15px;
  /* background: #99a9bf; */
}
.content {
  margin-top: 20px;
}
</style>
