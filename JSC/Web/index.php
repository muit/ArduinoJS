<html>
<head>
	<meta charset="utf-8"/>
	<title>Arduino Panel</title>

	<?php 
		require 'php/api_control.php';
	?>

	<link rel="stylesheet" href="css/layout.css" type="text/css" media="screen" />
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="js/jquery-1.5.2.min.js" type="text/javascript"></script>
	<script src="js/hideshow.js" type="text/javascript"></script>
	<script src="js/jquery.tablesorter.min.js" type="text/javascript"></script>
	<script src="js/api-hscontrol.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/jquery.equalHeight.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){ 
			$(".tablesorter").tablesorter(); 
		});
		$(document).ready(function(){
			$(".tab_content").hide();
			$("ul.tabs li:first").addClass("active").show();
			$(".tab_content:first").show();
			//On Click Event
			$("ul.tabs li").click(function() {
				$("ul.tabs li").removeClass("active");
				$(this).addClass("active");
				$(".tab_content").hide();

				var activeTab = $(this).find("a").attr("href");
				$(activeTab).fadeIn();
				return false;
			});
		});
	</script>
	<script type="text/javascript">
		$(function(){
			$('.column').equalHeight();
		});
	</script>
</head>
<body>

	<header id="header">
		<hgroup>
			<h1 class="site_title"><a href="index.php">Control web</a></h1>
			<h2 class="section_title">Hazard Slug</h2><div class="btn_view_site"><a href="..">Ir a la web</a></div>
		</hgroup>
	</header>
	
	<aside id="sidebar" class="column">
		<form class="quick_search">
			<input type="text" value="Quick Search" onfocus="if(!this._haschanged){this.value=''};this._haschanged=true;">
		</form>
		
		<hr/>
		<h3>Acciones:</h3>
		<ul class="toggle">
			<li class="icn_edit_article"><a href="#connection">Connection</a></li>
			<li class="icn_tags"><a href="#ping">Ping</a></li>
			<li class="icn_categories"><a href="#">Pin States</a></li>
			<li class="icn_tags"><a href="#">Wheel Speed</a></li>
		</ul>
		
		<footer>
			<hr />
			<p><strong>Copyright &copy; 2014 ArduinoControl</strong></p>
			<p>Theme by MediaLoot & Miguel Fernandez</p>
		</footer>
	</aside>
	
	<section id="main" class="column">
		<div id="connection_state"><h4 class="alert_error">DESCONECTADO</h4></div>
		
		<a name="connection"></a>
		<h4 class="alert_info">Action: Connection.</h4>
		<h4 class="alert_error" style="display: none;" id="connection_error">Error</h4>
		<article class="module width_full">
			<header><h3>Connection</h3></header>
			<div class="module_content">
				<fieldset style="width:48%; float:left; margin-right: 3%;">
						<label>Direccion del Servidor</label>
						<input type="text" id="textInput_ip" style="width:50%;">
				</fieldset>
				<fieldset style="width:48%; float:left;">
					<label>Puerto</label>
					<input type="text" id="textInput_port" style="width:50%;">
				</fieldset>
				<div class="clear"></div>
			</div>
			<footer>
				<div class="submit_link">
					<input type="submit" value="Conectar" class="alt_btn" onClick="connect()">
				</div>
			</footer>
		</article>
		<div class="clear"></div>
		
		<a name="ping"></a>
		<article class="module width_full">
			<header><h3>Ping</h3></header>
				<div class="module_content">
				hey!
				</div>
		</article>
		<div class="spacer"></div>
	</section>
</body>
</html>