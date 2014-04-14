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
    res.label = user_id;
    res.data = makePlots(getSolvedProblems(user_id));
    res.hoverable = true;
    return res;
};

var updateMembers = function(){
    var members = $("#members").val().split("\n");
    var datas = [];
    for(var i=0; i<members.length; i++){
        datas.push(makeDataObject(members[i]));
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
