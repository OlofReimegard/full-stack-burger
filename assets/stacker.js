var scene = new THREE.Scene();

//
var textureLoader = new THREE.TextureLoader()

const  breadMaterial = new THREE.MeshPhongMaterial({color:0xE8AC55,map: new textureLoader.load('./breadtexture.jpg')});
// const  meatMaterial = new THREE.MeshStandardMaterial({color:0x7A3513});
// meatMaterial.bumpMap = textureLoader.load('./Gravel-2408-bump-map.jpg',() => {});


const meatMaterial= new THREE.MeshLambertMaterial({color:0x7A3513});


const  cheeseMaterial = new THREE.MeshPhongMaterial({color:0xFFE801});
const  pickleMaterial = new THREE.MeshPhongMaterial({color:0x92aa5a,shininess:79});
const  tomatoMaterial = new THREE.MeshPhongMaterial({color:0xCD2807,shininess:79});
const  mayoMaterial = new THREE.MeshPhongMaterial({color:0xfffdc9,shininess:79});
const  saladMaterial = new THREE.MeshPhongMaterial({color:0x49af00,shininess:79});

// material.map = new THREE.TextureLoader().load('./breadtexture.jpg')


var OBJloader = new THREE.OBJLoader();
var MTLloader = new THREE.MTLLoader();


const moveUp = 100;


// load a resource
// var camera = new THREE.OrthographicCamera( window.innerWidth / - 12, window.innerWidth / 12, window.innerHeight / 12, window.innerHeight / - 12, 0.1, 100 );
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

var backLight = new THREE.DirectionalLight( 0xf4f4f4, .1 );
backLight.position.set( 0, 0, -10);
backLight.target.position.set( 0, 0, 0 );

// scene.add( backLight );

var fillLight = new THREE.DirectionalLight( 0xf4f4f4, .2 );
fillLight.position.set( 30, 30, 20 );
fillLight.target.position.set( 0, 0, 0 );

scene.add( fillLight);

let bottomBun, bottomBunBox;
var loadBBun = new Promise(function(resolve, reject) {

  OBJloader.load( './bottombun.obj', function ( object ) {

      object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
              child.material = breadMaterial;
              child.shading = THREE.SmoothShading;

          }
      } );
      bottomBun = object;
      console.log(bottomBun);
      bottomBunBox = new THREE.Box3().setFromObject(object);
      bottomBunBox = (bottomBunBox.max.y - bottomBunBox.min.y);
      scene.add( bottomBun);
      resolve(bottomBun);

  } );

});


let patty, pattyBox;
var loadPatty = new Promise(function(resolve, reject) {

    OBJloader.load( './patty.obj', function ( object ) {

        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = meatMaterial;
                child.shading = THREE.SmoothShading;

            }
        } );

        object.position.y += moveUp;
        patty = object;
        pattyBox = new THREE.Box3().setFromObject(object);
        pattyBox = (pattyBox.max.y - pattyBox.min.y);
        // scene.add( patty );
        resolve(patty);
    } );

});

let cheese,cheeseBox;
var loadCheese = new Promise(function(resolve, reject) {

    OBJloader.load( './cheese.obj', function ( object ) {

        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = cheeseMaterial;
                child.shading = THREE.SmoothShading;

            }
        } );

        object.position.y += moveUp;
        cheese = object;
        cheeseBox = new THREE.Box3().setFromObject(object);
        cheeseBox = (cheeseBox.max.y - cheeseBox.min.y);
        // scene.add( cheese );
        resolve(cheese)
    } );

});

let pickles, picklesBox;
var loadPickles = new Promise(function(resolve, reject) {

    OBJloader.load( './pickles.obj', function ( object ) {

        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = pickleMaterial;
                child.shading = THREE.SmoothShading;

            }
        } );

        object.position.y += moveUp;
        pickles = object;
        picklesBox = new THREE.Box3().setFromObject(object);
        picklesBox = (picklesBox.max.y - picklesBox.min.y);
        // scene.add( pickles );
        resolve(pickles)

    } );

});


let tomatoes, tomatoesBox;
var loadTomatoes= new Promise(function(resolve, reject) {

    OBJloader.load( './tomatoes.obj', function ( object ) {

        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = tomatoMaterial;
                child.shading = THREE.SmoothShading;

            }
        } );
        object.position.y += moveUp;
        tomatoes = object;
        tomatoesBox = new THREE.Box3().setFromObject(object);
        tomatoesBox = (tomatoesBox.max.y - tomatoesBox.min.y);
        // scene.add( tomatoes );
        resolve(tomatoes);

    } );

});

let topBun, topBunBox;
var loadTopBun= new Promise(function(resolve, reject) {

    OBJloader.load( './topbun.obj', function ( object ) {

        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = breadMaterial;
                child.shading = THREE.SmoothShading;

            }
        } );
        object.position.y = moveUp;
        topBun=  object;
        topBunBox = new THREE.Box3().setFromObject(object);
        topBunBox = (topBunBox.max.y - topBunBox.min.y);
        // scene.add( topBun );
        resolve(topBun);

    } );


});
let bottomSauce, bottomSauceBox;
var loadBottomSauce= new Promise(function(resolve, reject) {

    OBJloader.load( './bottomSauce.obj', function ( object ) {

        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = tomatoMaterial;
                child.shading = THREE.SmoothShading;

            }
        } );
        object.position.y = moveUp;
        bottomSauce=  object;
        bottomSauceBox = new THREE.Box3().setFromObject(object);
        bottomSauceBox = (bottomSauceBox.max.y - bottomSauceBox.min.y)*.5;
        // scene.add( bottomSauce );
        resolve(bottomSauce);

    } );


});

let salad, saladBox;
var loadSalad= new Promise(function(resolve, reject) {

    OBJloader.load( './salad.obj', function ( object ) {

        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = saladMaterial;
                child.shading = THREE.SmoothShading;

            }
        } );
        object.position.y = moveUp;
        salad=  object;
        saladBox = new THREE.Box3().setFromObject(object);
        saladBox = (saladBox.max.y - saladBox.min.y)*.8;
        // scene.add( salad );
        resolve(salad);

    } );


});
let upperSauce, upperSauceBox;
var loadUpperSauce= new Promise(function(resolve, reject) {

    OBJloader.load( './uppersauce.obj', function ( object ) {

        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = mayoMaterial;
                child.shading = THREE.SmoothShading;

            }
        } );
        object.position.y = moveUp;
        upperSauce=  object;
        upperSauceBox = new THREE.Box3().setFromObject(object);
        upperSauceBox = (upperSauceBox.max.y - upperSauceBox.min.y)*.5;
        // scene.add( upperSauce );
        resolve(upperSauce);

    } );


});
var moveThing,stackHeight;

Promise.all([loadSalad,loadUpperSauce,loadBBun,loadPatty,loadCheese,loadPickles,loadTomatoes,loadTopBun]).then(values => {
    stackHeight = bottomBunBox;
    // var stackHeight = 0;

    moveThing = function (ingredient, ingredientBox) {
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



    var render = function() {

        TWEEN.update();
        let burger = scene.children.filter((child) => {return child.type=="Group";});
        burger.forEach((child) => {

                child.rotation.y += 0.005;

        });
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };
    $(renderer.domElement).appendTo($(".burger"));
    render();
    // $( ".fp-logo" ).click(function() {
        console.log("hello");
        $( ".fp" ).fadeOut("slow");
        $( ".burger").delay(900).fadeIn("slow");
        $("body").css("background-image","url('/background2.jpg')");
        setTimeout(function(){

        },900);
    // });


    var ingredientsArr = [bottomSauce,bottomSauceBox,salad,saladBox,patty,pattyBox,cheese,cheeseBox,tomatoes,tomatoesBox,pickles,picklesBox,upperSauce,upperSauceBox,topBun,topBunBox];

    var hello = $(".outer-border");
    function addIngredient(e){
        var numbers = e.target.id.split(" ");
        console.log(numbers);
        console.log(ingredientsArr[numbers[0]],ingredientsArr[numbers[1]]);
        moveThing(ingredientsArr[numbers[0]],ingredientsArr[numbers[1]]);
        $("#outer-border").hide().fadeIn();

    }
    $(hello).click(addIngredient);
});
