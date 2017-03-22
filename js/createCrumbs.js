//创建面包屑导航
function createCrumbs(data,id){
	var str = '';

	data.forEach(function(item, i) {
		if(i < data.length - 1){
			str += `<a href="javascript:;" data-Id="${item.id}" data-floor="${data[i].floor}">
						${item.name}
					</a>
					<span class="next">></span>`
		};

		if(i == data.length - 1){
			str +=`<a href="javascript:;" class="last-crumbs" data-Id="${item.id}" data-floor="${data[i].floor}">
						${item.name}
					</a>`
		};
	})

	return str;
}