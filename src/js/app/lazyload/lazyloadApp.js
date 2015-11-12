define(["jquery","lazyload"],function($,lazy){
    /*
        opt = {
            target:"img.lazy",
            loadCage:".lazyLoad",
            errorCage:".lazyError",
            effect:"fadeIn",
            onload:function(){},
            onerror:function(){}
        }
     */
    function lazyLoadCustomPlugin(opt){
        var o = {
            target:"img.lazy",
            loadCage:"<span class='lazyLoad'></span>",
            errorCage:"<span class='lazyError'></span>",
            effect:"fadeIn",
            onload:function(){},
            onerror:function(){}
        };
        $.extend(o,opt);

        // 로딩이 되면 일단 로딩 케이지를 씌운다.
        if(o.loadCage){
            $(o.target).wrap(o.loadCage);
        };
        $(window).ready(function(){
            setTimeout(function(){
                $(o.target).show().lazyload({
                    effect : o.effect,
                    load : function(obj){
                        if(o.loadCage){
                            $(this).unwrap();
                        };
                        o.onload.call(null,obj);
                    },
                    error:function(obj){
                        if(o.errorCage){
                            if(o.loadCage){
                                $(this).unwrap();
                            };
                            $(o.target).wrap(o.errorCage);
                        };
                        o.onerror.call(null,obj);
                    }
                });
            },300);
        });
    };
    return lazyLoadCustomPlugin;
});
