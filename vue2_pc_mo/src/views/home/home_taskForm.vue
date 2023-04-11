<template>
  <el-form ref="addTaskForm" :model="newTaskInfo">
    <el-form-item label="任务名称">
      <el-input placeholder="请输入任务名称" v-model="newTaskInfo.task_name"></el-input>
    </el-form-item>
    <el-form-item label="截至日期">
      <el-date-picker  type="date" placeholder="请选择截至日期" v-model="newTaskInfo.end_time">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="任务内容">
      <el-input
        type="textarea"
        placeholder="请输入任务内容"
        v-model="newTaskInfo.task_containt"
      >
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "homeTaskForm",
  data() {
    return {
      newTaskInfo: {
        task_name: "",
        end_time: "",
        task_containt: "",
      },
    };
  },
};
</script>

<style></style>
