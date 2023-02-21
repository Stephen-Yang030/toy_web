<template>
  <div>
    <div class="input-box">
      <el-input
        placeholder="请输入查找商品关键字"
        v-model="inputContent"
        style="width: 30%"
        class="input-with-select"
        @input="inputChange"
        @change="inputChange"
      >
      </el-input>
    </div>
    <el-row>
      <div @click="getShop">
        <img
          src="../../assets/icon/gouwuche.png"
          alt=""
          style="width: 50px; height: 50px; float: right"
        />
      </div>
      <el-col
        :span="4"
        v-for="(data, index) in dataList[ishow]"
        :key="index"
        :offset="1"
        :push="1"
      >
        <el-card style="margin-bottom: 15px">
          <el-image
            :src="data.url"
            class="image"
            style="height: 100px; width: 100px"
          />
          <div style="padding: 14px">
            <el-descriptions class="margin-top" :column="1">
              <el-descriptions-item label="名称">{{
                data.name
              }}</el-descriptions-item>
              <el-descriptions-item label="价格">{{
                data.sale
              }}</el-descriptions-item>
              <el-descriptions-item label="备注">
                <el-tag size="small">{{ className }}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
            <div>
              <el-button
                type="text"
                class="button"
                icon="el-icon-goods"
                @click="addShopData(data)"
                >加购</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="购物车清单" :visible.sync="shopDialog" width="30%">
      <el-table :data="shopData" height="250">
        <el-table-column
          property="name"
          label="玩具名称"
          width="150"
        ></el-table-column>
        <el-table-column property="sale" label="所售金额"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="deleteShopData(scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shopDialog = false">取 消</el-button>
        <el-button type="primary" @click="getShopList">购 买</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import _ from "lodash";
export default {
  name: "classContent",
  props: {
    className: {
      type: String,
      default: "",
    },
    ishow: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      shopDialog: false, //控制购物车是否弹窗
      // 商品
      dataList: [
        [
          {
            name: "车1",
            sale: 80,
            url: "https://img14.360buyimg.com/imgzone/jfs/t1/168706/32/20889/123007/60879fe9E3ea27207/4847e27b6dd83d25.jpg",
            hasShopNumber: 0,
            waitShopNumber: 0,
          },
          {
            name: "白玉神驹",
            sale: 80,
            hasShopNumber: 0,  
            waitShopNumber: 0,
            url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fi2%2F2208055210784%2FO1CN01y2u5wS1D123YMua7C_%21%21155-0-lubanu.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675404854&t=ae252345bb2af837f14559c9a18c8a33",
          },
          {
            name: "雷诺",
            sale: 80,
            hasShopNumber: 0, 
             waitShopNumber: 0,
            url: "https://img30.360buyimg.com/imgzone/jfs/t1/139845/8/21444/163140/61a1864bEe04637f2/b0122627cedcafac.jpg",
          },
          {
            name: "车5",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img11.360buyimg.com/imgzone/jfs/t1/208010/34/13721/121934/61c5c3e4E09a5ca2f/eceb5a44d7b3b49c.jpg",
          },
          {
            name: "车6",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img10.360buyimg.com/imgzone/jfs/t1/203268/13/20702/231891/624bbc47E239c7598/0a1bd80dd3815873.jpg",
          },
          {
            name: "车7",
            sale: 80,
            hasShopNumber: 0,
            url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2FO1CN01SY05FF1XGs54yPSJu_%21%212206730392897-0-cib.jpg_Q75.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675404854&t=7226f90fe5d811009fb3256442d12a8d",
          },
          {
            name: "车8",
            sale: 80,
            hasShopNumber: 0,
            url: "https://imgservice.suning.cn/uimg1/b2c/image/WxI8EBJP7eS4WbU6iCXn9g.jpg_800w_800h_4e",
          },
          {
            name: "车9",
            sale: 80,
            hasShopNumber: 0,
            url: "https://uimgproxy.suning.cn/uimg1/sop/commodity/fd1UetWsiTcuMTRu11NIUA.jpg",
          },
          {
            name: "车10",
            sale: 80,
            hasShopNumber: 0,
            url: "http://t14.baidu.com/it/u=1991424258,1827077690&fm=224&app=112&f=JPEG?w=500&h=500",
          },
          {
            name: "车11",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fbao%2Fuploaded%2Fi1%2F839020765%2FO1CN01CreMHl1HWPd8Im97M_%21%21839020765.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675404854&t=bf02efe22f3366dad343d00e45494cb7",
          },
          {
            name: "车12",
            sale: 80,
            hasShopNumber: 0,
            url: "https://imgservice.suning.cn/uimg1/b2c/image/tzgOHwwPUrZNs1wRBlUn7g.jpg_800w_800h_4e",
          },
          {
            name: "车13",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://imgservice.suning.cn/uimg1/b2c/image/aXo4_iGECRoWZGCwPk5zfg.jpg_800w_800h_4e",
          },
        ],
        [
          {
            name: "飞机1",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=3735849812,551905999&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "飞机2",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img0.baidu.com/it/u=3744876313,2529015577&fm=253&fmt=auto&app=120&f=JPEG?w=360&h=360",
          },
          {
            name: "飞机3",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img0.baidu.com/it/u=1131333815,1503197998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=439",
          },
          {
            name: "飞机4",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img1.baidu.com/it/u=3490567154,2926995910&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
          },
          {
            name: "飞机5",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img2.baidu.com/it/u=2824717038,340595163&fm=253&fmt=auto&app=138&f=JPEG?w=350&h=350",
          },
          {
            name: "飞机6",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img1.baidu.com/it/u=2347986054,3070926214&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
          },
          {
            name: "飞机7",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img1.baidu.com/it/u=2870379801,1685521972&fm=253&fmt=auto&app=120&f=JPEG?w=600&h=400",
          },
          {
            name: "飞机8",
            sale: 80,
            hasShopNumber: 0,

            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=2595771886,1653495560&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
          },
          {
            name: "飞机9",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img1.baidu.com/it/u=2511291028,1464280079&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
          },
          {
            name: "飞机10",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img0.baidu.com/it/u=525686634,1757787004&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
          },
          {
            name: "飞机11",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img2.baidu.com/it/u=3379987946,1772218666&fm=253&fmt=auto&app=138&f=JPEG?w=350&h=350",
          },
          {
            name: "飞机12",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img2.baidu.com/it/u=3379987946,1772218666&fm=253&fmt=auto&app=138&f=JPEG?w=350&h=350",
          },
          {
            name: "飞机13",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img1.baidu.com/it/u=153228580,1422270955&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300",
          },
          {
            name: "飞机14",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,

            url: "https://img1.baidu.com/it/u=3907274314,392754098&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
        ],
        [
          {
            name: "森林古堡1",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=2112778832,1019818286&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=393",
          },
          {
            name: "森林古堡2",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=3919027476,2915919413&fm=253&fmt=auto&app=138&f=JPEG?w=982&h=500",
          },
          {
            name: "森林古堡3",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=4097943873,2511188171&fm=253&fmt=auto&app=138&f=JPG?w=896&h=500",
          },
          {
            name: "森林古堡4",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=3047279649,3725258307&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=441",
          },
          {
            name: "森林古堡5",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=2544273669,2233595880&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=737",
          },
          {
            name: "森林古堡6",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=1926741567,2703471514&fm=253&fmt=auto&app=120&f=JPEG?w=735&h=500",
          },
          {
            name: "森林古堡7",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=1046612874,3427670116&fm=253&fmt=auto&app=138&f=JPG?w=500&h=955",
          },
          {
            name: "森林古堡8",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=2562326524,2476012064&fm=253&fmt=auto&app=138&f=JPEG?w=886&h=500",
          },
          {
            name: "森林古堡9",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=2204576517,3357731634&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281",
          },
          {
            name: "森林古堡10",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=1950137173,1394955112&fm=253&fmt=auto&app=120&f=JPEG?w=660&h=440",
          },
          {
            name: "森林古堡11",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=2254697573,1968926442&fm=253&fmt=auto&app=138&f=JPEG?w=580&h=386",
          },
          {
            name: "森林古堡12",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=3392333111,830637410&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
          },
          {
            name: "森林古堡13",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=3080470914,1533956720&fm=253&fmt=auto&app=138&f=JPEG?w=1080&h=397",
          },
          {
            name: "森林古堡14",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=1436901745,3492375334&fm=253&fmt=auto&app=138&f=PNG?w=350&h=350",
          },
          {
            name: "森林古堡15",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=1578725207,1272522837&fm=253&fmt=auto&app=138&f=JPG?w=500&h=285",
          },
          {
            name: "森林古堡16",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=2330736082,1033043389&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=349",
          },
          {
            name: "森林古堡17",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=1982355402,4061421948&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=360",
          },
          {
            name: "森林古堡18",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=1027246594,2151689809&fm=253&fmt=auto&app=120&f=PNG?w=484&h=496",
          },
        ],
        [
          {
            name: "玩具枪1",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=1833390168,3326053979&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪2",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=4291854042,3302666901&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪3",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=3500073208,1392209103&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪4",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=4160040319,3694673756&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪5",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=785408343,1876933233&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
          },
          {
            name: "玩具枪6",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=1399025429,2218640529&fm=253&fmt=auto&app=120&f=JPEG?w=480&h=480",
          },
          {
            name: "玩具枪7",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=1909016861,1324185576&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪8",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=235109708,2284203645&fm=253&fmt=auto&app=138&f=JPEG?w=310&h=310",
          },
          {
            name: "玩具枪9",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=3894636286,3892732566&fm=253&fmt=auto&app=138&f=JPEG?w=727&h=500",
          },
          {
            name: "玩具枪10",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=3240846332,3110248146&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
          },
          {
            name: "玩具枪11",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=4120874907,3516586310&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪12",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=1567470091,2407217781&fm=253&fmt=auto&app=138&f=JPEG?w=480&h=480",
          },
          {
            name: "玩具枪13",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=1047035092,3236069015&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪14",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=1506639273,2027818176&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪15",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=2081649641,2314583509&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪16",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=3341617500,2312599787&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪17",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=867690240,1615734281&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪18",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=4208434756,3524869489&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪19",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=3587905686,3754697659&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪20",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=3480825310,2603967745&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪21",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=3568574481,312669467&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪22",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=942528933,2389309449&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪23",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=61877412,3710264204&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
          },
          {
            name: "玩具枪24",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=3395339179,4227937653&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          },
        ],
        [
          {
            name: "高达1",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=2934655094,1979162210&fm=253&fmt=auto&app=138&f=JPEG?w=533&h=300",
          },
          {
            name: "高达2",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=2577472480,1388782709&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=679",
          },
          {
            name: "高达3",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=2577472480,1388782709&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=679",
          },
          {
            name: "高达4",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=2772616911,3739102478&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          },
          {
            name: "高达5",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=2767393205,3270467419&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          },
          {
            name: "高达6",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=3421477252,3719550838&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          },
          {
            name: "高达7",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=2646457124,3409455840&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=544",
          },
          {
            name: "高达8",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=215019727,1121445492&fm=253&fmt=auto&app=138&f=JPEG?w=788&h=500",
          },
          {
            name: "高达9",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=4274427118,3730433629&fm=253&fmt=auto&app=138&f=JPEG?w=958&h=500",
          },
          {
            name: "高达10",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=3489892880,1721739145&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=660",
          },
          {
            name: "高达11",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=3388051332,1199281726&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=332",
          },
          {
            name: "高达12",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=1828889066,3407204283&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
          },
          {
            name: "高达13",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=1978111921,1659014728&fm=253&fmt=auto&app=120&f=JPEG?w=766&h=463",
          },
          {
            name: "高达14",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=3781330793,26942724&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500",
          },
          {
            name: "高达15",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=569278382,3243179349&fm=253&fmt=auto&app=120&f=JPEG?w=1152&h=800",
          },
          {
            name: "高达16",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img0.baidu.com/it/u=1923771207,3182876259&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=625",
          },
          {
            name: "高达17",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=3328795124,65734437&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375",
          },
          {
            name: "高达18",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img1.baidu.com/it/u=3328795124,65734437&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375",
          },
          {
            name: "高达19",
            sale: 80,
            hasShopNumber: 0,
            waitShopNumber: 0,
            url: "https://img2.baidu.com/it/u=3533203316,3311676344&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
          },
        ],
      ],
      savaDataList: [],
      // 购物车商品
      shopData: [],
      //搜索框内容
      inputContent: "",
    };
  },
  watch: {
    ishow: {
      immediate: true,
      handler(value) {
        this.savaDataList = this.dataList[value];
        console.log(this.savaDataList);
      },
    },
  },
  mounted() {},
  methods: {
    //打开购物车
    getShop() {
      this.shopDialog = true;
    },
    //删除购物车商品
    deleteShopData(data) {
      console.log(data);
      this.shopData = this.shopData.filter((i) => i !== data);
    },
    //商品加入购物车
    addShopData(data) {
      console.log(data);
      this.shopData.push(data);
      this.$message({
        showClose: true,
        message: "加入购物车成功",
        type: "success",
      });
    },
    // 抛出购物车内商品
    getShopList() {
      this.shopDialog = false;
      this.$emit("getShopList", this.shopData);
    },
    // 搜索查询
    inputChange(data) {
      console.log(data);
      if (data) {
        this.$set(
          this.dataList,
          this.ishow,
          this.dataList[this.ishow].filter((val) =>
            val.name.includes(this.inputContent)
          )
        );
      } else {
        this.$set(this.dataList, this.ishow, this.savaDataList);
      }
    },
  },
};
</script>

<style lang="scss">
.input-box {
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
}
</style>
