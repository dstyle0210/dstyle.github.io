"use strict";

var PortfolioFormBox;
define(["jquery", "react"], function ($, React) {
    PortfolioFormBox = React.createClass({
        displayName: "PortfolioFormBox",

        handleSubmit: function handleSubmit(e) {
            e.preventDefault();

            // 입력 부분 초기화
            var data = {};
            var vaild = true;
            $("#alert").html("");
            var weba = $("#weba").is(":checked");
            $(".form-group").removeClass("has-error has-success");

            var formElementAarry = [{ id: "name", alert: "'이름'이" }, { id: "email", alert: "'이메일'이" }, { id: "title", alert: "'제목'이" }, { id: "desc", alert: "'내용'이" }];

            $(formElementAarry).each(function (idx, fo) {
                if ($("#contact_" + fo.id).val() == "") {
                    $("#alert").append($('<div class="alert alert-danger">' + fo.alert + ' 입력되지 않았습니다.</div>'));
                    $("#contact_" + fo.id).parent().addClass("has-error");
                    $("#contact_" + fo.id).focus();
                    if (weba) {
                        alert(fo.alert + " 입력되지 않았습니다.");
                    };
                    vaild = false;
                    return false;
                } else {
                    data[fo.id] = $("#contact_" + fo.id).val();
                    $(fo.id).parent().addClass("has-success");
                };
            });
            if (!vaild) {
                return;
            };

            // 벨리데이션 완료. 던지기 시작.
            data.company = $("#contact_company").val();
            $(".form-group input , .form-group textarea").attr("disabled", true);
            $("#formProgress").show().find(".progress-bar").animate({ "width": "99%" });

            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbxr-oWfqP3rd3hYkMviFDi5AXotpMVL7HOcB056BB52hwTH9Cw/exec",
                data: data,
                type: "POST",
                success: function success(response) {
                    // 던지기 완료.
                    $("#formProgress .progress-bar").css({ "width": "100%" });
                    $("#formProgress").delay(600).fadeOut();
                    $("#alert").html("").append($('<div class="alert alert-info"><strong>' + data.name + '님</strong> 의뢰해주셔서 감사합니다. 확인 후에 연락드리겠습니다.</div>'));
                    $("#alert").find(".alert").delay(5000).fadeOut();
                    $(".form-group input , .form-group textarea").val("").attr("disabled", false);
                },
                error: function error(xhr, status, err) {
                    // 오류시 사용
                }
            });
        },
        render: function render() {
            return React.createElement(
                "form",
                { method: "post", onSubmit: this.handleSubmit, className: "row" },
                React.createElement("div", { className: "col-xs-12", id: "alert" }),
                React.createElement(
                    "div",
                    { className: "col-xs-12", id: "formProgress" },
                    React.createElement(
                        "div",
                        { className: "progress" },
                        React.createElement("div", { className: "progress-bar progress-bar-striped active " })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "form-group col-xs-12 col-sm-4" },
                    React.createElement("input", { type: "text", className: "form-control", id: "contact_name", placeholder: "성함" })
                ),
                React.createElement(
                    "div",
                    { className: "form-group col-xs-12 col-sm-8" },
                    React.createElement("input", { type: "text", className: "form-control", id: "contact_email", placeholder: "이메일 주소" })
                ),
                React.createElement(
                    "div",
                    { className: "form-group col-xs-12 col-sm-4" },
                    React.createElement("input", { type: "text", className: "form-control", id: "contact_company", placeholder: "회사명" })
                ),
                React.createElement(
                    "div",
                    { className: "form-group col-xs-12 col-sm-8" },
                    React.createElement("input", { type: "text", className: "form-control", id: "contact_title", placeholder: "제목" })
                ),
                React.createElement(
                    "div",
                    { className: "form-group col-xs-12" },
                    React.createElement("textarea", { type: "text", className: "form-control", id: "contact_desc", rows: "10", placeholder: "내용" })
                ),
                React.createElement(
                    "div",
                    { className: "form-group col-xs-12 btnSec" },
                    React.createElement(
                        "button",
                        { type: "submit", className: "btn btn-primary" },
                        React.createElement("i", { className: "fa fa-paper-plane" }),
                        " 보내기"
                    )
                )
            );
        }
    });
});
