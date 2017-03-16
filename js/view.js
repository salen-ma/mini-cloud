//生成文件夹
createFolderList(data, 0);

//生成左侧树状菜单
createTree(fileTree, data);

//生成面包屑导航
createCrumbs(crumbs, data, 0);

//生成文件列表
function createFolderList(data, id) {
	var datas = cloud.getChildrenById(data, id);
	var strs = createFiles(datas, id);

	folderWrap.innerHTML = strs;
	fileCheck();
}

//新建数据
createBtn.onclick = function() {
	if (stopCreate) {
		return;
	}
	var newDir = {
		floor: this.floor,
		name: '',
		id: getMaxId(data),
		pId: this.pId,
		type: 'folder',
		child: []
	}
	addNewData(data, this.pId, newDir);
	createTree(fileTree, data);
	createFolderList(data, this.pId);
	fileCheck();

	//当前所有子元素
	var currentChildren = cloud.getChildrenById(data, this.pId);
	//新建的文件夹
	var newFile = folderWrap.firstElementChild;
	//名字框
	var nameSpan = newFile.children[1];
	//命名框
	var reNameInput = newFile.lastElementChild;

	nameSpan.classList.add('active'); //隐藏
	reNameInput.classList.add('active'); //显示
	reNameInput.focus();

	//命名
	//阻止事件冒泡,点击时不触发父元素事件
	reNameInput.onclick = function(event) {
			event.stopPropagation();
		}
		//再次命名时让警告框隐藏
	reNameInput.oninput = function() {
			fq.animate(alertBox, {
				top: -50
			}, 200);
			stopCreate = false;
		}
		//命名框失去焦点时，若命名为空则不新建，若有重名则弹出警告框，终止函数，若没有则命名成功
	reNameInput.onblur = function() {
		if (reNameInput.value === '') {
			removeNewData(data, newDir.pId);
			createFolderList(data, newDir.pId);
			createTree(fileTree, data);
			return;
		}
		for (var i = 0; i < currentChildren.length; i++) {
			if (reNameInput.value === currentChildren[i].name) {
				reNameInput.value = '';
				reNameInput.focus();
				fq.animate(alertBox, {
					top: 15
				}, 200);
				stopCreate = true;
				return;
				break;
			}
		}
		newDir.name = reNameInput.value;
		nameSpan.innerHTML = reNameInput.value;
		nameSpan.classList.remove('active');
		reNameInput.classList.remove('active');
		createTree(fileTree, data);
	}
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
function addNewData(data, pId, newData) {
	//获取到要添加数据的父级
	var parent = cloud.getDataById(data, pId);
	//若其有子级则将新数据添加到子级前面
	if (parent.child) {
		parent.child.unshift(newData);
		//若没有则创建一个再添加
	}
}

//从数据中删除新数据
function removeNewData(data, pId) {
	//获取到要添加数据的父级
	var parent = cloud.getDataById(data, pId);
	//将第一条数据删去
	parent.child.shift();
}