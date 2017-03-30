//创建树形菜单函数
function createTree(data,id){
	var str = '';

	var cls;
	for (var i = 0; i < data.length; i++) {
		if(data[i].checked){
			continue;
		}
		if(data[i].child.length){
			cls = 'open';
		}else{
			cls = 'close';
		}	
		
		if(data[i].id == id){
			cls = cls + ' ' + 'active'
		}	

        str += `<li>
					<span class="${cls}" style="padding-left:${20 + data[i].floor*20}px;" data-id="${data[i].id}" data-floor="${data[i].floor}" data-name="${data[i].name}">
						<i class="bg" data-id="${data[i].id}"></i>
						${data[i].name}
					</span>`
		if(data[i].child.length){
			str += `<ul>${createTree(data[i].child,id)}</ul>`
		}
    }

    str += `</li>`

    return str;	
}