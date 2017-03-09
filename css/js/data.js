var Data = {
	files: [{
		floor: 0,
		name: '微云',
		id: 0,
		type: 'root',
		child: [{
			floor: 1,
			name: '前端课程',
			id: 1,
			pId: 0,
			type: 'folder',
			child: [{
				floor: 2,
				name: 'JS课程',
				id: 2,
				pId: 1,
				type: 'folder'
			}, {
				floor: 2,
				name: 'HTML课程',
				id: 3,
				pId: 1,
				type: 'folder'
			}, {
				floor: 2,
				name: 'CSS课程',
				id: 4,
				pId: 1,
				type: 'folder',
				child: [{
					floor: 3,
					name: '课程1',
					id: 5,
					pId: 4,
					type: 'folder'
				}, {
					floor: 3,
					name: '课程2',
					id: 6,
					pId: 4,
					type: 'folder'
				}, {
					floor: 3,
					name: '课程3',
					id: 7,
					pId: 4,
					type: 'folder'
				}]
			}]
		}]
	}]
}