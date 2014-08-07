// TODO: UI
// TODO: highchartに変える
// TODO: last submission を表示

var pref = "http://judge.u-aizu.ac.jp/onlinejudge/";

$.event.add(window,"load",function() {
    updateGraphAndTable();
    $("#update").click(function(){
        updateGraphAndTable();
    });
    $("#table-recent").tablesorter();
    $("#table-problems").tablesorter();
});

var updateGraphAndTable = function(){
    var users = [];
    for(var i=0; i<memberIDs.length; i++){
        users.push(makeUserData(memberIDs[i], problems));
    }

    users.sort(function(a,b){
        return b.score - a.score !== 0 ? b.score - a.score : b.solved - a.solved;
    });

    var recentStatusDatas = [];
    var graphDatas = [];
    for(var i=0; i<users.length; i++){
        graphDatas.push(makeGraphData(users[i]));
        recentStatusDatas.push(makeRecentStatusData(users[i]));
    }

    drawGraph(graphDatas);
    fillRecentStatusTable(recentStatusDatas);
    makeSolvedTable(problems,users);
    fillSolvedTable(users);
};

var isResubmission = function(id,ignore_list){
    var lo  = 0;
    var hi = ignore_list.length - 1;
    var mid = Math.floor((hi + lo)/2);
    while(ignore_list[mid] != id && lo < hi){
        if (id < ignore_list[mid]){
            hi = mid - 1;
        } else if (id > ignore_list[mid]){
            lo = mid + 1;
        }
        mid = Math.floor((hi + lo)/2);
    }
    return (ignore_list[mid] != id) ? false : true;
};

var makeUserData = function(userID, problems){
    var solved_list = [];
    var id = userID[0];
    var solved_set = {};
    var ignore_list = userID[3];
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
                if(!isResubmission(id,ignore_list)) solved_set[id] = 0;
                else solved_set[id] = 1;
                solved_list.push({id:id,time:time,runID:runID});
            });
        }
    });

    var count = 0;
    var grade = userID[1];
    var score = solved_list.length - userID[2];
    for(var i=0; i<problems.length; i++){
        var id = problems[i][0];
        if(!(id in solved_set) || solved_set[id]===1) continue;
        else{
            score -= 1;
            if(grade === 1){
                score += problems[i][3];
            }else if(grade === 2){
                score += problems[i][3]/2;
            }else if(grade === 3){
                if(problems[i][2].match(/ICPC/)) score += 2;
                else score += 1;
            }
        }
    }

    solved_list.sort(function(a,b){
        return a.time - b.time;
    });

    var t=[];
    for(var i=0;i<solved_list.length;i++){
        t.push(solved_list[i].id);
    }
    $("#content").append($("<div></div>").text(
        "[" + ['"'+userID[0]+'"',userID[1],userID[2]].join(",") + ', ["' + t.join('","') + '"]' + "],"
    )
    );

    return {
        id: userID[0],
        solved_list: solved_list,
        solved: solved_list.length,
        score: score,
        grade: userID[1],
        ignore_list: ignore_list
    };
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
    res.score = user.score;
    return res;
};

var fillRecentStatusTable = function(recentStatusDatas){
    var $thead = $("<thead></thead>");
    var $tbody = $("<tbody></tbody>");

    $thead.append($("<tr></tr>")
                  .append($("<th></th>").text("Rank"))
                  .append($("<th></th>").text("Name"))
                  .append($("<th></th>").text("Score"))
                  .append($("<th></th>").text("Solved"))
                  .append($("<th></th>").text("Per day"))
                  .append($("<th></th>").text("In 24h"))
                  .append($("<th></th>").text("Recent")
                          .attr("colspan",2*recentStatusDatas.length)));


    for(var i=0; i<recentStatusDatas.length; i++){
        var data = recentStatusDatas[i];
        var age = dtToString(data.age);
        var $tr = $("<tr></tr>").attr("id","row"+i);
        $tr
        // rank
            .append($("<td></td>").text(i+1))
        // id
            .append($("<td></td>")
                    .append($('<a></a>')
                            .attr("href",pref + "user.jsp?id=" + data.id)
                            .attr("style",getColor(data.solved,400,300,200,100))
                            .text(data.id)))
        // score
            .append($("<td></td>")
                    .attr("style",getColor(data.solved,400,300,200,100) + "font-weight:bold;")
                    .attr("id", data.id + "-score")
                    .text(data.score))
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

var makeSolvedTable = function(problems, users){
    var $thead = $("<thead></thead>");
    var $ths = $("<tr></tr>")
        .append($("<th></th>").text("ID").attr("class", "problem-id"))
        .append($("<th></th>").text("Name"))
        .append($("<th></th>").text("Point"));
    for(var i=0; i<users.length; i++){
        $ths.append($("<th></th>")
                    .text(i+1)
                    .attr("style", "font-size:small; width:2.0%"));
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
                .attr("id", pid + "-score")
                .text(ppoint)
            );
        // add column for each user.
        for(var j=0; j<users.length; j++){
            $row.append($("<td></td>")
                .attr("id", pid + "-" + users[j].id));
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
            var problem = solved_list[j];
            $("#"+problem.id+"-"+user.id)
                .addClass("solved-mark")
                .append($("<a></a>")
                        .attr("href", pref + "review.jsp?rid=" + problem.runID)
                        .text("#"));
        }
        var ignore_list = user.ignore_list;
        for(var j=0;j<ignore_list.length; j++){
            var problem = ignore_list[j];
            $("#"+problem+"-"+user.id).addClass("ignore");
        }
    }
};

$.event.add(window,"load",function() {
    $("#description-title").click(function () {
        $("#description").toggle();
    });
});
