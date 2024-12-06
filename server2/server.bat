@echo off

echo Ejecutando node...
npm start

echo Ejecutando ngrok...
ngrok http --domain=key-fair-glowworm.ngrok-free.app 3000

echo ¡Los procesos han sido iniciados! Presiona cualquier tecla para finalizar.
pause