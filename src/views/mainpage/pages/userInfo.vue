<template>
  <div class="userInfo_container">
    <PublicTitle title="个人信息"/>
    <div class="user_contain">
      <div class="user_top">
        <div>
          <span>姓名: </span>
          <el-input v-model="userForm.name" size="mini"></el-input>
        </div>
        <div>
          <span>性别: </span>
          <el-input disabled v-model="gender" size="mini"></el-input>
        </div>
        <div>
          <span>手机: </span>
          <el-input disabled="" v-model="userForm.phone" size="mini"></el-input>
        </div>
        <div>
          <span>邮箱: </span>
          <el-input v-model="userForm.email" size="mini"></el-input>
        </div>
        <div>
          <span>学校: </span>
          <el-input v-model="userForm.school" size="mini"></el-input>
        </div>
        <div>
          <span>专业: </span>
          <el-input v-model="userForm.profession" size="mini"></el-input>
        </div>
        <div>
          <span>年级: </span>
          <el-input v-model="userForm.grade" size="mini"></el-input>
        </div>
        <div class="">
          <span>备注:</span>
          <el-input v-model="userForm.described" rows="3" resize="none" type="textarea"></el-input>
        </div>
        <div class="">
        </div>
      </div>
      <div class="btn_contain">
        <el-button @click="editUserInfo" size="mini">修改</el-button>
      </div>
    </div>
    <PublicTitle title="赛题详情下载"/>
    <div class="user_contain ops_contain">
      <p>
        包装类课题介绍
        <i class="iconfont icon-xiazai1 download_btn"
                @click="download(0)"></i>
      </p>
      <p>
        物流类课题介绍
        <i class="iconfont icon-xiazai1 download_btn"
                @click="download(1)"></i>
      </p>
    </div>
    <PublicTitle title="相关赛事文件下载"/>
    <div class="user_contain ops_contain">
      <p>
        2020顺丰杯物流创新大赛大咖公开课内容提纲-包装
        <i class="iconfont icon-xiazai1 download_btn"
                @click="openModel(2)"></i>
      </p>
      <p>
        2020顺丰杯物流创新大赛大咖公开课内容提纲-仓储
        <i class="iconfont icon-xiazai1 download_btn"
                @click="openModel(3)"></i>
      </p>
      <p>
        2020顺丰杯物流创新大赛大咖公开课内容提纲-营运
        <i class="iconfont icon-xiazai1 download_btn"
                @click="openModel(4)"></i>
      </p>
      <p>
        2020顺丰杯物流创新大赛赛事资料——航空
        <i class="iconfont icon-xiazai1 download_btn"
                @click="openModel(5)"></i>
      </p>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <p class="tip_txt">该资料仅适用于2020“顺丰杯”物流创新大赛，未经主办方允许，资料内容不得向任何第三方披露，如不严谨保密，一经发现，主办方将保留法律诉讼权利！</p>
      <el-checkbox v-model="checked">我已阅读并同意以上条款</el-checkbox>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modelDown">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PublicTitle from '@/components/public_title.vue'

import { mapActions } from 'vuex'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      userForm: {
        accountId: '',
        name: '',
        phone: '',
        email: '',
        school: '',
        profession: '',
        grade: '',
        described: ''
      },
      gender: '',
      dialogVisible: false,
      attachmentId: null,
      checked: false
    }
  },
  created () {
    this.getUserInfo()
    console.log(this.$route.path)
  },
  methods: {
    ...mapActions(['GET_USER_INFO', 'PUT_USER_INFO', 'GET_DOWNLOAD_TEMPLATE']),
    modelDown () {
      if (!this.checked) {
        this.$message.error('请勾选同意条款')
        return
      }
      this.download(this.attachmentId)
      this.dialogVisible = false
    },
    // 打开弹框
    openModel (attachmentId) {
      this.checked = false
      this.attachmentId = attachmentId
      this.dialogVisible = true
    },
    // 下载附件
    async download (attachmentId) {
      this.GET_DOWNLOAD_TEMPLATE(attachmentId)
    },
    async editUserInfo () {
      const params = this.userForm
      const res = await this.PUT_USER_INFO(params)
      if (res.result === '0' && res.data) {
        this.$message.success('修改成功')
      }
      console.log(res)
    },
    async getUserInfo () {
      const res = await this.GET_USER_INFO()
      if (res.result === '0' && res.data) {
        this.userForm = res.data
        this.userForm.gender === 0 && (this.gender = '未知')
        this.userForm.gender === 1 && (this.gender = '男')
        this.userForm.gender === 2 && (this.gender = '女')
      }
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.userInfo_container {
  width: 100%;
  min-height: 100vh;

  // background-color: #f4f5f8;
  .user_contain {
    margin-top: 30px;
    margin-bottom: 40px;
    padding: 20px 30px;

    background-color: #fff;
    box-shadow:0px 2px 6px rgba(0,0,0,0.2);
    border-radius: 8px;
    &.ops_contain {
      display: flex;
      p {
        margin-right: 20px;
        color: #dc1e32;
        .download_btn {
          margin-left: 5px;
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
    .user_top {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      div {
        width: 50%;
        margin: 10px 0;

        text-align: center;
        span {
          display: inline-block;

          width: 85px;
          margin-right: 10px;

          text-align: right;
        }
      }
    }
    .btn_contain {
      margin-top: 10px;

      text-align: center;
    }
  }
}
</style>

<style lang="scss">
  .userInfo_container .user_contain .user_top div.el-textarea {
    vertical-align: top;
    margin: 0;
  }
  .el-dialog__body {
    padding: 0 20px;
  }
  .tip_txt {
    margin-bottom: 10px;
  }
</style>
