<?php


function echoBootstrapAndJqueryDependencies() {
  echo ('
    <!-- Bootstrap Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" 
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" 
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

    <!-- jquery slim version is for bootstrap, but no $.ajax/$.post/$.get in slim version -->
    <script src="assets/libraries/jquery-3.3.1.min.js"></script>
    <script src="assets/libraries/js-session-library.js"></script>
  ');
}


function echoNavbar() {
  echo ('
    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top navbar-fixed-top">
        <a class="navbar-brand" href="index.php"><h1>OurTube</h1></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMainMenu" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                精選頻道
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMainMenu">
                <a class="dropdown-item" href="#">中英文雙字幕影片</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">深度英文演講</a>
                <a class="dropdown-item" href="#">知識型動畫</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">看BBC學英文</a>
                <a class="dropdown-item" href="#">看CNN學英文</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">TOEIC 多益考試</a>
                <a class="dropdown-item" href="#">TOFEL 托福考試</a>
                <a class="dropdown-item" href="#">IELTS 雅思 <span class="badge badge-danger">NEW</span></a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">阿滴英文 </a>
                <a class="dropdown-item" href="#">主編解析 <span class="badge badge-danger">NEW</span></a>
              </div>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownLevels" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                程度分級
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownLevels">
                <div class="dropright" href="#">
                  <a class="dropdown-item dropdown-toggle" href="#" id="levelsDropdownLevel1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">初級: TOEIC 250-545</a>
                  <div class="dropdown-menu" aria-labelledby="levelsDropdownLevel1">
                    <a class="dropdown-item" href="#">a</a>
                  </div>
                </div>
                <div class="dropright" href="#">
                  <a class="dropdown-item dropdown-toggle" href="#" id="levelsDropdownLevel1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">中級: TOEIC 550-780</a>
                  <div class="dropdown-menu" aria-labelledby="levelsDropdownLevel1">
                    <a class="dropdown-item" href="#">a</a>
                  </div>
                </div>
                <div class="dropright" href="#">
                  <a class="dropdown-item dropdown-toggle" href="#" id="levelsDropdownLevel1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">高級: TOEIC 785-990</a>
                  <div class="dropdown-menu" aria-labelledby="levelsDropdownLevel1">
                    <a class="dropdown-item" href="#">a</a>
                  </div>
                </div>
              </div>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                聽力口說
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="#">每日口說挑戰</a>
                <a class="dropdown-item" href="#">聽力測驗</a>
              </div>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                社群
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="#">激勵牆</a>
                <a class="dropdown-item" href="#">翻譯社群</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">VoiceTube Campus</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">匯入影片</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  ');
}


?>