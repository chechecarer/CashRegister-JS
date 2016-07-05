
/*存储商品信息*/
var data =  new Array();

/*删除商品*/
function delGoods(e){
    this.parentNode.parentNode.removeChild(this.parentNode);
    data.splice(this.index,1);
}

/*添加商品*/
function addGoods(){
    var goodsID = document.getElementById('goodsID').value.replace(/(^\s*)|(\s*$)/g, "");
    var goodsNum = document.getElementById('goodsNum').value.replace(/(^\s*)|(\s*$)/g,"");
    var goodsInfo = {id:goodsID,num:goodsNum};
    data.push(goodsInfo);
    var g = document.createElement('div');
    g.className = 'input';
    g.innerHTML = '<input type="text" value="'+goodsID+'" readonly><input type="text" value="'+goodsNum+'" readonly><button type="button" class="del">删除</button>';
    document.getElementById('table-body').appendChild(g);
    var btns = document.getElementsByClassName('del');
    for(var i=0;i<btns.length;i++){
        btns[i].index = i;
        btns[i].addEventListener('click',delGoods,false);
    }

}

/*提交操作*/
function submit(){
    /*格式化数据*/
    var nData = '';
    nData += '[{\"id\":\"'+data[0].id;
    nData +='\",\"num\":'+data[0].num+'}';
    for(var i = 1 ; i < data.length ; i++){
        nData += ',{\"id\":\"'+data[i].id;
        nData +='\",\"num\":'+data[i].num+'}';
    }
    nData += ']';

    sessionStorage.setItem('goodsData',nData);


}

/*绑定事件*/
document.getElementById('addBtn').addEventListener('click',addGoods,false);
document.getElementById('submit').addEventListener('click',submit,false);
