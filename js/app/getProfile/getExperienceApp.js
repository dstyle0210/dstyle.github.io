define(["jquery"], function (a) {
    function b(b, c) {
        var d = new Date, e = d.getFullYear(), f = d.getMonth() + 1, g = 12 * (e - b) + (f - c);
        a("#exText").text("/ 만 " + Math.floor(g / 12) + "년 " + g % 12 + "개월")
    }

    return b
});