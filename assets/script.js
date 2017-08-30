"use strict";

$(document).ready(function () {

    /**scene**/
    var scene = new THREE.Scene();
    /**renderer**/
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    /**camera**/
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    scene.add(camera);
    camera.position.z = 200;
    camera.position.y = 55;
    camera.position.x = 70;
    /**lights**/
    var keyLight = new THREE.DirectionalLight(0xf4f4f4, 1.4);
    keyLight.position.set(-30, 50, 20);
    keyLight.target.position.set(0, 0, 0);
    scene.add(keyLight);

    var fillLight = new THREE.DirectionalLight(0xf4f4f4, .3);
    fillLight.position.set(30, 30, -20);
    fillLight.target.position.set(0, 0, 0);

    scene.add(fillLight);

    var fillLight2 = new THREE.DirectionalLight(0xf4f4f4, .7);
    fillLight2.position.set(100, 1, 0);
    fillLight2.target.position.set(0, 0.5, 0);
    scene.add(fillLight2);



    function de2ra(degree) {
        return degree * (Math.PI / 180);
    }

    //
    var stackIngredient, stackHeight;
    /**promise all loading all the assets**/
    Promise.all([loadSalad, loadHalloumi,loadPatty,loadSoda,loadFries,loadOnion,loadPickles,loadBBun,loadCheese,loadTopBun,loadUpperSauce, loadKetchup, loadSzechuan,loadTomatoes]).then(function (values) {
        /**fade out loading text and launch first page**/
        $(".load-img").fadeOut();
        $(".fp").fadeIn(1500).css("display", "flex");

        /**set height where first chosen ingredient should land, height of the bottom bun**/
        stackHeight = bottomBunBox;
        /**set starting price, this is altered in the **/
        var price = 0

        /**array used for selecting random ingredients for the start page **/
        var ingredientsArr = [bottomBun, salad, patty, halloumi, cheese, tomatoes, pickles, upperSauce, szechuan, ketchup, topBun, onion];

        /**with reference to the imported mesh, and the box for calculating its height **/
        var stackArr = [
        [bottomBun, bottomBunBox], //0
        [salad, saladBox], //1
        [patty, pattyBox], //2
        [cheese, cheeseBox], //3
        [tomatoes, tomatoesBox], //4
        [pickles, picklesBox], //5
        [upperSauce, upperSauceBox], //6
        [ketchup, ketchupBox], //7
        [szechuan, szechuanBox], //8
        [onion, onionBox], //9
        [topBun, topBunBox],//11
        [halloumi, halloumiBox],//12
        [fries],//13
        [soda] //14
        ];

        function dropThing(ingredient) {
            var newingredient = ingredient.clone();
            scene.add(newingredient);
            var xPos = Math.floor(Math.random() * 480 + -240);
            var zPos = Math.floor(Math.random() * 20 + 50);
            var position = { y: 200, x: xPos, z: -zPos };
            var target = { y: -1500, x: xPos, z: -zPos };
            var tween = new TWEEN.Tween(position).to(target, 10000);

            tween.onUpdate(function () {
                newingredient.position.y = position.y;
                newingredient.position.x = position.x;
                newingredient.position.z = position.z;
            });

            tween.start();
        };



        var ingredientsList = [];
        function stackIngredient(ingredient, ingredientBox) {
            var newingredient = ingredient.clone();
            newingredient.height = ingredient.height;
            newingredient.price = ingredient.price;
            newingredient.number = ingredientsList.length;
            ingredientsList.push([newingredient, newingredient.number, newingredient.name, newingredient.price]);
            scene.add(newingredient);

            var position = { y: 100 };
            var target = { y: stackHeight };
            var tween = new TWEEN.Tween(position).to(target, 800);

            tween.onUpdate(function () {
                newingredient.position.y = position.y;
            });
            tween.easing(TWEEN.Easing.Exponential.Out);

            tween.start();
            $("<p class='burger-menu-item' id='" + newingredient.number + "'>" + newingredient.name + "</p>").prependTo($(".ingredients-stack"));

            $(".burger-menu-item").unbind("click").click(function (e) {
                removeMesh(ingredientsList[e.target.id][0]);
                moveDown(e.target.id, ingredientsList[e.target.id][0].height);
                stackHeight -= ingredientsList[e.target.id][0].height;
                ingredientsList[e.target.id].push("removed");
                $(e.target).remove();
            });
            price += ingredient.price;
            $(".price").text(price + " €");
            stackHeight += ingredientBox;
        }
        function removeMesh(mesh) {
            var position = { x: 0 };
            var target = { x: -200 };
            var tween = new TWEEN.Tween(position).to(target, 1500);

            tween.onUpdate(function () {
                mesh.position.x = position.x;
            });
            tween.easing(TWEEN.Easing.Exponential.Out);

            tween.start();
            price -= mesh.price;
            $(".price").text(price + " €");
        }
        function moveDown(number, height) {
            ingredientsList.forEach(function (item) {

                if (item[1] > number) {
                    var position = { y: item[0].position.y };
                    var target = { y: item[0].position.y - height };
                    var tween = new TWEEN.Tween(position).to(target, 200);
                    tween.onUpdate(function () {
                        item[0].position.y = position.y;
                    });
                    tween.start();
                }
            });
        };
        function addSide(ingredient) {

            var newingredient = ingredient.clone();
            newingredient.number = ingredientsList.length;
            newingredient.price = ingredient.price;
            newingredient.name = ingredient.name;
            ingredientsList.push([newingredient, newingredient.number, newingredient.name, newingredient.price]);
            scene.add(newingredient);

            var position = { y: 200 };
            var target = { y: 5 };
            if (ingredient == soda) {
                position.x = -97;
                target.x = -97;
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

            tween.onUpdate(function () {

                newingredient.position.y = position.y;
                newingredient.position.x = position.x;
                newingredient.position.z = position.z;
                if (ingredient == fries) {
                    newingredient.rotation.y = position.rz;
                }
            });
            tween.easing(TWEEN.Easing.Bounce.Out);

            tween.start();

            price += ingredient.price;
            $(".price").text(price + " €");
        };

        function fpRender() {

            TWEEN.update();
            if ($(".burger").css("display") == "none") {
                var burger = scene.children.filter(function (child) {
                    return child.type == "Group";
                });
                burger.forEach(function (child) {

                    child.rotation.y += 0.005;
                    child.rotation.x += 0.005;
                    child.rotation.z += 0.005;
                });
            } else if (!$(".side-order").hasClass("on")) {

                var _burger = scene.children.filter(function (child) {
                    return child.type == "Group";
                });
                _burger.forEach(function (child) {

                    child.rotation.y += 0.005;
                });
            }
            var fpAnimation = requestAnimationFrame(fpRender);
            $(".fp-logo").click(function () {
                setTimeout(function () {
                    clearInterval(dropInterval);
                }, 500);
            });
            renderer.render(scene, camera);
        }
        $(renderer.domElement).appendTo($("body"));
        fpRender();
        var dropInterval = setInterval(function () {
            var randIng = Math.floor(Math.random() * 8 + 0);
            dropIngredient(ingredientsArr[randIng]);
        }, 1000);


        function dropIngredient(e) {
            dropThing(e);
        }

        function addIngredient(e) {

            var numbers;
            if (e.target !== this) {
                numbers = e.currentTarget.id;
            } else {
                numbers = e.target.id;
            }

            stackIngredient(stackArr[numbers][0], stackArr[numbers][1]);
            $("#outer-border").hide().fadeIn();
        }

        function post(order) {
            $.ajax({
                type: "POST",
                url: "/order",
                data: order
            });
        }

        $(".fp-btn").click(function () {

            $(".fp").css({ "top": "-100vh" });
            $("body").css({ "background-position": "center" });
            $(".burger").delay(900).fadeIn("slow");
            //FIXA HÄR!!
            // $("body").css("background-image","url('/background2.jpg')");
            setTimeout(function () {
                $(".outer-border").css("right", "0vw");
                clearInterval(dropInterval);
                stackIngredient(bottomBun, bottomBunBox);
            }, 1200);
        });

        $(".ingredient").click(function (e) {
            addIngredient(e);
            $(".burger-menu").css("transform", "scale(1.5)").delay(200).queue(function (next) {
                $(this).css("transform", "scale(1)");
                next();
            });
        });

        $(".burger-menu").click(function () {
            if ($(".burger-menu").hasClass("burger-off")) {
                $(".burger-menu").addClass("burger-on").removeClass("burger-off");
                $(".ingredients-stack").slideDown().css("display", "flex");
            } else if ($(".burger-menu").hasClass("burger-on")) {
                $(".burger-menu").addClass("burger-off").removeClass("burger-on");
                $(".ingredients-stack").slideUp();
            }
        });

        $(".order-btn").click(function () {
            $(".first").removeClass("center").addClass("left");
            $(".second").removeClass("right").addClass("center");

            $(".side-order").click(function (e) {
                var numbers;
                if (e.target !== this && $(e.currentTarget).hasClass("off")) {
                    numbers = e.currentTarget.id;
                    $(e.currentTarget).removeClass("off").addClass("on");
                    addSide(stackArr[numbers][0]);
                } else if (e.target == this && $(e.target).hasClass("off")) {
                    numbers = e.target.id;
                    $(e.target).removeClass("off").addClass("on");
                    addSide(stackArr[numbers][0]);
                }
            });
        });


        $(".payment-btn").click(function () {
            $(".second").removeClass("center").addClass("left");
            $(".third").removeClass("right").addClass("center");

            $(".pay-on-delivery").click(function (e) {
                if (e.target !== this && $(e.currentTarget).hasClass("off")) {
                    $(e.currentTarget).removeClass("off").addClass("on");
                } else if (e.target == this && $(e.target).hasClass("off")) {
                    $(e.target).removeClass("off").addClass("on");
                }
            });

            $(".final-btn").unbind("click").click(function () {
                $("<div id='final-modal'><h1>Your burger is being made and will be delivered to your address ASAP!<br> Thank you for choosing Full Stack Burger </h1></div>").appendTo($("body")).fadeIn().css("display", "flex");
                var order = ingredientsList.map(function (ingredient) {
                    var orderVals = [ingredient[2], ingredient[3], ingredient[4]];
                    return orderVals;
                }).filter(function (ingredient) {
                    return ingredient[2] != "removed";
                });
                var delivery = [];
                delivery.push(["name", $("#delivery-name").val()]);
                delivery.push(["address", $("#delivery-address").val()]);
                delivery.push(["email", $("#delivery-email").val()]);
                delivery.push(["payment method", "On delivery"]);
                if (order && delivery) {
                    post({
                        order: JSON.stringify(order),
                        delivery: JSON.stringify(delivery)
                    });
                }
            });
            return false;
        });
    });
});
