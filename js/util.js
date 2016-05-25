
/**
 * Created by Administrator on 2016/05/25.
 */
function createRequest(){
    try{
        request = new XMLHttpRequest();
    }catch (tryMS){
        try{
            request = new ActiveXObject('Msxml2.XMLHTTP');
        }catch (otherMS){
            try{
                request = new ActiveXObject('Miscrosoft.XMLHTTP');
            }catch (faild){
                request = null;
            }
        }
    }
    return request;
}
