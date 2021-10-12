/**
 * 标准时间字符串转换成自定义字符串
 * @param {*} fmt 
 * @param {*} date 
 * @returns 
 */
export function dateFormat(fmt, date) {
    let ret = "";
    date = new Date(date);
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(
                ret[1],
                ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
            );
        }
    }
    return fmt;
}

/**
 * 更改移动端状态栏字体颜色
 * @param {*} style 
 * @returns 
 */
export function plusReady(style = 'dark') {
    var type = plus.os.name;
    if (type == "iOS") {
        //do Something
        plus.navigator.setStatusBarStyle(style);
    } else {
        //do Something
        plus.navigator.setStatusBarStyle(style);
    }
}