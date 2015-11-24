### Folder Structure

app/
----- routes/
---------- index.routes.js
----- views/
---------- base.html
---------- header.html
---------- index.html
----- application.js
config/
----- env/
---------- development.js
---------- production.js
---------- test.js
----- strategies/
---------- facebook.js
---------- local.js
---------- twitter.js
----- config.js
----- express.js
----- mongoose.js
----- passport.js
gulp/
----- development.js
----- production.js
----- modules.js
modules/
----- dashboard/
---------- src/
--------------- app/
-------------------- components/
------------------------- home/
------------------------------ home.controller.js
------------------------------ home.service.js
------------------------------ home.html
------------------------- wall/
------------------------------ wall.controller.js
------------------------------ wall.service.js
------------------------------ wall.html
-------------------- shared/
------------------------- sidebar.directive.js
------------------------- sidebar.html
-------------------- app.module.js
--------------- assets/
-------------------- css/
------------------------- main.css
-------------------- img/
-------------------- js/
------------------------- ng-scripts.js
-------------------- libs/
------------------------- angular.js
------------------------- angular-ui-router.js
--------------- bower.json
--------------- gulpfile.js
--------------- index.html
--------------- package.json
---------- dist/
--------------- assets/
-------------------- css/
------------------------- style.css
-------------------- img/
-------------------- js/
------------------------- ng-scripts.js
------------------------- libs.js
--------------- index.html
public/
bower.json
gulpfile.js
package.json
server.js