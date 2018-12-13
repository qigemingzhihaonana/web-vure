/* eslint-disable no-trailing-spaces */
import axios from '@/utils/request'

/** 
 * javascript comment
 * @Author: MD
 * @Date: 2018-11-28 21:22:45
 * @Desc:  新闻创建
 */
export function sublimeNews(title, context) {
  const news = {
    title,
    context
  }
  return axios({
    url: '/news',
    method: 'post',
    data: news
  })
}
