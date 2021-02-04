export function getFile(url){
    let filePath = '/static/treaty.txt';
    let xhr = null, okStatus = document.location.protocol === 'file' ? 0 : 200
         xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')      
         xhr.open('GET', filePath, false)
         xhr.overrideMimeType('text/html;charset=utf-8')
         xhr.send(null)
    let message = xhr.status === okStatus ? xhr.responseText : null;
    return message;
}