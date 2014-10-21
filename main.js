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
    // 世代を指定してsolvedの情報を取得する
    getMemberList("9");
    // 配列volumesに含まれるボリュームリストのDOMを構築する
    buildVolumeList(volumes);
    selectVolume(volumes[0]);
});

function selectVolume(volume){
    // Volumeに含まれる問題リストを生成する(初期状態としてVolume0を選択する)
    // その後問題リストを生成する
    getAndBuildProblemList(volume);
    // 取得した情報によってsolvedリストを埋める
    fillSolvedList();
}

function buildVolumeList(volumes){
    // build tabs
    var $volumeUl = $("#volume-tab");
    for(var i=0, l=volumes.length; i<l;i++){
        var $li = $("<li></li>")
                .append($('<a href="#">' + volumes[i] + '</a>')
                        .attr("id","volume-tab-" + volumes[i]));
        if(i==0) $li.addClass("active");
        $volumeUl.append($li);
    }

    for(var i=0, l=volumes.length; i<l; i++){
        $("#volume-tab-" + volumes[i]).click((function(volume){
            selectVolume(volume);
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
        async: false,
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
        var $tr = $('<tr id="' + currentProlems[i].id  + '"></tr>');
        var id = currentProlems[i].id;
        var name = currentProlems[i].name;
        var url = currentProlems[i].url;
        var $a_id = $("<a>" + id + "</a>").attr("href",url);
        var $a_name = $("<a>" + name + "</a>").attr("href",url);
        $tr.append($("<td></td>").append($a_id));
        $tr.append($("<td></td>").append($a_name));
        $table.append($tr);
    }
}

// 戻り値はsolved降順にソートされている
function getMemberList(generation){
    var members_sel = [];
    for(var i=0, l=members.length; i<l;i++){
        if(members[i].generation === generation){
            members_sel.push(members[i].id);
        }
    }

    currentMembers = [];
    for(var i=0, l=members_sel.length; i<l; i++){
        var apiUrl = "http://judge.u-aizu.ac.jp/onlinejudge/webservice/user?id=" + members_sel[i];
        $.ajax({
            url: apiUrl ,
            type: "GET",
            dataType: "xml",
            timeout: "1000",
            // メンバーをsolved順にソートした後で表を埋めるなどの操作をしたいため、やむなく同期処理を行う
            async: false,
            success: function(xml){
                currentMembers.push(parseUserInfoXML(xml));
            }
        });
    }
    currentMembers.sort(function(a,b){
        return -(a.solved - b.solved);
    });
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

function fillSolvedList(){
    var $header = $("#problem-table-head-tr");
    $("#problem-table > thead > tr > .header-user-name").remove();
    for(var i=0,l=currentMembers.length; i<l; i++){
        var id = currentMembers[i].id;
        $header.append($('<th class="header-user-name">'+id+"</th>"));
    }

    $("#problem-table > tbody > tr").each(function(){
        var $raw = $(this);
        var pid = $raw.attr("id");
        for(var i=0,l=currentMembers.length; i<l; i++){
            var member = currentMembers[i];
            var $column = $('<td></td>');
            if(pid in member.solved_set){
                $column.text("#");
            }
            $raw.append($column);
        }
    });
}
