# LB-RADAR
Емулятор вимірювальної частини радару надається у вигляді Docker image під назвою radar-emulation-service. Щоб запустити емулятор, виконайте наступні кроки:  
1. Завантажте Docker image з Docker Hub:  
docker pull iperekrestov/university:radar-emulation-service  
2. Запустіть Docker контейнер, використовуючи наступну команду:  
docker run --name radar-emulator -p 4000:4000 iperekrestov/university:radar-emulation-service  
Для зчитування даних з емулятора необхідно підключитися до нього через WebSocket:  
wscat -c ws://localhost:4000
