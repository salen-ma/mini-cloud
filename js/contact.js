fileTree.addEventListener('click',function(e){
	var target = e.target;
	//点击文件树进入
	if(target.nodeName.toUpperCase() === 'SPAN' || target.nodeName.toUpperCase() === 'I'){
		if(target.dataset.id == currentId){
			return;
		};
		currentId = target.dataset.id;
		currentFloor = target.dataset.floor;
		view(currentId);
	}
});

crumbs.addEventListener('click',function(e){
	var target = e.target;
	//点击面包屑进入
	if(target.nodeName.toUpperCase() === 'A' && !target.classList.contains('checkbox')){
		if(target.dataset.id == currentId){
			return;
		};
		currentId = target.dataset.id;
		currentFloor = target.dataset.floor;
		view(currentId);
	}
});

folderWrap.addEventListener('click',function(e){
	var target = e.target;
	//点击文件夹进入
	if(target.nodeName.toUpperCase() === 'LI' || target.nodeName.toUpperCase() === 'SPAN' || target.nodeName.toUpperCase() === 'I'){
		if(target.dataset.id == currentId){
			return;
		};
		currentId = target.dataset.id;
		currentFloor = target.dataset.floor;
		view(currentId);
	}

	//选择文件夹
	if(target.classList.contains('checkbox')){
		target.parentNode.classList.toggle('checked');
		isFolderChecked(target.parentNode,target.parentNode.dataset.id);
		if(isAllChecked()){
			checkAll.classList.add('checked');
		}else{
			checkAll.classList.remove('checked');
		}
		headTag();
	}
});

//文件夹是否选中
function isFolderChecked(ele,id){
	if(ele.classList.contains('checked')){
		cloud.getDataById(currentData,id).checked = true;
	}else{
		cloud.getDataById(currentData,id).checked = false;
	}
}

//全选
checkAll.addEventListener('click',function(){
	this.classList.toggle('checked');
	if(this.classList.contains('checked')){
		for(var i=0; i<currentFiles.length; i++){
			currentFiles[i].classList.add('checked');
			currentData[i].checked = true;
		}		
	}else{
		for(var i=0; i<currentFiles.length; i++){
			currentFiles[i].classList.remove('checked');
			currentData[i].checked = false;
		}		
	}
	headTag();
});

//是否全选
function isAllChecked(){
	for(var i=0; i<currentData.length; i++){
		if(!currentData[i].checked){
			return false;
		}
	}
	return true;
}

//选中计数
function countChecked(){
	var count = 0;
	for(var i=0; i<currentData.length; i++){
		if(currentData[i].checked){
			count++;
		}
	}	
	return count;
}

//头部行为
function headTag(){
	if(countChecked()){
		selectSum.innerHTML = `选择了${countChecked()}项`;
		initHead.classList.add('active');
		checkedHead.classList.add('active');
	}else{
		initHead.classList.remove('active');
		checkedHead.classList.remove('active');		
	}
}

cancelSelect.addEventListener('click',cancelChecked);

//取消选择
function cancelChecked(){
	for(var i=0; i<currentFiles.length; i++){
		currentFiles[i].classList.remove('checked');
		currentData[i].checked = false;
	};
	checkAll.classList.remove('checked');
	headTag();	
};