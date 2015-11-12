define(["jquery"],function($){
    function getExperience(year,month){
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth() + 1;
        var exper = ((y - year)*12)+(m-month);
        $("#exText").text("/ 만 "+(Math.floor(exper/12))+"년 "+(exper%12)+"개월");
    };
    return getExperience;
});
