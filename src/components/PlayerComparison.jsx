import React, { useState, useRef } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { players } from '../data/players';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

const PlayerComparison = () => {
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [chartType, setChartType] = useState('bar');
    const [showComparison, setShowComparison] = useState(false);
    const resultsRef = useRef(null);

    const togglePlayer = (player) => {
        if (selectedPlayers.find(p => p.rank === player.rank)) {
            setSelectedPlayers(selectedPlayers.filter(p => p.rank !== player.rank));
            if (selectedPlayers.length - 1 < 2) setShowComparison(false);
        } else if (selectedPlayers.length < 3) {
            setSelectedPlayers([...selectedPlayers, player]);
            setShowComparison(false); // Reset view when selection changes
        }
    };

    const isSelected = (player) => selectedPlayers.find(p => p.rank === player.rank);

    const handleCompare = () => {
        if (selectedPlayers.length >= 2) {
            setShowComparison(true);
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    const chartColors = [
        'rgba(245, 158, 11, 0.8)', // Gold
        'rgba(59, 130, 246, 0.8)', // Blue
        'rgba(239, 68, 68, 0.8)'   // Red
    ];

    const borderColors = [
        'rgba(245, 158, 11, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(239, 68, 68, 1)'
    ];

    const barChartData = {
        labels: ['Total Assists', 'Avg APG', 'Games Played'],
        datasets: selectedPlayers.map((player, index) => ({
            label: player.name,
            data: [player.totalAssists / 100, player.stats.apg, player.stats.games / 10],
            backgroundColor: chartColors[index],
            borderColor: borderColors[index],
            borderWidth: 2
        }))
    };

    const radarChartData = {
        labels: ['Total Assists (scaled)', 'Assists Per Game', 'Games Played (scaled)', 'Longevity', 'Efficiency'],
        datasets: selectedPlayers.map((player, index) => ({
            label: player.name,
            data: [
                player.totalAssists / 1000,
                player.stats.apg,
                player.stats.games / 100,
                player.stats.games / 150,
                player.stats.apg * 1.5
            ],
            backgroundColor: chartColors[index].replace('0.8', '0.2'),
            borderColor: borderColors[index],
            borderWidth: 2,
            pointBackgroundColor: borderColors[index],
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: borderColors[index]
        }))
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#f8fafc', font: { size: 12, weight: 'bold' } }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                titleColor: '#f59e0b',
                bodyColor: '#f8fafc',
                borderColor: '#f59e0b',
                borderWidth: 1,
                padding: 12,
                displayColors: true
            }
        },
        scales: chartType === 'bar' ? {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(148, 163, 184, 0.1)' },
                ticks: { color: '#94a3b8' }
            },
            x: {
                grid: { color: 'rgba(148, 163, 184, 0.1)' },
                ticks: { color: '#94a3b8' }
            }
        } : {
            r: {
                grid: { color: 'rgba(148, 163, 184, 0.2)' },
                angleLines: { color: 'rgba(148, 163, 184, 0.2)' },
                ticks: { color: '#94a3b8', backdropColor: 'transparent' },
                pointLabels: { color: '#f8fafc', font: { size: 11 } }
            }
        }
    };

    return (
        <section className="py-16" id="comparison">
            <div className="container">
                {/* Header */}
                <div data-aos="fade-up" className="text-center mb-12">
                    <style>{`
                        .custom-player-grid {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 0.5rem;
                        }
                        .custom-player-grid img {
                            width: 32px !important;
                            height: 32px !important;
                            border-radius: 9999px;
                            object-fit: cover;
                            flex-shrink: 0;
                            border-width: 2px;
                        }
                        @media (min-width: 768px) {
                            .custom-player-grid {
                                grid-template-columns: repeat(5, 1fr);
                            }
                        }
                        .custom-slot-container {
                            display: flex;
                            justify-content: center;
                            gap: 1rem;
                            overflow-x: auto;
                            padding-bottom: 1rem;
                        }
                    `}</style>
                    <h2
                        className="mb-4"
                        style={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            background: 'linear-gradient(to right, #ff6b35, #ffd700)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Compare Legends
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#b8b8b8' }}>
                        Select up to 3 players to compare their statistics and see how they stack up against each other
                    </p>
                </div>

                {/* Player Selection Area - Redesigned */}
                <div data-aos="fade-up" data-aos-delay="100" className="mb-12">
                    {/* 1. Comparison Slots (The Stage) */}
                    <div className="custom-slot-container mb-10">
                        {[0, 1, 2].map((i) => {
                            const player = selectedPlayers[i];
                            return (
                                <div
                                    key={i}
                                    className={`relative w-28 h-36 md:w-32 md:h-44 rounded-xl border-2 flex flex-col items-center justify-center p-2 transition-all duration-300 ${player
                                        ? 'border-gold bg-gold/10 shadow-lg shadow-gold/20 scale-105'
                                        : 'border-white/10 bg-white/5 border-dashed'
                                        }`}
                                >
                                    {player ? (
                                        <>
                                            <div
                                                onClick={(e) => { e.stopPropagation(); togglePlayer(player); }}
                                                className="absolute -top-2 -right-2 cursor-pointer text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                                            >
                                                ×
                                            </div>
                                            <img src={player.image} alt={player.name} style={{ width: '64px', height: '64px' }} className="rounded-full border-2 border-gold object-cover mb-2 shadow-md" />
                                            <div className="text-center w-full">
                                                <div className="text-gold text-[10px] font-bold uppercase tracking-wider">#{player.rank}</div>
                                                <div className="text-white text-xs font-bold leading-tight truncate px-1">{player.name}</div>
                                                <div className="text-gray-400 text-[10px] mt-1">{player.totalAssists.toLocaleString()}</div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center opacity-30">
                                            <div className="text-3xl mb-1">+</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest">Select</div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* 2. Roster Grid (Compact Selection) */}
                    <div className="bg-slate-900/40 rounded-2xl p-6 border border-white/5">
                        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                            <h3 className="text-md font-bold text-gray-200">Available Legends</h3>
                            <span className="text-xs font-mono text-gold bg-gold/10 px-2 py-1 rounded">{selectedPlayers.length}/3 Selected</span>
                        </div>

                        <div className="custom-player-grid">
                            {players.map((player) => {
                                const active = isSelected(player);
                                const disabled = selectedPlayers.length >= 3 && !active;

                                return (
                                    <button
                                        key={player.rank}
                                        onClick={() => !disabled && togglePlayer(player)}
                                        className={`
                                            flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all duration-200 group relative overflow-hidden h-full
                                            ${active
                                                ? 'bg-gold/20 border-gold shadow-glow-gold'
                                                : disabled
                                                    ? 'opacity-40 grayscale border-transparent bg-white/5 cursor-not-allowed'
                                                    : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20'
                                            }
                                        `}
                                    >
                                        <img
                                            src={player.image}
                                            alt={player.name}
                                            className={`w-8 h-8 rounded-full object-cover border-2 shrink-0 ${active ? 'border-gold' : 'border-gray-600 group-hover:border-gray-400'}`}
                                        />
                                        <div className="min-w-0 flex-1 overflow-hidden">
                                            <div className={`text-[10px] md:text-xs font-bold truncate ${active ? 'text-gold' : 'text-gray-200'}`}>
                                                #{player.rank} {player.name}
                                            </div>
                                            <div className="text-[9px] text-gray-500">
                                                {player.stats.apg} APG
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Compare Button */}
                <div className="text-center mb-16">
                    <button
                        onClick={handleCompare}
                        disabled={selectedPlayers.length < 2}
                        style={{
                            background: selectedPlayers.length >= 2 ? 'linear-gradient(135deg, #ff6b35, #ffd700)' : '#333',
                            padding: '15px 40px',
                            borderRadius: '30px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            color: selectedPlayers.length >= 2 ? '#1a1a2e' : '#666',
                            cursor: selectedPlayers.length >= 2 ? 'pointer' : 'not-allowed',
                            boxShadow: selectedPlayers.length >= 2 ? '0 10px 30px rgba(255,107,53,0.3)' : 'none',
                            transition: 'all 0.3s ease'
                        }}
                        className={selectedPlayers.length >= 2 ? 'hover:scale-105 hover:shadow-orange-glow' : ''}
                    >
                        Compare Selected Players
                    </button>
                    {selectedPlayers.length < 2 && (
                        <p className="text-gray-500 text-sm mt-3">Select at least 2 players to unlock comparison</p>
                    )}
                </div>

                {/* Comparison Results */}
                {showComparison && (
                    <div ref={resultsRef} data-aos="fade-up" className="animate-fade-in-up">
                        {/* Chart Type Toggle */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700">
                                <button
                                    onClick={() => setChartType('bar')}
                                    className={`px-6 py-2 rounded-md font-semibold transition-all ${chartType === 'bar' ? 'bg-gold text-slate-900' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Bar Chart
                                </button>
                                <button
                                    onClick={() => setChartType('radar')}
                                    className={`px-6 py-2 rounded-md font-semibold transition-all ${chartType === 'radar' ? 'bg-gold text-slate-900' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    Radar Chart
                                </button>
                            </div>
                        </div>

                        {/* Chart Container */}
                        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-8">
                            <div className="h-[400px] md:h-[500px]">
                                {chartType === 'bar' ? (
                                    <Bar data={barChartData} options={chartOptions} />
                                ) : (
                                    <Radar data={radarChartData} options={chartOptions} />
                                )}
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-900/70">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Stat</th>
                                            {selectedPlayers.map((player, index) => (
                                                <th key={player.rank} className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: borderColors[index] }}>
                                                    {player.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-300">Total Assists</td>
                                            {selectedPlayers.map((player) => (
                                                <td key={player.rank} className="px-6 py-4 text-sm text-white font-bold">{player.totalAssists.toLocaleString()}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-300">Assists Per Game</td>
                                            {selectedPlayers.map((player) => (
                                                <td key={player.rank} className="px-6 py-4 text-sm text-white font-bold">{player.stats.apg}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-300">Games Played</td>
                                            {selectedPlayers.map((player) => (
                                                <td key={player.rank} className="px-6 py-4 text-sm text-white font-bold">{player.stats.games.toLocaleString()}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PlayerComparison;
