// TODO: UI
// TODO: highchartに変える
// TODO: last submission を表示

var Problem = function(id, time){
    this.id = id;
    this.time = time;
};

var getSolvedProblems = function(user_id){
    var res = [];
    var user_ids = user_id.split(",");
    var solved_set = new Set([]);
    for(var i=0; i<user_ids.length; i++){
        var id = user_ids[i];
        $.ajax({
            url: "http://judge.u-aizu.ac.jp/onlinejudge/webservice/user?id=" + id,
            type: "GET",
            dataType: "xml",
            timeout: "1000",
            async: false,
            success: function(xml){
                $(xml).find("user").find("solved_list").find("problem").each(function(){
                    var id = $(this).find("id").text();
                    var s = $(this).find("submissiondate").text();
                    var time = new Date(parseInt(s));
                    if(solved_set.has(id)) return;
                    solved_set.add(id);
                    res.push(new Problem(id,time));
                });
            }
        });
    }
    res.sort(function(a,b){
        return a.time - b.time;
    });
    return res;
};

var makePlots = function(solved_list){
    var res = [];
    for(var i=0; i<solved_list.length; i++){
        res.push([solved_list[i].time, i+1]);
    }
    return res;
};

var makeDataObject = function(user_id){
    var res = {};
    // for graph
    res.label = user_id;
    res.data = makePlots(getSolvedProblems(user_id));

    // for table
    res.id = user_id;
    res.solved = res.data.length;
    var last = res.data[res.data.length-1];
    var first = res.data[0];
    res.age = last[0] - first[0];
    res.lastAC = last[0];
    return res;
};

var members = [
    "Respect2D",
    "yokit9",
    "utisam",
    "ik11235",
    "arsenic28",
    "bnsgny",
    "menphim",
    "dispenser"
];

var addMember = function(){
    var user_id = $("#new_user").val();
    members.push(user_id);
    updateMembers();
};

var dtToString = function(dt){
    var res;
    if(dt <= 1000*60){
        res = (dt/1000).toFixed() + "秒";
    } else if(dt <= 1000*60*60){
        res = (dt/1000/60).toFixed() + "分";
    } else if(dt <= 1000*60*60*24){
        res = (dt/1000/60/60).toFixed() + "時間";
    } else {
        res = (dt/1000/60/60/24).toFixed() + "日";
    }
    return res;
};

var updateMembers = function(){
    var datas = [];
    for(var i=0; i<members.length; i++){
        var data = makeDataObject(members[i]);
        datas.push(data);
    }
    datas.sort(function(a,b){
        return b.solved-a.solved;
    });

    for(var i=0; i<datas.length; i++){
        var data = datas[i];
        var spd = (data.solved/(data.age/1000/60/60/24)).toFixed(2);
        var last = dtToString(new Date - data.lastAC) + "前";
        var age = dtToString(data.age);
        $("#table").append(
            $("<tr></tr>")
                .append($("<td></td>").text(data.id))
                .append($("<td></td>").text(data.solved))
                .append($("<td></td>").text(spd))
                .append($("<td></td>").text(last)));
    }

    $.plot("#placeholder", datas, {
        xaxis: {
            mode: "time"
        },
        legend: {
            position: "nw"
        }
    });
};

$(function() {
    updateMembers();
    $("#update").click(function(){
        updateMembers();
    });
    $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
});
