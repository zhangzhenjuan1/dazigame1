window.onload=function(){
	var games=new game();
	var flag=true;
	$(".replay").click(function(){
		//
		//
		// alert(1);
		location.reload();
		// setTimeout()
		$(".title").hide(slow);
		games.play();

	});
	$(".pause").click(function(){
		games.pause();
	})
	document.onmousedown=function(e){
		e.preventDefault();
	};
	$(".begin").click(function(){
		$(".title").fadeOut("fast");
		setTimeout(function(){
			games.play();
		},1000);
		//games.play();
	})
};