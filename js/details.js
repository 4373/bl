

//放大镜
var imgsrc='../img/details/fangdajing/';
var detailsIndex=0;
$('.pic_list').find('li').mouseenter(function(){
	
	$('.pic_box').find('img').attr('src',imgsrc+($(this).index()+1)+'.jpg');
	detailsIndex=$(this).index();
})

$('.pic_box').mousemove(function(e){
	
	e=e||event;
	//鼠标相当于框的坐标
	var ex=e.pageX-$(this).offset().left;
	var ey=e.pageY-$(this).offset().top;
	//控制鼠标点
	ex=ex<80?80:(ex>280?280:ex);
	ey=ey<80?80:(ey>280?280:ey);
	$('.big_pic').css('display','block').find('img').attr('src',imgsrc+'b'+(detailsIndex+1)+'.jpg');
	$('#cube').css({'left':ex-80,'top':ey-80,'display':'block'});
	$('.big_pic').find('img').css({'left':-2.22*(ex-80),'top':-2.22*(ey-80)})
	
}).mouseout(function(){
	$('.big_pic,#cube').css('display','none');		
})

refreshTime('2016/8/20 21:00')
//倒计时
function refreshTime(untilDay){
	var date=new Date(untilDay).getTime();
	var a=0
	$('.timer')[0].timer=setInterval(function(){
		var dNow=new Date().getTime();
		var t=(date-dNow)/1000; //总秒数
		var d=parseInt(t/(60*60*24));
		var h=parseInt((t-d*24*60*60)/60/60);
		var m=parseInt( (t-h*60*60-d*24*60*60 )/60);
		var s=parseInt( t-h*60*60-d*24*60*60-m*60 );
		if(d==0&&h==0&&m==0&&s==0){
			clearInterval($('.timer')[0].timer);
			$('.timer').text('活动结束');
			
		}
		$('.rday').text(d).next().text(h).next().text(m).next().text(s);
	},1000)
}

//购物数量控制
$('#thingscount').keyup(function(){
	
	var v=$(this).val();
	if(isNaN(v)||v.length>3||v.length==0||v==0){
		$(this).val(1);
	}	
})
$('#add').click(function(){
	$('#thingscount').val(function(i,v){
		return ++v;
	});
	$('#thingscount').keyup();
})
$('#remove').click(function(){
	$('#thingscount').val(function(i,v){
		return --v;
	});
	$('#thingscount').keyup();
})


//选项卡
$('.thingsinfo').children('li').click(function(){
	//选项卡红色span变化
	$(this).addClass('active').siblings().removeClass('active');
	//下面的内容变化
	$('.infodetails').find('li').eq($(this).index()).addClass('active').siblings().removeClass('active');
	
})
//获取评价数据
var plData=null;
$('.pj').one('mouseenter',function(){
	$.ajax({
		type:"get",
		url:"../data/pl.json",
		async:true,
		success:function(data){
			plData=data;
			//选项卡里面的评论数量
			$('.reviewcount').text(data.all.count);
			$('.goodr').text(data.all.good);
			$('.nbadr').text(data.all.notbad);
			$('.badr').text(data.all.bad);
			$('.showthis').text(data.all.show);
			$('.againr').text(data.all.additional);
			
			//加载十条评论内容
			loadPL(0,10,'all');

		}
	});
})
//点击差评，好评，全部，晒图等
$('.plkind').find('a').click(function(){
	
	$(this).addClass('light').siblings().removeClass('light');

	var pageCount=1;
	switch($(this).index()){
		case 0:loadPL(0,10,'all');
			break;
		case 1:loadPL(0,10,'good');
			break;
		case 2:loadPL(0,10,'notbad');
			break;
		case 3:loadPL(0,10,'bad');
			break;
		case 4:loadPL(0,10,'show');
			break;
		case 5:loadPL(0,10,'additional');
			break;
		default:;
	}

})


//加载评论函数
function  loadPL(start,end,limit,pageOnIndex){
	var data=[];
	$('.plcardbox').empty();
	$('.plpage').empty();
	switch(limit){
		case 'good':
		    for(var i=0;i<plData.data.length;i++){
				if(!plData.data[i]) break;
		        if(plData.data[i]['pingjia']==1){
		            data.push(plData.data[i]);
                }
            }
            break;
        case 'notbad':
            for(var i=0;i<plData.data.length;i++){
				if(!plData.data[i]) break;
                if(plData.data[i]['pingjia']==0){
                    data.push(plData.data[i]);
                }
            }
            break;
        case 'bad':
            for(var i=0;i<plData.data.length;i++){
				if(!plData.data[i]) break;
                if(plData.data[i]['pingjia']==-1){
                    data.push(plData.data[i]);
                }
            }
            break;
        case 'all':
            data=plData.data;
            break;
        case 'show':
            for(var i=0;i<plData.data.length;i++){
				if(!plData.data[i]) break;
                if(plData.data[i]['picbig']){
                    data.push(plData.data[i]);
                }
            }
            break;
        case 'additional':
            for(var i=0;i<plData.data.length;i++){
				if(!plData.data[i]) break;
                if(plData.data[i]['plagain']){
                    data.push(plData.data[i]);
                }
            }

            break;
        default:;
	}
    for(var i=start;i<end;i++){
		if(!data[i]) break;
				//评论骨架
		var pic=data[i].picbig?("<div class='plbigpic'><img src='"+data[i].picbig+"' width='400' /></div><div class='plsmallpic'><img src='"+data[i].picsmall+"' width='60' /></div>"):"";
		var paga=data[i].plagain?("<div class='plagain'>"+data[i].plagain+"</div>"):"";
		var plhtml="<div class='plcard'><div class='cardl'><div class='touxiang'><img src='../img/details/head.png' width='45' /></div><div class='buyername'>"
		+data[i].name+"</div><div class='buytime'>"
		+data[i].buytime+"</div></div><div class='cardr'><div class='plstar'><img src='"
		+data[i].plstar+"' /></div><div class='plfirst'>"
		+data[i].plfirst+"</div><div class='plpic'>"
		+pic+"</div><div class='pltime'>"
		+data[i].pltime+"</div>"
		+paga+"</div></div>";
		$('.plcardbox').append(plhtml);
    }
	tigglePicSize();
	getPage(data.length,pageOnIndex);
	clickNum();
}
//点击评论的图片放大或缩小
function tigglePicSize(){
	$('.plsmallpic').click(function(){
		$(this).prev().css('display','block');

	})
	$('.plbigpic').click(function(){
		$(this).css('display','none');
	})		
}

//根据数据生成下方的页码
function getPage(count,index){
	
	var page="";
	for(var i=0;i<Math.ceil(count/10);i++){
		page+="<a href='javascript:;'>"+(i+1)+"</a>"
	}
	$('.plpage').append(page).find('a').eq(index?index:0).addClass('on');
}



//点击页码
function clickNum(){
		var num=0;

		$('.plpage').find('a').click(function(){

			$(this).addClass('on').siblings().removeClass('on');
			num=$(this).index();
			toPage(num,$(this).index());
		})
		$('.pagemove').click(function(){
			var numNow=$('.plpage').find('.on').index();
			console.log($(this).index());
			if($(this).index()==0){//点击上一步
				numNow--;
				if(numNow==-1)return;
			}else{//点击下一步
				numNow++;
				if(numNow==$('.plpage').find('a').length) return;
			}
			num=numNow;
			toPage(num,num);
		})

	//num是第几页   pageindex
	function toPage(num,pageIndex) {
		var i = $('.plkind').find('.light').index();
		var keyword = '';
		switch (i) {
			case 0:
				keyword = 'all';
				break;
			case 1:
				keyword = 'good';
				break;
			case 2:
				keyword = 'notbad';
				break;
			case 3:
				keyword = 'bad';
				break;
			case 4:
				keyword = 'show';
				break;
			case 5:
				keyword = 'additional';
				break;
		}
		loadPL(num * 10, num * 10 + 10, keyword,pageIndex);
	}

}




