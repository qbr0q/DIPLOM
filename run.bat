@echo off

REM Запуск бэкенда
cd BACKEND
call venv\Scripts\activate.bat
start python main.py
cd ..

REM Запуск фронтенда
cd FRONT
start npm start
cd ..