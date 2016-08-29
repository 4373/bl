$(function(){
	
	
	
	
//--------------------------------------------------nav------------------------	
	var $dataItem=$('.nav-item-data');
	//li移入事件
	$('.nav-item li').mouseenter(function(){	
		//大分类li的变化
		$(this).addClass('active').siblings().removeClass('active');	
		//如果里面没有数据,添加数据
		if(!$dataItem.has('ul').length){			
			getNavData();								
		}
		//具体数据li变化
		$('.nav-item-data li').eq($(this).index()).css("display",'block').siblings().css("display",'none');
		$dataItem.css('display','block');
		$dataItem.stop().animate({'margin-left':"-8px",'opacity':0.8},60,function(){
			$dataItem.stop().animate({'margin-left':"0px",'opacity':0.95},100)
		});	
		//原网站的写法
		//	$dataItem.stop().css({'margin-left':"-8px",'opacity':0.8}).stop().animate({'margin-left':"0px",'opacity':1},300)	
	});
		
	//离开大分类li
	$('.nav-item').mouseleave(function(){
		$dataItem.timer=setTimeout(function(){
			
			$dataItem.css('display','none');
			$('.nav-item li').removeClass('active');
		},100)		
	})
	//进入具体数据li
	$dataItem.mouseenter(function(){
		clearTimeout($dataItem.timer);
	}).mouseleave(function(){
		$dataItem.css('display','none');
		$('.nav-item li').removeClass('active');
	})
	//关闭按钮
	$('.gb-icon').click(function(){ $dataItem.css('display','none') });
	
	//添加nav数据函数
	function getNavData(){
			var $dataItem=$('.nav-item-data');
			$.ajax({
				type:"get",
				url:"data/nav.json",
				async:true,
				success:function(data){
					//添加ul
					$dataItem.append('<ul>');
					
					//添加li  和 li 里的三个div
					for(var i=0;i<data.length;i++){
						$('.nav-item-data ul').append('<li><div class="show-left"></div><div class="show-left"></div><div class="show-right"></div></li>')
					}
					//向每个li的三个div 添加内容
					$('.nav-item-data li').each(function(index){
						//每个li的两个show-left添加块						
						//每个大分类    即每页显示的内容
						var kind= data[index].list;
						for(var j=0;j<kind.length;j++){					 	
						 	//遍历每个块的title,并格式化
					 		var t='';
							for(var m=0;m<kind[j].title.length;m++){
								if(m==kind[j].title.length-1) t+='<a href="#">'+kind[j].title[m]+'</a>';
								else t+='<a href="#">'+kind[j].title[m]+'</a>'+'、';
							}						
							//获取热词
							var r0=kind[j].hotkey[0];
							var r1=kind[j].hotkey[1];	
							var r2=kind[j].hotkey[2]
							//遍历每个块的data,并格式化
							var d='';
							for(var n=0;n< kind[j].data.length;n++){
								if(n==kind[j].data.length-1){
										d+='<a href="#">'+kind[j].data[n]+'</a>';
								}
								else{
									if(n==r0||n==r1||n==r2){
										d+='<a href="#" style="color:#e6133c">'+kind[j].data[n]+'</a><b> | </b>';
										continue;
									}
									d+='<a href="#">'+kind[j].data[n]+'</a><b> | </b>';
								} 							
							}	
						 	//前面四个分类放在第一个show-left
						 	if(j<4){
						 		$(this).find('.show-left').eq(0).append('<div class="block"><div class="show-title"><span>'+t+'</span></div><div class="show-font">'+d+'</div></div>')
						 	}else{//其余的放在第二个show-left
						 		$(this).find('.show-left').eq(1).append('<div class="block"><div class="show-title"><span>'+t+'</span></div><div class="show-font">'+d+'</div></div>')
						 	} 	
						}
						//每个li的show-right添加图片
						var kindImg=data[index].img;
						for(var k=0;k<kindImg.length;k++){
							var i='<img src="'+kindImg[k]+'" />';						
							$(this).find('.show-right').append('<div class="navImg"><a href="#">'+i+'</a></div>')		
						}					
					})	
				}
			});
			
		}
	
//--------------------------------------------------------------banner-----------------------
	var num=0;
	var count=$(".page-bar li").length;
	//配合背景图的背景颜色
	var bg=['#bdfc0b','#e75095',"#63f066",'#ffe339','#00acf6','#1e3f36']
	$('#banner').css('background','#bdfc0b');
	$.bannerTimer=null;
	//自动播放函数
	function play(){
		$.bannerTimer=setInterval(function(){
			move(true);
		},3000);
	}
	play();
	//上一轮下一轮点击
	$('.next').click(function(){ move(true) });
	$('.prev').click(function(){ move(false) });
	
	//进入停止播放
	$('.banner-eye').mouseenter(function(){
		clearInterval($.bannerTimer);
		$(".next").stop().animate({'right':50},200);
		$(".prev").stop().animate({'left':45},200);
	}).mouseleave(function(){
		play();
		$(".next").stop().animate({'right':0},200)
		$(".prev").stop().animate({'left':0},200)
	})
	//进度条
	$('.page-bar li').mouseenter(function(){		
		num=$(this).index();

		$('#banner').css('background',bg[num]);
		$(this).css('background','#e6133c').stop().animate({"width":24},200).siblings().css('background','#444').stop().animate({"width":14},100);	
		$('.page li').eq(num).stop().animate({'opacity':1}).siblings().stop().animate({'opacity':0});	
	});
	//轮播图翻页
	function move(b){
		if(b){
			num++;
			num=num==count?0:num;			
		}
		else{
			num--;
			num=num==-1?5:num;
		}
		$('#banner').css('background',bg[num]);
		$('.page-bar li').eq(num).css('background','#e6133c').stop().animate({"width":24},200).siblings().css('background','#444').stop().animate({"width":14},100);	
		$('.page li').eq(num).stop().animate({'opacity':1}).siblings().stop().animate({'opacity':0});
	}
	
	//---------------------------------------floor-----------------------------------------------------/
	
	//创建楼层内容
	function buildHtml(parent,URL,fn){		
		var floorBoxHtml='<div class="wrap"><div class="floor-box"><h3></h3><div class="floor-slide"><div class="floor-slidew"><ul class="floor-play"><li><a href="#"><img /></a></li><li><a href="#"><img /></a></li><li><a href="#"><img /></a></li><li><a href="#"><img /></a></li></ul></div><ol class="floor-bar"><li><a></a></li><li><a></a></li><li><a></a></li></ol></div><div class="floor-main"><div class="floor-maint"><div class="floor-maint-big"><a href="#"><img /></a></div><div class="floor-maint-small"><a href="#"><img /></a></div><div class="floor-maint-small"><a href="#"><img /></a></div></div><div class="floor-mainb"><div class="floor-mainb-small"><a href="#"><img /></a></div><div class="floor-mainb-small"><a href="#"><img /></a></div><div class="floor-mainb-small"><a href="#"><img /></a></div><div class="floor-mainb-small"><a href="#"><img /></a></div></div></div></div></div>';
		parent.append(floorBoxHtml);
		$.ajax({			
			type:'get',
			async:true,
			url:URL,
			success:function(data){
				
				//添加轮播图图片
				parent.find('.floor-slidew').find('img').each(function(index){					
					$(this).attr('src',data.show[index]);
				});
				//添加main区域图片
				//添加 top big
				parent.find('.floor-maint-big').find('img').attr('src',data.top.big);
				//top small
				parent.find('.floor-maint-small').find('img').each(function(index){
					
					$(this).attr('src',data.top.small[index]);
				});
				//bottom 四个小图
				parent.find('.floor-mainb').find('img').each(function(index){
					$(this).attr('src',data.bottom[index]);
				});


				//初始化每个轮播图的bar、
				$('.floor-bar').find('a').width(0);
				//淡入
				parent.animate({opacity:1},1000);
				
				//回调函数
				fn&&fn(parent);
			},
			error:function(){
				parent.empty();
			}
		})
	}//buildHtml
		
	
	//楼层里的轮播图
	function floorPlay(floor){
		floor.iNow=0;
		floor.timer=null;
		floor.w=$('.floor-play').width()/4;
		startPlay();
		floor.timer=setInterval(startPlay,3500);
		
		function startPlay(){
			floor.iNow=floor.iNow==3?0:floor.iNow;
			$(floor).find('.floor-bar a').width(0).eq(floor.iNow).animate({width:'100%'},3000,'linear');
			$(floor).find('.floor-play').animate({left:-floor.iNow*floor.w})
			floor.iNow++;
		}
		function moveTo(){
			
		}
//		$(floor).find('.floor-slide').mouseenter(function(){
//			$(floor).find('.floor-bar a').stop(true,true);
//			clearInterval(floor.timer);
//			floor.timer=null;
//		}).mouseleave(function(){
//			$(floor).find('.floor-bar a').width(0);
//			$(floor).find('.floor-bar a').width(0).eq(floor.iNow).animate({width:'100%'},3000,'linear');
//			floor.timer=setInterval(startPlay,3500);
//		})
	
	}
//--------------------------------------------------alsolike---------------------------------
	//
	//parent  jq对象  单个ol
	
	function alsolike(parent,URL){

		//console.log($('.like_class').index(parent));
		//为效果写的延时
		setTimeout(function(){
					var htmlStr="<li><div class='pro-show'><div class='pro-img'><a  href='#'><img  height='200' width='200' alt='爱屋集物 梅子花早餐轻食组 花色 骨瓷'></a></div><div class='pro-name'><a href='#' title='爱屋集物 梅子花早餐轻食组 花色 骨瓷'>爱屋集物 梅子花早餐轻食组 花色 骨瓷</a></div><div class='pro-money'><div class='money-fl'>￥<span style='font-size:18px;'>118.0</span></div></div></div></li><li><div class='pro-show'><div class='pro-img'><a  href='#'><img  height='200' width='200' alt='爱屋集物 梅子花早餐轻食组 花色 骨瓷'></a></div><div class='pro-name'><a href='#' title='爱屋集物 梅子花早餐轻食组 花色 骨瓷'>爱屋集物 梅子花早餐轻食组 花色 骨瓷</a></div><div class='pro-money'><div class='money-fl'>￥<span style='font-size:18px;'>118.0</span></div></div></div></li><li><div class='pro-show'><div class='pro-img'><a  href='#'><img  height='200' width='200' alt='爱屋集物 梅子花早餐轻食组 花色 骨瓷'></a></div><div class='pro-name'><a href='#' title='爱屋集物 梅子花早餐轻食组 花色 骨瓷'>爱屋集物 梅子花早餐轻食组 花色 骨瓷</a></div><div class='pro-money'><div class='money-fl'>￥<span style='font-size:18px;'>118.0</span></div></div></div></li><li><div class='pro-show'><div class='pro-img'><a  href='#'><img  height='200' width='200' alt='爱屋集物 梅子花早餐轻食组 花色 骨瓷'></a></div><div class='pro-name'><a href='#' title='爱屋集物 梅子花早餐轻食组 花色 骨瓷'>爱屋集物 梅子花早餐轻食组 花色 骨瓷</a></div><div class='pro-money'><div class='money-fl'>￥<span style='font-size:18px;'>118.0</span></div></div></div></li><li><div class='pro-show'><div class='pro-img'><a  href='#'><img  height='200' width='200' alt='爱屋集物 梅子花早餐轻食组 花色 骨瓷'></a></div><div class='pro-name'><a href='#' title='爱屋集物 梅子花早餐轻食组 花色 骨瓷'>爱屋集物 梅子花早餐轻食组 花色 骨瓷</a></div><div class='pro-money'><div class='money-fl'>￥<span style='font-size:18px;'>118.0</span></div></div></div></li>"
		parent.append(htmlStr);
			$.ajax({
				url:URL,
				type:'get',
				cache:false,
				success:function(data){
					
					var olindex=$('.like_class').index(parent);
					parent.find('li').each(function(){
						
						
						$(this).find('.pro-img img').attr('src',data[olindex][$(this).index()]);
						
					});
				}
							
			})
		
		},100);
	}
	
	
	
//------------------------------------------------------------滚轮事件--------------------------------
	//初次加载自动触发
	$(document).trigger('scroll')
	$(document).scroll(function(e){
		var y=$(document).scrollTop();
		var fh=$('.floor').eq(0).outerHeight(true);
		//楼层
		$('.floor').each(function(index){
			var h=fh*index+800;
			var h1=fh*index+1000;
			if(y>h&&y<h1){
				//图片内容加载
				if(!this.in){
					this.in=true;
					buildHtml($('.floor').eq(index),'data/floor/floor'+(index+1)+'.json',function(a){
						floorPlay(a);
					});
					
				}
				
				//楼梯 
				$('#navigation').find('a').removeClass('select').eq(index).addClass('select')
			}			
		});


		//alsolike 图片加载
		$('.like_class').each(function(index){
			
			var h=$(this).outerHeight(true)*index+5500-1000;
			var h1=$(this).outerHeight(true)*index+5000;

			
			if(y>h&&y<h1&&!this.in){
				this.in=true;
				alsolike($(this),'data/alsolike.json')
			}
			
		});
		
		


		if(y<1000){
			$('#navigation').fadeOut();

		}
		else{
			$('#navigation').fadeIn()
		}
		
		
		$('#navigation').find('a').click(function(){
			var h=0
			if($(this).index()!=8){
				h=fh*($(this).index())+900;
			}			
			$('body').stop().animate({'scrollTop':h});
			return false;
		})	
	});//scroll
	$('.sbcleft').find('img').attr('src','img/details/fangdajing/1.jpg');
});//$(function());
