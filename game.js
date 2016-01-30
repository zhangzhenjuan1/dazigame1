window.onload= function () {
    function game(){
        // alert(1);
        //获取浏览器宽高
        // var guanka=document.getElementsByClassName("guanka")[0];
        this.clientw=document.documentElement.clientWidth;
        this.clienth=document.documentElement.clientHeight-200;
        this.letterArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        this.letterLen=5;
        this.speed=3;
        this.spans=[];
        this.currArr=[];
        this.currPosArr=[];
        this.die=10;
        this.sore=0;
        this.currSore=0;
        this.num=10;
        this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("span")[1];
        this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
        this.over=document.getElementsByClassName(".over")[0];
        this.aa=1;
    }
    game.prototype={
        play:function(){
            //将字母显示到body里面
            this.getLetter(this.letterLen);
            //让字母运动
            this.move();
            this.key();
        },
        pause:function(){
            this.move=none;
        },
        key:function(){
            var that=this;
            document.onkeydown=function(e){
                var ev=e||window.event;
                var code=String.fromCharCode(ev.keyCode);
                for(var i=0;i<that.spans.length;i++){
                    if(that.spans[i].innerHTML==code){
                        document.body.removeChild(that.spans[i]);
                        that.spans.splice(i,1);
                        //that.currArr.splice(i,1);
                        //that.currPosArr.splice(i,1);
                        that.getLetter(1);
                        that.sore++;
                        that.currSore++;
                        that.soreEle.innerHTML=that.sore;
                        if(that.currSore%that.num==0){
                            that.aa++;
                            alert("第"+that.aa+"关");

                            // $(".guanka").css({animation:an1 1s linear 1}).find("span").html("that.aa");
                            that.next();
                        }
                        break;
                    }
                }
            }
        },

        next:function(){
            clearInterval(this.t);
            for(var i=0;i<this.spans.length;i++){
                this.span[i].style.webkitTransform="scale(1.1,1.1)";
                this.span[i].style.webkitTransition="all linear 0.3s";
                document.body.removeChild(this.spans[i]);
            }
            this.spans=[];
            //this.currArr=[];
            //this.currPosArr=[];
            this.speed++;
            this.letterLen++;

            this.currSore=0;
            this.num+=10;

            this.play();
            this.die=10;
            this.sore=0;
        },

        move:function(){
            var that=this;
            this.t=setInterval(function(){
                for(var i=0;i<that.spans.length;i++){
                    var top=that.spans[i].offsetTop+that.speed;
                    that.spans[i].style.top=top+"px";
                    if(top>that.clienth){
                        document.body.removeChild(that.spans[i]);
                        that.spans.splice(i,1);
                        //that.currArr.splice();
                        //that.currPosArr.splice();
                        that.getLetter(1);
                        that.die--;
                        that.dieEle.innerHTML=that.die;
                        if(that.die==0){
                            //that.over.style.display="block";
                            //alert(1);
                            alert("game over!");
                            //alert(that.over);
                            //var over=document.createElement(div);
                            //over.attribute("class","over");
                            //over.style.html("GAME OVER!");
                            //document.body.appendChild(over);
                            //over.attribute("class",)
                            //location.reload();
                            //that.over.style.display="block";
                            location.reload();
                            //that.restart();
                        }


                    }
                }

            },60)
        },

        restart:function(){
            clearInterval(this.t);
            for(var i=0;i<this.spans.length;i++){
                document.body.removeChild(this.spans[i]);
            }
            this.spans=[];
            this.currArr=[];
            this.currPosArr=[];
            this.speed=3;
            this.letterLen=5;
            this.currSore=0;
            this.num=10;
            this.die=10;
            this.sore=0;
            this.dieEle.innerHTML=10;
            this.soreEle.innerHTML=0;
            this.play();
        },

        getLetter:function(num){
            //先获取到指定的字母
            var arr=this.getRand(num);
            var posArr=[];
            var eleArr=[];
            for(var i=0;i<arr.length;i++){
                var span=document.createElement("span");
                //span.attr("class","zi");
                span.innerHTML=arr[i];


                var x=(100+(this.clientw-200)*Math.random());
                var y=(100*Math.random());
                var width=30;
                while (this.check1(posArr,x,width)){
                    x=(100+(this.clientw-200)*Math.random());
                }
                posArr.push({minx:x,maxx:x+width});
                this.currPosArr.push({minx:x,maxx:x+width});
                span.style.cssText="width:"+width+"px;position:absolute;left:"+x+"px;top:"+y+"px;color:#F75E44;font-size:60px;";
                //span.style.css="color:'+Math.random()+'"

                document.body.appendChild(span);
                // eleArr.push(span);
                this.spans.push(span);
            }
            // return eleArr;

        },
        check1:function(arr,x,width){
            for(var i=0;i<arr.length;i++){
                if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                    return true;
                }
            }
            return false;
        },
        getRand:function(num){
            var arr=[];
            for(var i=0;i<num;i++) {
                var rand = Math.floor(this.letterArr.length * Math.random());
                while(this.check(this.currArr,this.letterArr[rand])){
                    rand = Math.floor(this.letterArr.length * Math.random());
                }
                arr.push(this.letterArr[rand]);
                this.currArr.push(this.letterArr[rand]);
            }

            return arr;

        },
        check:function(arr,val){
            for(var i=0;i<arr.length;i++){
                if(arr[i]==val){
                    return true;
                }
            }
            return false;
        }
        //check1:function(arr,x,width){
        //    for(var i=0;i<arr.length;i++){
        //        if(!(x+width<arr[i].minx||arr[i].maxx<x)){
        //            return true;
        //        }
        //    }
        //    return false;
        //}

    };



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
    //$(".pause").click(function(){
    //    games.pause();
    //});
    document.onmousedown=function(e){
        e.preventDefault();
    };
    $(".begin").click(function(){
        $(".title").fadeOut("fast");
        setTimeout(function(){
            games.play();
        },1000);
        //games.play();
    });
    if(games.die==0){
        //this.over.style.display="block";
        $(".over").show();
        //alert(1);
        //alert("game over!");
        location.reload();
        that.restart();
    }


}