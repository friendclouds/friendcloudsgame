var Core;
(function(Core){

	var uid;
	var accessToken;
	var friendList = [];
	var windowWidth = $(".cloudContainer").width();
	var windowHeight = windowWidth * 9 / 16;
	var canvasWidth = windowWidth > 1000 ? 1000 : windowWidth;
	var canvasHeight = windowHeight > 563 ? 563 : windowHeight;
	var spinnerTop = (windowHeight - 40) / 2;
	var spinnerLeft = (windowWidth - 40) / 2;
	var message = "Check out my Friend Cloud!";
	var fontFamily = "Futura-CondensedExtraBold";
	var fontSizeVariant = 50;

	var UIUtils = (function(){
		return {
			initialise : function(){
				$(".cloudContainer").height(canvasHeight);
				$(".spinner-loader").css({ top: spinnerTop, left: spinnerLeft });
				$(".postToFacebook").hide();
			},
			generateRandomNumber : function(min, max){
				var num = Math.floor(Math.random()*max) + min; 		// this will get a number between 1 and 99;
				num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; 	// this will add minus sign in 50% of cases
				return num;
			},
			cloudReady : function(isReady){
				if(isReady)
				{
					$(".spinner-loader").hide();
					$(".postToFacebook").show();
					$(".fontSliderContainer").show();
				}
				else
				{
					$(".spinner-loader").show();
					$(".postToFacebook").hide();
					$(".fontSliderContainer").hide();
				}
			},
			loading : function(isLoading) {

				if(isLoading)
				{
					// add the overlay with loading image to the page
			        var over = '<div id="overlay">' +
			            '<div id="loading">Posting to Facebook...</div>' +
			            '</div>';
			        $(over).appendTo('body');	
				}
		        else
		        {
		        	$('#overlay').remove();
		        }
	    	},
	    	onFontSizeChanged : function() {
	    		console.log($("#fontSlider").val());
	    		fontSizeVariant = $("#fontSlider").val();
	    		Core.D3Utils.generateWordCloud();
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
				    return {text: d, size: fontSize + Math.random() * fontSizeVariant};
				  }))
				  .padding(2)
				  .rotate(function() { return Core.UIUtils.generateRandomNumber(0, 60) })
				  .font(fontFamily)
				  .fontSize(function(d) { return d.size; })
				  .on("end", draw)
				  .start();

				function draw(words) {
					d3.select("svg").remove();
					d3.select(".cloudContainer").append("svg")
						.attr("id", "svgobject")
					    .attr("width", canvasWidth)
					    .attr("height", canvasHeight)
					  .append("g")
					    .attr("transform", "translate("+canvasWidth/2+","+canvasHeight/2+")")
					  .selectAll("text")
					    .data(words)
					  .enter().append("text")
					    .style("font-size", function(d) { return d.size + "px"; })
					    .style("font-family", fontFamily)
					    .style("font-weight", "bold")
					    .style("fill", function(d, i) { return fill(i); })
					    .attr("text-anchor", "middle")
					    .attr("transform", function(d) {
					      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
					    })
					    .text(function(d) { return d.text; });

					Core.UIUtils.cloudReady(true);
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

				// This bit is important.  It detects/adds XMLHttpRequest.sendAsBinary.  Without this
				// you cannot send image data as part of a multipart/form-data encoded request from
				// Javascript.  This implementation depends on Uint8Array, so if the browser doesn't
				// support either XMLHttpRequest.sendAsBinary or Uint8Array, then you will need to
				// find yet another way to implement this. (This is left as an exercise for the reader,
				// but if you do it, please let me know and I'll integrate it.)

				// from: http://stackoverflow.com/a/5303242/945521

		        if ( XMLHttpRequest.prototype.sendAsBinary === undefined ) {
				    XMLHttpRequest.prototype.sendAsBinary = function(string) {
				        var bytes = Array.prototype.map.call(string, function(c) {
				            return c.charCodeAt(0) & 0xff;
				        });
				        this.send(new Uint8Array(bytes).buffer);
				    };
				}
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

				Core.UIUtils.cloudReady(false);

		    	// Check if user logged in on initialization
	        	FB.getLoginStatus(function(response) {
					console.log("getLoginStatus:" + response.status);
					if (response.status === 'connected') {
					// the user is logged in and has authenticated your
					// app, and response.authResponse supplies
					// the user's ID, a valid access token, a signed
					// request, and the time the access token 
					// and signed request each expire
					uid = response.authResponse.userID;
					accessToken = response.authResponse.accessToken;

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
			},

			shareOnFacebook : function() {

				Core.UIUtils.loading(true);
				setTimeout(function(){ Core.UIUtils.loading(false); }, 30000);

				//var img = document.getElementById('clementine');
				var svg = document.getElementById("svgobject");
				//var serializer = new XMLSerializer();
				//var svgContent = serializer.serializeToString(svg);

				//var svgContent = '<svg height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>';

				var serializer = new XMLSerializer();
				var svgContent = serializer.serializeToString(svg);

		        var canvas = document.createElement("canvas"); 
		        //canvas.width = svg.width; 
		        //canvas.height = svg.height;
		        
		        //var ctx = canvas.getContext("2d"); 
        		//ctx.drawImage(img,0,0);
        		
        		canvg(canvas, svgContent);
		        
		        var c = canvas.toDataURL();
		        console.log(c);
		        var type = c.substring(5, c.indexOf(";"));
		        console.log("type: " + type);
		        var encodedPng = c.substring(c.indexOf(',')+1,c.length);
		        var decodedPng = Base64Binary.decode(encodedPng);
		        Core.FacebookUtils.PostImageToFacebook(accessToken, 'Friend Cloud', type, decodedPng, message);
		    	
			},

			// This function takes an array of bytes that are the actual contents of the image file.
			// In other words, if you were to look at the contents of imageData as characters, they'd
			// look like the contents of a PNG or GIF or what have you.  For instance, you might use
			// pnglib.js to generate a PNG and then upload it to Facebook, all from the client.
			//
			// Arguments:
			//   authToken - the user's auth token, usually from something like authResponse.accessToken
			//   filename - the filename you'd like the uploaded file to have
			//   mimeType - the mime type of the file, eg: image/png
			//   imageData - an array of bytes containing the image file contents
			//   message - an optional message you'd like associated with the image

			PostImageToFacebook : function( authToken, filename, mimeType, imageData, message ){
			    // this is the multipart/form-data boundary we'll use
			    var boundary = '----ThisIsTheBoundary1234567890';
			    
			    // let's encode our image file, which is contained in the var
			    var formData = '--' + boundary + '\r\n'
			    formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
			    formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
			    for ( var i = 0; i < imageData.length; ++i )
			    {
			        formData += String.fromCharCode( imageData[ i ] & 0xff );
			    }
			    formData += '\r\n';
			    formData += '--' + boundary + '\r\n';
			    formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
			    formData += message + '\r\n'
			    formData += '--' + boundary + '--\r\n';

			    var xhr = new XMLHttpRequest();
			    xhr.open( 'POST', 'https://graph.facebook.com/me/photos?access_token=' + authToken, true );
			    xhr.onload = xhr.onerror = function() {
			    	console.log( "XMLHttpRequest response" );
			        console.log( xhr.responseText );
			        Core.UIUtils.loading(false);
			    };
			    xhr.setRequestHeader( "Content-Type", "multipart/form-data; boundary=" + boundary );
			    xhr.sendAsBinary( formData );
			}
		};
	})();
	Core.FacebookUtils = FacebookUtils;

})	// End of Core Declaration
(Core || ( Core = {} ));