//创建面包屑导航
function createCrumbs(crumbs, data, id) {
	fq.animate(alertBox,{top:-50},200);
	stopCreate = false;
	
	crumbs.innerHTML = '';
	var str = `<a href="javascript:;" class="checkbox fl of" data-Id="${id}"></a>`;
	var crumbArr = cloud.getParentsById(data, id);
	crumbArr.reverse();
	crumbArr.forEach(function(item, i) {
		if (i == crumbArr.length - 1) {
			str += `<a href="javascript:;" class="last_crumbs fl pr" data-Id="${item.id}" data-floor="${item.floor + 1}">
						${item.name}
						<span class="bottom_line pa of"></span>
					</a>`
		} else {
			str += `<a href="javascript:;" class="fl" data-Id="${item.id}" data-floor="${item.floor + 1}">${item.name}</a>
					<span class="next fl ico_bg"></span>`
		}
	})
	crumbs.innerHTML = str;

	fileCheck();
	curmbNav();
}