//移动文件
moveBtn.addEventListener('click',function(){
	var targetId = currentId;
	var targetFloor = currentFloor;

	//渲染移动菜单
	mask.style.display = 'block';
	checkedFileName.innerHTML = currentData[getTargetIndex()].name;
	checkedCount.innerHTML = countChecked() > 1 ? `等${countChecked()}个文件` : '';
	moveList.innerHTML = createTree(data);

	//选择目标文件夹
	var spans = moveList.querySelectorAll('span');
	for(var i=0; i<spans.length; i++){
		spans[i].classList.remove('active');
		spans[i].flag = true;

		spans[i].onmouseover = function(){
			this.classList.add('active');
		}
		spans[i].onmouseout = function(){
			if(this.flag){
				this.classList.remove('active');
			}
		}

		spans[i].onclick = function(){
			for(var i=0; i<spans.length; i++){
				spans[i].classList.remove('active');
				spans[i].flag = true;
			}
			this.classList.add('active');
			this.flag = false;
			targetId = this.dataset.id;
			targetFloor = this.dataset.floor;
			moveToTarget.innerHTML = `移动到: ${this.dataset.name}`;
			if(targetId == currentId){
				alertBox.innerHTML = '已经在该文件夹内';
				showAlertBox();
			}else if(!canMove(targetId)){
				alertBox.innerHTML = '不能移动到自身或自身的子文件夹内';
				showAlertBox();			
			}			
		}				
	}

	sureMove.addEventListener('click',function(){
		if(targetId == currentId){
			alertBox.innerHTML = '已经在该文件夹内';
			showAlertBox();
		}else if(!canMove(targetId)){
			alertBox.innerHTML = '不能移动到自身或自身的子文件夹内';
			showAlertBox();	
		}else{
			var beforeMoveData = cloud.getChildrenById(data,targetId);
			var targetSameNameData = getSameNameData(targetId).targetSameNameData;
			var checkedSameNameData = getSameNameData(targetId).checkedSameNameData;

			if(targetSameNameData.length){
				nameRepeatMenu.style.display = 'block';
			
				cover.addEventListener('click',function(){
					//覆盖重名文件
					coverSameNameFolder(targetSameNameData,beforeMoveData);	
					changePidFloor(targetId,targetFloor);
					var afterMoveData = beforeMoveData.concat(deleteCheckedData());
					cloud.getDataById(data,targetId).child = afterMoveData;
					view(currentId);
					mask.style.display = '';								
				});
				overName.addEventListener('click',function(){
					//重命名重名文件
					renameSameNameFolder(checkedSameNameData,currentData);	
					changePidFloor(targetId,targetFloor);
					var afterMoveData = beforeMoveData.concat(deleteCheckedData());
					cloud.getDataById(data,targetId).child = afterMoveData;
					view(currentId);
					mask.style.display = '';								
				});
				cancel.addEventListener('click',function(){
					nameRepeatMenu.style.display = '';			
				});
			}else{
				changePidFloor(targetId,targetFloor);
				var afterMoveData = beforeMoveData.concat(deleteCheckedData());
				cloud.getDataById(data,targetId).child = afterMoveData;
				view(currentId);
				mask.style.display = '';
			}
		}
	});

	cancelMove.addEventListener('click',function(){
		mask.style.display = '';
	});
	closeMask.addEventListener('click',function(){
		mask.style.display = '';
	});
});

//------------------------------------------------------------------------------------
//获取被选中的id
function getCheckedId(){
	var checkedFolderId = [];
	for(var i=0; i<currentData.length; i++){
		if (currentData[i].checked) {
            checkedFolderId.push(currentData[i].id);
        }		
	}	
	return checkedFolderId;	
}

//判断是否是子文件夹
function isChildFolder(thisId,childId){
	var arr = cloud.getParentsById(data,childId);
	for(var i=0; i<arr.length; i++){
		if(arr[i].pId == thisId){
			return true;
		}
	}
	return false;
}

//判断能否移动
function canMove(id){
	var arr = getCheckedId();
	for(var i=0; i<arr.length; i++){
		if(isChildFolder(arr[i],id) || id == arr[i]){
			return false;
		}
	}	
	return true;
}

//获取重名文件的数据
function getSameNameData(id){
	var obj = {};
	var checkedFolderName = [];
	var targetFolderName = [];

	var checkedFolderData = [];
	var targetData = cloud.getChildrenById(data,id);
	//获得选中的名字
	for(var i=0; i<currentData.length; i++){
		if (currentData[i].checked) {
            checkedFolderName.push(currentData[i].name);
            checkedFolderData.push(currentData[i]);
        }		
	}
	//获得目标文件夹内的名字
	for(var i=0; i<targetData.length; i++){
        targetFolderName.push(targetData[i].name);	
	};
	//获取选中文件重名的数据--改名用
	obj.checkedSameNameData = checkedFolderData.filter(function(item){
		for(var i=0; i<targetFolderName.length; i++){
			if(item.name == targetFolderName[i]){
				return item;
			}
		}		
	});

	//获得目标文件夹重名的数据--覆盖用
	obj.targetSameNameData = targetData.filter(function(item){
		for(var i=0; i<checkedFolderName.length; i++){
			if(item.name == checkedFolderName[i]){
				return item;
			}
		}
	});	
	return obj;
};

//覆盖重名文件
function coverSameNameFolder(sameNameData,data){
	for(var i=0; i<sameNameData.length; i++){
		data.splice(data.indexOf(sameNameData[i]),1);
	}
}

//改名重名文件
function renameSameNameFolder(sameNameData,data){
	for(var i=0; i<sameNameData.length; i++){
		data[data.indexOf(sameNameData[i])].name = data[data.indexOf(sameNameData[i])].name + '(2)';
	}
}


//移动成功后改变被移动文件夹的pid,floor
function changePidFloor(id,floor){
	for(var i=0; i<currentData.length; i++){
		if (currentData[i].checked) {
            currentData[i].pId = id*1;
            currentData[i].floor = floor*1 + 1;
        }		
	}	
}

//显示提示信息
function showAlertBox(){
	fq.animation(alertBox,{bottom:0},function(){
		setTimeout(function(){
			fq.animation(alertBox,{bottom:-60})
		},500)	
	});	
}
