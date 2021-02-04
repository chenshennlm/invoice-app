let express = require('express');
let Mock = require('mockjs');
var cors = require("cors"); //  cnpm install cors
const { MultiCompiler } = require('webpack');

let app = express();

//-----随机生成电话号码
Mock.mobile_prefix = [
    '132',
    '135',
    '136'
]

Mock.numeric = '0123456789'

Mock.random = function (len, list) {
    if (len <= 1) {
        len = 1
    }
    var s = ''
    var n = list.length
    if (typeof list === 'string') {
        while (len-- > 0) {
            s += list.charAt(Math.random() * n)
        }
    } else if (list instanceof Array) {
        while (len-- > 0) {
            s += list[Math.floor(Math.random() * n)]
        }
    }
    return s
}

Mock.getMobile = function () {
    return Mock.random(1, Mock.mobile_prefix) + Mock.random(8, Mock.numeric)
}
//---------------------------------------------------------------------------
//-----------------------随机生成数据数组----------------------------------------
Mock.getDataArray = function (n) {
    let data = [];
    for (let i = 0; i < n; i++) {
        data.push(Mock.random(3, Mock.numeric));
    }
    return data;
}

//---------------------------------------------------------------------------
//-------------------字符串的选择-----------------------------------
Mock.Random.extend({
    invoiceType: function (date) {
        var invoiceTypes = ['差旅费', '电话费', '交通费', '办公费', '低值易耗品购置费', '业务招待费', '培训费']
        return this.pick(invoiceTypes)
    },
    invioceKind: function () {
        var invioceKinds = ['首次报送', '二次报送'];
        return this.pick(invioceKinds);
    },
    imgAddress: function () {
        var imgAddresses = ['img_20210122164856.jpg', 'img_20210122164856.png', 'login.png']
        return this.pick(imgAddresses);
    },
    organization: function () {
        var organizations = [{ name: '浙江衡信教育科技有限公司', id: '1000000' }, { name: '阿里巴巴', id: '1000001' }, { name: '百度', id: '1000002' }]
        return this.pick(organizations);
    },
    getMobile: function () {
        return Mock.random(1, Mock.mobile_prefix) + Mock.random(8, Mock.numeric)
    }
})
//---------------------------------------------------------------------------

//模拟后台的端口
app.listen('8090', () => {
    console.log('监听端口8090')
})

//跨域啊，不知道原因，但是用cors可以了
app.use(cors({
    methods: ["GET", "POST"],
    alloweHeaders: ["Content-Type", "application/json;charset=utf-8;application/x-www-form-urlencoded"]
}));

//Login--获取账号密码验证登录信息是否正确
app.use('/verifyAccount', function (req, res) {
    res.json(Mock.mock({
        'state': 200,
        data: {
            'account': '18225084916',
            'name': '@cname',
            'password': '123',
            'phone': Mock.getMobile(),
            'organizations': '@organization',//该账号下的分支机构信息
        }
    }))
})

//注册账号
app.use('/registerAccount', function (req, res) {
    res.json(Mock.mock({
        'state|1-3': 1,//1:注册成功，2：账号已存在，3：注册失败
        data: {
            'account': '18225084916',
            'password': '123'
        }
    }))
})

//绑定手机号--获取手机号验证码
app.use('/getCodeByPhone', function (req, res) {
    res.json(Mock.mock({
        //'state|1-3': 1,1:获取成功 2：手机号已被使用 3：获取失败
        'state|1': 1,
        'code|1000-9999': 1
    }))
})

//绑定手机--返回状态码
app.use('/bindPhone', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1//1:绑定成功 2：绑定失败
    }))
})

//重置密码--返回状态码
app.use('/resetCode', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1//1:重置成功 2：重置失败
    }))
})

//获取首页需要的公司信息
app.use('/companyInfo', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,
        data: {
            'id': Mock.random(4, Mock.numeric),//当前公司id
            'name': '浙江衡信教育科技有限公司',//当前公司名
            'downAllNum': Mock.random(4, Mock.numeric),//已记账量
            'personNum': Mock.random(3, Mock.numeric),//公司人数
            'downBillNuum': Mock.random(4, Mock.numeric),//已记账票据数
            'waitTakeIn': Mock.random(3, Mock.numeric),//待采集业务量
            'waitCheck': Mock.random(3, Mock.numeric),//待核对业务量
            'companyCode': Mock.random(8, Mock.numeric)//企业编码
        }
    }))
})

//得到饼图需要的数据
app.use('/countCompany', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        data: [
            {
                name: '会计', value: Mock.random(2, Mock.numeric),//会计人数
            }, {
                name: '出纳', value: Mock.random(2, Mock.numeric),//会计人数
            }
        ]

    }))
})

//得到业务统计图需要的数据
app.use('/countBusiness', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        data: [
            {
                name: "邮件营销", data: Mock.getDataArray(7),
            }, {
                name: "联盟广告", data: Mock.getDataArray(7)
            }
        ]

    }))
})

//首次登录绑定机构
app.use('/bindCompany', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1//1:绑定成功 2：绑定失败
    }))
})

//角色管理表格的内容部分
app.use('/roleinfo', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|13': [{
            'roleId|+1': 1, //角色id
            'roleName': '@cname',  // 角色中文名称
            'key|+1': 1,    // 属性值自动加 1，初始值为1
            'number|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
            'limitesKey': ["0-1-0-2", "0-1-1"],
            'state|1-2': 1,//1:启用 2：禁用
        }],
        total: 11
    }))
})

//改变角色状态
app.use('/changeState', function (req, res) {
    res.json(Mock.mock({
        'state': 1//1:删除成功 2：删除失败
    }))
})

//删除角色
app.use('/deleteRole', function (req, res) {
    res.json(Mock.mock({
        'state': 1//1:禁启用成功 2：禁启用失败
    }))
})

//编辑、新增角色
app.use('/editRole', function (req, res) {
    res.json(Mock.mock({
        'state': 1//1:禁启用成功 2：禁启用失败
    }))
})

//账号管理表格的内容部分
app.use('/accountinfo', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|13': [{
            'name': '@cname',  // 中文名称
            'account|10001-10011': 1,//登录账号 
            'phone': Mock.getMobile(),//电话号码
            'key|+1': 1,    // 属性值自动加 1，初始值为1
            'roleId|1-2': 1, //角色权限 1：管理员 2：普通职员
            'state|1-2': 1,//1:启用 2：禁用
        }],
        total: 11
    }))
})

//删除账号
app.use('/deleteAccount', function (req, res) {
    res.json(Mock.mock({
        'state': 1//1:禁启用成功 2：禁启用失败
    }))
})

//改变账号状态
app.use('/changeAccountState', function (req, res) {
    res.json(Mock.mock({
        'state': 1//1:删除成功 2：删除失败
    }))
})

//得到客户管理--已有客户表格的内容
app.use('/confirmedCompanyinfo', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|13': [{
            'companyId|+1': 1, //企业id
            'companyName': '@ctitle',  // 角色中文名称
            'account': '@natural(10000, 99999)',
            'phone': Mock.getMobile(),
            'companyCode': '@natural(10000000, 99999999)',//企业编码
            'number|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
        }],
        total: 11
    }))
})

//得到客户管理--待确认客户表格的内容
app.use('/unconfirmedCompanyinfo', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|13': [{
            'companyId|+1': 1, //角色id
            'companyName': '@ctitle',  // 角色中文名称
            'account': '@natural(10000, 99999)',
            'phone': Mock.getMobile(),
            'companyCode': '@natural(10000000, 99999999)',//企业编码
            'number|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
        }],
        total: 11
    }))
})

//删除账号
app.use('/deleteClient', function (req, res) {
    res.json(Mock.mock({
        'state': 1//1:禁启用成功 2：禁启用失败
    }))
})

//票据搜集--左侧树形结构数据
app.use('/getTreeCompanies', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|13': [{
            'companyName': '@ctitle',  // 角色中文名称
            'companyCode': '@natural(10000000, 99999999)',//企业编码
        }],
        total: 13
    }))
})

//票据搜集
app.use('/getBusineeInfoByCompany', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|13': [{
            'companyName': '@ctitle',  // 角色中文名称
            'companyCode': '@natural(10000000, 99999999)',//企业编码
            'latestDate': "@date('yyyy/MM/dd')",//最近报送时间
            'businessDate': "@date('yyyy/MM/dd')",//最近报送时间
            'invioceType': '@invoiceType',//发票类型
            'note': '@csentence()',//备注
        }],
        total: 13
    }))
})

//票据采集--票据详情
app.use('/getInvoiceCountByCompanyCode', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|13': [{
            'key': "@integer(10000000, 70000000)",//记录的编号
            'invioceType': '@invoiceType',//票据类型
            'recommendDate': "@date('yyyy/MM/dd')",//最近报送时间
            'recommendCount': "@integer(10000, 70000)",//票据凭证
            'validCount': "@integer(1000, 7000)",//是否有效，1：有效 2：无效
            'invalidCount': "@integer(1000, 7000)",//是否需要寄送 1：需要 2：不需要
            'waitEditCount': "@integer(1000, 7000)",//是否已经签收 1：是 2：否
        }],
        total: 13
    }))
})

//票据采集--查看票据详情
app.use('/getInvoiceInfoByInvoiceId', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|13': [{
            'key': "@integer(10000000, 70000000)",//记录的编号
            'invoiceProof': "#@integer(1000000000000000, 7000000000000000)#",//票据凭证
            'state|1-5': 1,//票据状态，1：有效 2：无效 3：待审核 4：删除 5：替换
            'type': '@invioceKind',//票据类型
            'originalImg': '@imgAddress',//原始凭证存储的地址
        }],
        total: 13
    }))
})

//票据采集--票据审核左侧树形图
app.use('/getTreeInfoByRecommendId', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|4': [{
            'key': "@integer(10000000, 70000000)",//记录的编号
            'title': '原始凭证',
            'children|4': [{
                'key': "@integer(10000000, 70000000)",//记录的编号
                'recommendDate': "@date('yyyy/MM')",//最近报送时间
                'spot': '昆明',//地点
                'type': '@invoiceType',//票据类型
            }],
        }],
        total: 13
    }))
})

//票据采集--原始凭证
app.use('/getOrignalInvioceByInvoiceId', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|4': [{
            'invoiceProof': "#@integer(1000000000000000, 7000000000000000)#",//票据凭证--id
            'recommendDate': "@date('yyyy/MM')",//最近报送时间
            'state|1-5': 1,//票据状态，1：有效 2：无效 3：待审核 4：删除 5：替换
            'type': '@invioceKind',//票据类型
            'imgSrc': 'D:/img/img_20210122164856.png'
        }],
        total: 4
    }))
})

//票据采集--票据审核改变凭证状态
app.use('/handleRadioValue', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
    }))
})

//实务核对--根据公司code获取实务信息
app.use('/getMaterialinfoByCompanyCode', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|13': [{
            'key': "@integer(10000000, 70000000)",//记录的编号
            'companyName': '@ctitle',  // 角色中文名称
            'companyCode': '@natural(10000000, 99999999)',//企业编码
            'latestUpdate': "@date('yyyy/MM/dd')",//最近报送时间
            'businessDate': "@date('yyyy/MM/dd')",//最近业务时间
            'invioceType': '@invoiceType',//发票类型
            'note': '@csentence()',//备注
            'state|1-2': 1,//1:未记账 2：待核实
        }],
        total: 13
    }))
})

//实务核对--票据详情
app.use('/getMaterialcountByCompanyCode', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|13': [{
            'recommendDate': "@date('yyyy/MM/dd')",//最近报送时间
            'invoiceProof': "#@integer(1000000000000000, 7000000000000000)#",//票据凭证
            'isValid|1-2': 1,//是否有效，1：有效 2：无效
            'isSent|1-2': 1,//是否需要寄送 1：需要 2：不需要
            'isSignIn|1-2': 1,//是否已经签收 1：是 2：否
            'originalImg': '@imgAddress',//原始凭证存储的地址
        }],
        total: 13
    }))
})

//实务审核--票据审核改变凭证状态
app.use('/handleMaterialValue', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
    }))
})

//实务审核--得到票据图片
app.use('/getMaterialImgsByKey', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|20': [{
            'imgId': '@integer(10000000000000, 70000000000000)',
            'originalImg': '@imgAddress',//原始凭证存储的地址
        }],
        total: 20
    }))
})

//票据管理--根据机构id得到企业票据信息
app.use('/getInfoByOrganizationalId', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|20': [{
            'companyId|+1': 1, //角色id
            'companyName': '@ctitle',  // 角色中文名称
            'startDate': "@date('yyyy/MM')",//开始记账日期
            'latestDate': "@date('yyyy/MM/dd')",//最近报送时间
            'invoiceCount': '@integer(100,5000)',//票据数量
        }],
        total: 20
    }))
})

//票据管理--左侧树型数据
app.use('/getTreeDataByCompanyId', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|4': [{
            'title': "@date('yyyy')",//年份
            'key': "@integer(10000, 70000)",
            'level|1': 1,//1：年 
            'children|4': [{
                'title': "@date('MM')",//月份
                'key': "@integer(10000, 70000)",
                'level|2': 1,//2：月 
                'children|4': [{
                    'key': "@integer(10000000, 70000000)",//记录的编号
                    'level|3': 1,//3：具体条目 
                    'spot': '昆明',//地点
                    'type': '@invoiceType',//票据类型
                }],
            }]
        }],
    }))
})

//票据管理--得到票据图片
app.use('/getImgsByIdAndDate', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|20': [{
            'imgId': '@integer(10000000000000, 70000000000000)',
            'originalImg': '@imgAddress',//原始凭证存储的地址
        }],
        total: 20
    }))
})

//票据管理--处理状态
app.use('/getDealingRecordByIdAndDate', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|20': [{
            'state|1-5': 1,//1:已下载 2:已记账 3:已核实 4:已完成 5:已反馈
            'dealingDate': "@date('yyyy/MM/dd H:m')",//处理时间
            'note': '@csentence()',//备注
            'handler': '@cname',//处理者姓名
        }],
        total: 20
    }))
})

//消息通知
app.use('/getMessageByAccount', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:获取成功 2：获取失败
        'data|1': [{
            'messageId': '@integer(10000, 70000)',//消息id
            'messageTitle': '@csentence()',//消息标题
            'messageContent': '@cparagraph()',//消息内容
            'receiveDate': "@date('yyyy/MM/dd H:m')",//接收时间
            'isRead|2': 1,//是否已读 1：已读 2：未读
        }],
        total: 1
    }))
})

//重置密码
app.use('/resetPassword', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:重置成功 2：重置失败
    }))
})

//重置姓名
app.use('/resetName', function (req, res) {
    res.json(Mock.mock({
        'state|1-2': 1,//1:重置成功 2：重置失败
    }))
})