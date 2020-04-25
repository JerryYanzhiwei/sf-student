<template>
  <div class="team_info_container">
    <PublicTitle title="队伍信息" color="#fff" />
    <div v-if="teamInfo" class="leader_contain">
      <div class="leader_top">
        <div class="item">
          <span class="item_name">编号: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.teamNo" placement="top-start">
            <span class="item_detail">{{teamInfo.teamNo}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">队伍: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.teamName" placement="top-start">
            <span class="item_detail">{{teamInfo.teamName}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">队长: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.captain" placement="top-start">
            <span class="item_detail">{{teamInfo.captain}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">院校: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.captain" placement="top-start">
            <span class="item_detail">{{teamInfo.school}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">赛区: </span>
          <el-tooltip class="item" effect="dark" :content="getZone(teamInfo.matchZone)" placement="top-start">
            <span class="item_detail">{{getZone(teamInfo.matchZone)}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">省份: </span>
          <el-tooltip class="item" effect="dark" :content="getProvince(teamInfo.matchZone, teamInfo.province)" placement="top-start">
            <span class="item_detail">{{getProvince(teamInfo.matchZone, teamInfo.province)}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">方向: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.opusDirection" placement="top-start">
            <span class="item_detail">{{teamInfo.opusDirection}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">课题: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.subject" placement="top-start">
            <span class="item_detail">{{teamInfo.subject}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">队长电话: </span>
          <el-tooltip class="item" effect="dark" :content="teamInfo.captainPhone" placement="top-start">
            <span class="item_detail">{{teamInfo.captainPhone}}</span>
          </el-tooltip>
        </div>
        <div class="item">
          <span class="item_name">指导老师: </span>
            <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.instructor"></el-input>
        </div>
        <div class="item">
          <span class="item_name">老师电话: </span>
            <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.instructorPhone"></el-input>
        </div>
        <div class="item">
          <span class="item_name">团队介绍: </span>
            <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.teamIntroduction"></el-input>
        </div>
        <div class="item">
          <span class="item_name">招募需求: </span>
            <el-input :disabled="!canEdit" size="mini" v-model="teamInfo.recruitmentDemand"></el-input>
        </div>
      </div>
      <div class="leader_bottom">
        <div class="item">
          <span class="item_name">{{
            teamInfo.teamState === 1 && '组队完成' ||
            teamInfo.teamState === 0 && '发布中'
            }}</span>
        </div>
        <div class="item">
          <el-button size="mini"
            @click="editTeamStatus(teamInfo.teamState)"
            >{{
            teamInfo.teamState === 1 && '发布组队' ||
            teamInfo.teamState === 0 && '组队完成'
            }}</el-button>
        </div>
        <div class="item">
          <el-button size="mini"
            @click="editTeamInfo(teamInfo.teamNo)"
            >{{
              !canEdit ? '编辑信息' : '保存'
            }}</el-button>
        </div>
      </div>
    </div>
    <PublicTitle title="队伍成员" color="#fff" />
    <div v-if="teamInfo" class="member_contain">
      <!-- 队伍成员 -->
      <div v-for="(item, index) in teamInfo.teamMembers" :key="index" class="member_item">
        <div class="member_name">
          <i class="iconfont icon-shouhuoren"></i>
          {{item.name}}
        </div>
        <div class="item_contain">
          <p class="item_detail">
            <span class="title">手机号: </span>
            <span class="detail">{{item.phone}}</span>
          </p>
          <p class="item_detail">
            <span class="title">邮箱: </span>
            <span class="detail">{{item.email}}</span>
          </p>
          <p class="item_detail">
            <span class="title">学校: </span>
            <span class="detail">{{item.school}}</span>
          </p>
          <p class="item_detail">
            <span class="title">专业: </span>
            <span class="detail">{{item.profession}}</span>
          </p>
          <p class="item_detail">
            <span class="title">年级: </span>
            <span class="detail">{{item.grade}}</span>
          </p>
        </div>
        <div @click="removeMember(item)" class="btn_contain">
          移除队伍
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PublicTitle from '@/components/public_title.vue'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      canEdit: false,
      teamInfo: null
    }
  },
  created () {
    this.getTeamInfo()
  },
  methods: {
    ...mapActions(['GET_MY_TEAM_INFO', 'PUT_REMOVE_MEMBER', 'PUT_TEAM_COMPLETE', 'PUT_MY_TEAM_INFO']),
    async getTeamInfo () {
      const res = await this.GET_MY_TEAM_INFO()
      if (res.result === '0' && res.data) {
        this.teamInfo = res.data
      }
    },
    async editTeamInfo (teamNo) {
      if (!this.canEdit) {
        this.canEdit = !this.canEdit
        return
      }
      if (!this.teamInfo.instructor) {
        this.$message.error('请填写指导老师')
        return
      }
      if (!this.teamInfo.instructorPhone) {
        this.$message.error('请填写老师电话')
        return
      }
      if (!this.teamInfo.teamIntroduction) {
        this.$message.error('请填写团队介绍')
        return
      }
      if (!this.teamInfo.recruitmentDemand) {
        this.$message.error('请填写招募需求')
        return
      }
      const res = await this.PUT_MY_TEAM_INFO({
        instructor: this.teamInfo.instructor,
        instructorPhone: this.teamInfo.instructorPhone,
        teamNo: this.teamInfo.teamNo,
        teamIntroduction: this.teamInfo.teamIntroduction,
        recruitmentDemand: this.teamInfo.recruitmentDemand
      })
      if (res.result === '0' && res.data) {
        this.$message.success('修改成功')
        this.canEdit = !this.canEdit
        this.getTeamInfo()
      }
    },
    async removeMember (data) {
      const res = await this.PUT_REMOVE_MEMBER({
        teamMemberId: data.teamMemberId,
        teamNo: this.teamInfo.teamNo
      })
      if (res.result === '0' && res.data) {
        this.$message.success('移除成功')
        this.getTeamInfo()
      }
    },
    async editTeamStatus (status) {
      const res = await this.PUT_TEAM_COMPLETE({
        teamNo: this.teamInfo.teamNo,
        teamState: status ? 0 : 1
      })
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
  .team_info_container {
    .iconfont {
      font-size: 13px;
    }
    .leader_contain {
      margin-top: 20px;
      margin-bottom: 50px;
      padding: 20px 0;

      background: white;
      box-shadow: 1px 2px 5px 1px $border_color;
      border-radius: 5px;
      border: 2px solid $border_color;
      background-color: $card_bg_color;
      .leader_top {
        display: flex;
        flex-wrap: wrap;

        padding: 0 30px;

        .item {
          width: 33%;
          margin-top: 10px;
          font-size: 16px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:nth-child(n > 3) {
          }
          .item_name {
            display: inline-block;

            width: 80px;
            margin-right: 5px;

            color: #fff;
            text-align: right;
          }
          .item_detail {
            color: #fff;
          }
        }
      }
      .leader_bottom {
        display: flex;
        justify-content: space-around;

        padding: 20px 30px;
        padding-bottom: 0;
        .item {
          font-size: 16px;
          .item_name {
            display: inline-block;

            width: 80px;
            margin-right: 5px;

            color: #fff;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .item_detail {
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .member_contain {
      display: flex;
      flex-wrap: wrap;

      .member_item {
        width: 31%;
        margin-top: 30px;
        overflow: hidden;
        margin-left: 3.3%;

        background-color: #fff;
        border-radius: 10px;
        transition: all .2s linear;
        &:nth-child(3n + 1) {
          margin-left: 0;
        }
        &:hover {
          box-shadow: 0 15px 30px rgba(0,0,0,.1);
          transform: translate3d(0,-2px,0);
        }
        .member_name {
          height: 40px;
          line-height: 40px;

          text-align: center;
          font-size: 16px;
          font-weight: bold;
        }
        .item_contain {
          padding: 0 20px;

          .item_detail {
            margin-bottom: 10px;

            font-size: 14px;
            color: #666;
          }
        }
        .btn_contain {
          height: 40px;
          line-height: 40px;
          text-align: center;

          background: #dc1e32;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
</style>

<style lang="scss">
  .leader_top {
    .el-input {
      width: 60%;
    }
  }
</style>
