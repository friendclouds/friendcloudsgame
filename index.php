<!DOCTYPE html>
<html lang="en">
<head>

  <!-- Basic Page Needs
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <meta charset="utf-8">
  <title>Friend Clouds</title>
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- Mobile Specific Metas
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- FONT
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>

  <!-- CSS
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/skeleton.css">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/spinner.css">

  <!-- Scripts
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

  <!-- Favicon
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link rel="icon" type="image/png" href="images/favicon.png">

</head>
<body>

<div id="fb-root"></div>

<!-- Primary Page Layout
–––––––––––––––––––––––––––––––––––––––––––––––––– -->
<div class="container">
  <h4 class="section-heading">Friend Clouds - An amazing swarm of friend names</h4>

  <div id="cloudContainer" class="cloudContainer">
  	<div class="spinner-loader">
	  Loading…
	</div>
  </div>

  <div class="fb-login-button facebookLoginButton" onlogin="Core.FacebookUtils.checkLoginState();" data-scope="user_friends" data-max-rows="1" data-size="xlarge" data-show-faces="true" data-auto-logout-link="false"></div>
  <br />
  <br />

  <button onclick="shareOnFacebook();">Share on Facebook</button>
  	
  <div class="container socialSection">
  	<div class="row">
	  	<div class="one-third column">
	  		<div class="fb-share-button" data-href="https://friendclouds.net/" data-layout="button_count"></div>
	    </div>
	    <div class="one-third column twitterButton">
		  	<a href="https://twitter.com/share" class="twitter-share-button"{count} data-via="temptzone">Tweet</a>
		</div>
		<div class="one-third column gPlusButton">
			<!-- Place this tag where you want the +1 button to render. -->
      <div class="g-plusone" data-annotation="inline" data-width="120" data-href="https://friendcloud.net"></div>
		</div>
	  </div>
  </div>
  
  <div class="container footer">
  	<p>
  		&copy; All rights reserved. <a href="#">Friend Clouds</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">Privacy Policy</a>&nbsp;|&nbsp;<a href="#">Terms of Use</a>
  	<p>
  </div>

</div>

<script src="lib/jquery-2.0.3/build/jquery.js"></script>
<script src="lib/underscore-1.5.2/build/underscore.js"></script>
<script src="lib/backbone-1.1.0/build/backbone.js"></script>
<script src="lib/react-0.8.0/build/react.js"></script>
<script src="lib/react-0.8.0/build/JSXTransformer.js"></script>
<script src="lib/d3/d3.js"></script>
<script src="lib/saveSvgAsPng/saveSvgAsPng.js"></script>
<script src="d3.layout.cloud.js"></script>
<script src="main.js"></script>


<!-- Facebook Implementation -->
<script type="text/jsx">

	
	Core.UIUtils.initialise();

  var shareOnFacebook = function(){

    FB.ui({
      method: 'feed',
      picture: 'https://developers.facebook.com/images/devsite/fb4d_logo-2x.png',
      link: 'https://developers.facebook.com/docs/',
      caption: 'An example caption',
    }, function(response){});
  }

	window.fbAsyncInit = function() {
		console.log("fbAsyncInit");

        Core.FacebookUtils.initFB();
        Core.FacebookUtils.checkLoginState();
      };

	(function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/all.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, "script", "facebook-jssdk"));
</script>

<!-- Twitter Implementation -->
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

<!-- Google Plus Implementation -->
<!-- Place this tag in your head or just before your close body tag. -->
<script src="https://apis.google.com/js/platform.js" async defer></script>


<!-- End Document
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
</body>
</html>