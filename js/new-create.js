//新建文件夹
createNewFolder.canCreate = true;
createNewFolder.addEventListener('click',function(){
	if(!this.canCreate){
		return;
	}

	newFolder();
	nameFolder(this);
});

//新文件夹
function newFolder(){
	var str = '';
	if(currentView === 'thumb'){
		str = `<li class="file thumb">
                    <i class="icon bg"></i>
                    <input type="text" class="rename active">
                    <a href="javascript:;" class="checkbox"></a>
                </li>`
    }else if(currentView === 'list'){
    	str = `<li class="file list">
					<a href="javascript:;" class="checkbox bg"></a>
                    <i class="icon bg"></i>
                    <input type="text" class="rename active">
                </li>`
    }
	folderWrap.innerHTML = str + folderWrap.innerHTML;

	//不同视图行为
	if(currentView === 'thumb'){
		folderWrap.firstElementChild.children[1].focus();
	}else{
		folderWrap.firstElementChild.children[2].focus();
	}
}
//为新文件夹命名
function nameFolder(obj){
	var input = null;
	if(currentView === 'thumb'){
		input = folderWrap.firstElementChild.children[1];
	}else{
		input = folderWrap.firstElementChild.children[2];
	}	
	input.onblur = function(){
		var val = input.value.trim();
		//取消新建
		if(val === ''){
			folderWrap.removeChild(folderWrap.firstElementChild);
			view(currentId);
			obj.canCreate = true;
			showMainAlertBox('warn','取消新建');
			return;
		}else{
			//命名冲突
			if(!canUseName(currentData,val)){
				input.focus();
				input.value = '';
				obj.canCreate = false;
				showMainAlertBox('warn','命名冲突');
			}else{
				//生成数据，渲染新文件夹
				var newFolderData = {
					name:val,
					repeatNum:1,
					floor:currentFloor*1 + 1,
					id:getMaxId(),
					pId:currentId,
					time:cloud.getNowTime(),
					timeStamp:Date.now(),					
					type: 'folder',
					checked:false,
					child: []					
				}

				currentData.unshift(newFolderData);
				view(currentId,currentSort);
				obj.canCreate = true;
				showMainAlertBox('success','新建成功');
			}
		}
	}; 
};

//判断是否重名
function canUseName(data,val){
	for (var i = 0; i < data.length; i++) {
		if (val === data[i].name) {
			return false;
		};
	};	
	return true;
};

//id加1
function getMaxId() {
	return ++data[0].maxId;
};