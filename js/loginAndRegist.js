$(function(){
///////----------------------------------------------登陆	
	var data=autoInput();
			
			$('#userName').val(data.name);
			$("#passWord").val(data.value);
			$('#lgbtn').click(function(){
				var userName=$('#userName').val();
				var password=$("#passWord").val();
				if(userName.length==0){
					showError('请输入用户名');
					return;
				}
				if(password.length==0){
					showError('请输入密码');
					return;
				}
				else{
					if(password.length<6||password.length>20){
						showError('密码长度为6-20位字符');
						return 
					}
				}
				$.ajax({
					url:'../data/user.json',
					type:'get',
					cache:true,
					success:function(data){
						
						for(var i=0;i<data.length;i++){

							if(data[i].userName==userName&&data[i].password==password){
								showError('登录成功');
								setCookie('userName',userName,10);
								setCookie('password',password,10);
								window.location.assign('../index.html');
								return;
							}
						}
						showError('用户名或密码不正确');
					}
					
				})
				
			});
			//显示错误信息
			function showError(str){
				if(str){
					$('.lgh').css('margin-bottom','10px');
					$('.errormes').css('display','block').html(str);
				}
				else{
					$('.lgh').css('margin-bottom','30px');
					$('.errormes').css('display','none')
				}
				
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
			//自动填充用户名密码
			function autoInput(){
				var cookie=document.cookie;
				if(cookie.length!=0){
					var n=getCookie('userName')
					if(!n)return "";
					var v=getCookie('password');
					return {name:n,value:v}
				}
				return "";
			}
	
	
	
	
	
	//----------------------------------------注册
			//条件是否满足
		var un=false;
		var psw=false;
		var cpsw=false;
		var mp=false;
		var e=0.5;
		$('#username').blur(function(){		
			if($(this).val().length==0){
				showStutas($('.une'),0);
			}else{
				var re=/^[a-z0-9]{6,20}$/i;
				if(re.test($(this).val())){
					$.ajax({
						type:"get",
						url:"../data/user.json",
						async:true,
						success:function(data){
							for(var i=0;i<data.length;i++){
								var v=$('#username').val();
								if(data[i].userName==v){
									showStutas($('.une'),1);
									return;
								}					
							}
							showStutas($('.une'),3);
							 un=true;
						}
					});
				}else{
					showStutas($('.une'),2);
				}	
			}	
			
		});
		
		$('#password1').blur(function(){
			var v=$(this).val();
			if(v.length==0){
				showStutas($('.pswe'),0);
			}
			else{
				var re=/\w{6,20}/ig;
				
				if(re.test(v)){
					showStutas($('.pswe'),2);
					psw=true;
					return
				}
				else{
					showStutas($('.pswe'),1);
				}
			}
			psw=false;
		})
		$('#password2').blur(function(){
			var v=$(this).val();
			var v1=$('#password1').val();
			if(v.length==0){
				showStutas($('.cpswe'),0);
			}
			else{
				if(v==v1){
					showStutas($('.cpswe'),2);
					cpsw=true;
					return;
				}
				else{
					showStutas($('.cpswe'),1);
				}
			}
			cpsw=false;
		})
		$('#phone').blur(function(){
			var v=$(this).val();
			if(v.length==0){
				showStutas($('.pe'),0);
			}
			else{
				var re=/^1[34578]\d{9}$/g
				if(re.test(v)){
					showStutas($('.pe'),2);
					mp=true;
					return
				}
				else{
					showStutas($('.pe'),1);
				}
			}
			mp=false;
		})
		
		$('#email').blur(function(){
			e=0.5;
			var v=$(this).val();
			var re=/\w{1,18}@[a-z0-9]{2,4}\.[a-z0-9]{2,4}/;
			if(re.test(v)){
				showStutas($('.ee'),1);
				e+=0.5;
				return
			}
			e-=0.5;
			showStutas($('.ee'),0);
			console.log('11111111'+isRight)
		})
		
		$('#registBtn').click(function(){
			//必须项填对
			if(un&&psw&&cpsw&&mp){
				if(e==0||e==0.5){	
					if(!confirm('确定注册?邮箱不会被记录')){
						return;	
					}
											
				}else{
					setCookie('email',$('#email').val(),10);
				}
			
				setCookie('userName',$('#username').val(),10);
				setCookie('password',$('#password1').val(),10);
				setCookie('phone',$('#phone').val(),10);
				window.location.assign('login.html');
			
			}
		})
		
		function showStutas(parent,index){
			parent.find('li').eq(index).fadeIn(500).siblings().fadeOut(0);
		}
})
