import React from 'react';

const PlayerCard = ({ player, index }) => {
    const getStatusBadge = () => {
        if (player.active) {
            return <span className="badge badge-active">Active</span>;
        } else if (player.hallOfFame) {
            return <span className="badge badge-hof">Hall of Fame</span>;
        } else {
            return <span className="badge badge-retired">Retired</span>;
        }
    };

    return (
        <article
            className="card overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={index * 80}
        >
            {/* THREE EQUAL SECTIONS - Responsive Layout */}
            <div className="flex flex-col md:flex-row" style={{ minHeight: '240px' }}>

                {/* SECTION 1 - Image (1/3) */}
                <div
                    style={{ flex: 1 }}
                    className="bg-gradient-to-br from-[#16213e] to-[#0f3460] flex flex-col items-center justify-center p-6 relative"
                >
                    <div className="absolute top-3 left-3">
                        <span className="text-2xl md:text-3xl font-black text-gold">#{player.rank}</span>
                    </div>

                    <img
                        src={player.image}
                        alt={player.name}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-4 border-[#ffd700]/40 shadow-xl"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />

                    <h3 className="text-base md:text-lg font-bold text-white mt-3 text-center">{player.name}</h3>
                    <p className="text-xs md:text-sm text-muted">{player.team}</p>
                    <div className="mt-2">{getStatusBadge()}</div>
                </div>

                {/* SECTION 2 - Stats (1/3) */}
                <div
                    style={{ flex: 1, borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}
                    className="p-4 md:p-6 flex flex-col justify-center border-t md:border-t-0"
                >
                    <p className="text-xs uppercase text-muted font-semibold mb-3 md:mb-4 tracking-wider">Career Stats</p>

                    <div className="space-y-2 md:space-y-3">
                        <div className="stat-box">
                            <div className="stat-value">{player.totalAssists.toLocaleString()}</div>
                            <div className="stat-label">🏀 Total Assists</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value">{player.stats.apg}</div>
                            <div className="stat-label">📊 Assists Per Game</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value">{player.stats.games.toLocaleString()}</div>
                            <div className="stat-label">🎮 Games Played</div>
                        </div>
                    </div>

                    {player.active && player.currentSeasonApg && (
                        <div className="mt-2 md:mt-3 bg-[#ff6b35]/20 border border-[#ff6b35]/30 rounded-lg p-2 text-center">
                            <span className="text-orange text-xs md:text-sm">🔥 Current: </span>
                            <span className="text-gold font-bold text-xs md:text-sm">{player.currentSeasonApg} APG</span>
                        </div>
                    )}
                </div>

                {/* SECTION 3 - Bio (1/3) */}
                <div
                    style={{ flex: 1 }}
                    className="p-4 md:p-6 flex flex-col justify-between bg-gradient-to-br from-transparent to-[#0a0a12]/30 border-t md:border-t-0"
                >
                    <div>
                        <p className="text-xs uppercase text-muted font-semibold mb-2 md:mb-3 tracking-wider">About</p>
                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed italic">
                            "{player.bio}"
                        </p>
                    </div>

                    <a
                        href={player.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gradient w-full text-center mt-3 md:mt-4"
                    >
                        View Profile →
                    </a>
                </div>
            </div>
        </article>
    );
};

export default PlayerCard;
