<template>
  <div id="home">
    <el-card class="cardbox">
      <div slot="header" class="headerbox">
        <span>任务列表</span>
        <el-button
          type="primary"
          @click="$store.commit('addTaskDrawer/changeIshow', true)"
          >添加任务</el-button
        >
      </div>
      <home-table
        :tableData="tableData"
        :tableHead="tableHead"
        @editTask="editTask"
        @deleteTask="deleteTask"
        @haveDone="haveDone"
        @changeimpo="changeimpo"
        class="table"
      ></home-table>
    </el-card>

  
    <add-task-drawer-vue @addList="addList"></add-task-drawer-vue>
    <el-drawer
      title="编辑任务"
      :visible.sync="editShow"
      direction="rtl"
      class="drawerbox"
    >
      <el-divider></el-divider>
      <el-form ref="newTaskForm" :model="editData" :rules="newTaskRules">
        <el-form-item label="任务名称" prop="task_name">
          <el-input
            placeholder="请输入任务名称"
            v-model="editData.task_name"
          ></el-input>
        </el-form-item>
        <el-form-item label="截至日期" prop="end_time">
          <el-date-picker
            type="date"
            placeholder="请选择截至日期"
            v-model="editData.end_time"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务内容" prop="task_containt">
          <el-input
            type="textarea"
            placeholder="请输入任务内容"
            v-model="editData.task_containt"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-divider></el-divider>
        <div class="btnbox">
          <el-button @click="editListPromit">提交</el-button>
          <el-button
            @click="
              (editData.task_name = ''),
                (editData.task_containt = ''),
                (editData.end_time = '')
            "
            >重置</el-button
          >
          <el-button @click="undoEdit">取消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import homeTable from "./home_table.vue";
// import homeTaskForm from './home_taskForm.vue'
import addTaskDrawerVue from "./addTaskDrawer.vue";
export default {
  name: "homePage",
  components: { homeTable, addTaskDrawerVue },
  data() {
    return {
      tableData: [],
      tableHead: [
        {
          prop: "id",
          label: "序号",
          width: 60,
        },
        { prop: "task_name_impo", label: "任务名称", width: 100 },
        {
          prop: "task_containt",
          label: "任务内容",
        },
        { prop: "end_time", label: "截止日期", width: 100 },
        {
          prop: "task_status",
          label: "任务状态",
          width: 80,
        },
        { prop: "action", label: "操作", width: 300 },
      ],
      ishow: false,
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
      editId: undefined,
      editShow: false,
      editData: {
        task_name: "",
        end_time: "",
        task_containt: "",
      },
    };
  },
  mounted() {
    this.getTaskList();
  },
  watch: {
    ishow(newValue) {
      if (newValue === false) {
        this.newTaskInfo = {
          task_name: "",
          end_time: "",
          task_containt: "",
        };
      }
    },
  },
  methods: {
    //获取所有的任务列表
    getTaskList() {
      const data = {
        created_by: this.$store.getters.userinfo.card,
      };
      this.$request({
        url: "http://localhost:300/pc/todo/list",
        method: "get",
        headers: {
          Authorization: localStorage.getItem("tokenStr"),
        },
        params: data,
        withCredentials: false,
      }).then(
        (res) => {
          this.tableData = res.data.taskList;
        },
        (err) => {
          console.log(err);
        }
      );
    },

    undoEdit() {
      this.editData = {
        task_name: "",
        end_time: "",
        task_containt: "",
      };
      this.editShow = false;
    },
    //增加新的任务
    addList(data) {
          this.$request({
            url: "http://localhost:300/pc/todo/add",
            method: "post",
            data: data,
            headers: {
              Authorization: localStorage.getItem("tokenStr"),
            },
          }).then(() => {
            this.getTaskList();
			this.$store.commit("addTaskDrawer/changeIshow", false);
          });
    },
    //修改任务
    editTask(id, item) {
      this.editId = id;
      this.editShow = true;
      this.editData.task_name = item.task_name;
      this.editData.task_containt = item.task_containt;
      this.editData.end_time = item.end_time;
    },
    //修改任务，发送请求
    editListPromit() {
      this.$refs["newTaskForm"].validate((valid) => {
        if (valid) {
          const data = {
            ...this.editData,
            id: this.editId,
            created_by: this.$store.getters.userinfo.card,
          };
          this.$request({
            url: "http://127.0.0.1:300/pc/todo/edit",
            method: "post",
            data: data,
            headers: {
              Authorization: localStorage.getItem("tokenStr"),
            },
          }).then(() => {
            this.editShow = false;
            this.tableData = this.tableData.map((item) => {
              if (item.id === this.editId) {
                item.task_name = this.editData.task_name;
                item.task_containt = this.editData.task_containt;
                item.end_time = this.editData.end_time;
              }
              return item;
            });
          });
        } else {
          console.log("更新失败");
        }
      });
    },
    //删除任务
    deleteTask(id) {
      const taskId = id;
      const data = {
        id: taskId,
        created_by: this.$store.getters.userinfo.card,
      };
      this.$request({
        url: "http://localhost:300/pc/todo/delete",
        method: "post",
        data: data,
        headers: {
          Authorization: localStorage.getItem("tokenStr"),
        },
      }).then(() => {
        this.tableData.forEach((item) => {
          if (item.id === taskId) {
            item.task_status = 2;
          }
        });
      });
    },
    //完成任务
    haveDone(id, curStatus) {
      const taskId = id;
      const data = {
        id: taskId,
        created_by: this.$store.getters.userinfo.card,
        curStatus: curStatus,
      };
      this.$request({
        url: "http://localhost:300/pc/todo/haveDone",
        method: "post",
        data: data,
        headers: {
          Authorization: localStorage.getItem("tokenStr"),
        },
      }).then(() => {
        this.tableData = this.tableData.map((item) => {
          if (item.id === taskId) {
            const newStatus = item.task_status === 0 ? 1 : 0;
            item.task_status = Number(newStatus);
          }
          return item;
        });
      });
    },
    //impo
    changeimpo(newImpo, id) {
      console.log(newImpo);
      this.$request({
        url: "http://localhost:300/pc/todo/changeImpo",
        data: {
          id: id,
          task_impo: newImpo,
          created_by: this.$store.getters.userinfo.card,
        },
        method: "post",
        headers: {
          Authorization: localStorage.getItem("tokenStr"),
        },
      }).then(() => {
        this.tableData.forEach((item) => {
          if (item.id === id) {
            item.task_impo = newImpo;
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "style/pc/home/home.less";
</style>
<style>
.el-drawer__header {
  margin-bottom: 0px;
}
.el-drawer__body {
  padding: 0px 20px;
}
</style>
