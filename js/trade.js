/**
 * Created by Administrator on 2016/05/26.
 */

/*初始化页面*/
document.write('<header>商品结算系统</header><div id="ticket"><h4 >*\<没钱赚商店\>购物清单*</h4></div><footer>produced by 车卓文</footer>');

/*获取商品清单*/
var goodsData = sessionStorage.getItem('goodsData');
goodsData = JSON.parse(goodsData);
var data = new Array();
var tep = '';
for(var i = 0 ; i < goodsData.length ; i ++){
//    console.log(goodsData[i]);
    var num = goodsData[i].num;
    if(num == 1)
        tep = goodsData[i].id+'';
    else{
        tep = goodsData[i].id+'-'+num;
    }
    data.push(tep);
}



/*统计商品清单中商品数量，和商品信息*/
var goods = {};
for(var i = 0 ; i< data.length ; i ++){
    var gid = data[i].substring(0,10);
    var gnum = 1;
    if(data[i].length >= 12){
        gnum = parseInt(data[i].substring(11));
    }
    if(goods[gid]){//如果该商品已经存在
        goods[gid].num += gnum;
    }
    else{
        goods[gid] = {
            name:goodsInfo[gid].name,
            num :gnum,
            unit:goodsInfo[gid].unit,
            onePrice:goodsInfo[gid].price,
            price:0,
            disPrice:0,
            discount:1,
            disName:''
        }
    }
}


/*获得商品清单中商品的打折信息*/
for(var i = 0 ; i < disCountInfo.length ; i ++){
    var dis = 1 - disNum[disCountInfo[i].type.substring(0,disCountInfo[i].type.indexOf('_'))].num;
    var disName = disNum[disCountInfo[i].type.substring(0,disCountInfo[i].type.indexOf('_'))].name;

    for(var j = 0 ; j < disCountInfo[i].barcodes.length ; j ++){
        var g = disCountInfo[i].barcodes[j];
        if(goods[g]){
            goods[g].discount = dis;
            goods[g].disName = disName;
        }
    }
}

/*生成购物小票*/
var ticket = document.getElementById('ticket');
var goodsDis = [];
var totalPrice = 0;
var totalDisPrice = 0;
for(var i in goods){
    goods[i].price = changeTwoDecimal(goodsInfo[i].price * goods[i].num * goods[i].discount);
    goods[i].disPrice = changeTwoDecimal(goodsInfo[i].price * goods[i].num * (1-goods[i].discount));
    if(goods[i].discount < 1){
        goodsDis.push({name:goods[i].name,disName:goods[i].disName});
        totalDisPrice += parseFloat(goods[i].disPrice);
    }
    totalPrice += parseFloat(goods[i].price);
    var node = document.createElement('div');
    node.innerHTML = '<span>名称:'+goods[i].name+',</span>'+'<span>数量：'+goods[i].num+goods[i].unit+',</span>';
    node.innerHTML += '<span>单价：'+goods[i].onePrice+'(元),</span>'+'<span>小计：'+goods[i].price+'(元)</span>';
   if(goods[i].discount < 1){
       node.innerHTML += ',<span>优惠：'+goods[i].disPrice+'(元)</span>';
   }
    ticket.appendChild(node);
}
totalPrice = changeTwoDecimal(totalPrice);
totalDisPrice = changeTwoDecimal(totalDisPrice);

if(goodsDis.length > 0){
    var br =  document.createElement('hr');
    ticket.appendChild(br);
    var node = document.createElement('div');
    node.innerHTML = '<span>单品打折商品:</span>';
    for(var i = 0 ; i < goodsDis.length ; i ++){
        if(i==0){
            node.innerHTML += '名称：'+goodsDis[i].name+',折扣：'+goodsDis[i].disName;
        }
        else{
            node.innerHTML += ',名称：'+goodsDis[i].name+',折扣：'+goodsDis[i].disName;
        }
    }
    ticket.appendChild(node);
}
var br =  document.createElement('hr');
ticket.appendChild(br);
var node = document.createElement('div');
node.innerHTML = '<span>总计:'+totalPrice+'(元)';
if(totalDisPrice > 0){
    node.innerHTML += '节省：'+totalDisPrice + '(元)'
}
node.innerHTML += '</span>';
ticket.appendChild(node);
var br =  document.createElement('hr');
ticket.appendChild(br);


