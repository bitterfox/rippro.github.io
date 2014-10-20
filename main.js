var members = [
    { id: "bnsgny" , generation: "10" },
    { id: "CROW" , generation: "10" },
    { id: "dispenser" , generation: "9" },
    { id: "arsenic28" , generation: "9" }
];

var volumes = [// "100",
    // PCK
    "0","1","2",
    // JOI
    "5","6",
    // UAPC
    "10",
    // ICPC Japan
    "11",
    // ICPC Asia
    "12","13",
    // UAPC
    "15",
    // JAG
    "20","21","22","23","24","25"
];

$.event.add(window,"load",function() {
    buildPriblemList(volumes);
    var ms = buildMemberList("10");
    fillSolvedTable(ms);
});

function buildPriblemList(volumes){
    // build tabs
    var $volumeUl = $("#volume-tab");
    for(var i=0, l=volumes.length; i<l;i++){
        var $li = $("<li></li>")
            .append($("<a></a>")
                    .attr("href","#")
                    .attr("id","volume-tab-" + volumes[i])
                    .text(volumes[i]));
        if(i==0) $li.addClass("active");
        $volumeUl.append($li);
        // add click event
    }

    for(var i=0, l=volumes.length; i<l; i++){
        $("#volume-tab-" + volumes[i]).click((function(volume){
            selectVolumeTab(volume);
        }).bind(undefined,volumes[i]));
    }

    // build table
    selectVolumeTab(volumes[0]);

    // tab onclick
    $('.nav-tabs > li > a').click( function() {
        $('.nav-tabs > li.active').removeClass('active');
        $(this).parent().addClass('active');
    } );
}

function selectVolumeTab(volume){
    var apiUrl = "http://judge.u-aizu.ac.jp/onlinejudge/webservice/problem_list?volume=" + volume;
    $.ajax({
        url: apiUrl ,
        type: "GET",
        dataType: "xml",
        timeout: "1000",
        success: function(xml){
            // build ploblem list on table
            var $table = $("#problem-table-body");
            $table.html("");
            $(xml).find("problem_list").find("problem").each(function(){
                var id = $.trim($(this).find("id").text());
                var name = $.trim($(this).find("name").text());
                var $tr = $("<tr></tr>");
                var url = "http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=" + id;
                var $a_id = $("<a></a>").text(id).attr("href",url);
                var $a_name = $("<a></a>").text(name).attr("href",url);
                $tr.append($("<td></td>").append($a_id));
                $tr.append($("<td></td>").append($a_name));
                $table.append($tr);
            });
        }
    });
}

// 戻り値はsolved降順にソートされている
function buildMemberList(generation){
    var members_sel = [];
    for(var i=0, l=members.length; i<l;i++){
        if(members[i].generation === generation){
            members_sel.push(members[i].id);
        }
    }

    var members_obj = [];
    for(var i=0, l=members_sel.length; i<l; i++){
        var apiUrl = "http://judge.u-aizu.ac.jp/onlinejudge/webservice/user?id=" + members_sel[i];
        $.ajax({
            url: apiUrl ,
            type: "GET",
            dataType: "xml",
            timeout: "1000",
            async: false, // TODO 非同期にする
            success: function(xml){
                var obj = parseUserInfoXML(xml);
                members_obj.push(obj);
            }
        });
    }
    members_obj.sort(function(a,b){
        return -(a.solved - b.solved);
    });
    return members_obj;
}

function parseUserInfoXML(xml){
    var res = {};
    var $xml = $(xml);
    res.id = $.trim($xml.find("user > id").text());
    res.name = $.trim($xml.find("user > name").text());
    // milisec
    var reg = new Date(parseInt($xml.find("user > registerdate").text()));
    res.age = new Date() - reg;
    res.solved = parseInt($.trim($xml.find("user > status > solved").text()));
    res.perDay = res.solved / (res.age/1000/3600/24);
    res.solved_list = [];
    res.solved_set = {};
    $xml.find("user > solved_list > problem").each(function(){
        var $prob = $(this);
        var prob = {};
        prob.id = $prob.find("id").text();
        prob.judge_id = $prob.find("judge_id").text();
        prob.submissiondate = $prob.find("submissiondate").text();
        res.solved_list.push(prob);
        res.solved_set[prob.id] = 1;
    });
    res.solved_list.sort(function(a,b){
        return a.submissiondate - b.submissiondate;
    });
    return res;
}

function fillSolvedTable(members_obj){
    for(var i=0, l=members_obj.length; i<l; i++){

    }
}
