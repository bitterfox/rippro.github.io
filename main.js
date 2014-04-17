// TODO: UI
// TODO: highchartに変える
// TODO: last submission を表示

// Onload
$(function() {
    updateGraphAndTable(memberIDs);
    $("#update").click(function(){
        updateGraphAndTable(memberIDs);
    });
    $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
});

var Problem = function(id, time){
    this.id = id;
    this.time = time;
};

var User = function(id){
    this.id = id;
    this.solved_list = getSolvedProblems(id);
    this.solved = this.solved_list.length;
};

var getSolvedProblems = function(userID){
    var res = [];
    var userIDs = userID.split(",");
    var solved_set = {};
    for(var i=0; i<userIDs.length; i++){
        var id = userIDs[i];
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
                    if(id in solved_set) return;
                    solved_set[id] = 0;
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
    console.log(user.id, user.solved_list);
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
    res.solvedPerDay = res.solved / (last.time - first.time) * 1000*86400;
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
    res.lastAC = last;
    return res;
};

var fillTable = function(tableDatas){
    for(var i=0; i<tableDatas.length; i++){
        var data = tableDatas[i];
        var dt = new Date - data.lastAC.time;
        var last = dtToString(dt) + "前";
        var age = dtToString(data.age);
        $("#table").append(
            $("<tr></tr>")
                .append($("<td></td>")
                        .append($('<a></a>')
                                .attr("href","http://judge.u-aizu.ac.jp/onlinejudge/user.jsp?id=" + data.id)
                                .attr("style",getColor(data.solved,500,250,125,62))
                                .text(data.id)))
                .append($("<td></td>")
                        .attr("style",getColor(data.solved,500,250,125,62))
                        .text(data.solved))
                .append($("<td></td>").text(data.solvedPerDay.toFixed(2)))
                .append($("<td></td>")
                        .attr("style",getColor(data.solvedLastAWeek,16,8,4,1))
                        .text(data.solvedLastAWeek))
                .append($("<td></td>")
                        .attr("style",getColor(dt,1000*60,1000*60*60*24,1000*60*60*24*7,1000*60*60*24*30,true))
                        .text(last))
                .append($("<td></td>")
                        .text(data.lastAC.id)));
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
    // M以上,社会人
    "Respect2D",
    "kioa",
    "yokit9",
    "utisam",
    "ik11235",
    // B3
    "komi0222",
    "menphim",
    "dispenser",
    "arsenic28",
    // B2
    "bnsgny",
    "CROW"
    // B1
];
