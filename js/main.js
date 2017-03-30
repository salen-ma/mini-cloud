// 所有的文件数据
var data = Data.files;

// 容器
var fileTree = Fq('.layout-aside .file-tree');
var folderWrap = Fq('.file-list');
var crumbs = Fq('.bread-crumbs');
var fileWrap = Fq('.file-wrap');

//提示框
mainAlertBox = Fq('.main .alert-box');

//遮罩
var mask = Fq('.mask');
//移动菜单
var	moveMenu = Fq('.move-menu'),
	menuHead = Fq('.menu-head'),
	moveList = Fq('.menu-list .file-tree'),
	cancelMove = Fq('.cancel-move'),
	sureMove = Fq('.sure-move'),
	closeMask = Fq('.close-mask'),
	checkedFileName = Fq('.checked-file-name'),
	checkedCount = Fq('.checked-count'),
	moveToTarget = Fq('.move-to-target'),
	moveAlertBox = Fq('.move-alert-box'),
	nameRepeatMenu = Fq('.name-repeat-menu'),
	cover = Fq('.cover'),
	overName = Fq('.over-name'),
	cancel = Fq('.cancel');
//确认删除菜单
var sureDeleteBox = Fq('.sure-delete'),
	sureDelete = Fq('.sure-delete .sure'),
	cancelDelete = Fq('.sure-delete .cancel');

//右键菜单
var _contextmenu = Fq('.contextmenu');

//头部
var initHead = Fq('.head .init'),
	checkedHead = Fq('.head .checked');

var selectSum = Fq('.head .sum-select'),
	cancelSelect = Fq('.head .cancel-select');

//全选框
var checkAll = Fq('.crumbs-wrap .checkbox');

//控制按钮
var btns = Fq('.checked .fn-btn a');
var shareBtn = btns[0],
	downBtn = btns[1],
	moveBtn = btns[2],
    reNameBtn = btns[3],
    deleteBtn = btns[4];

//新建,上传按钮
var uploadBtns = Fq('.upload-dropdown li');
var uploadFile = uploadBtns[0],
	uploadFolder = uploadBtns[1],
	offlineDown = uploadBtns[2],
	createNewFolder = uploadBtns[3],
	addNote = uploadBtns[4];

//视图按钮
var viewList = Fq('.view-list'),
	viewThumb = Fq('.view-thumb');
//当前视图
var currentView = 'thumb';

//排序按钮
var timeSort = Fq('.time-sort'),
	letterSort = Fq('.letter-sort');
//当前排序
var currentSort = 'time';

//当前id
var currentId = 0;

//当前层数
var currentFloor = 0;

//当前数据
var currentData = null;

//当前文件
var currentFiles = Fq('.file-list li');
