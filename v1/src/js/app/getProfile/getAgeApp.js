define(["jquery"],function($){
    function getAge(year,month,date){
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth() + 1;
        var d = today.getDate();
        var age = y - year;
        age = (m<month || (m==month && d<date)) ? age-1 : age;
        $("#ageText").text("(만 "+age+"세)");
    };
    return getAge;
});
