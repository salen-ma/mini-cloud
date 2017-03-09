function createFiles(data, id) {
  var str = '';
  if (!data) {
    return str;
  }

  for (var i = 0; i < data.length; i++) {
    str += `<li class="file_item thumb">
                   <a href="javascript:;" class="checkbox fl of"></a>
                   <span class="file-name">${data[i].name}</span>
                   <input type="text" class="file-change-name" value="${data[i].name}">
               </li>`
  }

  return str;
}

function fileCheck() {
  var checkAll = crumbs.firstElementChild;
  var files = folderWrap.children;
  var n = 0;

  Array.from(files).forEach(function(item) {
    item.flag = true;
    item.onclick = function() {
      this.classList.toggle('active');
      item.firstElementChild.classList.toggle('active');

      if (item.flag) {
        n++;
      } else {
        n--;
      }
      if (n == files.length) {
        checkAll.classList.add('active');
        checkAll.flag = false;
      } else {
        checkAll.classList.remove('active');
        checkAll.flag = true;
      }
      item.flag = !item.flag;
    }

  })

  if (checkAll) {
    checkAll.flag = true;
    checkAll.classList.remove('active');
    checkAll.onclick = function() {

      checkAll.classList.toggle('active');
      Array.from(files).forEach(function(item) {
        if (checkAll.flag) {
          item.classList.add('active');
          item.firstElementChild.classList.add('active');
          n = files.length;
          item.flag = false;
        } else {
          item.classList.remove('active');
          item.firstElementChild.classList.remove('active');
          n = 0;
          item.flag = true;
        }
      })
      checkAll.flag = !checkAll.flag;

    }
  }
}