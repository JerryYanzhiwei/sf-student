import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { instance, BASE_URL } from '@/utils/http'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    /**
     * 用户
     */
    async login ({ commit }, data = {}) {
      const { data: res } = await axios.post(`/login?phone=${data.phone}&password=${data.password}`)
      return res
    },
    // 登录获取验证码
    async LOGIN_CODE ({ commit }, data = {}) {
      const { data: res } = await axios.get(`/login/code?phone=${data.phone}`)
      return res
    },
    // 验证码登录
    async CODE_LOGIN ({ commit }, data = {}) {
      console.log(data, 1111)
      const { data: res } = await axios.post(`/login/code?phone=${data.phone}&code=${data.verificationCode}`)
      return res
    },
    async POST_GET_CODE ({ commit }, data = {}) {
      const { data: res } = await axios.get(`/code?phone=${data.phone}`)
      return res
    },
    async POST_REGISTRY ({ commit }, data = {}) {
      const { data: res } = await axios.post('/register', data)
      return res
    },
    async GET_USER_INFO ({ commit }, data = {}) {
      const { data: res } = await axios.get('/user/account/profile')
      return res
    },
    async PUT_USER_INFO ({ commit }, data = {}) {
      const { data: res } = await axios.put('/user/account/profile', data)
      return res
    },
    /**
     * 队伍
     */
    // 获取队伍大厅数据
    async GET_HALL_DATA ({ commit }, data = {}) {
      const { data: res } = await axios.get('/user/team/hall', data)
      return res
    },
    // 我加入的队伍
    async GET_JOIN_DETAIL ({ commit }, data = {}) {
      const { data: res } = await axios.get('/user/team/my/detail', data)
      return res
    },
    // 队伍中心
    async GET_TEMP_CENTER ({ commit }, data = {}) {
      let str = ''
      data.teamApplys.map(item => {
        str += '&teamApplys=' + item
      })
      const { data: res } = await axios.get(`/user/team/my?pageNo=${data.pageNo}&pageSize=${data.pageSize}${str}`)
      return res
    },
    // 申请加入队伍
    async POST_APPLY_TEAM ({ commit }, data = {}) {
      const { data: res } = await axios.post(`/user/team/apply?leaveMesseges=${data.leaveMesseges}&teamNo=${data.teamNo}`)
      return res
    },
    // 创建队伍
    async POST_CREATE_TEAM ({ commit }, data = {}) {
      const { data: res } = await axios.post('/user/team', data)
      return res
    },
    /**
     * 团队管理信息
     */
    // 队长团队信息
    async GET_MY_TEAM_INFO ({ commit }, data = {}) {
      const { data: res } = await axios.get('/user/teamInfo', data)
      return res
    },
    // 编辑团队信息
    async PUT_MY_TEAM_INFO ({ commit }, data = {}) {
      const url = encodeURI(`/user/teamInfo?instructor=${data.instructor}&instructorPhone=${data.instructorPhone}&teamNo=${data.teamNo}&teamIntroduction=${data.teamIntroduction}&recruitmentDemand=${data.recruitmentDemand}&teamName=${data.teamName}`)
      const { data: res } = await axios.put(url)
      return res
    },
    // 团队申请列表
    async GET_TEAM_APPLY_LIST ({ commit }, data = {}) {
      const { data: res } = await axios.get('/user/teamInfo/applyLists', data)
      return res
    },
    // 团队完成组队
    async PUT_TEAM_COMPLETE ({ commit }, data = {}) {
      const { data: res } = await axios.put(`/user/teamInfo/complete?teamNo=${data.teamNo}&teamState=${data.teamState}`)
      return res
    },
    // 团队入队审批
    async PUT_TEAM_CHECK ({ commit }, data = {}) {
      const { data: res } = await axios.put(`/user/teamInfo/joinTeam?teamNo=${data.teamNo}&teamMemberId=${data.teamMemberId}&teamApplyEnum=${data.teamApplyEnum}`)
      return res
    },
    // 移除队员
    async PUT_REMOVE_MEMBER ({ commit }, data = {}) {
      const { data: res } = await axios.put(`/user/teamInfo/remove?teamMemberId=${data.teamMemberId}&teamNo=${data.teamNo}`)
      return res
    },
    /**
     * 作品方向
     */
    async GET_DIRECTION ({ commit }, data = {}) {
      const { data: res } = await axios.get('/user/categorys')
      return res
    },
    /**
     * 作品上传
     */
    // 文件上传
    async POST_FILE_UPLOAD ({ commit }, data = {}) {
      const { data: res } = await instance.post('/user/teamInfo/attachment', data)
      return res
    },
    // 查询团队作品
    async GET_TEAM_FILE ({ commit }) {
      const { data: res } = await instance.get('/user/teamInfo/opus')
      return res
    },
    // 下载附件
    async GET_DOWNLOAD_FILE ({ commit }, attachmentId = 0) {
      const url = '/user/teamInfo/dowload/attachment'
      window.open(`${BASE_URL}${url}?attachmentId=${attachmentId}`)
    },
    // 下载模板
    async GET_DOWNLOAD_TEMPLATE ({ commit }, attachmentId = 0) {
      const url = '/user/teamInfo/dowload/template'
      window.open(`${BASE_URL}${url}?templateFileType=${attachmentId}`)
    }
  },
  modules: {
  }
})
