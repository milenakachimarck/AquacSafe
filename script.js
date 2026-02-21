const ctx = document.getElementById('qualityChart').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Ácido', 'Neutro', 'Alcalino', 'Baixa', 'Média', 'Alta'],
        datasets: [{
            label: 'Nível de PH',
            data: [4.5, 7, 8.5, 0, 0, 0],
            backgroundColor: '#2563eb',
            borderRadius: 10,
        }, {
            label: 'Osmolaridade',
            data: [0, 0, 0, 90, 150, 220],
            backgroundColor: '#475569',
            borderRadius: 10,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});
