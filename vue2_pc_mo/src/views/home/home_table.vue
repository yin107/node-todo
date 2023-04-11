<template>
  <div id="table">
    <el-table :data="tableData">
      <el-table-column
        v-for="item in tableHead"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        fixed
      >
        <template slot-scope="scope">
          <div v-if="item.prop === 'task_name_impo'">
            <i
              class="el-icon-star-off"
              style="font-size: 18px"
              v-show="!scope.row.task_impo"
              @click="changeimpo(1,scope.row.id)"
            ></i>
            <i
              class="el-icon-star-on"
              style="color: red; font-size: 18px"
              v-show="scope.row.task_impo"
              @click="changeimpo(0,scope.row.id)"
            ></i>
            {{ scope.row.task_name }}
          </div>
          <div v-if="item.prop === 'action' && scope.row.task_status != 2">
            <el-button @click="editTask(scope.row.id, scope.row)"
              >编辑</el-button
            ><el-button
              type="primary"
              @click="haveDone(scope.row.id, scope.row.task_status)"
              >{{ scope.row.task_status === 0 ? "完成" : "代办" }}</el-button
            ><el-button @click="deleteTask(scope.row.id)">删除</el-button>
          </div>
          <div v-else-if="item.prop === 'task_status'">
            {{ scope.row.task_status | task_status_type() }}
          </div>
          <div v-else>{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "homeTable",
  props: ["tableData", "tableHead"],
  filters: {
    task_status_type(item) {
      let type = "";
      switch (item) {
        case 0:
          type = "待办";
          break;
        case 1:
          type = "完成";
          break;
        case 2:
          type = "删除";
          break;
      }
      return type;
    },
  },
  methods: {
    editTask(id, item) {
      this.$emit("editTask", id, item);
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    haveDone(id, curStatus) {
      this.$emit("haveDone", id, curStatus);
    },
	//修改标准星
	changeimpo(newImpo,id){
		this.$emit('changeimpo',newImpo,id)
	}
  },
};
</script>

<style>
.el-table .el-table__cell {
  text-align: center !important;
}
</style>
