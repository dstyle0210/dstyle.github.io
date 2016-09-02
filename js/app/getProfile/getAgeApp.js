define(["jquery"], function (a) {
    function b(b, c, d) {
        var e = new Date, f = e.getFullYear(), g = e.getMonth() + 1, h = e.getDate(), i = f - b;
        i = c > g || g == c && d > h ? i - 1 : i, a("#ageText").text("(만 " + i + "세)")
    }

    return b
});