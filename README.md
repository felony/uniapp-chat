# uniapp-chat
在mui中有chat界面的例子，升级到uni-app后，没有类似的模板，因此模仿写了一个。遇到了一些坑，在此一一记录下来。当然，由于是新手，可能有些坑可以避开。
---
## scroll-view高度的设置
输入内容后，必然要在对话界面的底部显示内容，但是在uni-app下不知道如何能操作DOM来显示和定位，有说需要通过uni.pageScrollTo的方式，但是这个页面刷新的太厉害，输入框都刷新了，没法使用。所以只能使用scroll-view组件。但是通过scroll-view使用竖向滚动时，需要给 <scroll-view> 一个固定高度。为了适配屏幕的大小，则需要通过计算来确定scroll-view的高度。

```
<scroll-view id="scrollview"  :style="{height:style.contentViewHeight+'px'}" :scroll-with-animation="true" :scroll-top="scrollTop">
</scroll-view>
```
> style.contentViewHeight 需要在加载前通过计算获得

```
created: function () { 
	const res = uni.getSystemInfoSync();
	this.style.pageHeight = res.windowHeight;
	this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
}
```        
> 由于给出的是像素高度，所以需要换算一下 res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100);  其中100是底部输入框的像素高度

## scroll-top的使用
每次发送内容后，需要滚动到底部，可以通过把最后一个元素id赋值给scroll-into-view的方式来实现，但是效果也不是很理想，所以采用了scroll-top的方式。
```
var that = this;
var query = uni.createSelectorQuery();
query.selectAll('.m-item').boundingClientRect();
query.select('#scrollview').boundingClientRect();
query.exec(function (res) {
	that.style.mitemHeight = 0;
	res[0].forEach(function (rect) {
		that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;});

	if (that.style.mitemHeight > that.style.contentViewHeight) {
		that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight;
		}
});
```
> 方法就是先获取所有内部子元素的高度，然后用子元素的高度和-显示高度，就得到了scroll-top的滚动位置。

## 其他
1. uni-app的img组件地址有点问题，小程序版本能用绝对地址，但是app版本就需要使用相对路径。
2. 虽然现在每次发送信息后，能滚动到底部，但是输入的时候，由于弹出键盘，就可能覆盖了，没法看到最后一条信息。