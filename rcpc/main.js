// TODO: UI
// TODO: highchartに変える
// TODO: last submission を表示

(function(){

    var pref = "http://judge.u-aizu.ac.jp/onlinejudge/";

    $.event.add(window,"load",function() {
        console.time("begin"); // 2850 ms
        updateGraphAndTable();
        $("#table-recent").tablesorter();
        $("#table-problems").tablesorter();
        console.timeEnd("begin");
    });

    var updateGraphAndTable = function(){
        var users = [];
        for(var i=0, l=memberIDs.length; i<l; i++){
            users[users.length] = makeUserData(memberIDs[i], problems);
        }
        users.sort(function(a,b){
            if(a.score !== b.score) return b.score - a.score;
            if(a.grade !== b.grade) return a.grade - b.grade;
            if(a.total_score !== b.total_score) return b.total_score - a.total_score;
            return a.id < b.id ? -1 : 1;
        });

        var recentStatusDatas = [];
        for(var i=0, l=users.length; i<l; i++){
            recentStatusDatas[i] = makeRecentStatusData(users[i]);
        }

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
                    var time = new Date(+s);
                    if(time > new Date(2014,9,9,0,0,0)) return false; // break;
                    if(!isResubmission(id,ignore_list)){
                        solved_set[id] = 0;
                    } else solved_set[id] = 1;
                    solved_list[solved_list.length] = {id:id,time:time,runID:runID};
                    return true; // continue
                });
            }
        });

        var solved = solved_list.length - ignore_list.length;

        var offset_score = userID[2];
        var total_score = solved_list.length;
        for(var i=0, l=problems.length; i<l; i++){
            var id = problems[i][0];
            if(!(id in solved_set) || solved_set[id]===1) continue;
            else{
                total_score += problems[i][3] - 1;
            }
        }

        var score = total_score - offset_score;

        solved_list.sort(function(a,b){
            return a.time - b.time;
        });

        // var t=[];
        // for(var i=0;i<solved_list.length;i++){
        //     t.push(solved_list[i].id);
        // }
        // t.sort();
        // $("#content").append($("<div></div>").text(
        //     "[" + ['"'+userID[0]+'"',userID[1],score].join(",") + ', ["' + t.join('","') + '"]' + "],"
        // )
        // );

        var grade = userID[1];
        return {
            id: userID[0],
            solved_list: solved_list,
            solved: solved,
            offset_score: offset_score,
            total_score: total_score,
            score: Math.round(100*score/grade)/100,
            grade: userID[1],
            ignore_list: ignore_list
        };
    };

// var makeGraphData = function(user){
//     var data = [];
//     for(var i=0, l=user.solved_list.length; i<l; i++){
//         data[i] = [user.solved_list[i].time, i+1];
//     }

//     var res = {};
//     res.label = user.id;
//     res.data = data;
//     return res;
// };

// var drawGraph = function(graphDatas){
//     $.plot("#placeholder", graphDatas, {
//         xaxis: {
//             mode: "time"
//         },
//         legend: {
//             position: "nw"
//         }
//     });
// };

    var makeRecentStatusData = function(user){
        var res = {};
        res.id = user.id;
        res.solved = user.solved;
        var first = user.solved_list[0];
        var last = user.solved_list[user.solved_list.length-1];
        var now = new Date();
        var begin = new Date(2014,8,7,20,0,0);
        if(last){
            res.solvedPerDay = res.solved / (begin - now) * 1000*86400;
        } else {
            res.solvedPerDay = 0;
        }

        res.solvedLast24Hours = 0;
        for(var i=0, l=user.solved_list.length; i<l; i++){
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

        var now = new Date();
        for(var i=0, l=recentStatusDatas.length; i<l; i++){
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
                        .attr("style",getColor(data.solved,40,30,20,10))
                        .text(data.id)))
                // score
                .append($("<td></td>")
                    .attr("style",getColor(data.solved,40,30,20,10) + "font-weight:bold;")
                    .attr("id", data.id + "-score")
                    .text(data.score))
                // solved
                .append($("<td></td>")
                    .attr("style",getColor(data.solved,40,30,20,10))
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

            for(var j=0, l2=data.recentACs.length; j<l2; j++){
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
            .append($("<th></th>").text("Source"))
            .append($("<th></th>").text("Point"));
        for(var i=0, l=users.length; i<l; i++){
            $ths.append($("<th></th>")
                .text(users[i].id.substr(0,3))
                .attr("style", "font-size:small; width:2.2%"));
        }

        var $tbody = $("<tbody></tbody>");
        for(var i=0, l=problems.length; i<l; i++){
            var prob = problems[i];
            var pid = prob[0];
            var pname = prob[1];
            var psource = prob[2];
            var ppoint = prob[3];
            // add column (id, name, source, point)
            var $row = $("<tr></tr>").attr("id", pid)
                .append($("<td></td>")
                    .text(pid).attr("class","problem-id"))
                .append($("<td></td>")
                    .append($("<a></a>")
                        .attr("href", pref + "description.jsp?id=" + pid)
                        .text(pname)))
                .append($("<td></td>")
                    .text(psource))
                .append($("<td></td>")
                    .attr("id", pid + "-score")
                    .text(ppoint)
            );
            // add column for each user.
            for(var j=0, l2=users.length; j<l2; j++){
                $row.append($("<td></td>")
                    .attr("id", pid + "-" + users[j].id));
            }
            $tbody.append($row);
        }
        $("#table-problems").append($thead.append($ths)).append($tbody);
    };

    var fillSolvedTable = function(users){
        for(var i=0, l=users.length; i<l; i++){
            var user = users[i];
            var solved_list = user.solved_list;
            for(var j=0, l2=solved_list.length; j<l2; j++){
                var problem = solved_list[j];
                $("#"+problem.id+"-"+user.id)
                    .addClass("solved-mark")
                    .append($("<a></a>")
                        .attr("href", pref + "review.jsp?rid=" + problem.runID)
                        .text("#"));
            }
            var ignore_list = user.ignore_list;
            for(var j=0, l3=ignore_list.length; j<l3; j++){
                var pid = ignore_list[j];
                $("#"+pid+"-"+user.id).addClass("ignore");
            }
        }
    };

    $.event.add(window,"load",function() {
        $("#description-title").click(function () {
            $("#description").toggle();
        });
    });

})();
