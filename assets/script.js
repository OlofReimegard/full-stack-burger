$(document).ready(function(){



var scene = new THREE.Scene();





// load a resource
// var camera = new THREE.OrthographicCamera( window.innerWidth / - 12, window.innerWidth / 12, window.innerHeight / 12, window.innerHeight / - 12, 0.1, 1000 );
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
scene.add( camera );
camera.position.z = 150
camera.position.y = 65;
camera.position.x = 40
// camera.position.z = 40
// camera.position.y = 30;
// camera.position.x = 50
camera.rotation.x += de2ra(-10);

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
function loadObjects(){
    return new Promise(()=>{
        resolve()
    });
}

var moveThing,stackHeight;

Promise.all([loadSalad,loadUpperSauce,loadBBun,loadPatty,loadCheese,loadPickles,loadTomatoes,loadTopBun]).then(values => {

    stackHeight = bottomBunBox;

    var ingredientsArr = [bottomSauce,salad,patty,cheese,tomatoes,pickles,upperSauce,topBun];
    var dropThing = function (ingredient) {
        var newingredient = ingredient.clone();
        scene.add(newingredient)
        var xPos = Math.floor((Math.random() * 480) + -240);
        var position = {y: 200, x: xPos, z: -150 };
        var target = {y: -1500, x: xPos,  z: -150};
        var tween = new TWEEN.Tween(position).to(target, 10000);

        tween.onUpdate(function(){
            newingredient.position.y = position.y;
            newingredient.position.x = position.x;
            newingredient.position.z = position.z;
        });

        tween.start();

    };
    var stackArr = [bottomBun,bottomBunBox,salad,saladBox,patty,pattyBox,cheese,cheeseBox,tomatoes,tomatoesBox,pickles,picklesBox,upperSauce,upperSauceBox,topBun,topBunBox];
    moveThing = function (ingredient, ingredientBox) {
        console.log(ingredient,ingredientBox);
        var newingredient = ingredient.clone();
        scene.add(newingredient)

        var position = {y: 100 };
        var target = {y: stackHeight };
        var tween = new TWEEN.Tween(position).to(target, 800);

        tween.onUpdate(function(){
            newingredient.position.y = position.y;
        });
        tween.easing(TWEEN.Easing.Exponential.Out);

        tween.start();
        stackHeight += ingredientBox;
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
        } else {
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
        const randIng = Math.floor((Math.random() * 7) + 1);
        dropIngredient(ingredientsArr[randIng]);console.log("hello");},1000);
    $( ".fp-logo" ).click(function() {
        console.log("hello");
        $( ".fp" ).fadeOut(1000);
        $( ".burger").delay(900).fadeIn("slow");
        $("body").css("background-image","url('/background2.jpg')");
        setTimeout(function(){
            moveThing(bottomBun,bottomBunBox);
        },900);
    });






    function dropIngredient(e){
        dropThing(e);

    }
    var hello = $(".outer-border");
    function addIngredient(e){
        var numbers = e.target.id.split(" ");
        console.log(stackArr[numbers[0]],stackArr[numbers[1]]);
        moveThing(stackArr[numbers[0]],stackArr[numbers[1]]);
        $("#outer-border").hide().fadeIn();

    }
    $(hello).click(addIngredient);

});
});
