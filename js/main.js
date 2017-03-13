// 所有的文件数据
var data = Data.files;

// 获取树状菜单的父容器
var fileTree = document.querySelector('.mini_cloud');

// 获取文件列表的父容器
var folderWrap = document.querySelector('.file_list');

//控制按钮
var btns = document.querySelectorAll('.tool_left a');
//删除按钮
var deleteBtn = btns[4];
//新建按钮
var createBtn = btns[5];

//面包屑导航父容器
var crumbs = document.querySelector('.crumbs');

//警告框
var alertBox = document.querySelector('.alert');

//判断是否允许新建
var stopCreate = false;

//用于判断最大id
var n = 0;

var prev = '';

createBtn.floor = 1;
createBtn.pId = 0;