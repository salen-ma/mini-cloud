//重命名
reNameBtn.addEventListener('click',function(){
	var index = getTargetIndex();
	var span = null;
	var input = null;	
	if(currentView === 'thumb'){
		span = currentFiles[index].children[1];
		input = currentFiles[index].children[2];
	}else{
		span = currentFiles[index].children[2];
		input = currentFiles[index].children[3];
	}	
	span.classList.add('active');
	input.classList.add('active');
	input.select();
	var nowVal = input.value;

	input.onblur = function(){
		var newVal = input.value;
		//取消新建
		if(newVal === '' || newVal === nowVal){
			span.classList.remove('active');
			input.classList.remove('active');			
			return;
		}else{
			//命名冲突
			if(!canUseName(currentData,newVal)){
				input.focus();
				input.value = '';
			}else{
				//改变数据，渲染新文件夹
				targetFolderData = currentData[index];	
    			targetFolderData.name = newVal;		
				view(currentId);
			}
		}		
	}
});

//删除文件夹
deleteBtn.addEventListener('click', function() {
	deleteCheckedData();
    //重新渲染
    view(currentId);
});

//----------------------------------------------------------------------------------------
//获取目标索引
function getTargetIndex(){
	var count = 0;
	for(var i=0; i<currentData.length; i++){
		if (currentData[i].checked) {
			count++;
			if(count = 1){
				return i;
				break;
			}
        }		
	}	
};

//删除/获取被选中的数据
function deleteCheckedData(){
	var checkedData = [];
	for(var i=0; i<currentData.length; i++){
		if (currentData[i].checked) {
            checkedData = checkedData.concat(currentData.splice(i, 1));
            i--;
        }		
	}	
	return checkedData;
};
