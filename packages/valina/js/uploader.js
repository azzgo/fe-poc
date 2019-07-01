document.getElementById('file-uploader').onclick = function() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.onchange = function() {
    alert('选择');
  };

  fileInput.click();
};
