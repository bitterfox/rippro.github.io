// TODO: UI
// TODO: highchartに変える
// TODO: last submission を表示

var pref = "http://judge.u-aizu.ac.jp/onlinejudge/";

$.event.add(window,"load",function() {
    updateGraphAndTable(memberIDs);
    $("#update").click(function(){
        updateGraphAndTable(memberIDs);
    });
    // $("#table-recent").tablesorter();
    $("#table-problems").tablesorter();
});

var updateGraphAndTable = function(userIDs){
    var users = [];
    for(var i=0; i<userIDs.length; i++){
        var solved_list = getSolvedProblems(userIDs[i]);
        users.push({
            id: userIDs[i],
            solved_list: solved_list,
            solved: solved_list.length
        });
    }

    var solved = {};
    for(var i=0; i<users.length; i++){
        solved[users[i].id] = users[i].solved;
    }

    users.sort(function(a,b){
        return solved[b.id] - solved[a.id];
    });

    memberIDs.sort(function(a,b){
        return solved[b] - solved[a];
    });

    var recentStatusDatas = [];
    var graphDatas = [];
    for(var i=0; i<users.length; i++){
        graphDatas.push(makeGraphData(users[i]));
        recentStatusDatas.push(makeRecentStatusData(users[i]));
    }

    drawGraph(graphDatas);
    fillRecentStatusTable(recentStatusDatas);
    makeSolvedTable(problems);
    fillSolvedTable(users);
};

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
                    var time = new Date(parseInt(s));
                    if(id in solved_set) return;
                    solved_set[id] = 0;
                    res.push({id:id,time:time,runID:runID});
                });
            }
        });
    }
    res.sort(function(a,b){
        return a.time - b.time;
    });
    return res;
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

var makeRecentStatusData = function(user){
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

    res.solvedLast24Hours = 0;
    var now = new Date();
    for(var i=0; i<user.solved_list.length; i++){
        var j = user.solved_list.length-i-1;
        if(now - user.solved_list[j].time <= 1000*86400){
            res.solvedLast24Hours++;
        } else {
            break;
        }
    }

    res.recentACs = [];
    res.recentACs.length = 5;
    for(var i=0; i<5; i++){
        if(user.solved_list[user.solved_list.length-i-1])
            res.recentACs[i] = user.solved_list[user.solved_list.length-i-1];
    }

    return res;
};

var fillRecentStatusTable = function(recentStatusDatas){
    var $thead = $("<thead></thead>");
    var $tbody = $("<tbody></tbody>");

    $thead.append($("<tr></tr>")
                  .append($("<th></th>").text("No"))
                  .append($("<th></th>").text("ID"))
                  .append($("<th></th>").text("Total"))
                  .append($("<th></th>").text("Per day"))
                  .append($("<th></th>").text("In 24h"))
                  .append($("<th></th>").text("Recent")
                          .attr("colspan",2*recentStatusDatas.length)));

    for(var i=0; i<recentStatusDatas.length; i++){
        var data = recentStatusDatas[i];
        var age = dtToString(data.age);
        var $tr = $("<tr></tr>").attr("id","row"+i);
        $tr
        // ID
            .append($("<td></td>").text(i+1))
            .append($("<td></td>")
                    .append($('<a></a>')
                            .attr("href",pref + "user.jsp?id=" + data.id)
                            .attr("style",getColor(data.solved,400,300,200,100))
                            .text(data.id)))
        // solved
            .append($("<td></td>")
                    .attr("style",getColor(data.solved,400,300,200,100))
                    .text(data.solved))
        // solved/day
            .append($("<td></td>")
                    .text(data.solvedPerDay.toFixed(2)))
        // solved in 24 hours
            .append($("<td></td>")
                    .text(data.solvedLast24Hours)
                    .attr("style",
                          getColor(data.solvedLast24Hours,
                                   10,5,3,1)));

        var now = new Date();
        for(var j=0; j<data.recentACs.length; j++){
            if(data.recentACs[j]){
                var dt = dtToString(now - data.recentACs[j].time) + "前";
                $tr.append(
                    $("<td></td>")
                        .append(
                            $('<a></a>')
                                .attr("href", pref + "description.jsp?id=" + data.recentACs[j].id)
                                .attr("style",getColor(now - data.recentACs[j].time,1000*60,1000*60*60*24,1000*60*60*24*7,1000*60*60*24*30,true))
                                .text(data.recentACs[j].id)))
                    .append(
                        $("<td></td>")
                            .append(
                                $('<a></a>')
                                    .attr("href", pref + "review.jsp?rid=" + data.recentACs[j].runID)
                                    .attr("style",getColor(now - data.recentACs[j].time,1000*60,1000*60*60*24,1000*60*60*24*7,1000*60*60*24*30,true))
                                    .text(dt)));
            } else {
                $tr
                    .append($("<td></td>"))
                    .append($("<td></td>"));
            }
        }
        $tbody.append($tr);
    }

    $("#table-recent").append($thead).append($tbody);
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

var makeSolvedTable = function(problems){
    var $thead = $("<thead></thead>");
    var $ths = $("<tr></tr>")
        .append($("<th></th>").text("ID").attr("class", "problem-id"))
        .append($("<th></th>").text("Name"))
        .append($("<th></th>").text("Point"));
    for(var i=0; i<memberIDs.length; i++){
        $ths.append($("<th></th>")
                    .text(i+1)
                    .attr("class", "solved-mark"));
    }

    var $tbody = $("<tbody></tbody>");
    for(var i=0; i<problems.length; i++){
        var prob = problems[i];
        var pid = prob[0];
        var pname = prob[1];
        var ppoint = prob[3];

        // add column id, name, point
        var $row = $("<tr></tr>").attr("id", pid)
            .append($("<td></td>")
                .text(pid).attr("class","problem-id"))
            .append($("<td></td>")
                .append($("<a></a>")
                .attr("href", pref + "description.jsp?id=" + pid)
                .text(pname)))
            .append($("<td></td>")
                .text(ppoint)
            );
        // add column for each user.
        for(var j=0; j<memberIDs.length; j++){
            $row.append($("<td></td>")
                .attr("id", pid + "-" + j)
                .attr("class", "solved-mark"));
        }
        $tbody.append($row);
    }
    $("#table-problems").append($thead.append($ths)).append($tbody);
};

var fillSolvedTable = function(users){
    for(var i=0; i<users.length; i++){
        var user = users[i];
        var solved_list = user.solved_list;
        for(var j=0; j<solved_list.length; j++){
            $("#"+solved_list[j].id+"-"+i)
                .append($("<a></a>")
                        .attr("href", pref + "review.jsp?rid=" + solved_list[j].runID)
                        .text("#"));
        }
    }
};

$.event.add(window,"load",function() {
    $("#description-title").click(function () {
        $("#description").toggle();
    });
});
