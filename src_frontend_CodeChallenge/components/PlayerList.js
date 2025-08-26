import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    getAllPlayers,
    getPlayerById,
    getPlayerByJerseyNumber,
} from '../services/playerService';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchJersey, setSearchJersey] = useState('');
    const [searchJerseyResult, setSearchJerseyResult] = useState(null);

    const fetchPlayers = async () => {
        try {
            const response = await getAllPlayers();
            setPlayers(response.data);
            setSearchResult(null);
            setSearchJerseyResult(null);
        } catch (error) {
            alert('Error fetching players');
            console.error(error);
        }
    };

    const handleSearch = async () => {
        if (!searchId) {
            alert('Please enter player ID to search');
            return;
        }
        try {
            const response = await getPlayerById(searchId);
            setSearchResult(response.data);
            setPlayers([]);
            setSearchJerseyResult(null);
        } catch (error) {
            alert('Player not found');
            setSearchResult(null);
            console.error(error);
        }
    };

    const handleJerseySearch = async () => {
        if (!searchJersey) {
            alert('Please enter jersey number to search');
            return;
        }
        try {
            const response = await getPlayerByJerseyNumber(searchJersey);
            setSearchJerseyResult(response.data);
            setPlayers([]);
            setSearchResult(null);
        } catch (error) {
            alert('Player not found with this jersey number');
            setSearchJerseyResult(null);
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-primary">Players</h2>
                <button
                    className="btn btn-success"
                    onClick={fetchPlayers}
                    style={{ fontWeight: 'bold' }}
                >
                    Show All Players
                </button>
            </div>

            <div className="d-flex gap-3 mb-4" style={{ maxWidth: 900 }}>

                <div className="input-group" style={{ maxWidth: 400 }}>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Search by Player ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <button className="btn btn-outline-primary" onClick={handleSearch}>
                        Search by ID
                    </button>
                </div>


                <div className="input-group" style={{ maxWidth: 400 }}>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Search by Jersey Number"
                        value={searchJersey}
                        onChange={(e) => setSearchJersey(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        onClick={handleJerseySearch}
                    >
                        Search by Jersey
                    </button>
                </div>
            </div>

            {(players.length > 0 || searchResult || searchJerseyResult) ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-primary">
                            <tr>
                                <th>Player ID</th>
                                <th>Name</th>
                                <th>Jersey Number</th>
                                <th>Role</th>
                                <th>Total Matches</th>
                                <th>Team Name</th>
                                <th>Country</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResult ? (
                                <tr key={searchResult.id}>
                                    <td>{searchResult.id}</td>
                                    <td>{searchResult.playerName}</td>
                                    <td>{searchResult.jerseyNumber}</td>
                                    <td>{searchResult.role}</td>
                                    <td>{searchResult.totalMatches}</td>
                                    <td>{searchResult.teamName}</td>
                                    <td>{searchResult.country}</td>
                                    <td>{searchResult.description}</td>
                                    <td>
                                        <Link
                                            to={`/edit/${searchResult.id}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ) : searchJerseyResult ? (
                                <tr key={searchJerseyResult.id}>
                                    <td>{searchJerseyResult.id}</td>
                                    <td>{searchJerseyResult.playerName}</td>
                                    <td>{searchJerseyResult.jerseyNumber}</td>
                                    <td>{searchJerseyResult.role}</td>
                                    <td>{searchJerseyResult.totalMatches}</td>
                                    <td>{searchJerseyResult.teamName}</td>
                                    <td>{searchJerseyResult.country}</td>
                                    <td>{searchJerseyResult.description}</td>
                                    <td>
                                        <Link
                                            to={`/edit/${searchJerseyResult.id}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ) : (
                                players.map((player) => (
                                    <tr key={player.id}>
                                        <td>{player.id}</td>
                                        <td>{player.playerName}</td>
                                        <td>{player.jerseyNumber}</td>
                                        <td>{player.role}</td>
                                        <td>{player.totalMatches}</td>
                                        <td>{player.teamName}</td>
                                        <td>{player.country}</td>
                                        <td>{player.description}</td>
                                        <td>
                                            <Link
                                                to={`/edit/${player.id}`}
                                                className="btn btn-warning btn-sm me-2"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-muted">
                    No players to display. Use 'Show All Players' to load players.
                </p>
            )}
        </div>
    );
};

export default PlayerList;
