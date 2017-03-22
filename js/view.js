view(currentId);

//生成视图
function view(currentId){
	currentData = createFolderList(data, currentId);
	currentFiles = folderWrap.children;
	createCrumbsView(data, currentId);
	createTreeView(data);
	cancelChecked();
}

//--------------------------------------------------------------------------------------
//生成文件列表函数
function createFolderList(data, id) {
	var datas = cloud.getChildrenById(data, id);
	var strs = '';
	if(currentView === 'thumb'){
		strs = createFilesThumb(datas, id);
	}else if(currentView === 'list'){
		strs = createFilesList(datas, id);
	}
	folderWrap.innerHTML = strs;
	return datas;
}

//生成文件树函数
function createTreeView(data){
	fileTree.innerHTML = createTree(data);
}

//生成面包屑函数
function createCrumbsView(data, id) {
	var datas = cloud.getParentsById(data, id).reverse();
	var strs = createCrumbs(datas,id);

	crumbs.innerHTML = strs;
}

//切换视图
viewThumb.addEventListener('click',function(){
	currentView = 'thumb';
	viewTag();
});

viewList.addEventListener('click',function(){
	currentView = 'list';
	viewTag();
})

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
	currentData = createFolderList(data, currentId);
}