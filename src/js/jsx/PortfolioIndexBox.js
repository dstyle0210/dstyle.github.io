var PortfolioIndexBox;
var MakeLabelBox;
var MakeSiteTitleBox;
define(["react"],function(React){
    PortfolioIndexBox = React.createClass({
        render:function(){
            var lists = (this.props.data).reverse().slice(0,9);
            var sites = lists.map(function(site,idx){
                var secClassName = "site eq"+idx;
                return (<li className="col-sm-6 col-md-4">
                    <section className={secClassName}>
                        <dl>
                            <MakeSiteTitleBox name={site.name} link={site.url} />
                            <dd>{site.desc}</dd>
                        </dl>
                        <MakeLabelBox device={site.device} per={site.per} employee={site.employee} />
                    </section>
                </li>);
            });
            return (
                <ul className="portfolioList row">
                    {sites}
                </ul>
            );
        }
    });


    // 사이트 제목 및 링크
    MakeSiteTitleBox = React.createClass({
       render:function(){
           var link = this.props.link;
           var name = this.props.name;
           if(link!=""){
               return (<dt><strong>{name}</strong> <a href={link} className="btn btn-xs btn-link" target="_blank"><i className="fa fa-external-link"></i></a></dt>);
           }else{
               return (<dt><strong>{name}</strong></dt>);
           }
       }
    });

    MakeLabelBox = React.createClass({
        render:function(){
            // 디바이스 구분 만들기.
            var devices = (this.props.device).split(",");
            var deviceLabels = devices.map(function(device){
                var tag,title;
                switch(device){
                    case "P": tag = "desktop"; title="데스크탑"; break;
                    case "T": tag = "tablet"; title="태블릿"; break;
                    case "M": tag = "mobile"; title="모바일"; break;
                };
                var faClassName = "fa fa-"+tag;
                return (<span className="label label-default" title={title}><i className={faClassName}></i></span>);
            });

            // 투입률
            var per = this.props.per;
            var perClass = (per==100) ? "label label-danger" : "label label-info";

            // 정규직,계약직 부분
            var employee = this.props.employee;
            var employeeClass = (employee=="Full time") ? "label label-success" : "label label-warning";

            return (<div className="labelDiv">
                {deviceLabels}
                <span className={perClass}>{per}%</span>
                <span className={employeeClass}>{employee}</span>
            </div>);
        }
    });
});