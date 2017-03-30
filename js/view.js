view(currentId,currentSort);

//生成视图
function view(currentId,sortType){
	//排序
	cancelChecked();
	currentData = cloud.getChildrenById(data, currentId)
	cloud._sort(currentData,sortType);
	createFolderList(currentData, currentId);
	currentFiles = folderWrap.querySelectorAll('li');
	createCrumbsView(data, currentId);
	createTreeView(data,currentId);
};

//--------------------------------------------------------------------------------------
//生成文件列表函数
function createFolderList(data, id) {
	var strs = '';
	if(currentView === 'thumb'){
		strs = createFilesThumb(data, id);
	}else if(currentView === 'list'){
		strs = createFilesList(data, id);
	}
	folderWrap.innerHTML = strs;
};

//生成文件树函数
function createTreeView(data,id){
	fileTree.innerHTML = createTree(data,id);
};

//生成面包屑函数
function createCrumbsView(data, id) {
	var datas = cloud.getParentsById(data, id).reverse();
	var strs = createCrumbs(datas,id);

	crumbs.innerHTML = strs;
};

//切换视图
//卡片视图
viewThumb.addEventListener('click',function(){
	currentView = 'thumb';
	viewTag();
});
//列表视图
viewList.addEventListener('click',function(){
	currentView = 'list';
	viewTag();
});

function viewTag(){
	if(currentView === 'thumb'){
		folderWrap.classList.add('thumb-view');
		viewThumb.classList.add('active');
		viewList.classList.remove('active');		
	}else{
		folderWrap.classList.remove('thumb-view');
		viewList.classList.add('active');
		viewThumb.classList.remove('active');		
	}
	view(currentId);
};

//切换排序方式
//按时间排序
timeSort.addEventListener('click',function(){
	currentSort = 'time';
	timeSort.classList.add('active');
	letterSort.classList.remove('active');
	view(currentId,currentSort);
});
//按首字母排序
letterSort.addEventListener('click',function(){
	currentSort = 'letter';
	letterSort.classList.add('active');
	timeSort.classList.remove('active');
	view(currentId,currentSort);
});

//显示提示框
function showMainAlertBox(type,info){
	mainAlertBox.className = 'alert-box ' + type;
	mainAlertBox.firstElementChild.innerHTML = info;
	fq.css(mainAlertBox,{'left':(document.body.clientWidth/2) - (fq.css(mainAlertBox,'width')/2)});
	fq.animation(mainAlertBox,{top:10},function(){
		fq.animation(mainAlertBox,{top:-40})
	});
};
