var cloud = {};

//通过指定id找到对应的数据
cloud.getDataById = function(data, id) {
	var item = null;
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			item = data[i];
			break;
		}
		if (!item && data[i].child) {
			item = this.getDataById(data[i].child, id);
		}
	}
	return item;
}

//通过id获取到该id数据下的所有子集
cloud.getChildrenById = function(data, id) {
	if (this.getDataById(data, id)) {
		return this.getDataById(data, id).child;
	}
}

//通过指定的id获取到自己，以及自己所有的父级
cloud.getParentsById = function(data, id) {
	var items = [];

	var current = this.getDataById(data, id);
	if (current) {
		items.push(current);
		items = items.concat(this.getParentsById(data, current.pId));
	}

	return items;
}

//关联面包屑导航与其他
function curmbNav() {
	//所有面包屑
	var crumbBtns = crumbs.querySelectorAll('a');
	for (var i = 1; i < crumbBtns.length; i++) {
		crumbBtns[i].onclick = function() {
			createBtn.pId = this.dataset.id;
			createBtn.floor = Number.parseInt(this.dataset.floor);
			createFolderList(Data.files, this.dataset.id);
			createCrumbs(crumbs, Data.files, this.dataset.id);
			curmbNav()
			createTree(fileTree, data);
		}
	}
}