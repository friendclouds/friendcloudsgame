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
  <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>-->

  <!-- Favicon
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link rel="icon" type="image/png" href="images/favicon.png">
  
</head>
<body onload="redirect();">

<div id="fb-root"></div>

<!-- Primary Page Layout
–––––––––––––––––––––––––––––––––––––––––––––––––– -->
<div class="container">
  <h4 class="section-heading">Friend Clouds - An amazing swarm of friend names</h4>

  <div class="postToFacebook">
    <button class="button-primary" onclick="Core.FacebookUtils.shareOnFacebook();">Post on Facebook</button>
  </div>
  

  <div id="cloudContainer" class="cloudContainer">
  	<div class="spinner-loader">
  	  Loading…
  	</div>
  </div>

  <div class="postToFacebook">
    <button class="button-primary" onclick="Core.FacebookUtils.shareOnFacebook();">Post on Facebook</button>
  </div>

  <div class="container fontSliderContainer">
    <div class="row">
      <div class="one-third column">Name Size: </div>
      <input class="two-thirds column" id="fontSlider" type="range" name="points" min="1" max="100" onchange="Core.UIUtils.onFontSizeChanged();" />
    </div>
  </div>

  <div class="fb-login-button facebookLoginButton" onlogin="Core.FacebookUtils.checkLoginState();" data-scope="user_friends,publish_actions" data-max-rows="1" data-size="xlarge" data-show-faces="true" data-auto-logout-link="false"></div>
  <br />
  <br />
  	
  <div class="container socialSection">
  	<div class="row">
      <div class="one-third column">
	  		<div class="fb-share-button" data-layout="button_count"></div>
	    </div>
	    <div class="one-third column twitterButton">
  		  	<a href="https://twitter.com/share" class="twitter-share-button"{count}>Tweet</a>
  		</div>
  		<div class="one-third column gPlusButton">
  			<!-- Place this tag where you want the +1 button to render. -->
        <div class="g-plusone" data-annotation="inline" data-width="120"></div>
  		</div>
	  </div>
  </div>
  
  <div class="container footer">
  	<p>
  		&copy; All rights reserved. <strong>Tempt Zone</strong>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#">Privacy Policy</a>&nbsp;|&nbsp;<a href="#">Terms of Use</a>
  	<p>
  </div>

  <!--<img id="clementine" src="images/Clementine.jpg" />-->
</div>

<script src="lib/jquery-2.0.3/build/jquery.js"></script>
<script src="lib/underscore-1.5.2/build/underscore.js"></script>
<script src="lib/backbone-1.1.0/build/backbone.js"></script>
<script src="lib/react-0.8.0/build/react.js"></script>
<script src="lib/react-0.8.0/build/JSXTransformer.js"></script>
<script src="lib/d3/d3.js"></script>
<script src="lib/base64binary/base64-binary.js"></script>
<script src="lib/canvg/canvg.js"></script>
<script src="d3.layout.cloud.js"></script>
<script src="main.js"></script>


<!-- Facebook Implementation -->
<script type="text/jsx">

	Core.UIUtils.initialise();

	window.fbAsyncInit = function() {
		console.log("fbAsyncInit");

        Core.FacebookUtils.initFB();
        Core.FacebookUtils.checkLoginState();
      };

</script>

<!-- Twitter Implementation -->
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

<!-- Google Plus Implementation -->
<!-- Place this tag in your head or just before your close body tag. -->
<script src="https://apis.google.com/js/platform.js" async defer></script>

<!-- Facebook Scripts -->
<script type="text/javascript">
  /* Facebook Scripts */
  (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/all.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, "script", "facebook-jssdk"));
</script>

<!-- Google Analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-38769596-7', 'auto');
  ga('send', 'pageview');

</script>

<!-- End Document
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
</body>
</html>