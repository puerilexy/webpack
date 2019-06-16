let name = 'zs';
console.log(name);

import 'indSass';
import '../css/iconfont.css';

function ajax(url, query) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        url = query ? `${url}?${query}` : url;

        xhr.open('get', url);

        xhr.send(null);

        xhr.onreadystatechange = () => {
            if(xhr.readyState != 4) return;
            if(xhr.status === 200){
                resolve(xhr.responseText);
            }else{
                reject(new Error('error'))
            }
        }
    })
}

ajax('/api/getList').then((res) => {
    console.log(res);
},(error) => {
    console.log(error);
})