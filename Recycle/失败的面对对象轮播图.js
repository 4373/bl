function FloorPlay(f){
		//第几张图
		this.iNow=0; 
		//每个图片的宽度
		this.w=f.find('.floor-play').width()/4;
		this.floor=f;
	}
	FloorPlay.prototype={
		
		startPlay:function(){
			var This=this;
			this.next();
			this.timer=setInterval(function(){This.next()},3500) ;
		},
		next:function(){
			if(this.iNow==3){
				this.iNow=0;
			}
			this.floor.find('.floor-play').animate({left:this.iNow*-this.w});
			this.floor.find('.floor-bar a').width(0).eq(this.iNow).animate({width:'100%'},3000,'linear');
			this.iNow++;
			
			
				
			
		},
		stopPlay:function(){
			this.floor.find('.floor-bar a').stop(true,true);
			clearInterval(this.timer);
			this.timer=null;
		},
		moveTo:function(){
			if(this.iNow==3){
				this.iNow=0;
			}
			this.floor.find('.floor-play').animate({left:this.iNow*-this.w});
			this.floor.find('.floor-bar a').width(0).eq(this.iNow).css('width','100%');
			
		}
	}