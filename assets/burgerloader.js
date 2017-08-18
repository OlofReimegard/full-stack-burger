var OBJloader = new THREE.OBJLoader();

const moveUp = 100;


const materials = {
    topBun: new THREE.MeshPhongMaterial({color: 0xE8AC55}),
    bottomBun: new THREE.MeshPhongMaterial({color: 0xE8AC55}),
    patty: new THREE.MeshPhongMaterial({color: 0x7A3513}),
    halloumi: new THREE.MeshPhongMaterial({color: 0xF7A207}),
    cheese: new THREE.MeshPhongMaterial({color: 0xE8B71C, shininess: 79}),
    pickles: new THREE.MeshPhongMaterial({color: 0x79a316, shininess: 2}),
    tomatoes: new THREE.MeshPhongMaterial({color: 0xCD2807}),
    mayo: new THREE.MeshPhongMaterial({color: 0xfffdc9, shininess: 50}),
    ketchup: new THREE.MeshPhongMaterial({color: 0xb70721, shininess: 50}),
    szechuan: new THREE.MeshPhongMaterial({color: 0x6d311d, shininess: 50}),
    salad: new THREE.MeshPhongMaterial({color: 0x3d990c,shininess: 50}),
    onion: new THREE.MeshPhongMaterial({color: 0xe9e4c8, shininess: 50})
};
let bottomBun,bottomBunBox;
var loadBBun = new Promise(function(resolve, reject) {

    OBJloader.load('./bottombun.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.bottomBun;
                child.shading = THREE.SmoothShading;

            }
        });
        bottomBun = object;
        bottomBun.price = .5;
        bottomBun.name = "Bottom bun";
        console.log(bottomBun);
        bottomBunBox = new THREE.Box3().setFromObject(object);
        bottomBunBox = (bottomBunBox.max.y - bottomBunBox.min.y);
        bottomBun.height = bottomBunBox;
        //   scene.add( bottomBun);
        resolve(bottomBun);

    });

});

let patty,
    pattyBox;
var loadPatty = new Promise(function(resolve, reject) {

    OBJloader.load('./patty.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.patty;
                child.shading = THREE.SmoothShading;

            }
        });

        object.position.y += moveUp;
        object.scale.x = 1.1;
        object.scale.z = 1.1;
        patty = object;
        patty.price = 2;
        patty.name = "Patty";
        pattyBox = new THREE.Box3().setFromObject(object);
        pattyBox = (pattyBox.max.y - pattyBox.min.y)*0.9;
        patty.height = pattyBox;
        // scene.add( patty );
        resolve(patty);

    });

});

let halloumi,
    halloumiBox;
var loadHalloumi = new Promise(function(resolve, reject) {

    OBJloader.load('./patty.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.halloumi;
                child.shading = THREE.SmoothShading;

            }
        });

        object.position.y += moveUp;
        object.scale.x = 1.1;
        object.scale.z = 1.1;
        halloumi = object;
        halloumi.price = 2;
        halloumi.name = "Halloumi";
        halloumiBox = new THREE.Box3().setFromObject(object);
        halloumiBox = (halloumiBox.max.y - halloumiBox.min.y)*0.9;
        halloumi.height = halloumiBox;
        // scene.add( patty );
        resolve(halloumi);

    });

});


let cheese,
    cheeseBox;
var loadCheese = new Promise(function(resolve, reject) {

    OBJloader.load('./cheese.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.cheese;
                child.shading = THREE.SmoothShading;

            }
        });

        object.position.y += moveUp;
        cheese = object;
        cheese.price = .5;
        cheese.name = "Cheese";
        cheeseBox = new THREE.Box3().setFromObject(object);
        cheeseBox = (cheeseBox.max.y - cheeseBox.min.y);
        cheese.height = cheeseBox;
        resolve(cheese)
    });

});

let pickles,
    picklesBox;
var loadPickles = new Promise(function(resolve, reject) {

    OBJloader.load('./pickles.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.pickles;
                child.shading = THREE.SmoothShading;

            }
        });

        object.position.y += moveUp;
        pickles = object;
        pickles.price = .5;
        pickles.name = "Pickles";
        picklesBox = new THREE.Box3().setFromObject(object);
        picklesBox = (picklesBox.max.y - picklesBox.min.y);
        pickles.height = picklesBox;
        resolve(pickles)

    });

});

let tomatoes,
    tomatoesBox;
var loadTomatoes = new Promise(function(resolve, reject) {

    OBJloader.load('./tomatoes.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.tomatoes;
                child.shading = THREE.SmoothShading;
            }
        });

        object.position.y += moveUp;
        tomatoes = object;
        tomatoes.price = .5;
        tomatoes.name = "Tomatoes";
        tomatoesBox = new THREE.Box3().setFromObject(object);
        tomatoesBox = (tomatoesBox.max.y - tomatoesBox.min.y);
        tomatoes.height = tomatoesBox;
        resolve(tomatoes);

    });

});

let topBun,
    topBunBox;
var loadTopBun = new Promise(function(resolve, reject) {

    OBJloader.load('./topbun.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.topBun;
                child.shading = THREE.SmoothShading;

            }
        });

        object.position.y = moveUp;
        topBun = object;
        topBun.price = 0;
        topBun.name = "Top-bun";
        topBunBox = new THREE.Box3().setFromObject(object);
        topBunBox = (topBunBox.max.y - topBunBox.min.y);
        topBun.height = topBunBox;
        resolve(topBun);

    });

});

let salad,
    saladBox;
var loadSalad = new Promise(function(resolve, reject) {

    OBJloader.load('./salad.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.salad;
                child.shading = THREE.SmoothShading;

            }
        });

        object.position.y = moveUp;
        salad = object;
        salad.price = .5;
        salad.name = "Salad";
        saladBox = new THREE.Box3().setFromObject(object);
        saladBox = (saladBox.max.y - saladBox.min.y) * .8;
        salad.height = saladBox;
        resolve(salad);

    });

});
let upperSauce,
    upperSauceBox;
var loadUpperSauce = new Promise(function(resolve, reject) {

    OBJloader.load('./uppersauce.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.mayo;
                child.shading = THREE.SmoothShading;

            }
        });

        object.position.y = moveUp;
        upperSauce = object;
        upperSauce.price = .5;
        upperSauce.name = "Mayo";
        upperSauceBox = new THREE.Box3().setFromObject(object);
        upperSauceBox = (upperSauceBox.max.y - upperSauceBox.min.y) * .5;
        upperSauce.height = upperSauceBox;
        resolve(upperSauce);

    });

});

let ketchup,
    ketchupBox;
var loadKetchup = new Promise(function(resolve, reject) {

    OBJloader.load('./uppersauce.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.ketchup;
                child.shading = THREE.SmoothShading;

            }
        });

        object.position.y = moveUp;
        ketchup = object;
        ketchup.price = .5;
        ketchup.name = "Ketchup";
        ketchupBox = new THREE.Box3().setFromObject(object);
        ketchupBox = (ketchupBox.max.y - ketchupBox.min.y) * .5;
        ketchup.height = ketchupBox;
        resolve(ketchup);

    });

});


var loadSzechuan = new Promise(function(resolve, reject) {

    OBJloader.load('./uppersauce.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.szechuan;
                child.shading = THREE.SmoothShading;

            }
        });

        object.position.y = moveUp;
        szechuan = object;
        szechuan.price = .5;
        szechuan.name = "Szechuan sauce";
        szechuanBox = new THREE.Box3().setFromObject(object);
        szechuanBox = (szechuanBox.max.y - szechuanBox.min.y) * .5;
        szechuan.height = szechuanBox;
        resolve(szechuan);

    });

});

let onion,
    onionBox;
var loadOnion = new Promise(function(resolve, reject) {

    OBJloader.load('./onion.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.onion;
                child.shading = THREE.SmoothShading;

            }
        });

        object.position.y = moveUp;
        object.scale.x = 1.5;
        object.scale.z = 1.5;
        onion = object;
        onion.price = .5;
        onion.name = "Onion";
        onionBox = new THREE.Box3().setFromObject(object);
        onionBox = (onionBox.max.y - onionBox.min.y);
        onion.height = onionBox;
        resolve(onion);

    });

});
let fries;

var loadFries = new Promise(function(resolve, reject) {

    fries = new THREE.Object3D();


    OBJloader.load('./friesbox.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.onion;
                child.shading = THREE.SmoothShading;

            }
        });




        fries.add(object);

        OBJloader.load('./fries.obj', function(object) {

            object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = materials.cheese;
                    child.shading = THREE.SmoothShading;

                }
            });

            fries.position.y = 200;

            fries.price = 1;
            fries.name = "fries"
            fries.add(object)
            resolve(fries);

        });

    });

});

let soda;
var loadSoda = new Promise(function(resolve, reject) {

    soda = new THREE.Object3D();


    OBJloader.load('./cup.obj', function(object) {

        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material = materials.ketchup;
                child.shading = THREE.SmoothShading;

            }
        });




        soda.add(object);

        OBJloader.load('./lid.obj', function(object) {

            object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = materials.onion;
                    child.shading = THREE.SmoothShading;

                }
            });




            soda.add(object)
            OBJloader.load('./straw.obj', function(object) {

                object.traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = materials.cheese;
                        child.shading = THREE.SmoothShading;

                    }
                });

                soda.position.y = 200;

                soda.price = 1;
                soda.name = "soda";
                soda.add(object);
                resolve(soda);

            });

        });

    });

});
