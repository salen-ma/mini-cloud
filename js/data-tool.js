var cloud = {};

//通过指定id找到对应的数据
cloud.getDataById = function(data, id) {
	var item = null;
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == id) {
			item = data[i];
			break;
		}
		if (!item && data[i].child) {
			item = this.getDataById(data[i].child, id);
		}
	}
	return item;
}

//通过id获取到该id数据下的所有子集
cloud.getChildrenById = function(data, id) {
	if (this.getDataById(data, id)) {
		return this.getDataById(data, id).child;
	}
}

//通过指定的id获取到自己，以及自己所有的父级
cloud.getParentsById = function(data, id) {
	var items = [];

	var current = this.getDataById(data, id);
	if (current) {
		items.push(current);
		items = items.concat(this.getParentsById(data, current.pId));
	}

	return items;
}

//获取当前时间
cloud.getNowTime = function(){
	var now = new Date(),
		nowYear = now.getFullYear(),
		nowMonth = now.getMonth() + 1,
		nowDate = now.getDate(),
		nowHour = now.getHours(),
		nowMin = now.getMinutes();
	return `${nowYear}-${this.add0(nowMonth)}-${this.add0(nowDate)} ${this.add0(nowHour)}:${this.add0(nowMin)}`
}

//加0
cloud.add0 = function(num){
	return num = num > 9 ? num : '0' + num;
};

//排序
cloud._sort = function(arr,type){
	if(type === 'time'){
		attrName = 'timeStamp';
		arr.reverse();
	}else{
		attrName = 'name';
	}
	arr.sort(createSortFunction(attrName))
};

//创建排序函数
function createSortFunction(attrName) {
	return function(obj1,obj2) {
		var value1 = obj1[attrName];
		var value2 = obj2[attrName];

		if(value1 < value2){
			return -1;
		}else if(value1 > value2){
			return 1;
		}else{
			return 0;
		}
	}
};