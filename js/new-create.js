//新建文件夹
createNewFolder.addEventListener('click',function(){
	newFolder();
	nameFolder();
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
	if(currentView === 'thumb'){
		folderWrap.firstElementChild.children[1].focus();
	}else{
		folderWrap.firstElementChild.children[2].focus();
	}
}
//为新文件夹命名
function nameFolder(){
	var input = null;
	if(currentView === 'thumb'){
		input = folderWrap.firstElementChild.children[1];
	}else{
		input = folderWrap.firstElementChild.children[2];
	}	
	input.onblur = function(){
		var val = input.value;
		//取消新建
		if(val === ''){
			folderWrap.removeChild(folderWrap.firstElementChild);
			return;
		}else{
			//命名冲突
			if(!canUseName(currentData,val)){
				input.focus();
				input.value = '';
			}else{
				//生成数据，渲染新文件夹
				var newFolderData = {
					name:val,
					floor:currentFloor*1 + 1,
					id:getMaxId(),
					pId:currentId,
					type: 'folder',
					checked:false,
					child: []					
				}
				currentData.unshift(newFolderData);
				view(currentId);
			}
		}
	}; 
};

function canUseName(data,val){
	for (var i = 0; i < data.length; i++) {
		if (val === data[i].name) {
			return false;
		};
	};	
	return true;
}

function getMaxId() {
	return ++data[0].maxId;
}