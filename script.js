/* =========================================================
   script.js  –  AcquaSafe  –  Portal de Controle
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();

    const ctx = document.getElementById("qualityChart");
    if (!ctx) return;

    new Chart(ctx.getContext("2d"), {
        type: "bar",
        data: {
            labels: ["pH", "Turbidez", "Cloro", "Coliformes", "Flúor", "DBO"],
            datasets: [
                {
                    label: "Valor Atual",
                    data: [7.2, 3.5, 1.8, 0, 0.7, 4.2],
                    backgroundColor: "rgba(34,211,238,0.7)",
                    borderRadius: 6,
                    borderSkipped: false,
                },
                {
                    label: "Limite Máximo",
                    data: [9.5, 5, 5, 1, 1.5, 5],
                    backgroundColor: "rgba(99,102,241,0.3)",
                    borderRadius: 6,
                    borderSkipped: false,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: "#94a3b8", font: { family: "DM Sans" } },
                },
            },
            scales: {
                x: { ticks: { color: "#64748b" }, grid: { color: "rgba(255,255,255,0.04)" } },
                y: { ticks: { color: "#64748b" }, grid: { color: "rgba(255,255,255,0.04)" } },
            },
        },
    });
});
