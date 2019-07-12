$(document).ready(function () {
    var canvas,
        ctx,
        on = false,
        $power = $("#power"),
        $inner = $("#inner"),
        $h1,
        url =
            "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
        tweet = 'https://twitter.com/intent/tweet?text=',
        $a = $("a"),
        quote = false,
        interval,
        message,
        $p,
        i,
        $span,
        typing,
        author
        ;
    drawAntennas();
    drawTable();

    $power.click(function () {
        $power.prop('disabled', true);
        window.setTimeout(function () {
            $power.prop('disabled', false);
        }, 250);
        if (on) {
            if (interval !== true) {
                clearInterval(interval);
                interval = true;
                typing = false;
            }
            $power.css({ color: "red" });
            on = false;
            $inner.html("");
            turnOff();
        } else {
            turnOn();
        }
    });

    $("#quote").click(function () {
        if (on && !typing) {
            $h1 = $('h1');
            $h1.fadeTo(750, 0);
            window.setTimeout(function () {
                interval = false;
                getQuote();
                window.setTimeout(function () {
                    $h1.text("");
                }, 125);
            }, 650);
        }
    });

    $("#tweet").click(function () {
        if (on && quote)
            $a.attr(
                "href",
                tweet +
                message +
                '  Author: ' +
                author.slice(1)
            );
    });


    function getQuote() {
        $.ajax({
            url: url,
            cache: false,
            dataType: "json",
            success: function (data) {
                if (interval !== true) {
                    if (data[0].content.length <= 120) {
                        message = data[0].content;
                        message = message.slice(3, message.length - 5).trim();
                        if (!/[&<>]/.test(message)) {
                            if (on && !typing) {
                                if ($p.html() !== "") {
                                    $p.fadeTo(350, 0);
                                    $span.fadeTo(350, 0);
                                    window.setTimeout(function () {
                                        $p.html("");
                                        $span.html("");
                                        $p.fadeTo(0, 1);
                                        $span.fadeTo(0, 1);
                                    }, 350);
                                }
                                message = data[0].content;
                                message = message.slice(3, message.length - 5).trim();
                                message = '"' + message + '"';
                                author = "-" + data[0].title;
                                typing = true;
                                window.setTimeout(function () {
                                    typeOut(message, author);
                                    $a.attr("target", "_blank");
                                    quote = true;
                                }, 550);
                            }
                        } else getQuote();
                    } else getQuote();
                }
            }
        });
    }

    function typeOut(string, author) {
        if (!interval) {
            i = 0;
            interval = setInterval(function () {
                $p.html($p.html() + string.charAt(i));
                i++;
                if (i === string.length) {
                    clearInterval(interval);
                    i = 0;
                    window.setTimeout(function () {
                        interval = setInterval(function () {
                            $span.html($span.html() + author.charAt(i));
                            i++;
                            if (i === author.length) {
                                clearInterval(interval);
                                typing = false;
                            }
                        }, 50);
                    }, 1250);
                }
            }, 50);
        }
    }
    function drawAntennas() {
        canvas = document.getElementById("antennas");
        ctx = canvas.getContext("2d");
        ctx.beginPath(); // draw left antenna
        ctx.moveTo(50, 10);
        ctx.lineTo(120, 300);
        ctx.lineTo(135, 300);
        ctx.fill();
        ctx.beginPath(); // draw right antenna
        ctx.moveTo(295, 10);
        ctx.lineTo(115, 300);
        ctx.lineTo(135, 300);
        ctx.fill();
        ctx.beginPath(); // draw left antenna tip
        ctx.arc(53, 18, 6, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.beginPath(); // draw right atenna tip
        ctx.arc(290, 15, 7, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.beginPath(); // draw body
        ctx.ellipse(146, 156, 85, 40, 0, 0, 7);
        ctx.stroke();
        ctx.fill();
    }

    function drawTable() {
        canvas = document.getElementById("legs");
        ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#874c18";
        ctx.fillStyle = "#874c18";
        ctx.beginPath(); // draw left leg
        ctx.moveTo(75, 0);
        ctx.lineTo(0, 100);
        ctx.lineTo(15, 100);
        ctx.lineTo(90, 0);
        ctx.stroke();
        ctx.fill();
        ctx.beginPath(); // draw right leg
        ctx.moveTo(225, 0);
        ctx.lineTo(300, 100);
        ctx.lineTo(285, 100);
        ctx.lineTo(210, 0);
        ctx.stroke();
        ctx.fill();
    }

    function turnOn() {
        $power.css({ color: "green" });
        on = true;
        $inner.animate({ width: "15%", height: "1px" }, 25);
        window.setTimeout(function () {
            $inner.animate({ width: "100%", height: "3px" }, 25);
            window.setTimeout(function () {
                $inner.animate({ height: "100%", top: "0px" }, 50);
                window.setTimeout(function () {
                    showShow();
                }, 50);
            }, 25);
        }, 25);
    }

    function turnOff() {
        $power.css({ color: "red" });
        on = false;
        quote = false;
        $a.attr({
            href: "#",
            target: "_self"
        });
        hideShow();
        $inner.animate({ height: "3px", top: "200px" }, 50);
        window.setTimeout(function () {
            $inner.animate({ width: "15%", height: "1px" }, 25);
            window.setTimeout(function () {
                $inner.animate({ width: "0", height: "0" }, 25);
            }, 25);
        }, 25);
    }

    function showShow() {
        $inner.css({ "background-color": "#658bab" });
        $inner.css({
            "background-image": "url('http://bestanimations.com/Nature/clouds-flowing-over-lake-mountains-nature-animated-gif.gif')"
        });
        $inner.html("<h1>Random Quote Generator</h1><p></p><span></span>");
        $p = $("p");
        $span = $("span");
    }

    function hideShow() {
        $inner.css({ "background-color": "#ffffff" });
        $inner.css({ "background-image": "none" });
        $inner.html("");
    }
});
