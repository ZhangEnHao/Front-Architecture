import axios from 'axios'
// 导出Excel公用方法
export function exportMethod({ url, data, method, params }) {
    axios({
        method,
        url,
        data,
        params,
        responseType: 'blob',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => {
        const link = document.createElement('a')
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)

        // link.download = res.headers['content-disposition'].match(/filename="(\S*)\.xls"/)[1] //下载后文件名
        link.download = data.fileName //下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }).catch(error => {
        console.log(error)
    })
}
