// TODO: UI
// TODO: highchartに変える
// TODO: last submission を表示

// Onload
$(function() {
    updateGraphAndTable(memberIDs);
    $("#update").click(function(){
        updateGraphAndTable(memberIDs);
    });
});

var Problem = function(id, time, runID, codeSize){
    this.id = id;
    this.time = time;
    this.runID = runID;
    this.codeSize = codeSize;
};

var User = function(id){
    this.id = id;
    this.solved_list = getSolvedProblems(id);
    this.solved = this.solved_list.length;
};

var pref = "http://judge.u-aizu.ac.jp/onlinejudge/";

var getSolvedProblems = function(userID){
    var res = [];
    var userIDs = userID.split(",");
    var solved_set = {};
    for(var i=0; i<userIDs.length; i++){
        var id = userIDs[i];
        $.ajax({
            url: pref + "webservice/user?id=" + id,
            type: "GET",
            dataType: "xml",
            timeout: "1000",
            async: false,
            success: function(xml){
                $(xml).find("user").find("solved_list").find("problem").each(function(){
                    var id = $(this).find("id").text();
                    var s = $(this).find("submissiondate").text();
                    var runID = $(this).find("judge_id").text();
                    var codeSize = parseInt($(this).find("code_size").text());
                    var time = new Date(parseInt(s));
                    if(id in solved_set) return;
                    solved_set[id] = 0;
                    res.push(new Problem(id,time,runID,codeSize));
                });
            }
        });
    }
    res.sort(function(a,b){
        return a.time - b.time;
    });
    return res;
};

var updateGraphAndTable = function(userIDs){
    var tableDatas = [];
    var graphDatas = [];
    for(var i=0; i<userIDs.length; i++){
        var user = new User(userIDs[i]);
        graphDatas.push(makeGraphData(user));
        tableDatas.push(makeTableData(user));
    }

    graphDatas.sort(function(a,b){
        return b.data.length - a.data.length;
    });
    tableDatas.sort(function(a,b){
        return b.solved - a.solved;
    });
    drawGraph(graphDatas);
    fillTable(tableDatas);
};

var makeGraphData = function(user){
    var res = {};
    res.data = [];
    res.label = user.id;
    for(var i=0; i<user.solved_list.length; i++){
        res.data.push([user.solved_list[i].time, i+1]);
    }
    return res;
};

var drawGraph = function(graphDatas){
    $.plot("#placeholder", graphDatas, {
        xaxis: {
            mode: "time"
        },
        legend: {
            position: "nw"
        }
    });
};

var makeTableData = function(user){
    var res = {};
    res.id = user.id;
    res.solved = user.solved_list.length;
    var first = user.solved_list[0];
    var last = user.solved_list[user.solved_list.length-1];
    if(last){
        res.solvedPerDay = res.solved / (last.time - first.time) * 1000*86400;
    } else {
        res.solvedPerDay = 0;
    }
    res.solvedLastAWeek = 0;
    var now = new Date();
    for(var i=0; i<user.solved_list.length; i++){
        var j = user.solved_list.length-i-1;
        if(now - user.solved_list[j].time <= 1000*86400*7){
            res.solvedLastAWeek++;
        } else {
            break;
        }
    }

    res.recentACs = [null,null,null,null,null];
    var t = 5 > user.solved_list.length ? user.solved_list.length : 5;
    for(var i=0; i<t; i++){
        res.recentACs[i] = user.solved_list[user.solved_list.length-i-1];
    }

    return res;
};

var fillTable = function(tableDatas){
    for(var i=0; i<tableDatas.length; i++){
        var data = tableDatas[i];

        var age = dtToString(data.age);
        $("#table").append($("<tr></tr>").attr("id","row"+i));
        $("#row"+i)
        // ID
            .append($("<td></td>")
                    .append($('<a></a>')
                            .attr("href",pref + "user.jsp?id=" + data.id)
                            .attr("style",getColor(data.solved,500,250,125,62))
                            .text(data.id)))
        // solved
            .append($("<td></td>")
                    .attr("style",getColor(data.solved,500,250,125,62))
                    .text(data.solved))
        // solved/day
            .append($("<td></td>")
                    .text(data.solvedPerDay.toFixed(2)));

        var now = new Date();
        for(var j=0; j<data.recentACs.length; j++){
            if(data.recentACs[j] !== null){
                var dt = dtToString(now - data.recentACs[j].time) + "前";
                $("#row"+i)
                    .append($("<td></td>")
                            .append($('<a></a>')
                                    .attr("href", pref + "review.jsp?rid=" + data.recentACs[j].runID)
                                    .attr("style",getColor(now - data.recentACs[j].time,1000*60,1000*60*60*24,1000*60*60*24*7,1000*60*60*24*30,true))
                                    .text(data.recentACs[j].id)))
                    .append($("<td></td>")
                            .append($('<a></a>')
                                    .attr("href", pref + "review.jsp?rid=" + data.recentACs[j].runID)
                                    .attr("style",getColor(now - data.recentACs[j].time,1000*60,1000*60*60*24,1000*60*60*24*7,1000*60*60*24*30,true))
                                    .text(dt)));
            } else {
                $("#row"+i)
                    .append($("<td></td>").text(""))
                    .append($("<td></td>").text(""));

            }
        }

    }
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

var getColor = function(x,a,b,c,d,inv){
    if(inv){
        x*=-1; a*=-1; b*=-1; c*=-1; d*=-1;
    }
    var res = "color:";
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
    res += ";";
    return res;
};

var memberIDs = [
    // B3
    "komi0222",
    "menphim",
    "dispenser",
    "arsenic28",
    // B2
    "bnsgny",
    "CROW",
    // B1
    "is0248vx",
    "Nanana"
];
