//创建文件夹
function createFiles(data, id) {
    fq.animate(alertBox, {
        top: -50
    }, 200);
    stopCreate = false;
    var str = '';
    //若无data则为空
    if (!data) {
        return str;
    }

    for (var i = 0; i < data.length; i++) {
        str += `<li class="file_item thumb" data-id=${data[i].id} data-pId=${data[i].pId} data-floor="${data[i].floor + 1}">
                        <a href="javascript:;" class="checkbox fl of"></a>
                        <span class="file-name">${data[i].name}</span>
                        <input type="text" class="file-change-name" value="${data[i].name}">
                    </li>`
    }

    return str;
}

//选中和全选
function fileCheck() {
    //全选框
    var checkAll = crumbs.firstElementChild;
    //全部文件夹
    var files = folderWrap.children;
    var n = 0;

    Array.from(files).forEach(function(item) {
        item.firstElementChild.flag = true;
        item.firstElementChild.onclick = function(event) {
            this.classList.toggle('active');
            this.parentNode.classList.toggle('active');

            if (item.firstElementChild.flag) {
                n++;
            } else {
                n--;
            };
            if (n == files.length) {
                checkAll.classList.add('active');
                checkAll.flag = false;
            } else {
                checkAll.classList.remove('active');
                checkAll.flag = true;
            };
            item.firstElementChild.flag = !item.firstElementChild.flag;
            event.stopPropagation(); //阻止事件冒泡,点击时不触发父元素事件
        };
        //点击文件夹进入
        item.onclick = function() {
            createFolderList(data, this.dataset.id);
            createCrumbs(crumbs, data, this.dataset.id);
            createBtn.pId = this.dataset.id;
            createBtn.floor = Number.parseInt(this.dataset.floor);
            createTree(fileTree, data);
        };
    });

    if (checkAll) {
        checkAll.flag = true;
        checkAll.classList.remove('active');
        checkAll.onclick = function() {

            checkAll.classList.toggle('active');
            Array.from(files).forEach(function(item) {
                if (checkAll.flag) {
                    item.classList.add('active');
                    item.firstElementChild.classList.add('active');
                    n = files.length;
                    item.flag = false;
                } else {
                    item.classList.remove('active');
                    item.firstElementChild.classList.remove('active');
                    n = 0;
                    item.flag = true;
                };
            });
            checkAll.flag = !checkAll.flag;

        }
    }
}

//删除文件夹
deleteBtn.addEventListener('click', function() {
    var files = folderWrap.children;
    Array.from(files).forEach(function(item) {
        //找到被选中的文件夹
        if (item.classList.contains('active')) {
            //找到对应的数据
            var parent = cloud.getDataById(data, item.dataset.pid);
            var child = cloud.getDataById(data, item.dataset.id);
            //删除数据
            parent.child.splice(parent.child.indexOf(child), 1);
            //根据新数据重新生成文件夹数
            createTree(fileTree, data);
            //删除该文件夹
            folderWrap.removeChild(item);
        }
    });
    //选择函数
    fileCheck();
});