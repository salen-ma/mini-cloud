createFolderList(data, 0);
//生成左侧树状菜单
createTree(fileTree, data);

//生成文件列表
function createFolderList(data, id) {
	folderWrap.innerHTML = '';
	var datas = cloud.getChildrenById(data, id);
	var strs = createFiles(datas, id);

	folderWrap.innerHTML = strs;
	fileCheck();
}

//生成面包屑导航
createCrumbs(crumbs, data, 0);

//新建数据
createBtn.onclick = function() {
	var newDir = {
		floor: this.floor,
		name: '新建文件夹',
		id: getMaxId(data),
		pId: this.pId,
		type: 'folder'
	}
	console.log(newDir);
	treeArrAddData(data, this.pId, newDir);
	createTree(fileTree, data);
	createFolderList(data, this.pId);
	fileCheck();
};

//id加1
function getMaxId(data) {

	data.forEach(function(item) {
		if (n < item.id) {
			n = item.id;
		}
		if (item.child) {
			getMaxId(item.child)
		}
	});
	return n + 1;
}

//向数据中添加新数据
function treeArrAddData(data, pId, newData) {
	data.forEach(function(item) {
		if (item.id == pId) {
			if (item.child) {
				item.child.push(newData);
			} else {
				item.child = [];
				item.child.push(newData);
			}
		}
		if (item.child) {
			treeArrAddData(item.child, pId, newData);
		}
	})
}