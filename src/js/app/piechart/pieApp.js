define(["jquery","easypiechart"],function($){
    function makeSkillPie(opt){
        var o = {
            animate:1000,
            size:80,
            lineWidth:15
        };
        $.extend(o,opt);
        $('#positionSkills0 .chart').easyPieChart({
            animate: o.animate,
            lineWidth:o.lineWidth,
            size:o.size,
            barColor:"#5bc0de",
            lineCap:"butt",
            scaleColor:false
        });
        $('#positionSkills1 .chart').easyPieChart({
            animate: o.animate,
            lineWidth:o.lineWidth,
            size:o.size,
            barColor:"#f0ad4e",
            lineCap:"butt",
            scaleColor:false
        });
        $('#positionSkills2 .chart').easyPieChart({
            animate: o.animate,
            lineWidth:o.lineWidth,
            size:o.size,
            barColor:"#337ab7",
            lineCap:"butt",
            scaleColor:false
        });
    };
    return makeSkillPie;
});
