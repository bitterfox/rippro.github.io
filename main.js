var members = [
    { id: "Respect2D",    generation: "OBOG" },
    { id: "yokit9",       generation: "OBOG" },
    { id: "ik11235",      generation: "OBOG" },
    { id: "utisam",       generation: "OBOG" },
    { id: "OldBaka",      generation: "OBOG" },
    { id: "nkkwe",        generation: "OBOG" },
    { id: "KNKedge",      generation: "OBOG" },

    { id: "komi0222" ,    generation: "09th" },
    { id: "menphim" ,     generation: "09th" },
    { id: "ja3rno" ,      generation: "09th" },
    { id: "dispenser" ,   generation: "09th" },
    { id: "arsenic28" ,   generation: "09th" },
    { id: "ayihis" ,      generation: "09th" },

    { id: "bnsgny",       generation: "10th" },
    { id: "CROW",         generation: "10th" },
    { id: "is0220rk",     generation: "10th" },
    { id: "okyyun",       generation: "10th" },
    { id: "tmbsx",        generation: "10th" },

    { id: "is0248vx",     generation: "11th" },
    { id: "Nanana",       generation: "11th" },
    { id: "satoshi31043", generation: "11th" },
    { id: "mots555",      generation: "11th" },
    { id: "ixmel",        generation: "11th" },
    { id: "pikanatsu",    generation: "11th" },
    { id: "kerokero",     generation: "11th" },
    { id: "futo",         generation: "11th" },
    { id: "proru",        generation: "11th" },
    { id: "sarada417",    generation: "11th" },
    { id: "is0268ev",     generation: "11th" },
    { id: "IS0283IR",     generation: "11th" },
    { id: "moon_remon",   generation: "11th" },
    { id: "kinono",       generation: "11th" }
];

// membersから自動生成
var generations = [];

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

var bounds = [200,350,500,650];
var graphConfig = {
    title: { text: null },
    tooltip:{
        "formatter":function() {
            return '<b>' + this.point.userid + '</b><br/>' +
                'Problem: '+ this.point.name +'<br/>Date: '+
                Highcharts.dateFormat('%e %b %Y', this.x) +'<br/>Solved: '+ this.y ;
        }
    },
    xAxis: {
        type: 'datetime',
        "title":{ "text":null },
        "dateTimeLabelFormats":{ "year":"%Y" },
        "tickInterval":30758400000
    },
    yAxis: {
        min: 0,
        startOnTick: false,
        "title":{ "text":null },
        "plotLines":[ { "value":0, "width":1, "color":"#808080" } ],
        "plotBands":[
            { "from":0, "to":bounds[0]-1, "color":"rgba(153, 153, 153, 0.2)" },
            { "from":bounds[0], "to":bounds[1]-1, "color":"rgba(0, 169, 0, 0.2)" },
            { "from":bounds[1], "to":bounds[2]-1, "color":"rgba(102, 102, 255, 0.2)" },
            { "from":bounds[2], "to":bounds[3]-1, "color":"rgba(221, 204, 0, 0.2)" },
            { "from":bounds[3], "to":1000000, "color":"rgba(238, 0, 0, 0.2)" }
        ]
    },
    chart: { height: 600, type: 'line', zoomType: 'x', renderTo : "graph-container" },
    plotOptions: {  series: { marker: { enabled: false } } },
    series: []
};

var currentProlems = [];
var currentMembers = [];

$.event.add(window,"load",function() {
    initGenerationArray();

    // 配列volumesに含まれるボリュームリストのDOMを構築する
    buildGeneraionList(generations);
    buildVolumeList(volumes);

    // 初期状態
    selectGenaration("11th");
    selectVolume("0");
    drawGraph();
});

function initGenerationArray(){
    var temp = [];
    for(var i=0; i<members.length; i++) {
        temp.push(members[i].generation);
    }
    temp.sort();
    var n = temp.length;
    temp.push("XXXXX");
    generations = [];
    for(var i=0; i<n; i++){
        if(temp[i] != temp[i+1]) generations.push(temp[i]);
    }
    console.log(generations);
}

function selectVolume(volume){
    // Volumeに含まれる問題リストを生成し問題リストを生成する
    getAndBuildProblemList(volume);
    // 構築したリストでメンバー毎にsolvedリストを埋める
    fillSolvedList();
}

function selectGenaration(generation){
    // メンバーを世代で指定し、solvedリストを取得する
    getMemberList(generation);
    // 構築したリストでメンバー毎にsolvedリストを埋める
    fillSolvedList();
    fillRecentActivityList();
    drawGraph();
}

function buildGeneraionList(generations){
    // build tabs
    var $genarationUi = $('#generaion-tab');
    for(var i=0, l=generations.length; i<l; i++){
        var $li = $('<li></li>')
                .append($('<a href="#">' + generations[i] + '</a>')
                        .attr('id','generation-tab-' + generations[i]));
        if(generations[i]==='11th') $li.addClass('active');
        $genarationUi.append($li);
    }

    for(var i=0, l=generations.length; i<l; i++){
        $('#generation-tab-' + generations[i]).click((function(gen){
            selectGenaration(gen);
        }).bind(undefined,generations[i]));
    }
    // tab onclick
    $('#generaion-tab > li > a').click( function() {
        $('#generaion-tab > li.active').removeClass('active');
        $(this).parent().addClass('active');
    });
}

function buildVolumeList(volumes){
    // build tabs
    var $volumeUl = $('#volume-tab');
    for(var i=0, l=volumes.length; i<l;i++){
        var $li = $('<li></li>')
                .append($('<a href="#">' + volumes[i] + '</a>')
                        .attr('id','volume-tab-' + volumes[i]));
        if(i==0) $li.addClass('active');
        $volumeUl.append($li);
    }

    for(var i=0, l=volumes.length; i<l; i++){
        $('#volume-tab-' + volumes[i]).click((function(volume){
            selectVolume(volume);
        }).bind(undefined,volumes[i]));
    }
    // tab onclick
    $('#volume-tab > li > a').click( function() {
        $('#volume-tab > li.active').removeClass('active');
        $(this).parent().addClass('active');
    });
}

function getAndBuildProblemList(volume){
    var apiUrl = 'http://judge.u-aizu.ac.jp/onlinejudge/webservice/problem_list?volume=' + volume;
    $.ajax({
        url: apiUrl ,
        type: 'GET',
        dataType: 'xml',
        timeout: '1000',
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
    $(xml).find('problem_list').find('problem').each(function(){
        var problem = {};
        problem.id = $.trim($(this).find('id').text());
        problem.url = 'http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=' + problem.id;
        problem.name = $.trim($(this).find('name').text());
        problems.push(problem);
    });
    return problems;
}

function buildProblemList(){
    var $table = $('#problem-table-body');
    $table.html('');
    for(var i=0, l=currentProlems.length; i<l; i++){
        var $tr = $('<tr id="' + currentProlems[i].id  + '"></tr>');
        var id = currentProlems[i].id;
        var name = currentProlems[i].name;
        var url = currentProlems[i].url;
        var $a_id = $('<a>' + id + '</a>').attr('href',url);
        var $a_name = $('<a>' + name + '</a>').attr('href',url);
        $tr.append($('<td></td>').append($a_id));
        $tr.append($('<td></td>').append($a_name));
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
        var apiUrl = 'http://judge.u-aizu.ac.jp/onlinejudge/webservice/user?id=' + members_sel[i];
        $.ajax({
            url: apiUrl ,
            type: 'GET',
            dataType: 'xml',
            timeout: '1000',
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
    res.id = $.trim($xml.find('user > id').text());
    res.name = $.trim($xml.find('user > name').text());
    // milisec
    var reg = new Date(parseInt($xml.find('user > registerdate').text()));
    res.age = new Date() - reg;
    res.solved = parseInt($.trim($xml.find('user > status > solved').text()));
    res.perDay = res.solved / (res.age/1000/3600/24);
    res.in24h = 0;
    var ystday = new Date() - 24*3600*1000;
    res.solved_list = [];
    res.solved_set = {};
    $xml.find('user > solved_list > problem').each(function(){
        var $prob = $(this);
        var prob = {};
        prob.id = $prob.find('id').text();
        prob.judge_id = $prob.find('judge_id').text();
        prob.submissiondate = parseInt($prob.find('submissiondate').text());
        if(prob.submissiondate >= ystday){ res.in24h++; }
        res.solved_list.push(prob);
        res.solved_set[prob.id] = prob.judge_id;
    });
    res.solved_list.sort(function(a,b){
        return a.submissiondate - b.submissiondate;
    });
    return res;
}

function fillSolvedList(){
    var $header = $('#problem-table-head-tr');
    $('#problem-table > thead > tr > .header-user-name').remove();
    for(var i=0,l=currentMembers.length; i<l; i++){
        var id = currentMembers[i].id;
        $header.append($('<th class="header-user-name">'+ id.substr(0,3) +'</th>'));
    }

    $('#problem-table > tbody > tr').each(function(){
        var $raw = $(this);
        $raw.find('.solved-check').remove();
        var pid = $raw.attr('id');
        for(var i=0,l=currentMembers.length; i<l; i++){
            var member = currentMembers[i];
            var $column = $('<td class="solved-check"></td>');
            var $solvedMark = $('<a></a>');
            if(pid in member.solved_set){
                $solvedMark.text('#');
                $solvedMark.attr('href', 'http://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=' + member.solved_set[pid]);
            }

            $column.append($solvedMark);
            $raw.append($column);
        }
    });
}

function fillRecentActivityList(){
    var $tbody = $('#recent-activity-table-body');
    $tbody.html('');
    var cur = new Date();
    for(var i=0, l=currentMembers.length; i<l; i++){
        var member = currentMembers[i];
        var userColor = getColor(member.solved,500,300,200,100);
        var $row = $('<tr></tr>');
        $row.append($('<td>'+ (i+1) +'</td>'));
        var $id = $('<td></td>')
                .append($('<a>'+ member.id +'</a>')
                        .attr('href','http://judge.u-aizu.ac.jp/onlinejudge/user.jsp?id=' + member.id)
                        .attr('style',userColor));
        $row.append($id);
        $row.append($('<td><span style="' + userColor + '">'+ member.solved +'</span></td>'));
        $row.append($('<td>'+ member.perDay.toFixed(2) +'</td>'));
        $row.append($('<td><span style="'+ getColor(member.in24h,10,5,3,1) +'">'+ member.in24h +'</td>'));
        for(var j=0, m=Math.min(5,member.solved_list.length); j<m; j++){
            var prob = member.solved_list[member.solved_list.length-1-j];
            var id = prob.id;
            var judge_id = prob.judge_id;
            var dt = cur - prob.submissiondate;
            var submissionColor = getColor(dt,1000*60,1000*60*60*24,1000*60*60*24*7,1000*60*60*24*30,true);
            var prob_url = 'http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=' + id;
            var run_url = 'http://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=' + judge_id;
            var $id = $('<td></td>')
                    .append($('<a><span style="' + submissionColor + '">' + id + '</span></a>')
                            .attr('href', prob_url));
            var $dt = $('<td></td>')
                    .append($('<a><span style="' + submissionColor + '">' + dtToString(dt) + '前</span></a>')
                            .attr('href', run_url));
            $row.append($id).append($dt);
        }
        $tbody.append($row);
    }
}

function drawGraph(){
    var series = [];
    for(var i=0, n=currentMembers.length; i<n; i++){
        series.push(makeGraphData(currentMembers[i]));
    }
    graphConfig.series = series;
    new Highcharts.Chart(graphConfig);
}

function makeGraphData(member_obj){
    var n = member_obj.solved;
    var res = {
        name: member_obj.id,
        data: new Array(n)
    };
    for(var i=0; i<n; i++){
        var prob = member_obj.solved_list[i];
        res.data[i] = { x: new Date(prob.submissiondate) - 0,
                        y: i+1,
                        name: prob.id,
                        userid: member_obj.id
                      };
    }
    return res;
}


function dtToString(dt){
    var res;
    if(dt <= 1000*60){
        res = (dt/1000).toFixed() + '秒';
    } else if(dt <= 1000*60*60){
        res = (dt/1000/60).toFixed() + '分';
    } else if(dt <= 1000*60*60*24){
        res = (dt/1000/60/60).toFixed() + '時間';
    } else {
        res = (dt/1000/60/60/24).toFixed() + '日';
    }
    return res;
};

var getColor = function(x,a,b,c,d,inv){
    if(inv){
        x*=-1; a*=-1; b*=-1; c*=-1; d*=-1;
    }
    var res = 'color:';
    if(x >= a){
        res += 'red';
    } else if(x >= b){
        res += 'orange';
    } else if(x >= c){
        res += 'blue';
    } else if(x >= d){
        res += 'green';
    } else {
        res += 'grey';
    }
    res += ';';
    return res;
};
