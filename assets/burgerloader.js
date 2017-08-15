let bottomBun, bottomBunBox;
var OBJloader = new THREE.OBJLoader();
var textureLoader = new THREE.TextureLoader()
const moveUp = 100;

const breadMaterial = new THREE.MeshPhongMaterial({color:0xE8AC55});
const meatMaterial= new THREE.MeshLambertMaterial({color:0x7A3513});


const cheeseMaterial = new THREE.MeshPhongMaterial({color:0xFFE801});
const pickleMaterial = new THREE.MeshPhongMaterial({color:0x92aa5a,shininess:79});
const tomatoMaterial = new THREE.MeshPhongMaterial({color:0xCD2807,shininess:79});
const mayoMaterial = new THREE.MeshPhongMaterial({color:0xfffdc9,shininess:79});
const saladMaterial = new THREE.MeshPhongMaterial({color:0x49af00,shininess:79});

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
    //   scene.add( bottomBun);
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
