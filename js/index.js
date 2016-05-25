/**
 * Created by Administrator on 2016/05/25.
 */
var data =  new Array();

function delGoods(e){
    this.parentNode.parentNode.removeChild(this.parentNode);
    data.splice(this.index,1);
    console.log(data);
}

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

function submit(){
    console.log('submit form');
    jQuery.getJSON('jsonData/goodsInfo.json',function(data){
        console.log(data);
    })
//    var request = createRequest();
//    if(request == null){
//        console.log('unable to create request');
//    }
//    else{
//        var url = '';
//    }

}
document.getElementById('addBtn').addEventListener('click',addGoods,false);
document.getElementById('submit').addEventListener('click',submit,false);