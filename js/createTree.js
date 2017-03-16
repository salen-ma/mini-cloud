//创建树形菜单函数
function createTree(fileTree, data) {
	fq.animate(alertBox, {
		top: -50
	}, 200);
	stopCreate = false;
	fileTree.innerHTML = '';
	data.forEach(function(item, i) {
		var li = document.createElement('li'),
			span = document.createElement('span');
		span.floor = item.floor;
		span.id = item.id;
		span.flag = false;
		if (span.id == createBtn.pId) {
			span.style.backgroundColor = '#eee';
			span.flag = true;
			prev = span;
		}
		span.onmouseover = function() {
			if (!this.flag) {
				this.style.backgroundColor = '#eee';
			}
		}
		span.onmouseout = function() {
			if (!this.flag) {
				this.style.backgroundColor = '';
			}
		}
		span.onclick = function() {
			prev.style.backgroundColor = '';
			prev.flag = false;
			this.flag = true;
			this.style.backgroundColor = '#eee';
			prev = this;
			createBtn.floor = this.floor + 1;
			createBtn.pId = this.id;
			createFolderList(Data.files, this.id);
			createCrumbs(crumbs, Data.files, this.id);
			curmbNav();
		}
		span.innerHTML = item.name;
		span.style.paddingLeft = 44 + (item.floor + 1) * 20 + 'px';
		span.style.backgroundPositionX = (item.floor + 1) * 20 + 'px';
		li.appendChild(span);
		if (item.child.length > 0) {
			span.className = 'open';
			var ul = document.createElement('ul');
			createTree(ul, item.child);
			li.appendChild(ul);
		} else {
			span.classList.add('close');
		}

		fileTree.appendChild(li);

	})

}