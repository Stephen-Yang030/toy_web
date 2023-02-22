<template>
  <div>
    <el-table :data="usersInfoData" style="width: 100%">
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="phoneNumber" label="用户电话" width="180">
      </el-table-column>
      <el-table-column prop="sex" label="用户性别" width="180">
      </el-table-column>
      <el-table-column prop="shopNum" label="购买数量"> </el-table-column>
      <el-table-column label="操作" prop="operation" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button @click="delUserClick(scope.row)" type="text" size="small"
            >删除用户</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UsersManagement",
  props:{
    userForm:{
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      usersInfoData: [],
    };
  },
  mounted() {
    this.usersInfoData.push(this.userForm);
    console.log(this.usersInfoData);
  },
  methods: {
    delUserClick(val) {
      console.log(val);
      this.usersInfoData = this.usersInfoData.filter((i) => i !== val)
    },
  },
};
</script>

<style></style>
