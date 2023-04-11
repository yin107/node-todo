<template>
  <el-drawer
    title="添加新任务"
    :visible="Thishow"
    direction="rtl"
    class="drawerbox"
    @close="closeShow()"
  >
    <el-divider></el-divider>
    <el-form ref="addTaskForm" :model="newTaskInfo" :rules="newTaskRules">
      <el-form-item label="任务名称" prop="task_name">
        <el-input
          placeholder="请输入任务名称"
          v-model="newTaskInfo.task_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="截至日期" prop="end_time">
        <el-date-picker
          type="date"
          placeholder="请选择截至日期"
          v-model="newTaskInfo.end_time"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="任务内容" prop="task_containt">
        <el-input
          type="textarea"
          placeholder="请输入任务内容"
          v-model="newTaskInfo.task_containt"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-divider></el-divider>
      <div class="btnbox">
        <el-button @click="addList('addTaskForm', newTaskInfo)">提交</el-button>
        <el-button
          @click="
            (newTaskInfo.task_name = ''),
              (newTaskInfo.task_containt = ''),
              (newTaskInfo.end_time = '')
          "
          >重置</el-button
        >
        <el-button @click="undoAdd">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "addTaskDrawerVue",
  data() {
    return {
      newTaskInfo: {
        task_name: "",
        end_time: "",
        task_containt: "",
      },
      newTaskRules: {
        task_name: [{ required: true }],
        end_time: [{ required: true }],
        task_containt: [{ required: true }],
      },
    };
  },
  computed: {
    Thishow() {
      return this.$store.state.addTaskDrawer.ishow;
    },
  },
  methods: {
    closeShow() {
      //关闭抽屉时候的回调，因为使用computed的属性，所以不用visible.sync方法
      this.$store.commit("addTaskDrawer/changeIshow", false);
    },
    //增加新的任务
    addList() {
      this.$refs["addTaskForm"].validate((valid) => {
        if (valid) {
          const data = {
            ...this.newTaskInfo,
            created_by: this.$store.getters.userinfo.card,
            task_status: 0,
          };
          this.$emit("addList", data);
        } else {
          console.log("请输入正确的格式");
        }
      });
    },
    undoAdd() {
      this.newTaskInfo = {
        task_name: "",
        end_time: "",
        task_containt: "",
      };
      this.$store.commit("addTaskDrawer/changeIshow", false);
    },
  },
};
</script>

<style lang="less" scoped>
@import "style/pc/home/home.less";
</style>
