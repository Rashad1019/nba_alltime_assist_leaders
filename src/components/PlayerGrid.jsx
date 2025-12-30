import React from 'react';
import PlayerCard from './PlayerCard';
import { players } from '../data/players';

const PlayerGrid = ({ filter = 'all' }) => {
    // Filter out the #1 player since they are featured separately
    let gridPlayers = players.filter(p => p.rank !== 1);

    // Apply filter
    if (filter === 'active') {
        gridPlayers = gridPlayers.filter(p => p.active);
    } else if (filter === 'hof') {
        gridPlayers = gridPlayers.filter(p => p.hallOfFame);
    }

    return (
        <section id="gallery" className="py-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
                <h3 className="text-3xl sm:text-4xl font-bold text-white whitespace-nowrap">
                    The Rest of the Top 10
                </h3>
                <div className="h-px bg-gradient-to-r from-[#ffd700]/50 via-[#ff6b35]/30 to-transparent flex-grow"></div>
            </div>

            {gridPlayers.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl text-muted">No players match this filter.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {gridPlayers.map((player, index) => (
                        <PlayerCard key={player.rank} player={player} index={index} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default PlayerGrid;
