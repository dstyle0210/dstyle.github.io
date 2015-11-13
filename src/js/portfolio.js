require.config({
    baseUrl : "js",
    paths : {
        "jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min",
        "react":"https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react",
        "bootstrap":"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min",
        "underscore":"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
        "lazyload":"lib/jquery.lazyload"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "react":{exports: "react"},
        "lazyload":{ exports: "lazyload","deps" :['jquery'] }
    }
});

// 메뉴영역
requirejs(["jquery","bootstrap"],function(){});

// 이미지 Lazy Load
requirejs(["jquery","app/lazyload/lazyloadApp"],function($,lazyLoad){
    $(function(){
        lazyLoad();
    });
});

// 포트폴리오 리스트
requirejs(["jquery","underscore","react","app/portfolio/PortfolioListBox"],function($,_,React){
    $.ajax({
        url: "https://spreadsheets.google.com/feeds/list/1GDTX8ohqU_0_HNJtUv5xLN7BNFfRy7dnQcZmWLDaqjI/1/public/values?alt=json",
        dataType: 'json',
        cache: false,
        success: function(response) {
            $("#portfolioWrap").removeClass("loading");
            var cells = _.map(response.feed.entry,function(data){
                var o = {};
                _.each(data,function(item,key){
                    if(key.indexOf("gsx$")!= -1){
                        var nkey = key.split("gsx$")[1];
                        o[nkey] = data[key].$t;
                    }
                });
                return o;
            });
            cells = _.filter(cells,function(site){return site.open!="" });
            React.render(
                React.createElement(PortfolioListBox,{data:cells}),
                document.getElementById("jsxPortfolio")
            );
        },
        error: function(xhr, status, err) {

        }
    });
});

