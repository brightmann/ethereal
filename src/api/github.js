import config from '@/config'
import { github } from '@/utils/request'

const { username, repository, friendsRepo } = config
const blog = `/repos/${username}/${repository}`
const friends = `/repos/${username}/${friendsRepo}`

/**
 * 获取文章总数
 * @returns {Promise}
 */
async function countIssues(query) {
  const res = await github({ url: '/search/issues', params: { q: query, per_page: 1 } })
  return { status: res.status, data: { data: { repository: { issues: { totalCount: res.data.total_count } } } } }
}

export function getPostsCountAPI() {
  return countIssues(`repo:${username}/${repository} is:issue is:open`)
}

export function getFriendsCountAPI() {
  return Promise.resolve({ status: 200, data: { data: { repository: { issues: { totalCount: 0 } } } } })
}

export function getInspirationCountAPI() {
  return countIssues(`repo:${username}/${repository} is:issue is:closed label:Inspiration`)
}

/**
 * 搜索文章，返回文章列表
 * @param {*} param0 q: 搜索关键词
 * @returns Promise
 */
export function searchPostsAPI({ q = '' }) {
  return github({
    url: `/search/issues?q=${q}+is:issue+state:open+repo:${username}/${repository}&sort=created&order=desc&per_page=10&page=1`,
  })
}

/**
 * 获取文章分类
 * @returns {Promise}
 */
export function getCategoriesAPI() {
  return github({
    url: `${blog}/milestones?state=open&sort=created&direction=asc&per_page=10&page=1`,
  })
}

/**
 * 获取文章标签
 * @returns {Promise}
 */
export function getTagsAPI() {
  return github({
    url: `${blog}/labels?per_page=100&page=1`,
  })
}

/**
 * 获取文章列表
 * @param {*} param0 page, pageSize, filter
 * @returns Promise
 */
export function getPostsAPI({ page = 1, pageSize = config.pageSize, filter = '' }) {
  return github({
    url: `${blog}/issues?state=open&sort=created&direction=desc&page=${page}&per_page=${pageSize}${filter}`,
  })
}

/**
 * 获取友链列表
 * @param {*} param0 page, pageSize, filter
 * @returns Promise
 */
export function getFriendsAPI() {
  return Promise.resolve({ status: 200, data: [] })
}

/**
 * 获取灵感列表
 * @param {*} param0 page 当前页码 pageSize 每页数量
 * @returns Promise
 */
export function getInspirationAPI({ page = 1, pageSize = config.pageSize }) {
  return github({
    url: `${blog}/issues?state=closed&labels=inspiration&page=${page}&per_page=${pageSize}`,
  })
}

/**
 * 获取文章详情
 * @param {*} number 文章 number
 * @returns Promise
 */
export function getPostAPI(number) {
  return github({
    url: `${blog}/issues/${number}?state=open`,
  })
}

export function getAboutAPI() {
  return github({
    url: `${blog}/issues?state=closed&labels=About`,
  })
}
