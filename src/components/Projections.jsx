import React from 'react';
import { players } from '../data/players';

const Projections = ({ player }) => {
    if (!player.active) return null;

    // Find next players to pass
    const nextPlayer = players.find(p => p.rank === player.rank - 1);
    const secondNextPlayer = players.find(p => p.rank === player.rank - 2);

    const calculateGamesNeeded = (targetTotal) => {
        if (!targetTotal) return null;
        const needed = targetTotal - player.totalAssists;
        if (needed <= 0) return 0;
        return Math.ceil(needed / player.currentSeasonApg);
    };

    const gamesToNext = nextPlayer ? calculateGamesNeeded(nextPlayer.totalAssists) : 0;
    const gamesToSecond = secondNextPlayer ? calculateGamesNeeded(secondNextPlayer.totalAssists) : 0;

    return (
        <div className="mt-6 p-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 shadow-inner">
            <h4 className="text-xs font-bold text-gold mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Chase for History
            </h4>

            <p className="text-sm text-gray-300 leading-relaxed">
                At <span className="text-white font-bold">{player.currentSeasonApg}</span> assists per game,
                <span className="font-bold text-white"> {player.name}</span> needs:
            </p>

            <ul className="mt-3 space-y-2 text-sm">
                {nextPlayer && (
                    <li className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span>
                            <span className="text-gold font-bold text-lg">{gamesToNext}</span> games to pass
                            <span className="text-white"> {nextPlayer.name}</span>
                        </span>
                        <span className="text-gray-500 text-xs">({nextPlayer.totalAssists.toLocaleString()})</span>
                    </li>
                )}

                {secondNextPlayer && (
                    <li className="flex justify-between items-center pt-1">
                        <span>
                            <span className="text-gold font-bold text-lg">{gamesToSecond}</span> games to pass
                            <span className="text-white"> {secondNextPlayer.name}</span>
                        </span>
                        <span className="text-gray-500 text-xs">({secondNextPlayer.totalAssists.toLocaleString()})</span>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Projections;
