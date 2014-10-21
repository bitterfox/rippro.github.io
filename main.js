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

var currentProlems = [];
var currentMembers = [];

$.event.add(window,"load",function() {
    // 配列volumesに含まれるボリュームリストのDOMを構築する
    buildVolumeList(volumes);
    // Volumeに含まれる問題リストを生成する(初期状態としてVolume0を選択する)
    // その後問題リストを生成する
    getAndBuildProblemList(volumes[0]);
    // 世代を指定して問題リストを埋める
    getAndbuildMemberList("10");
});

function buildVolumeList(volumes){
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
            getAndBuildProblemList(volume);
        }).bind(undefined,volumes[i]));
    }

    // tab onclick
    $('.nav-tabs > li > a').click( function() {
        $('.nav-tabs > li.active').removeClass('active');
        $(this).parent().addClass('active');
    });
}

function getAndBuildProblemList(volume){
    var apiUrl = "http://judge.u-aizu.ac.jp/onlinejudge/webservice/problem_list?volume=" + volume;
    $.ajax({
        url: apiUrl ,
        type: "GET",
        dataType: "xml",
        timeout: "1000",
        success: function(xml){
            // build ploblem list on table
            currentProlems = parseVolumeInfoXML(xml);
            buildProblemList();
        }
    });
}

function parseVolumeInfoXML(xml){
    var problems = [];
    $(xml).find("problem_list").find("problem").each(function(){
        var problem = {};
        problem.id = $.trim($(this).find("id").text());
        problem.url = "http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=" + problem.id;
        problem.name = $.trim($(this).find("name").text());
        problems.push(problem);
    });
    return problems;
}

function buildProblemList(){
    var $table = $("#problem-table-body");
    $table.html("");
    for(var i=0, l=currentProlems.length; i<l; i++){
        var $tr = $('<tr id="problem' + currentProlems[i].id  + '"></tr>');
        var $a_id = $("<a></a>").text(currentProlems[i].id).attr("href",currentProlems[i].url);
        var $a_name = $("<a></a>").text(currentProlems[i].name).attr("href",currentProlems[i].url);
        $tr.append($("<td></td>").append($a_id));
        $tr.append($("<td></td>").append($a_name));
        $table.append($tr);
    }
}

// 戻り値はsolved降順にソートされている
function getAndbuildMemberList(generation){
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
                members_obj.push(parseUserInfoXML(xml));
            }
        });
    }
    members_obj.sort(function(a,b){
        return -(a.solved - b.solved);
    });
    currentMembers = members_obj;
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
    // res.solved_set = {};
    $xml.find("user > solved_list > problem").each(function(){
        var $prob = $(this);
        var prob = {};
        prob.id = $prob.find("id").text();
        prob.judge_id = $prob.find("judge_id").text();
        prob.submissiondate = $prob.find("submissiondate").text();
        res.solved_list.push(prob);
        // res.solved_set[prob.id] = 1;
    });
    res.solved_list.sort(function(a,b){
        return a.submissiondate - b.submissiondate;
    });
    return res;
}
