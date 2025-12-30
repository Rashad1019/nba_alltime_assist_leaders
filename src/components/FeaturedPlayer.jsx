import React from 'react';
import { players } from '../data/players';

const FeaturedPlayer = ({ filter }) => {
    const stockton = players.find(p => p.rank === 1);

    if (!stockton) return null;

    // Hide Stockton when "Active" filter is selected (he's retired/HOF, not active)
    if (filter === 'active') return null;

    return (
        <section
            className="card overflow-hidden"
            data-aos="fade-up"
        >
            {/* THREE EQUAL SECTIONS - Same as PlayerCard */}
            <div style={{ display: 'flex', flexDirection: 'row', minHeight: '280px' }}>

                {/* SECTION 1 - Image (1/3) */}
                <div
                    style={{ flex: 1 }}
                    className="bg-gradient-to-br from-[#16213e] to-[#0f3460] flex flex-col items-center justify-center p-6 relative"
                >
                    <div className="absolute top-4 left-4">
                        <span className="text-5xl font-black text-gold" style={{ textShadow: '0 0 40px rgba(255, 215, 0, 0.6)' }}>
                            #1
                        </span>
                    </div>

                    <img
                        src={stockton.image}
                        alt={stockton.name}
                        className="w-32 h-32 object-cover rounded-full border-4 border-[#ffd700]/50 shadow-2xl"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />

                    <h2 className="text-2xl font-bold text-white mt-4 text-center">{stockton.name}</h2>
                    <p className="text-sm text-muted">{stockton.team}</p>
                    <div className="mt-2">
                        <span className="badge badge-hof">Hall of Fame</span>
                    </div>
                </div>

                {/* SECTION 2 - Stats (1/3) */}
                <div
                    style={{ flex: 1, borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}
                    className="p-6 flex flex-col justify-center"
                >
                    <p className="text-xs uppercase text-orange font-semibold mb-1 tracking-wider">All-Time Leader</p>
                    <p className="text-xs uppercase text-muted font-semibold mb-4 tracking-wider">Career Stats</p>

                    <div className="space-y-3">
                        <div className="stat-box">
                            <div className="stat-value text-2xl">{stockton.totalAssists.toLocaleString()}</div>
                            <div className="stat-label">🏀 Total Assists</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value text-2xl">{stockton.stats.apg}</div>
                            <div className="stat-label">📊 Assists Per Game</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value text-2xl">{stockton.stats.games.toLocaleString()}</div>
                            <div className="stat-label">🎮 Games Played</div>
                        </div>
                    </div>
                </div>

                {/* SECTION 3 - Bio (1/3) */}
                <div
                    style={{ flex: 1 }}
                    className="p-6 flex flex-col justify-between bg-gradient-to-br from-transparent to-[#0a0a12]/30"
                >
                    <div>
                        <p className="text-xs uppercase text-muted font-semibold mb-3 tracking-wider">About</p>
                        <p className="text-sm text-gray-300 leading-relaxed italic">
                            "{stockton.bio}"
                        </p>
                    </div>

                    <a
                        href={stockton.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gradient w-full text-center mt-4"
                    >
                        View Full Profile →
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPlayer;
