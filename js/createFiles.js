function createFiles(data, id) {
    var nodes = [];
    if (!data) {
        return nodes;
    }
    for (var i = 0; i < data.length; i++) {
        // 创建文件的最外层结构
        var file = document.createElement('li');
        file.className = 'file_item thumb';

        // 创建自定义勾选框
        var fileCheckbox = document.createElement('a');
        fileCheckbox.className = 'checkbox fl of';
        fileCheckbox.href = 'javascript:;';

        // 创建文件的名字和修改名字的文本框
        var fileName = document.createElement('span');
        fileName.innerHTML = data[i].name;

        var fileChangeName = document.createElement('input');
        fileChangeName.className = 'file-change-name';
        fileChangeName.type = 'text';

        // 将创建好的文件节点全部放入父级
        file.appendChild(fileCheckbox);
        file.appendChild(fileName);
        file.appendChild(fileChangeName);

        nodes.push(file);
    }

    return nodes;
}