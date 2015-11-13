"use strict";

var PortfolioIndexBox;
var MakeLabelBox;
var MakeSiteTitleBox;
define(["react"], function (React) {
    PortfolioIndexBox = React.createClass({
        displayName: "PortfolioIndexBox",

        render: function render() {
            var lists = this.props.data.reverse().slice(0, 9);
            var sites = lists.map(function (site, idx) {
                var secClassName = "site eq" + idx;
                return React.createElement(
                    "li",
                    { className: "col-sm-6 col-md-4" },
                    React.createElement(
                        "section",
                        { className: secClassName },
                        React.createElement(
                            "dl",
                            null,
                            React.createElement(MakeSiteTitleBox, { name: site.name, link: site.url }),
                            React.createElement(
                                "dd",
                                null,
                                site.desc
                            )
                        ),
                        React.createElement(MakeLabelBox, { device: site.device, per: site.per, employee: site.employee })
                    )
                );
            });
            return React.createElement(
                "ul",
                { className: "portfolioList row" },
                sites
            );
        }
    });

    // 사이트 제목 및 링크
    MakeSiteTitleBox = React.createClass({
        displayName: "MakeSiteTitleBox",

        render: function render() {
            var link = this.props.link;
            var name = this.props.name;
            if (link != "") {
                return React.createElement(
                    "dt",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        name
                    ),
                    " ",
                    React.createElement(
                        "a",
                        { href: link, className: "btn btn-xs btn-link", target: "_blank" },
                        React.createElement("i", { className: "fa fa-external-link" })
                    )
                );
            } else {
                return React.createElement(
                    "dt",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        name
                    )
                );
            }
        }
    });

    MakeLabelBox = React.createClass({
        displayName: "MakeLabelBox",

        render: function render() {
            // 디바이스 구분 만들기.
            var devices = this.props.device.split(",");
            var deviceLabels = devices.map(function (device) {
                var tag, title;
                switch (device) {
                    case "P":
                        tag = "desktop";title = "데스크탑";break;
                    case "T":
                        tag = "tablet";title = "태블릿";break;
                    case "M":
                        tag = "mobile";title = "모바일";break;
                };
                var faClassName = "fa fa-" + tag;
                return React.createElement(
                    "span",
                    { className: "label label-default", title: title },
                    React.createElement("i", { className: faClassName })
                );
            });

            // 투입률
            var per = this.props.per;
            var perClass = per == 100 ? "label label-danger" : "label label-info";

            // 정규직,계약직 부분
            var employee = this.props.employee;
            var employeeClass = employee == "Full time" ? "label label-success" : "label label-warning";

            return React.createElement(
                "div",
                { className: "labelDiv" },
                deviceLabels,
                React.createElement(
                    "span",
                    { className: perClass },
                    per,
                    "%"
                ),
                React.createElement(
                    "span",
                    { className: employeeClass },
                    employee
                )
            );
        }
    });
});