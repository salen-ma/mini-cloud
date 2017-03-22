// 所有的文件数据
var data = Data.files;

// 容器
var fileTree = document.querySelector('.file-tree');
var folderWrap = document.querySelector('.file-list');
var crumbs = document.querySelector('.bread-crumbs');

//遮罩
var mask = document.querySelector('.mask'),
	moveList = mask.querySelector('.file-tree'),
	cancelMove = mask.querySelector('.cancel-move'),
	sureMove = mask.querySelector('.sure-move'),
	closeMask = mask.querySelector('.close-mask'),
	checkedFileName = mask.querySelector('.checked-file-name'),
	checkedCount = mask.querySelector('.checked-count'),
	moveToTarget = mask.querySelector('.move-to-target'),
	alertBox = mask.querySelector('.alert-box'),
	nameRepeatMenu = mask.querySelector('.name-repeat-menu'),
	cover = mask.querySelector('.cover'),
	overName = mask.querySelector('.over-name'),
	cancel = mask.querySelector('.cancel');

//头部
var initHead = document.querySelector('.head .init'),
	checkedHead = document.querySelector('.head .checked');

var selectSum = checkedHead.querySelector('.head .sum-select'),
	cancelSelect = checkedHead.querySelector('.head .cancel-select');

//全选框
var checkAll = document.querySelector('.crumbs-wrap .checkbox');

//控制按钮
var btns = document.querySelectorAll('.checked .fn-btn a');
var shareBtn = btns[0],
	downBtn = btns[1],
	moveBtn = btns[2],
    reNameBtn = btns[3],
    deleteBtn = btns[4];

//新建,上传按钮
var uploadBtns = document.querySelectorAll('.upload-dropdown li');
var uploadFile = uploadBtns[0],
	uploadFolder = uploadBtns[1],
	offlineDown = uploadBtns[2],
	createNewFolder = uploadBtns[3],
	addNote = uploadBtns[4];

//视图按钮
var viewList = document.querySelector('.view-list'),
	viewThumb = document.querySelector('.view-thumb');
//当前视图
var currentView = 'thumb';

//排序按钮
var timeSort = document.querySelector('.time-sort'),
	letterSort = document.querySelector('.letter-sort');

//当前id
var currentId = 0;

//当前层数
var currentFloor = 0;

//当前数据
var currentData = null;

//当前文件
var currentFiles = folderWrap.children;