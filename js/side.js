

//登陆
login();
function login(){
	var name=getCookie('userName');
	var count=getCookie('shopCount')-0;	
	if(count){
		addThingsCard(count);
	}
	if(name){
		$('#user-login-in').css('display','block');
		$('#user-not-login').css('display','none');
		$('#userName').text(name);
	}	
}

//退出
$('#user-login-in').find('a').eq(1).click(function(){
	setCookie('userName','',10);
	setCookie('password','',10);
	$('#user-login-in').css('display','none');
	$('#user-not-login').css('display','block');
});

$('.shopcar,.sidebar-content h2 i').click(function(){
	var r=parseInt($('#sidebar').css('right'));
	if(r==-280){
		$('#sidebar').animate({'right':0});
	}else if(r==0){
		$('#sidebar').animate({'right':-280});
	}
})


//加入购物车
$('.addcar').click(function(){
	var h=parseInt($('.shopCount').eq(0).text());
	var w=parseInt($('#thingscount').val());
	if(w+h>10){
		alert('该商品库存只有十件啦..');
	}else{
		//添加商品信息卡
		if($('.sbcontent').has('.sbcard').length==0){
			addThingsCard();
		}
		//添加效果
		$('.addCarPicShow').css('display','block').stop().animate({
			'top':$('.shopcar b').offset().top-$(document).scrollTop(),
			'left':$('.shopcar b').offset().left,
			'width':10,
			'height':10},1000,
		function(){
			$(this).css({
				'display':'none',
				'width':200,
				'height':200,
				'top':760,
				'left':0
			});
				//数量
			$('.shopCount').each(function(){
				$(this).text(h+w);
				
			});
			//总价
			$('.allPrice').each(function(){
				$(this).text((h+w)*300)
			})					
		});
		setCookie('shopCount',h+w,10);
	}
	
})


function countPrice(b){
	//数量
	$('.shopCount').each(function(){
		var n=$(this).text()-0;
		if(b) n=n==10?10:++n;
		else n=n<=1?1:--n;
		setCookie('shopCount',n,10);
		$(this).text(n);
	});
	//总价
	$('.allPrice').each(function(){
		$(this).text($('.shopCount').eq(0).text()*300)
	})
}

//添加商品信息卡
function addThingsCard(count){
	count=count?count:1;
	$('.shopCount').text(count);
	var thingsHtml="<div class='sbcard'><div class='sbcleft'><img src='../img/details/fangdajing/1.jpg' width='50'/></div><div class='sbcright'><div class='sbcrt'><div class='sbcrtl'>乐卡克 针织运动长裤 CY-4671153</div><div class='sbcrtr'>￥<span class='allPrice'>"
	+300*count+"</span>.00</div></div><div class='sbcrb'><div class='sbcrb1'>300.00 x <span class='shopCount'>"
	+count+"</span></div><div class='sbcrb2'><div class='sbcrem'><i class='iconfont'>&#xe606;</i></div><span class='shopCount'>"
	+count+"</span><div class='sbcadd'><i class='iconfont'>&#xe608;</i></div><div class='sbcclear'><i>x</i></div></div></div></div></div>"
	var sidefootHtml="<div class='sidebar-foot'><p>共计<span class='shopCount'>"
	+count+"</span>商品,总计￥<span class='allPrice'>"
	+count*300+"</span></p><div class='tobuyit'><input type='button' value='去结算'/></div></div>";
	$('.sbcontent').append(thingsHtml);
	$('.sidebar-content').append(sidefootHtml);
	//加减按钮
	$('.sbcadd').click(function(){
		countPrice(true);
	});
	$('.sbcrem').click(function(){	
		countPrice(false);
	});
	$('.sbcclear').click(function(){
		clearThingsInfo();
	});
	
	$('.sbcontent').css('background-position','300px 0');	
}
//清空购物车
function clearThingsInfo(){
	$('.sbcontent').empty();
	$('.sidebar-foot').remove();
	$('.shopCount').text(0);
	//原始背景图消失
	$('.sbcontent').css('background-position','center center');
	setCookie('shopCount',0,10);
}


//cookies
function setCookie(name,value,expiredays){
	
	var  exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=name+"="+encodeURI(value)+((expiredays==null)?"":";expires="+exdate.toGMTString()+';path=/');
	
}
function getCookie(name){
	if(document.cookie.length>0){
		//找到name对应的value开始的下标
		cstart=document.cookie.indexOf(name+'=');
		if(cstart!=-1){
			//找到value结束的下标
			cstart=cstart+name.length+1;
			cend=document.cookie.indexOf(';',cstart);
			//如果是最后一个
			if(cend==-1)cend=document.cookie.length;
			return decodeURI(document.cookie.substring(cstart,cend));
		}
	}
	return "";					
}