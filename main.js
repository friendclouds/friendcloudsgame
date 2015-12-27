var Core;
(function(Core){

	var friendList = [];
	var windowWidth = $(".cloudContainer").width();
	var windowHeight = windowWidth * 9 / 16;
	var canvasWidth = windowWidth > 1000 ? 1000 : windowWidth;
	var canvasHeight = windowHeight > 563 ? 563 : windowHeight;
	var spinnerTop = (windowHeight - 28) / 2;
	var spinnerLeft = (windowWidth - 28) / 2;

	var UIUtils = (function(){
		return {
			initialise : function(){
				$(".cloudContainer").height(canvasHeight);
				$(".spinner-loader").css({ top: spinnerTop, left: spinnerLeft });
			},
			generateRandomNumber : function(min, max){
				var num = Math.floor(Math.random()*max) + min; 		// this will get a number between 1 and 99;
				num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 	// this will add minus sign in 50% of cases
				return num;
			}
		};
	})();
	Core.UIUtils = UIUtils;

	var D3Utils = (function(){
		return {
			generateWordCloud : function(){
				<!-- D3 Word Cloud Scripts -->

				console.log("generateWordCloud");

				var sampleWords = ["Friend", "Clouds", "Generate", "Facebook", "Names", "Word", "Cloud", "Place", "From", "Is", "A", "To"];
				var words = friendList.length > 0 ? friendList : sampleWords;
				var fontSize = friendList.length > 0 ? 10 : 20;

				var fill = d3.scale.category20();
				d3.layout.cloud().size([canvasWidth, canvasHeight])
				  .words(words.map(function(d) {
				    return {text: d, size: fontSize + Math.random() * 50};
				  }))
				  .padding(2)
				  .rotate(function() { return Core.UIUtils.generateRandomNumber(0, 60) })
				  .font("Impact")
				  .fontSize(function(d) { return d.size; })
				  .on("end", draw)
				  .start();

				function draw(words) {
				d3.select("svg").remove();
				d3.select(".cloudContainer").append("svg")
				    .attr("width", canvasWidth)
				    .attr("height", canvasHeight)
				  .append("g")
				    .attr("transform", "translate("+canvasWidth/2+","+canvasHeight/2+")")
				  .selectAll("text")
				    .data(words)
				  .enter().append("text")
				    .style("font-size", function(d) { return d.size + "px"; })
				    .style("font-family", "Impact")
				    .style("fill", function(d, i) { return fill(i); })
				    .attr("text-anchor", "middle")
				    .attr("transform", function(d) {
				      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
				    })
				    .text(function(d) { return d.text; });

				$(".spinner-loader").hide();
				}
			}
		};
	})();
	Core.D3Utils = D3Utils;

	var FacebookUtils = (function(){
		return {
			initFB : function(){
				FB.init({
		          appId  : "696495557150091",
		          status : true,
		          xfbml  : true
		        });
			},
			fetchFriendList : function(){
				FB.api("/me/invitable_friends?fields=id,first_name&limit=200", "get", {}, function(result) {
					for(var i=0;i<result.data.length;i++)
					{
						var friendName = result.data[i].first_name;
						//var friendObj = new Friend();
				        //friendObj.set("name", friendName);
				        friendList.push(friendName);
					}
					
					Core.D3Utils.generateWordCloud();
		        });
			},
			checkLoginState : function() {

				$(".spinner-loader").show();

		    	// Check if user logged in on initialization
	        	FB.getLoginStatus(function(response) {
					console.log("getLoginStatus:" + response.status);
					if (response.status === 'connected') {
					// the user is logged in and has authenticated your
					// app, and response.authResponse supplies
					// the user's ID, a valid access token, a signed
					// request, and the time the access token 
					// and signed request each expire
					var uid = response.authResponse.userID;
					var accessToken = response.authResponse.accessToken;

					Core.FacebookUtils.fetchFriendList();

					} else if (response.status === 'not_authorized') {
					// the user is logged in to Facebook, 
					// but has not authenticated your app
					Core.D3Utils.generateWordCloud();
					} else {
					// the user isn't logged in to Facebook.
					Core.D3Utils.generateWordCloud();
					}
				});
			}
		};
	})();
	Core.FacebookUtils = FacebookUtils;

})	// End of Core Declaration
(Core || ( Core = {} ));