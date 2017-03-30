//创建文件夹
//卡片视图
function createFilesThumb(data, id) {
    var str = '';

    for (var i = 0; i < data.length; i++) {
        str += `<li class="folder thumb" data-id="${data[i].id}" data-pid="${data[i].pId}" data-floor="${data[i].floor}">
                    <i class="icon folder-icon bg" data-id="${data[i].id}" data-floor="${data[i].floor}"></i>
                    <span class="name" data-id="${data[i].id}" data-floor="${data[i].floor}">${data[i].name}</span>
                    <input type="text" class="rename" data-id="${data[i].id}" value="${data[i].name}">
                    <a href="javascript:;" class="checkbox bg"></a>
                </li>`
    }

    return str;
}

//列表视图
function createFilesList(data, id) {
    var str = '';

    for (var i = 0; i < data.length; i++) {
        str += `<li class="folder list" data-id="${data[i].id}" data-pid="${data[i].pId}" data-floor="${data[i].floor}">
                    <a href="javascript:;" class="checkbox bg"></a>
                    <i class="icon folder-icon bg" data-id="${data[i].id}" data-floor="${data[i].floor}"></i>
                    <span class="name" data-id="${data[i].id}" data-floor="${data[i].floor}">${data[i].name}</span>
                    <input type="text" class="rename" data-id="${data[i].id}" value="${data[i].name}">
                    <div class="fn-btn">
                        <i class="icon fn-icon share-icon bg" data-id="${data[i].id}"></i>
                        <i class="icon fn-icon down-icon bg" data-id="${data[i].id}"></i>
                        <i class="icon fn-icon move-icon bg" data-id="${data[i].id}"></i>
                        <i class="icon fn-icon delete-icon bg" data-id="${data[i].id}"></i>
                        <i class="icon fn-icon rename-icon bg" data-id="${data[i].id}"></i>             
                    </div>
                    <time>${data[i].time}</time>                    
                </li>`
    }
    return str;
}
