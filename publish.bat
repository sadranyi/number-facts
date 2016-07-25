@ECHO OFF
ECHO
IF EXIST index.zip DEL index.zip
ECHO Installing Node packages from packag.json file exists

IF EXIST package.json (CALL npm install)
IF NOT EXIST lambda MKDIR lambda
ECHO Deleting contents of folder...
DEL lambda\*.* /Q
ECHO File Copy Started...
COPY index.js lambda
IF EXIST package.json (
    COPY package.json lambda
    ECHO Copying Node Packages Started...
    ROBOCOPY node_modules lambda\node_modules\ /S /E /Y /Q
    ECHO Copying Node Packages Complete...
)
ECHO File Copy Complete

ECHO Zipping Deploy Package...
7z a index.zip lambda\*.* 

ECHO Publishing to AWS Lambda Starting...
ECHO Ensure that the function already exists and the name has no spaces
SET /p fname=Please enter the lambda function name 
aws lambda update-function-code --function-name %fname% --zip-file fileb://index.zip