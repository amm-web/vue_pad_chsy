 /**
 * 对log的封装；增加了标签和颜色区别
 *
 * 参见：http://www.jianshu.com/p/71a44ddf438e   http://blog.csdn.net/isaisai/article/details/45481587
 *
 * @param <All> msg log内容
 * @param <String> tag 便签：方便控制台过滤（过滤时以#开头），可以省略，默认为#
 * @return
 */
export default console.log = (function(oriLogFunc){
  return function(msg,tag = ''){
        oriLogFunc.call(console,'%c#' + tag,'background:yellow;color:red;font-size:16px',msg);
    }
})(console.log);

