var arr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];
var onlineData = {};

function getOnline(y){
  $.ajax({
    url: "https://wind-bow.gomix.me/twitch-api/streams/" + arr[y],
    dataType:"json",
    success:function(data){
      onlineData[arr[y]] = {};
      if(data.stream !== null){
        onlineData[arr[y]].stream = data.stream.game;
      }
      else{
       onlineData[arr[y]].stream = "offline";
      }      
      $.ajax({
      url: "https://wind-bow.gomix.me/twitch-api/channels/" + arr[y],
      dataType:"json",
      success:function(info){
        if(info.error){
          onlineData[arr[y]].stream = "Does not exist";
          onlineData[arr[y]].logo = "";
        }
        onlineData[arr[y]].logo = info.logo;
        onlineData[arr[y]].link = "https://www.twitch.tv/" + arr[y];
      }
      });
    }
    
  });
}

for (var i in arr) {
  (function (i) {
    getOnline(i);
  })(i);
}

$("#all").on("click",function(){
  $("#all").css("background-color","#3824FF");
  $("#offline").css("background-color","#6441A4");
  $("#online").css("background-color","#6441A4");
  $("#results").html('');
  for(var i in arr){    
    var resultHtml = "";
    resultHtml += "<a href = " + onlineData[arr[i]].link + ' target="_blank">'
    resultHtml += "<div class = 'channel row'>";
    resultHtml += "<img src = " + onlineData[arr[i]].logo +" class= 'col-xs-1'/>";    
    resultHtml += "<p class= 'col-xs-6 text-left'>" + arr[i]+  "</p>";    
    resultHtml += "<p class= 'col-xs-5 text-left'>"+ onlineData[arr[i]].stream + "</p>";
    resultHtml +="</div>";
    resultHtml +="</a>";
    $("#results").append(resultHtml);
  }
});

$("#online").on("click",function(){
  $("#online").css("background-color","#3824FF");
  $("#offline").css("background-color","#6441A4");
  $("#all").css("background-color","#6441A4");
  $("#results").html('');
  for(var i in arr){    
    if(onlineData[arr[i]].stream !== "offline" && onlineData[arr[i]].stream !== "Does not exist"){
      var resultHtml = "";
      resultHtml += "<a href = " + onlineData[arr[i]].link + ' target="_blank">'
      resultHtml += "<div class = 'channel row'>";
      resultHtml += "<img src = " + onlineData[arr[i]].logo +" class= 'col-xs-1'/>";    
      resultHtml += "<p class= 'col-xs-6 text-left'>" + arr[i]+  "</p>";    
      resultHtml += "<p class= 'col-xs-5 text-left'>"+ onlineData[arr[i]].stream + "</p>";
      resultHtml +="</div>";
      resultHtml +="</a>";
      $("#results").append(resultHtml);
    }
  }
});

$("#offline").on("click",function(){
  $("#offline").css("background-color","#3824FF");
  $("#all").css("background-color","#6441A4");
  $("#online").css("background-color","#6441A4");
  $("#results").html('');
  for(var i in arr){    
    if(onlineData[arr[i]].stream === "offline"){
      var resultHtml = "";
      resultHtml += "<a href = " + onlineData[arr[i]].link + ' target="_blank">'
      resultHtml += "<div class = 'channel row'>";
      resultHtml += "<img src = " + onlineData[arr[i]].logo +" class= 'col-xs-1'/>";    
      resultHtml += "<p class= 'col-xs-6 text-left'>" + arr[i]+  "</p>";    
      resultHtml += "<p class= 'col-xs-5 text-left'>"+ onlineData[arr[i]].stream + "</p>";
      resultHtml +="</div>";
      resultHtml +="</a>";
      $("#results").append(resultHtml);
    }
  }
});

$("ESL_SC2").on("click",function(){
  console.log(onlineData[ESL_SC2].link);
})
