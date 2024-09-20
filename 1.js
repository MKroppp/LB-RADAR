const socket = new WebSocket('ws://localhost:4000');

socket.onopen = () => {
    console.log('Підключено до WebSocket сервера');
};

socket.onmessage = (event) => {
    console.log('Отримані дані:', event.data);
    
    const data = JSON.parse(event.data);
    updateChart(data);
};

socket.onclose = () => {
    console.log('З\'єднання закрито');
};

socket.onerror = (error) => {
    console.error('Помилка WebSocket:', error);
};

let rValues = [];
let thetaValues = [];
let lifeSpan = 4600;

function updateChart(data) {
    if (data.echoResponses.length > 0) {
        data.echoResponses.forEach(target => {
            const distance = (target.time * 300000) / 2 ;
            const power = target.power;
            let color;
            if (power > 0.7) {
                color = 'red';
            } else if (power > 0.3) {
                color = 'yellow';
            } else {
                color = 'green';
            }
            rValues.push({ value: distance, timestamp: Date.now(), color });
            thetaValues.push({ value: data.scanAngle, timestamp: Date.now() });
        });
    }
    const now = Date.now();
    rValues = rValues.filter(point => now - point.timestamp < lifeSpan);
    thetaValues = thetaValues.filter(point => now - point.timestamp < lifeSpan);

        Plotly.react('chart', [{
        type: 'scatterpolar',
        r: rValues.map(point => point.value),
        theta: thetaValues.map(point => point.value),
        mode: 'markers',
        marker: { size: 15, color: rValues.map(point => point.color)},
    }], {
        polar: {
            radialaxis: { visible: true, title: '(km)', range: [0, 200] },
            angularaxis: { visible: true, range: [0, 360] }
        }
    });
}

function updateRadarConfig() {
        const measurementsPerRotation = document.getElementById('measurementsPerRotation').value;
        const rotationSpeed  = document.getElementById('rotationSpeed').value;
        const targetSpeed  = document.getElementById('targetSpeed').value;

        const configData = {
            measurementsPerRotation: parseInt(measurementsPerRotation) || 360,
            rotationSpeed: parseInt(rotationSpeed) || 60,
            targetSpeed: parseInt(targetSpeed) || 100
        };

    fetch('http://localhost:4000/config', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(configData)
    })
    .then(response => response.json())
}


