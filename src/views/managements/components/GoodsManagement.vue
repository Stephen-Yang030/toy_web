<template>
  <div class="box-class">
    <div class="table-class">
      <el-table :data="tableData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.sale }}</span>
              </el-form-item>
              <el-form-item label="物流状态">
                <span>{{ props.row.state }}</span>
              </el-form-item>
              <el-form-item label="下单用户">
                <span>{{ props.row.user }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="商品价格" prop="sale"> </el-table-column>
        <el-table-column
          label="操作"
          prop="operation"
          width="150"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row,scope)" type="text" size="small"
              >物流状态</el-button
            >
            <el-button type="text" size="small">删除订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="物流状态" :visible.sync="dialogVisible" width="30%">
      <el-radio-group v-model="radio" @input="stateChange">
        <el-radio label="待发货">待发货</el-radio>
        <el-radio label="已发货">已发货</el-radio>
        <el-radio label="已签收">已签收</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "GoodsManagement",
  props:{
    userOrderList:{
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      radio: "待发货",
      dialogVisible: false,
      tableData: [],
      pageTotal: 1,
      orderIndex: 0,
      hasFinishList: [],
      waitFinishList: [],
    };
  },
  created(){
    console.log(this.userOrderList);
    this.userOrderList.forEach((i) => {
      this.tableData.push(i);
    })
  },
  methods: {
    editClick(val,scope) {
      console.log(val,scope);
      this.orderIndex = scope.$index;
      this.dialogVisible = true;
    },
    stateChange(data) {
      console.log(data);
      // this.tableData[this.orderIndex].transState = data;
      if (data === '待发货') {
        this.waitFinishList.push(this.tableData[this.orderIndex]);
      }else if(data === '已发货'){
        this.hasFinishList.push(this.tableData[this.orderIndex]);
      }
      console.log(this.tableData);
      this.$emit('updateOrderState',this.tableData,this.waitFinishList,this.hasFinishList);
    },
  },
};
</script>

<style lang="scss">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.box-class {
  width: 100%;
  // height: calc(100vh - 150px);

  .table-class {
    width: 100%;

  }

}
</style>
