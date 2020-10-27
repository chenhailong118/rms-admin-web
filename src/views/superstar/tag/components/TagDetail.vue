<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="tag"
             :rules="rules"
             ref="tagFrom"
             label-width="150px">
      <el-form-item label="标签名称：" prop="name">
        <el-input v-model="tag.name"></el-input>
      </el-form-item>
      <el-form-item label="标签别名：" prop="aliase">
        <el-input v-model="tag.aliase"></el-input>
      </el-form-item>
      <el-form-item label="上级标签：">
        <el-select v-model="tag.parentId"
                   placeholder="请选择标签">
          <el-option
            v-for="item in selectTagList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="tag.hidden">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="tag.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tagFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tagFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {getTags, createTag, updateTag} from '@/api/tag';

  const defaultTag = {
    parentId: 0,
    name: '',
    hidden: 0,
    sort: 0
  };
  export default {
    name: "TagDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tag: Object.assign({}, defaultTag),
        selectTagList: [],
        rules: {
          name: [
            {required: true, message: '请输入标签名称', trigger: 'blur'},
            {min: 1, max: 140, message: '长度在 1 到 140 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTags({id:this.$route.query.id}).then(response => {
          this.tag = response.data.list[0];
        });
      } else {
        this.tag = Object.assign({}, defaultTag);
      }
      this.getSelectTagList();
    },
    methods: {
      getSelectTagList() {
        getTags({parentId: 0, pageSize: 100, pageNum: 1}).then(response => {
          this.selectTagList = response.data.list;
          this.selectTagList.unshift({id: 0, name: '无上级标签'});
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.tag.createTime = null;
              this.tag.updateTime = null;
              if (this.isEdit) {
                updateTag(this.$route.query.id, this.tag).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createTag(this.tag).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.tag = Object.assign({}, defaultTag);
        this.getSelectTagList();
      },
    }
  }
</script>

<style scoped>

</style>
