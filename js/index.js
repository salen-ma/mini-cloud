(function() {
	var btns = document.querySelectorAll('.tool_left a');
	var deleteBtn = btns[4];
	var createBtn = btns[5];

	var fileTree = document.querySelector('.mini_cloud');
	var folderWrap = document.querySelector('.file_list');
	var crumbs = document.querySelector('.crumbs_wrap');
	var n = 0;

	var treeArr = [{
		floor: 0,
		name: '微云',
		id: 1,
		pId: 0,
		child: [{
			floor: 1,
			name: '前端课程',
			id: 2,
			pId: 1,
			child: [{
				floor: 2,
				name: 'JS课程',
				id: 3,
				pId: 2
			}, {
				floor: 2,
				name: 'HTML课程',
				id: 4,
				pId: 2
			}, {
				floor: 2,
				name: 'CSS课程',
				id: 5,
				pId: 2,
				child: [{
					floor: 3,
					name: '课程1',
					id: 6,
					pId: 5
				}, {
					floor: 3,
					name: '课程2',
					id: 7,
					pId: 5
				}, {
					floor: 3,
					name: '课程3',
					id: 8,
					pId: 5
				}]
			}]
		}]
	}]

	var prev = '';
	createBtn.floor = 1;
	createBtn.pId = 1;
	folderWrap.innerHTML = '';
	crumbs.innerHTML = '';
	createFolderList(folderWrap, treeArr, 1);
	createTree(fileTree, treeArr);
	createCrumbs(crumbs, treeArr, 1);

	//新建文件夹
	createBtn.onclick = function() {
		var newDir = {
			floor: this.floor,
			name: '新建文件夹',
			id: getMaxId(treeArr),
			pId: this.pId
		}
		folderWrap.innerHTML = '';

		treeArrAddData(treeArr, this.floor, this.pId, newDir);
		createTree(fileTree, treeArr);
		createFolderList(folderWrap, treeArr, this.pId);
	};

	//生成树形图
	function createTree(fileTree, data) {
		fileTree.innerHTML = '';
		data.forEach(function(item, i) {
			var li = document.createElement('li'),
				span = document.createElement('span');
			span.floor = item.floor;
			span.id = item.id;
			span.flag = false;
			if (span.id == createBtn.pId) {
				span.style.backgroundColor = '#eee';
				span.flag = true;
				prev = span;
			}
			span.onmouseover = function() {
				if (!this.flag) {
					this.style.backgroundColor = '#eee';
				}
			}
			span.onmouseout = function() {
				if (!this.flag) {
					this.style.backgroundColor = '';
				}
			}
			span.onclick = function() {
				folderWrap.innerHTML = '';
				crumbs.innerHTML = '';

				prev.style.backgroundColor = '';
				prev.flag = false;
				this.flag = true;
				this.style.backgroundColor = '#eee';
				prev = this;
				createBtn.floor = this.floor + 1;
				createBtn.pId = this.id;
				createFolderList(folderWrap, treeArr, this.id);
				createCrumbs(crumbs, treeArr, this.id)
			}
			span.innerHTML = item.name;
			span.style.paddingLeft = 44 + (item.floor + 1) * 20 + 'px';
			span.style.backgroundPositionX = (item.floor + 1) * 20 + 'px';
			li.appendChild(span);
			if (item.child) {
				span.className = 'open';
				var ul = document.createElement('ul');
				createTree(ul, item.child);
				li.appendChild(ul);
			} else {
				span.classList.add('close');
			}

			fileTree.appendChild(li);

		})

	}

	//生成文件夹
	function createFolderList(folderWrap, data, pId) {
		data.forEach(function(item, i) {
			if (item.pId == pId) {
				var li = document.createElement('li');
				var a = document.createElement('a');
				var span = document.createElement('span');
				li.className = 'file_item thumb';
				a.href = 'javascript:;';
				a.className = 'checkbox fl of';
				span.innerHTML = item.name;
				li.appendChild(a);
				li.appendChild(span);
				folderWrap.appendChild(li);
			} else {
				if (item.child) {
					createFolderList(folderWrap, item.child, pId)
				}
			}
		});
	}

	//生成面包屑
	function createCrumbs(crumbs, data, id) {
		data.forEach(function(item) {
			if (item.id == id) {
				for (var i = 0; i < item.floor; i++) {
					var a = document.createElement('a');
					a.href = 'javascript:;';
					a.className = 'fl';
					console.log(item.pId);
					console.log(crumbVal(data, item.pId));
					a.innerHTML = crumbVal(data, item.pId);
					var span = document.createElement('span');
					span.className = 'next fl ico_bg';
					crumbs.appendChild(a);
					crumbs.appendChild(span);
				}

				var lastCrumb = document.createElement('a');
				lastCrumb.href = 'javascript:;';
				lastCrumb.className = 'last_crumbs fl pr';
				lastCrumb.innerHTML = item.name;
				var bottomLine = document.createElement('span');
				bottomLine.className = 'bottom_line pa of';
				lastCrumb.appendChild(bottomLine);
				crumbs.appendChild(lastCrumb);
			} else {
				if (item.child) {
					createCrumbs(crumbs, item.child, id)
				}
			}
		})
	}

	var str;

	function crumbVal(data, pId) {
		data.forEach(function(item) {
			if (item.id == pId) {
				str = item.name;
			} else {
				if (item.child) {
					crumbVal(item.child, pId);
				}
			}
		})
		return str;
	}

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
	function treeArrAddData(data, floor, pId, newData) {
		data.forEach(function(item) {
			if (item.floor == floor - 1 && item.id == pId) {
				if (item.child) {
					item.child.push(newData);
				} else {
					item.child = [];
					item.child.push(newData);
				}
			}
			if (item.child) {
				treeArrAddData(item.child, floor, pId, newData);
			}
		})
	}

})()