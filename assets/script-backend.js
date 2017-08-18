"use strict";

(function () {
    var socket = io.connect();
    socket.on("welcome", function (data) {
        console.log(data.message);
        socket.emit("thanks", { message: 'thanks yo' });
    });

    socket.on("order", function (data) {
        console.log("order recieved");
        console.log(data.order);
        var order = {
            burger: [],
            fries: false,
            soda: false,
            price: 0
        };

        Array.from(data.order).forEach(function (thing) {
            console.log("orderorderorder");
            if (thing[0] == "soda") {
                order.soda = true;
            } else if (thing[0] == "fries") {
                order.fries = true;
            } else {
                order.burger.unshift(thing[0]);
            }
            order.price += thing[1];
        });

        var htmlBurger = "<div class='order'>";
        order.burger.forEach(function (item) {
            var ingredientName = "<h3 class='backend-burger-item'>" + item + "</h3>";
            htmlBurger += ingredientName;
        });

        data.delivery.forEach(function (item) {
            var deliveryInfo = "<p >" + item[0] + ":" + item[1] + "</p>";
            htmlBurger += deliveryInfo;
        });

        $(htmlBurger).appendTo($("body"));
        $(".order").click(function () {
            $(".order").css("margin-left", "65vw");
        });
    });
})();
