cd page-plugin
call yarn build
xcopy /y /i .\build\static\js\*.js ..\src\assets\react.js
xcopy /y /i .\build\static\css\*.css ..\src\assets\content.css
cd ..
call yarn build --mode production
cmd /k
