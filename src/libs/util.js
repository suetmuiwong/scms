import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import { Message } from 'element-ui'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

/** 正则**/
util.mobileExp = /^1[0-9]\d{9}$/ // 手机号码
util.telExp = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/ // 固定电话
util.mobileTelExp = /(^1[0-9]\d{9}$)|(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{3,14}$)/ // 手机或电话
util.floatExp = /^(-?\d+)(\.\d+)?$/ // 浮点数
// util.moneyExp = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/; //金钱 保保留两位
util.moneyExp = /(^[1-9]([0-9]+)?(\.[0-9]+)?$)|(^(0){1}$)|(^[0-9]\.[0-9]+?$)/ // 金钱
util.rateExp = /(^[1-9]([0-9]+)?(\.[0-9]{1,})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,}?$)/ // 金钱
util.numberExp = /^[0-9]*$/ // 数字
util.intNumberExp = /^[1-9]*[1-9][0-9]*$/ // 正整数
util.percentExp = /^((?:|0|[1-9]\d?|100)(?:\.\d{1,2})?)$/// 百分比
util.az_09Exp = /^[0-9a-zA-Z_]{1,}$/ // 数字字母下划线
util.urlExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/ // url
util.emailExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ // 邮箱
util.idCardExp = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/ // 身份证
util.faxExp = /^(\d{3,4}-)?\d{7,8}$/ // 传真

util.isMobile = (number) => {
  return util.mobileExp.test(number)
}
util.isMobileTelExp = (number) => {
  return util.mobileTelExp.test(number)
}

/** 正则end**/

util.currency = function () {
  let data = [
    { 'countryname': '欧洲货币联盟', 'name': '欧元', 'currency': 'EUR' },
    { 'countryname': '冰岛', 'name': '冰岛克朗', 'currency': 'ISK' },
    { 'countryname': '丹麦', 'name': '丹麦克朗', 'currency': 'DKK' },
    { 'countryname': '挪威', 'name': '挪威克朗', 'currency': 'NOK' },
    { 'countryname': '瑞典', 'name': '瑞典克朗', 'currency': 'SEK' },
    { 'countryname': '芬兰', 'name': '芬兰马克', 'currency': 'FIM' },
    { 'countryname': '俄罗斯', 'name': '卢布', 'currency': 'RUB' },
    { 'countryname': '波兰', 'name': '兹罗提', 'currency': 'PLN' },
    { 'countryname': '捷克和斯洛伐克', 'name': '捷克克朗', 'currency': 'CSK' },
    { 'countryname': '匈牙利', 'name': '福林', 'currency': 'HUF' },
    { 'countryname': '德国', 'name': '马克', 'currency': 'DEM' },
    { 'countryname': '奥地利', 'name': '奥地利先令', 'currency': 'ATS' },
    { 'countryname': '瑞士', 'name': '瑞士法郎', 'currency': 'CHF' },
    { 'countryname': '荷兰', 'name': '荷兰盾', 'currency': 'NLG' },
    { 'countryname': '比利时', 'name': '比利时法郎', 'currency': 'BEF' },
    { 'countryname': '卢森堡', 'name': '卢森堡法郎', 'currency': 'LUF' },
    { 'countryname': '英国', 'name': '英镑', 'currency': 'GBP' },
    { 'countryname': '爱尔兰', 'name': '爱尔兰镑', 'currency': 'IEP' },
    { 'countryname': '法国', 'name': '法郎', 'currency': 'FRF' },
    { 'countryname': '西班牙', 'name': '比塞塔', 'currency': 'ESP' },
    { 'countryname': '葡萄牙', 'name': '埃斯库多', 'currency': 'PTE' },
    { 'countryname': '意大利', 'name': '里拉', 'currency': 'ITL' },
    { 'countryname': '马耳他', 'name': '马耳他镑', 'currency': 'MTP' },
    { 'countryname': '南斯拉夫', 'name': '南斯拉夫新第纳尔', 'currency': 'YUD' },
    { 'countryname': '罗马尼亚', 'name': '列伊', 'currency': 'ROL' },
    { 'countryname': '保加利亚', 'name': '列弗', 'currency': 'BGL' },
    { 'countryname': '阿尔巴尼亚', 'name': '列克', 'currency': 'ALL' },
    { 'countryname': '希腊', 'name': '德拉马克', 'currency': 'GRD' },
    { 'countryname': '加拿大', 'name': '加元', 'currency': 'CAD' },
    { 'countryname': '美国', 'name': '美元', 'currency': 'USD' },
    { 'countryname': '墨西哥', 'name': '墨西哥比索', 'currency': 'MXP' },
    { 'countryname': '危地马拉', 'name': '格查尔', 'currency': 'GTQ' },
    { 'countryname': '萨尔瓦多', 'name': '萨尔瓦多科朗', 'currency': 'SVC' },
    { 'countryname': '洪都拉斯', 'name': '伦皮拉', 'currency': 'HNL' },
    { 'countryname': '尼加拉瓜', 'name': '科多巴', 'currency': 'NIC' },
    { 'countryname': '哥斯达黎加', 'name': '哥斯达黎加科朗', 'currency': 'CRC' },
    { 'countryname': '巴拿马', 'name': '巴拿马巴波亚', 'currency': 'PAB' },
    { 'countryname': '古巴', 'name': '古巴比索', 'currency': 'CUP' },
    { 'countryname': '巴哈马联邦', 'name': '巴哈马元', 'currency': 'BSD' },
    { 'countryname': '牙买加', 'name': '牙买加元', 'currency': 'JMD' },
    { 'countryname': '海地', 'name': '古德', 'currency': 'HTG' },
    { 'countryname': '多米尼加', 'name': '多米尼加比索', 'currency': 'DOP' },
    { 'countryname': '特立尼达和多巴哥', 'name': '特立尼达多巴哥元', 'currency': 'TTD' },
    { 'countryname': '巴巴多斯', 'name': '巴巴多斯元', 'currency': 'BBD' },
    { 'countryname': '哥伦比亚', 'name': '哥伦比亚比索', 'currency': 'COP' },
    { 'countryname': '委内瑞拉', 'name': '博利瓦', 'currency': 'VEB' },
    { 'countryname': '圭亚那', 'name': '圭亚那元', 'currency': 'GYD' },
    { 'countryname': '苏里南', 'name': '苏里南盾', 'currency': 'SRG' },
    { 'countryname': '秘鲁', 'name': '新索尔', 'currency': 'PES' },
    { 'countryname': '厄瓜多尔', 'name': '苏克雷', 'currency': 'ECS' },
    { 'countryname': '巴西', 'name': '新克鲁赛罗', 'currency': 'BRC' },
    { 'countryname': '玻利维亚', 'name': '玻利维亚比索', 'currency': 'BOP' },
    { 'countryname': '智利', 'name': '智利比索', 'currency': 'CLP' },
    { 'countryname': '阿根廷', 'name': '阿根廷比索', 'currency': 'ARP' },
    { 'countryname': '巴拉圭', 'name': '巴拉圭瓜拉尼', 'currency': 'PYG' },
    { 'countryname': '乌拉圭', 'name': '乌拉圭新比索', 'currency': 'UYP' },
    { 'countryname': '埃及', 'name': '埃及镑', 'currency': 'EGP' },
    { 'countryname': '利比亚', 'name': '利比亚第纳尔', 'currency': 'LYD' },
    { 'countryname': '苏丹', 'name': '苏丹镑', 'currency': 'SDP' },
    { 'countryname': '突尼斯', 'name': '突尼斯第纳尔', 'currency': 'TND' },
    { 'countryname': '阿尔及利亚', 'name': '阿尔及利亚第纳尔', 'currency': 'DZD' },
    { 'countryname': '摩洛哥', 'name': '摩洛哥迪拉姆', 'currency': 'MAD' },
    { 'countryname': '毛里塔尼亚', 'name': '乌吉亚', 'currency': 'MRO' },
    { 'countryname': '塞内加尔', 'name': '非共体法郎', 'currency': 'XOF' },
    { 'countryname': '上沃尔特', 'name': '非共体法郎', 'currency': 'XOF' },
    { 'countryname': '科特迪瓦', 'name': '非共体法郎', 'currency': 'XOF' },
    { 'countryname': '多哥', 'name': '非共体法郎', 'currency': 'XOF' },
    { 'countryname': '贝宁', 'name': '非共体法郎', 'currency': 'XOF' },
    { 'countryname': '尼日尔', 'name': '非共体法郎', 'currency': 'XOF' },
    { 'countryname': '冈比亚', 'name': '法拉西', 'currency': 'GMD' },
    { 'countryname': '几内亚比绍', 'name': '几内亚比索', 'currency': 'GWP' },
    { 'countryname': '几内亚', 'name': '几内亚西里', 'currency': 'GNS' },
    { 'countryname': '塞拉里昂', 'name': '利昂', 'currency': 'SLL' },
    { 'countryname': '利比里亚', 'name': '利比里亚元', 'currency': 'LRD' },
    { 'countryname': '加纳', 'name': '塞地', 'currency': 'GHC' },
    { 'countryname': '尼日利亚', 'name': '奈拉', 'currency': 'NGN' },
    { 'countryname': '喀麦隆', 'name': '中非金融合作法郎', 'currency': 'XAF' },
    { 'countryname': '乍得', 'name': '中非金融合作法郎', 'currency': 'XAF' },
    { 'countryname': '刚果', 'name': '中非金融合作法郎', 'currency': 'XAF' },
    { 'countryname': '加蓬', 'name': '中非金融合作法郎', 'currency': 'XAF' },
    { 'countryname': '中非', 'name': '中非金融合作法郎', 'currency': 'XAF' },
    { 'countryname': '赤道几内亚', 'name': '赤道几内亚埃奎勒', 'currency': 'GQE' },
    { 'countryname': '南非', 'name': '兰特', 'currency': 'ZAR' },
    { 'countryname': '吉布提', 'name': '吉布提法郎', 'currency': 'DJF' },
    { 'countryname': '索马里', 'name': '索马里先令', 'currency': 'SOS' },
    { 'countryname': '肯尼亚', 'name': '肯尼亚先令', 'currency': 'KES' },
    { 'countryname': '乌干达', 'name': '乌干达先令', 'currency': 'UGS' },
    { 'countryname': '坦桑尼亚', 'name': '坦桑尼亚先令', 'currency': 'TZS' },
    { 'countryname': '卢旺达', 'name': '卢旺达法郎', 'currency': 'RWF' },
    { 'countryname': '布隆迪', 'name': '布隆迪法郎', 'currency': 'BIF' },
    { 'countryname': '扎伊尔', 'name': '扎伊尔', 'currency': 'ZRZ' },
    { 'countryname': '赞比亚', 'name': '赞比亚克瓦查', 'currency': 'ZMK' },
    { 'countryname': '马达加斯加', 'name': '马达加斯加法郎', 'currency': 'MCF' },
    { 'countryname': '塞舌尔', 'name': '塞舌尔卢比', 'currency': 'SCR' },
    { 'countryname': '毛里求斯', 'name': '毛里求斯卢比', 'currency': 'MUR' },
    { 'countryname': '津巴布韦', 'name': '津巴布韦元', 'currency': 'ZWD' },
    { 'countryname': '科摩罗', 'name': '科摩罗法郎', 'currency': 'KMF' },
    { 'countryname': '中国香港', 'name': '港元', 'currency': 'HKD' },
    { 'countryname': '中国澳门', 'name': '澳门元', 'currency': 'MOP' },
    { 'countryname': '中国', 'name': '人民币元', 'currency': 'CNY' },
    { 'countryname': '朝鲜', 'name': '朝鲜元', 'currency': 'KPW' },
    { 'countryname': '越南', 'name': '越南盾', 'currency': 'VND' },
    { 'countryname': '韩国', 'name': '韩元', 'currency': 'KRW' },
    { 'countryname': '日本', 'name': '日元', 'currency': 'JPY' },
    { 'countryname': '老挝', 'name': '基普', 'currency': 'LAK' },
    { 'countryname': '柬埔寨', 'name': '瑞尔', 'currency': 'KHR' },
    { 'countryname': '菲律宾', 'name': '菲律宾比索', 'currency': 'PHP' },
    { 'countryname': '马来西亚', 'name': '林吉特', 'currency': 'MYR' },
    { 'countryname': '新加坡', 'name': '新加坡元', 'currency': 'SGD' },
    { 'countryname': '泰国', 'name': '泰铢', 'currency': 'THP' },
    { 'countryname': '缅甸', 'name': '缅元', 'currency': 'BUK' },
    { 'countryname': '斯里兰卡', 'name': '斯里兰卡卢比', 'currency': 'LKR' },
    { 'countryname': '马尔代夫', 'name': '马尔代夫卢比', 'currency': 'MVR' },
    { 'countryname': '印度尼西亚', 'name': '印尼盾', 'currency': 'IDR' },
    { 'countryname': '巴基斯坦', 'name': '巴基斯坦卢比', 'currency': 'PRK' },
    { 'countryname': '印度', 'name': '卢比', 'currency': 'INR' },
    { 'countryname': '尼泊尔', 'name': '尼泊尔卢比', 'currency': 'NPR' },
    { 'countryname': '阿富汗', 'name': '阿富汗尼', 'currency': 'AFA' },
    { 'countryname': '伊朗', 'name': '伊朗里亚尔', 'currency': 'IRR' },
    { 'countryname': '伊拉克', 'name': '伊拉克第纳尔', 'currency': 'IQD' },
    { 'countryname': '叙利亚', 'name': '叙利亚镑', 'currency': 'SYP' },
    { 'countryname': '黎巴嫩', 'name': '黎巴嫩镑', 'currency': 'LBP' },
    { 'countryname': '约旦', 'name': '约旦第纳尔', 'currency': 'JOD' },
    { 'countryname': '沙特阿拉伯', 'name': '亚尔', 'currency': 'SAR' },
    { 'countryname': '科威特', 'name': '科威特第纳尔', 'currency': 'KWD' },
    { 'countryname': '巴林', 'name': '巴林第纳尔', 'currency': 'BHD' },
    { 'countryname': '卡塔尔', 'name': '卡塔尔里亚尔', 'currency': 'QAR' },
    { 'countryname': '阿曼', 'name': '阿曼里亚尔', 'currency': 'OMR' },
    { 'countryname': '阿拉伯也门', 'name': '也门里亚尔', 'currency': 'YER' },
    { 'countryname': '民主也门', 'name': '也门第纳尔', 'currency': 'YDD' },
    { 'countryname': '土耳其', 'name': '土耳其镑', 'currency': 'TRL' },
    { 'countryname': '塞浦路斯', 'name': '塞浦路斯镑', 'currency': 'CYP' },
    { 'countryname': '蒙古', 'name': '图格里克', 'currency': 'MNT' },
    { 'countryname': '澳大利亚', 'name': '澳大利亚元', 'currency': 'AUD' },
    { 'countryname': '新西兰', 'name': '新西兰元', 'currency': 'NZD' },
    { 'countryname': '斐济', 'name': '斐济元', 'currency': 'FJD' },
    { 'countryname': '所罗门群岛', 'name': '所罗门元', 'currency': 'SBD' }
  ]
  return data
}

/**
 * @description 转换时间格式 将 2020-03-17T03:49:07.000+0000 yyyy-MM-dd HH:mm:ss
 * @param {String} 需要转换的时间
 */
util.formatTime = function (date) {
  let day = date.split('T')[0]
  let time = (date.split('T')[1]).substring(0, 8)
  return day + ' ' + time
}

/**
 *
 *数组转tree
 */
util.composeTree = function (list = []) {
  const data = JSON.parse(JSON.stringify(list)) // 浅拷贝不改变源数据
  const result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children
  })
  const map = {}
  data.forEach(item => {
    item.icon = 'el-icon-folder-opened'
    map[item.itemCode] = item
  })
  data.forEach(item => {
    item.icon = 'el-icon-folder-opened'
    const parent = map[item.parentItemCode]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * url 下载url
 * data 下载的参数
 */
util.download = function (url, data) {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', '/scms' + url, true)
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhr.setRequestHeader('Authorization', 'Bearer' + ' ' + util.cookies.get('token'))
  xhr.setRequestHeader('version', '2')
  xhr.responseType = 'blob' // 设置返回类型blob
  xhr.onload = function () {
    if (this.status === 200) {
      let blob = this.response
      let reader = new FileReader()
      reader.readAsDataURL(blob) // 转换为base64，可以直接放入a标签href
      reader.onload = function (e) {
        let fileName = (xhr.getResponseHeader('content-disposition').match(/filename=(\S*)/)[1]).split(';')[0]
        let downloadElement = document.createElement('a')
        downloadElement.href = e.target.result
        downloadElement.download = fileName // 下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement)
      }
    } else {
      // 显示提示
      Message({
        message: '网络错误！',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
  xhr.send() // 发送ajax请求
}

/**
 * 下载图片
 */
// util.downloadFile = function (data) {
//   util.download('/download/')
// }
export default util
