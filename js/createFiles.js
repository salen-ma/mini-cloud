//创建文件夹
//卡片视图
function createFilesThumb(data, id) {
    var str = '';

    for (var i = 0; i < data.length; i++) {
        str += `<li class="thumb" data-id="${data[i].id}" data-pid="${data[i].pId}" data-floor="${data[i].floor}">
                    <i class="icon bg" data-id="${data[i].id}" data-floor="${data[i].floor}"></i>
                    <span class="name" data-id="${data[i].id}" data-floor="${data[i].floor}">${data[i].name}</span>
                    <input type="text" class="rename" value="${data[i].name}">
                    <a href="javascript:;" class="checkbox bg"></a>
                </li>`
    }

    return str;
}

//列表视图
function createFilesList(data, id) {
    var str = '';

    for (var i = 0; i < data.length; i++) {
        str += `<li class="list" data-id="${data[i].id}" data-pid="${data[i].pId}" data-floor="${data[i].floor}">
                    <a href="javascript:;" class="checkbox bg"></a>
                    <i class="icon bg" data-id="${data[i].id}" data-floor="${data[i].floor}"></i>
                    <span class="name" data-id="${data[i].id}" data-floor="${data[i].floor}">${data[i].name}</span>
                    <input type="text" class="rename" value="${data[i].name}">
                    <div class="fn-btn">
                        <i class="icon share-icon bg"></i>
                        <i class="icon down-icon bg"></i>
                        <i class="icon move-icon bg"></i>
                        <i class="icon delete-icon bg"></i>
                        <i class="icon rename-icon bg"></i>             
                    </div>
                    <time>2017-3-21 15:50</time>                    
                </li>`
    }
    return str;
}
