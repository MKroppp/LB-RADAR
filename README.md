# LB-RADAR
Емулятор вимірювальної частини радару надається у вигляді Docker image під назвою radar-emulation-service. Щоб запустити емулятор, виконайте наступні кроки:  
1. Завантажте Docker image з Docker Hub:  
docker pull iperekrestov/university:radar-emulation-service  
2. Запустіть Docker контейнер, використовуючи наступну команду:  
docker run --name radar-emulator -p 4000:4000 iperekrestov/university:radar-emulation-service

Для зчитування даних з емулятора необхідно підключитися до нього через WebSocket:  
wscat -c ws://localhost:4000  

Веб-додаток підключається до WebSocket сервера, зчитує дані про задетектовані цілі та відображає отримані дані на графіку в полярних координатах. Обробляє дані отримані через вебсокет і відображає їх на графіку.
![Радар](https://github.com/MKroppp/LB-RADAR/blob/main/Screenshots/4.png)  

Кожна мета представлена як точка на графіку з координатами (кут, відстань).
![Точка](https://github.com/MKroppp/LB-RADAR/blob/main/Screenshots/5.png)  

Можливість зміни параметрів вимірювальної частини радара за допомогою API запитів.
![Изменения](https://github.com/MKroppp/LB-RADAR/blob/main/Screenshots/6.png)  
![Код](https://github.com/MKroppp/LB-RADAR/blob/main/Screenshots/3.png)
