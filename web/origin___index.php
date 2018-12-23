<?php
require_once __DIR__.'/init.php';
?>

<!DOCTYPE html>
<html style="height:100%">
<head>
  <?php echoBootstrapAndJqueryDependencies(); ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
  <script src="assets/javascripts/utility.js"></script>
  <script src="assets/javascripts/index.js"></script>
  <link rel="stylesheet" href="assets/css/index.css">
</head>


<body style="height:100%">
  <?php echoNavbar()?>

  <div class="container-fluid h-100" style="padding-top:7rem">
    <div class="row">
		  <div class="col-12">
		    <div class="d-lg-block d-none">
			    <img src="assets/images/hero_ad_banner.png" alt="banner_ad" class="img-center">
		    </div>
		  </div>
		</div>

    <div class="row">
		  <div class="col-12 col-md-8 col-lg-9">
        <div class="row">
          <div class="col-12" id="inputZone"></div>

          <!-- <form class="col-12 m-2" id="inputZone">
            <div class="form-group">
              <label for="url">VIDEO URL:</label>
              <input type="text" class="form-control" id="url">
            </div>
            <button type="submit" id="btn-search-url" class="btn btn-default mb-2" onclick="buttonClick()">SEARCH</button>
          </form> -->
           
        </div>
        <div class="row" id= "output"></div>
      </div>

      <!-- The sidebar part, using "col-12" to move the whole part under the main content(videos) when reading on small devices. The contents inside use the Bootstrap card component -->
		  <div class="col-6 offset-6 offset-md-0 col-md-4 col-lg-3">
        <div class="card sidebar panel">
          <img class="card-img-top img-cm" src="https://2.bp.blogspot.com/-6gFTAUHPMxQ/Wxt2YvEiG0I/AAAAAAAAOgU/xdJdvgxzQAI5ELvirno6dHYTD5mXtk1RgCLcBGAs/s1600/0.png" alt="Card image cap">
          <div class="card-body panel-body">
            <h5 class="card-title panel-heading">【秋番】2018年10月新番一覽（日本秋季新番列表）</h5>
            <p class="card-text">還沒找到這季要追的新番嗎？</p>
            <a href="http://justlaughtw.blogspot.com/2018/04/2018-10.html" target="_blank" class="btn btn-primary">去看看</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</body>

</html>