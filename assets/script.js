$(document).ready(function(){



    var scene = new THREE.Scene();







    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    scene.add( camera );
    camera.position.z = 200
    camera.position.y = 65;
    camera.position.x = 70


    var renderer = new THREE.WebGLRenderer({antialias: true,alpha: true });
    renderer.setClearColor( 0x000000, 0 );



    renderer.setSize(window.innerWidth, window.innerHeight)


    function de2ra(degree) {
        return degree*(Math.PI/180);
    }

    var keyLight = new THREE.DirectionalLight( 0xf4f4f4, 1.2 );
    keyLight.position.set( -30, 50, 20 );
    keyLight.target.position.set( 0, 0, 0 );
    scene.add( keyLight );

    var fillLight = new THREE.DirectionalLight( 0xf4f4f4, .2 );
    fillLight.position.set( 30, 30, 20 );
    fillLight.target.position.set( 0, 0, 0 );

    scene.add( fillLight);

    var fillLight2 = new THREE.DirectionalLight( 0xf4f4f4, .5 );
    fillLight2.position.set( 100,1,0 );
    fillLight2.target.position.set( 0, 0.5, 0 );
    scene.add( fillLight2);




    var moveThing,stackHeight;

    Promise.all([loadSalad,loadHalloumi,loadUpperSauce,loadKetchup,loadSzechuan,loadBBun,loadPatty,loadCheese,loadPickles,loadTomatoes,loadTopBun,loadOnion,loadFries,loadSoda]).then(values => {
        $(".load-img").fadeOut();
        $(".fp").fadeIn(1500).css("display","flex");
        stackHeight = bottomBunBox;

        var ingredientsArr = [bottomBun,salad,patty,halloumi,cheese,tomatoes,pickles,upperSauce,szechuan,ketchup,topBun,onion];
        var dropThing = function (ingredient) {
            var newingredient = ingredient.clone();
            scene.add(newingredient)
            var xPos = Math.floor((Math.random() * 480) + -240);
            var zPos = Math.floor((Math.random() * 20) + 50)
            var position = {y: 200, x: xPos, z: -zPos };
            var target = {y: -1500, x: xPos,  z: -zPos};
            var tween = new TWEEN.Tween(position).to(target, 10000);

            tween.onUpdate(function(){
                newingredient.position.y = position.y;
                newingredient.position.x = position.x;
                newingredient.position.z = position.z;
            });

            tween.start();

        };
        var price = 0;
        var stackArr = [
            [bottomBun,bottomBunBox], //0
            [salad,saladBox], //1
            [patty,pattyBox], //2
            [cheese,cheeseBox], //3
            [tomatoes,tomatoesBox], //4
            [pickles,picklesBox], //5
            [upperSauce,upperSauceBox], //6
            [ketchup,ketchupBox], //7
            [szechuan,szechuanBox], //8
            [onion,onionBox], //9
            [topBun,topBunBox],
            [halloumi,halloumiBox],
            [fries],
            [soda] //10
        ];
        var ingredientsList = []
        moveThing = function (ingredient, ingredientBox) {
            console.log(ingredientsList);
            var newingredient = ingredient.clone();
            newingredient.height = ingredient.height;
            newingredient.price = ingredient.price;
            newingredient.number = ingredientsList.length;
            ingredientsList.push([newingredient,newingredient.number,newingredient.name,newingredient.price]);
            console.log("once");
            scene.add(newingredient)

            var position = {y: 100 };
            var target = {y: stackHeight };
            var tween = new TWEEN.Tween(position).to(target, 800);

            tween.onUpdate(function(){
                newingredient.position.y = position.y;
            });
            tween.easing(TWEEN.Easing.Exponential.Out);

            tween.start();
            $("<p class='burger-menu-item' id='"+newingredient.number+"'>"+newingredient.name+"</p>").prependTo($(".ingredients-stack"));

            $(".burger-menu-item").unbind("click").click(function(e){
                console.log("once here",e.target);
                removeMesh(ingredientsList[e.target.id][0]);
                moveDown(e.target.id,ingredientsList[e.target.id][0].height);
                stackHeight -= ingredientsList[e.target.id][0].height;
                ingredientsList[e.target.id].push("removed");
                $(e.target).remove();
            });
            price += ingredient.price;
            $(".price").text(price+" €");
            stackHeight += ingredientBox;
        };
        var removeMesh = function(mesh) {
            var position = {x:0};
            var target = {x:-200};
            var tween = new TWEEN.Tween(position).to(target, 1500);

            tween.onUpdate(function(){
                mesh.position.x = position.x;
            });
            tween.easing(TWEEN.Easing.Exponential.Out);

            tween.start();
            price -= mesh.price;
            $(".price").text(price+" €");
            // scene.remove(mesh);
        }
        var moveDown = function(number,height) {
            ingredientsList.forEach((item) => {

                if(item[1] > number) {
                    console.log(item[0].position.y,item[0].position.y-height);
                    var position = {y:item[0].position.y};
                    var target = {y:item[0].position.y - height};
                    var tween = new TWEEN.Tween(position).to(target, 200);
                    tween.onUpdate(function(){
                        item[0].position.y = position.y;
                    });
                    tween.start();
                }
            });

        }
        var addSide = function (ingredient) {

            var newingredient = ingredient.clone();
            newingredient.number = ingredientsList.length;
            newingredient.price = ingredient.price;
            newingredient.name = ingredient.name;
            ingredientsList.push([newingredient,newingredient.number,newingredient.name,newingredient.price]);
            scene.add(newingredient);

            var position = {y: 200};
            var target = {y: 5};
            if(ingredient == soda) {
                position.x = -95;
                target.x = -95;
                position.z = -30;
                target.z = -30;
            } else {
                position.x = -55;
                target.x = -55;
                position.z = -60;
                target.z = -60;
                position.rz = de2ra(-25);
                target.rz = de2ra(-25);
            }
            var tween = new TWEEN.Tween(position).to(target, 500);

            tween.onUpdate(function(){

                newingredient.position.y = position.y;
                newingredient.position.x = position.x;
                newingredient.position.z = position.z;
                if(ingredient == fries) {
                    newingredient.rotation.y = position.rz;
                }
            });
            tween.easing(TWEEN.Easing.Bounce.Out);

            tween.start();

            price += ingredient.price;
            $(".price").text(price+" €");
        };


        var fpRender = function() {

            TWEEN.update();
            if($(".burger").css("display") == "none"){
                let burger = scene.children.filter((child) => {return child.type=="Group";});
                burger.forEach((child) => {

                        child.rotation.y += 0.005;
                        child.rotation.x += 0.005;
                        child.rotation.z += 0.005;

                });
            } else if (!$(".side-order").hasClass("on")) {

                let burger = scene.children.filter((child) => {return child.type=="Group";});
                burger.forEach((child) => {

                        child.rotation.y += 0.005;


                });
            }
            var fpAnimation = requestAnimationFrame(fpRender);
            $( ".fp-logo" ).click(function() {
                setTimeout(function(){
                    clearInterval(dropInterval);
                },500);
            });
            renderer.render(scene, camera);
        };
        $(renderer.domElement).appendTo($("body"));
        fpRender();
        var dropInterval = setInterval(function(){
            const randIng = Math.floor((Math.random() * 8) + 0);
            dropIngredient(ingredientsArr[randIng]);},1000);
        $( ".fp-btn" ).click(function() {

            $( ".fp" ).css({"top":"-100vh"});
            $( "body" ).css({"background-position":"center"});
            $( ".burger").delay(900).fadeIn("slow");
            //FIXA HÄR!!
            // $("body").css("background-image","url('/background2.jpg')");
            setTimeout(function(){
                $( ".outer-border").css("right","0vw");
                clearInterval(dropInterval);
                moveThing(bottomBun,bottomBunBox);

            },1200);
        });






        function dropIngredient(e){
            dropThing(e);

        }

        function addIngredient(e){

            var numbers;
            if(e.target !== this) {
                numbers = e.currentTarget.id;
            } else {
                numbers = e.target.id;
            }

            moveThing(stackArr[numbers][0],stackArr[numbers][1]);
            $("#outer-border").hide().fadeIn();

        }
        $(".ingredient").click(addIngredient);
        $(".burger-menu").click(function(){
            if($(".burger-menu").hasClass("burger-off")){
                $(".burger-menu").addClass("burger-on").removeClass("burger-off");
                $(".ingredients-stack").slideDown().css("display","flex");
            } else if($(".burger-menu").hasClass("burger-on")){
                $(".burger-menu").addClass("burger-off").removeClass("burger-on");
                $(".ingredients-stack").slideUp();
            }

        });

        $(".order-btn").click(function(){
            $(".first").removeClass("center").addClass("left");
            $(".second").removeClass("right").addClass("center");


            $(".side-order").click(function(e) {
                var numbers;
                if(e.target !== this &&$(e.currentTarget).hasClass("off")) {
                    numbers = e.currentTarget.id;
                    $(e.currentTarget).removeClass("off").addClass("on");
                    addSide(stackArr[numbers][0]);
                } else if (e.target == this &&$(e.target).hasClass("off")) {
                    numbers = e.target.id;
                    $(e.target).removeClass("off").addClass("on");
                    addSide(stackArr[numbers][0]);
                }

            });
        });

        $(".payment-btn").click(function(){
            $(".second").removeClass("center").addClass("left");
            $(".third").removeClass("right").addClass("center");


            $(".final-btn").click(function() {
                $("<div id='final-modal'><h1>Your burger is being made and will be delivered to your address ASAP!<br> Thank you for choosing Full Stack Burger </h1></div>").appendTo($("body")).fadeIn().css("display","flex");
                var order = ingredientsList.filter((ingredient) => {
                    return !ingredient[4];
                });
                console.log(order);
                $.post("/order",{order:order});
            });
        });


    });
});
