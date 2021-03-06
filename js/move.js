//移动文件
moveBtn.addEventListener('click',function(){
	moveFolder(getCheckedFolderData());
});

//拖拽移动菜单
fq.drapEle(menuHead,moveMenu,true);

//------------------------------------------------------------------------------------
//移动文件函数
function moveFolder(moveData){
	if(currentId == 0 && countChecked() == currentFiles.length){
		showMainAlertBox('warn','没有可移动到的文件夹');
		return;
	};

	var targetId = currentId;
	var targetFloor = currentFloor;		

	//渲染移动菜单
	mask.style.display = 'block';
	moveMenu.style.display = 'block';
	checkedFileName.innerHTML = moveData[0].name;
	checkedCount.innerHTML = moveData.length > 1 ? `等${moveData.length}个文件` : '';
	moveList.innerHTML = createTree(data,targetId);

	//选择要移动到的目标文件夹
	moveList.onclick = function(e){
		var target = e.target;
		if(target.nodeName.toUpperCase() === 'SPAN' || target.nodeName.toUpperCase() === 'I'){
			targetId = target.dataset.id;
			targetFloor = target.dataset.floor;
			moveToTarget.innerHTML = `移动到: ${target.dataset.name}`;
			moveList.innerHTML = createTree(data,targetId);

			if(targetId == currentId){
				moveAlertBox.innerHTML = '已经在该文件夹内';
				showMoveAlertBox();
			}			
		}					
	};

	//确定移动
	sureMove.onclick = function(){
		if(targetId == currentId){
			moveAlertBox.innerHTML = '已经在该文件夹内';
			showMoveAlertBox();
		}else{
			//移动前目标文件夹数据
			var beforeMoveData = cloud.getChildrenById(data,targetId);
			//重名的目标文件夹数据
			var targetSameNameData = getSameNameData(targetId,moveData).targetSameNameData;
			//重名的选择文件夹数据
			var checkedSameNameData = getSameNameData(targetId,moveData).checkedSameNameData;

			if(targetSameNameData.length){
				nameRepeatMenu.style.display = 'block';

				cover.onclick = function(){
					//覆盖重名文件
					coverSameNameFolder(targetSameNameData,beforeMoveData);	
					nameRepeatMenu.style.display = '';	
					moveDown(targetId);					
				}

				overName.onclick = function(){
					//重命名重名文件
					renameSameNameFolder(checkedSameNameData,currentData,sameNameCount(targetSameNameData,beforeMoveData));	
					nameRepeatMenu.style.display = '';	
					moveDown(targetId);					
				}

				cancel.onclick = function(){
					nameRepeatMenu.style.display = '';					
				}
			}else{
				moveDown(targetId);
			}
		}
		//移动成功
		function moveDown(targetId){
			changePidFloor(moveData,targetId,targetFloor);
			var afterMoveData = beforeMoveData.concat(moveData);
			deleteMoveData(moveData);
			cloud.getDataById(data,targetId).child = afterMoveData;
			currentId = targetId;

			//重新渲染
			view(currentId,currentSort);
			mask.style.display = '';	
			moveMenu.style.display = '';
			showMainAlertBox('success','移动成功');		
		};	
	}

	//取消/关闭移动
	cancelMove.addEventListener('click',function(){
		mask.style.display = '';
		moveMenu.style.display = '';
	});
	closeMask.addEventListener('click',function(){
		mask.style.display = '';
		moveMenu.style.display = '';
	});	
}

//------------------------------------------------------------------------------------
//获取被选中的数据
function getCheckedFolderData(){
	var checkedFolderData = [];
	for(var i=0; i<currentData.length; i++){
		if (currentData[i].checked) {
	        checkedFolderData.push(currentData[i]);
	    }		
	}
	return checkedFolderData;
}

//删除移动走的数据
function deleteMoveData(moveData){
	for(var i=0; i<moveData.length; i++){
		currentData.splice(currentData.indexOf(moveData[i]),1)	
	}	
};

//获取重名文件的数据
function getSameNameData(id,moveData){
	var obj = {};
	var checkedFolderName = [];
	var targetFolderName = [];

	var targetData = cloud.getChildrenById(data,id);
	
	//获得要移动文件的名字
	for(var i=0; i<moveData.length; i++){
        checkedFolderName.push(moveData[i].name);	
	};	

	//获得目标文件夹内的名字
	for(var i=0; i<targetData.length; i++){
        targetFolderName.push(targetData[i].name);	
	};

	//获取选中文件重名的数据--改名用
	obj.checkedSameNameData = moveData.filter(function(item){
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
};


//计数历史重名数量
function sameNameCount(sameNameData,data){
	var num = [];
	for(var i=0; i<sameNameData.length; i++){
		num.push(++(data[data.indexOf(sameNameData[i])].repeatNum));
	}
	return num;
};

//改名重名文件
function renameSameNameFolder(sameNameData,data,repeatCount){
	for(var i=0; i<sameNameData.length; i++){
		data[data.indexOf(sameNameData[i])].name = data[data.indexOf(sameNameData[i])].name + `(${repeatCount[i]})`;
	}
};


//移动成功后改变被移动文件夹的pid,floor
function changePidFloor(data,id,floor){
	for(var i=0; i<data.length; i++){
        data[i].pId = id*1;
        data[i].floor = floor*1 + 1;	
	}	
};

//显示提示信息
function showMoveAlertBox(){
	fq.animation(moveAlertBox,{bottom:0},function(){
		setTimeout(function(){
			fq.animation(moveAlertBox,{bottom:-60})
		},500)	
	});	
};
