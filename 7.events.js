//发布 订阅 取消订阅 异步模式 回调函数 （一对多的关系）
function Girl(){
    this._events={};
}
Girl.prototype.on=function(eventName,callback){
    //先判断_events中是否包含eventName属性
    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else {
        this._events[eventName]=[callback];
    }
};
Girl.prototype.removeListener=function(eventName,callback){
    if(this._events[eventName]){
        this._events[eventName]=this._events[eventName].filter(item=>item!==callback)
    }
};
Girl.prototype.emit=function (eventName,...rest) {
    if(this._events[eventName]){//让订阅的事件依次执行
        this._events[eventName].forEach(item=>item(...rest))
    }
};
let girl=new Girl();
function cry(w){console.log('哭',w)}
function eat(w){console.log('eat吃',w)}

girl.on('女生失恋',cry);
girl.on('女生失恋',eat);
girl.removeListener('女生失恋',eat);//移除事件
girl.emit('女生失恋','xxxx');


