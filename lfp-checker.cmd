@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\checker\index.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\checker\index.js" %*
)
