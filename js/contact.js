//文件树点击事件
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

//面包屑导航点击事件
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

//文件夹点击事件
folderWrap.addEventListener('click',function(e){
	var target = e.target;
	//点击文件夹进入
	if(target.classList.contains('folder') || target.classList.contains('folder-icon')){
		if(target.dataset.id == currentId){
			return;
		};
		currentId = target.dataset.id;
		currentFloor = target.dataset.floor;
		view(currentId);
	}

	//点击重命名
	if(target.classList.contains('name')){
		var span = target;
		var input = target.nextElementSibling;		
		rename(span,input);
	}

	if(target.classList.contains('rename-icon')){
		var input = target.parentNode.previousElementSibling;
		var span = input.previousElementSibling;		
		rename(span,input);
	}	

	//点击删除
	if(target.classList.contains('delete-icon')){
		currentData.splice(currentData.indexOf(cloud.getDataById(currentData,target.dataset.id)),1);
		view(currentId);
	}

	//点击移动
	if(target.classList.contains('move-icon')){
		var movedIdArr = [target.dataset.id];
		var moveData = [cloud.getDataById(currentData,target.dataset.id)];

		moveFolder(movedIdArr,moveData);		
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

//------------------------------------------------------------------------
//框选文件
folderWrap.addEventListener('mousedown',function(e){
	if(e.buttons !== 1){
		return;
	}
	if(e.target.classList.contains('file-list')){
		var box = document.createElement('div');
		box.style.border = '1px dotted #000';
		box.style.position = 'absolute';
		document.body.appendChild(box);

		var x = e.pageX, y = e.pageY;
		box.style.left = x + 'px';
      	box.style.top = y + 'px';	
 		folderWrap.onmousemove = function (e){
        	var cx = e.pageX, cy = e.pageY;  
			box.style.left = Math.min(cx, x) + 'px';
	        box.style.top = Math.min(cy, y) + 'px';
	        box.style.width = Math.abs(x - cx) + 'px';
	        box.style.height = Math.abs(y - cy) + 'px';  

			for(var i=0; i<currentFiles.length; i++){
				if(fq.duang(box,currentFiles[i])){
					currentFiles[i].classList.add('checked');
					isFolderChecked(currentFiles[i],currentFiles[i].dataset.id);					
				}else{
					currentFiles[i].classList.remove('checked');
					isFolderChecked(currentFiles[i],currentFiles[i].dataset.id);				
				}	

				if(isAllChecked()){
					checkAll.classList.add('checked');
				}else{
					checkAll.classList.remove('checked');
				}
				headTag();				
			}	        

	        return false;      	
        }	 
		document.onmouseup = function (){
	        this.onmouseup = folderWrap.onmousemove = null;
	        box.remove(box);
       	}
      	return false;           	
	}
});

//右键菜单
fileWrap.addEventListener('contextmenu',function(e){
	e.preventDefault();
	if(_contextmenu.flag){
		return;
	}
	_contextmenu.flag = true;

	var target = e.target;
	var H = 240;
    var x = e.pageX, y = e.pageY;
    if(window.innerWidth - x < fq.css(_contextmenu, 'width')){
        x = x - fq.css(_contextmenu, 'width');
    }
    if(window.innerHeight - y < H){
        var flag = true;
    }
    fq.css(_contextmenu, '');
    fq.css(_contextmenu, {
        display: 'flex',
        left: x,
        top: y
    });
    
    if(flag){
        fq.animation(_contextmenu, {height: H, top: y - H}, 'backOut');
    }else{
        fq.animation(_contextmenu, {height: H}, 'backOut');
    }

    //右键空白处
    if(e.target.classList.contains('file-list')){
    	 //新建
    	_contextmenu.children[0].canCreate = true;
    	_contextmenu.children[0].onclick = function(){
    		fq.css(this.parentNode, '');
			if(!this.canCreate){
				return;
			}    	
			cancelChecked();
			newFolder();
			nameFolder(this);    		
    	};
    	 //重命名
    	_contextmenu.children[1].onclick = function(){
    		fq.css(this.parentNode, '');
    		if(getTargetIndex() === undefined){
    			showMainAlertBox('warn','请选择文件');
    			return;
    		}
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
			rename(span,input);    		
    	}   
    	//删除
    	_contextmenu.children[2].onclick = function(){
    		fq.css(this.parentNode, '');
			if(!deleteCheckedData().length){
				showMainAlertBox('warn','请选择文件');
			}else{
		    	//重新渲染
			    view(currentId);
			    showMainAlertBox('success','删除成功'); 
		    };   		
    	}	
    	//移动
		_contextmenu.children[3].onclick = function(){
			fq.css(this.parentNode, '');
			if(!getCheckedId().length){
				showMainAlertBox('warn','请选择文件');
			}else{
		    	moveFolder(getCheckedId(),getCheckedFolderData());
		    };   		
    	}
    	//打开
		_contextmenu.children[4].onclick = function(){
			fq.css(this.parentNode, '');
			if(getTargetIndex() === undefined){
				showMainAlertBox('warn','请选择文件');
			}else{
				currentId = currentData[getTargetIndex()].id;
		    	view(currentId);
		    };   		
    	}
    //右键文件夹    	    	
    }else{
		if(target.nodeName.toUpperCase() === 'LI'){
			cancelChecked();
			target.classList.add('checked');
			isFolderChecked(target,target.dataset.id);
			headTag();
		}else if(target.classList.contains('fn-icon')){
			cancelChecked();
			target.parentNode.parentNode.classList.add('checked');
			isFolderChecked(target.parentNode.parentNode,target.parentNode.parentNode.dataset.id);
			headTag();			
		}else{
			cancelChecked();
			target.parentNode.classList.add('checked');
			isFolderChecked(target.parentNode,target.parentNode.dataset.id);
			headTag();			
		}  

		//新建
    	_contextmenu.children[0].canCreate = true;
    	_contextmenu.children[0].onclick = function(){
    		fq.css(this.parentNode, '');
			if(!this.canCreate){
				return;
			}    	
			cancelChecked();
			newFolder();
			nameFolder(this);    		
    	};
    	 //重命名
    	_contextmenu.children[1].onclick = function(){
    		fq.css(this.parentNode, '');
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

			rename(span,input);    		
    	}   
    	//删除
    	_contextmenu.children[2].onclick = function(){
    		fq.css(this.parentNode, '');
			deleteCheckedData();
		    //重新渲染
		    view(currentId);
		    showMainAlertBox('success','删除成功');  		
    	}	
    	//移动
		_contextmenu.children[3].onclick = function(){
			fq.css(this.parentNode, '');
		    moveFolder(getCheckedId(),getCheckedFolderData()); 		
    	}
    	//打开
		_contextmenu.children[4].onclick = function(){
			fq.css(this.parentNode, '');
			currentId = currentData[getTargetIndex()].id;
	    	view(currentId);  		
    	}			
    }	
});

document.onmousedown = function (e){
	if(!e.target.classList.contains('menu-item')){
	    fq.animation(_contextmenu, {height: 0}, 200, 'backIn', function (){
	        fq.css(this, '');
	    });
	    _contextmenu.flag = false;
    }
};
