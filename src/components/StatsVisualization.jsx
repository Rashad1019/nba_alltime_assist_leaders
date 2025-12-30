import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { players } from '../data/players';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const StatsVisualization = () => {
    const [activeView, setActiveView] = useState('total');

    const playerNames = players.map(p => p.name.split(' ').pop());

    const chartColors = players.map((p, i) =>
        i === 0 ? 'rgba(255, 215, 0, 0.8)' :
            p.active ? 'rgba(255, 107, 53, 0.7)' :
                'rgba(233, 69, 96, 0.7)'
    );

    const chartBorders = players.map((p, i) =>
        i === 0 ? 'rgba(255, 215, 0, 1)' :
            p.active ? 'rgba(255, 107, 53, 1)' :
                'rgba(233, 69, 96, 1)'
    );

    const getChartData = () => {
        const data = activeView === 'total' ? players.map(p => p.totalAssists) :
            activeView === 'apg' ? players.map(p => p.stats.apg) :
                players.map(p => p.stats.games);

        return {
            labels: playerNames,
            datasets: [{
                label: activeView === 'total' ? 'Total Assists' : activeView === 'apg' ? 'Assists Per Game' : 'Games Played',
                data: data,
                backgroundColor: chartColors,
                borderColor: chartBorders,
                borderWidth: 2,
                fill: activeView === 'apg'
            }]
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(26, 26, 46, 0.95)',
                titleColor: '#ffd700',
                bodyColor: '#ffffff',
                borderColor: '#ff6b35',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    title: (context) => players[context[0].dataIndex].name,
                    afterLabel: (context) => players[context.dataIndex].active ? 'Active Player' : 'Retired'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(148, 163, 184, 0.1)' },
                ticks: { color: '#94a3b8', font: { size: 11 } }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8', font: { size: 10, weight: 'bold' } }
            }
        }
    };

    const bestApgPlayer = players.reduce((prev, current) => (prev.stats.apg > current.stats.apg) ? prev : current);

    return (
        <section className="py-16" id="statistics">
            <div className="container">
                <div data-aos="fade-up" className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gold">Statistical</span> Breakdown
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        A detailed look at the numbers that define greatness
                    </p>
                </div>

                {/* New Stats Summary Card */}
                <div
                    data-aos="fade-up"
                    className="mb-16 p-6 md:p-10"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '15px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                        {/* Column 1: #1 All-Time Leader */}
                        <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8 last:border-0">
                            <h3 className="text-[#ffd700] text-xs md:text-sm font-bold uppercase tracking-wider mb-3">
                                #1 All-Time Leader
                            </h3>
                            <div className="text-xl md:text-2xl font-bold text-white mb-2">{players[0].name}</div>
                            <div className="text-4xl md:text-5xl font-black text-gold mb-1" style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}>
                                {players[0].totalAssists.toLocaleString()}
                            </div>
                            <div className="text-gray-400 text-sm">Career Assists</div>
                        </div>

                        {/* Column 2: Best APG */}
                        <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8 last:border-0">
                            <h3 className="text-[#ff6b35] text-xs md:text-sm font-bold uppercase tracking-wider mb-3">
                                Best APG
                            </h3>
                            <div className="text-xl md:text-2xl font-bold text-white mb-2">{bestApgPlayer.name}</div>
                            <div className="text-4xl md:text-5xl font-black text-orange mb-1" style={{ textShadow: '0 0 20px rgba(255, 107, 53, 0.3)' }}>
                                {bestApgPlayer.stats.apg}
                            </div>
                            <div className="text-gray-400 text-sm">Assists Per Game</div>
                        </div>

                        {/* Column 3: Active Players */}
                        <div className="text-center md:text-left">
                            <h3 className="text-[#e94560] text-xs md:text-sm font-bold uppercase tracking-wider mb-3">
                                Active Players
                            </h3>
                            <div className="text-xl md:text-2xl font-bold text-white mb-2">Current Era</div>
                            <div className="text-4xl md:text-5xl font-black text-white mb-1">
                                {players.filter(p => p.active).length}
                            </div>
                            <div className="text-gray-400 text-sm">Still Playing</div>
                        </div>
                    </div>
                </div>

                {/* Charts Section (Preserved but styled to match) */}
                <div data-aos="fade-up" data-aos-delay="100">
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex rounded-lg bg-[#16213e] p-1 border border-white/10">
                            {['total', 'apg', 'games'].map(view => (
                                <button
                                    key={view}
                                    onClick={() => setActiveView(view)}
                                    className={`px-4 md:px-6 py-2 rounded-md font-semibold transition-all text-sm ${activeView === view ? 'bg-gold text-slate-900' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {view === 'total' ? 'Total Assists' : view === 'apg' ? 'APG' : 'Games'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#16213e]/50 rounded-xl p-6 md:p-8 border border-white/5 h-[400px]">
                        {activeView === 'apg' ? (
                            <Line data={getChartData()} options={chartOptions} />
                        ) : (
                            <Bar data={getChartData()} options={chartOptions} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsVisualization;
