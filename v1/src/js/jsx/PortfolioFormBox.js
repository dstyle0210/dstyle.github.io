var PortfolioFormBox;
define(["jquery","react"],function($,React){
    PortfolioFormBox = React.createClass({
        handleSubmit:function(e){
            e.preventDefault();

            // 입력 부분 초기화
            var data = {};
            var vaild = true;
            $("#alert").html("");
            var weba = $("#weba").is(":checked");
            $(".form-group").removeClass("has-error has-success");

            var formElementAarry = [
                {id:"name",alert:"'이름'이"},
                {id:"email",alert:"'이메일'이"},
                {id:"title",alert:"'제목'이"},
                {id:"desc",alert:"'내용'이"}
                ];

            $(formElementAarry).each(function(idx,fo){
                if( $("#contact_"+fo.id).val()=="" ){
                    $("#alert").append( $('<div class="alert alert-danger">'+fo.alert+' 입력되지 않았습니다.</div>') );
                    $("#contact_"+fo.id).parent().addClass("has-error");
                    $("#contact_"+fo.id).focus();
                    if(weba){ alert(fo.alert+" 입력되지 않았습니다."); };
                    vaild = false;
                    return false;
                }else{
                    data[fo.id] = $("#contact_"+fo.id).val();
                    $(fo.id).parent().addClass("has-success");
                };
            });
            if(!vaild){
                return;
            };

            // 벨리데이션 완료. 던지기 시작.
            data.company = $("#contact_company").val();
            $(".form-group input , .form-group textarea").attr("disabled",true);
            $("#formProgress").show().find(".progress-bar").animate({"width":"99%"});


            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbxr-oWfqP3rd3hYkMviFDi5AXotpMVL7HOcB056BB52hwTH9Cw/exec",
                data:data,
                type: "POST",
                success: function(response) {
                    // 던지기 완료.
                    $("#formProgress .progress-bar").css({"width":"100%"});
                    $("#formProgress").delay(600).fadeOut();
                    $("#alert").html("").append( $('<div class="alert alert-info"><strong>'+data.name+'님</strong> 의뢰해주셔서 감사합니다. 확인 후에 연락드리겠습니다.</div>') );
                    $("#alert").find(".alert").delay(5000).fadeOut();
                    $(".form-group input , .form-group textarea").val("").attr("disabled",false);
                },
                error: function(xhr, status, err) {
                    // 오류시 사용
                }
            });
        },
        render:function(){
            return(<form method="post" onSubmit={this.handleSubmit} className="row">
                    <div className="col-xs-12" id="alert"></div>
                    <div className="col-xs-12" id="formProgress">
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped active "></div>
                        </div>
                    </div>

                    <div className="form-group col-xs-12 col-sm-4">
                        <input type="text" className="form-control" id="contact_name" placeholder="성함" />
                    </div>
                    <div className="form-group col-xs-12 col-sm-8">
                        <input type="text" className="form-control" id="contact_email" placeholder="이메일 주소" />
                    </div>
                    <div className="form-group col-xs-12 col-sm-4">
                        <input type="text" className="form-control" id="contact_company" placeholder="회사명" />
                    </div>
                    <div className="form-group col-xs-12 col-sm-8">
                        <input type="text" className="form-control" id="contact_title" placeholder="제목" />
                    </div>
                    <div className="form-group col-xs-12">
                        <textarea type="text" className="form-control" id="contact_desc" rows="10" placeholder="내용"></textarea>
                    </div>

                    <div className="form-group col-xs-12 btnSec">
                        <button type="submit" className="btn btn-primary"><i className="fa fa-paper-plane"></i> 보내기</button>
                    </div>
                </form>
            );
        }
    });
});