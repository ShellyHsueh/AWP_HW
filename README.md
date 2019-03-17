# AWH_HW
## Advanced Web Programming Homework
- Using YouTube API to implement the subtitles-community-constribution feature of YouTube.
- Demo: https://ourtube-awp.herokuapp.com/


## Purpose
- To get familiar with a full-stack web development process.

### Front End Practice
- JavaScript Design Pattern: Implementing callback, closure, configuration object, namespace, module pattern, etc.
- Implement subtitle-files upload and RWD using Bootstrap 4.
- Support both Chrome and IE11.

### Back End Practice
- Gateway: HTTP requests, YouTube API.
- Database: MySQL, ORM(Object relational Mapping, using ActiveRecord).


# Quick Start
### To run _OurTube_ (current application) locally
- Make sure credentials have been prepared in _web/config/secrets.dev.json_ file, containing YOUTUBE_KEY, GOOGLE_API_CLIENT_EMAIL, GOOGLE_API_CLIENT_ID, GOOGLE_API_PRIVATE_KEY, DATABASE_URL.
- Load google api library with the following commands
```
$ composer require google/apiclient:~2.0
```
- Then, you can run the web app and check on _http://localhost:1234/web/index.php_.
```
$ php -S localhost:1234
```