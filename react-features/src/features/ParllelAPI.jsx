import { useEffect, useState } from "react";
import { fetchData, fetchParallelData } from "../services/api";
import { API_BASE_URL } from "../constants";

const ParllelAPI = () => {
    const [superheroData, setSuperheroData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [modalFilms, setModalFilms] = useState([]);
    const [modalCharacter, setModalCharacter] = useState(null);

    useEffect(() => {
        fetchSuperHeros();
    }, [currentPage]);

    const fetchSuperHeros = async () => {
        try {
            setLoading(true);
            const data = await fetchData(`${API_BASE_URL}?page=${currentPage}`);
            setSuperheroData(data.results);
            setTotalCount(data.count);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilmClick = async (character) => {
        setShowModal(true);
        setModalCharacter(character);
        const films = await fetchParallelData(character);
        setModalFilms(films);
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Star Wars Characters</h1>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Height</th>
                            <th className="px-4 py-2 border-b">Mass</th>
                            <th className="px-4 py-2 border-b">Films</th>
                        </tr>
                    </thead>
                    <tbody>
                        {superheroData.map((character) => (
                            <tr key={character.name}>
                                <td className="px-4 py-2 border-b">{character.name}</td>
                                <td className="px-4 py-2 border-b">{character.height}</td>
                                <td className="px-4 py-2 border-b">{character.mass}</td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                        onClick={() => handleFilmClick(character)}
                                    >
                                        View Films
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button
                    className="bg-green-500 text-white w-[100px] px-4 py-2 rounded hover:bg-green-600 m-4"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="mx-2">Page {currentPage}</span>
                <button
                    className="bg-green-500 text-white w-[100px] px-4 py-2 rounded hover:bg-green-600 m-4"
                    onClick={() => setCurrentPage((prev) => (prev * 10 < totalCount ? prev + 1 : prev))}
                >
                    Next
                </button>
            </div>
            <div className="container mx-auto p-4">
                <h2 className="text-xl font-semibold mb-4">More Information</h2>
                <p className="text-gray-700">This demo fetches data from the Star Wars API using parallel requests. It demonstrates how to handle multiple API calls efficiently in React.</p>
                <p className="text-gray-700">You can explore the characters' details, including their height and mass, which are fetched from the API.</p>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 top-0 left-0 right-0 bottom-0">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-md h-[500px] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Films for {modalCharacter?.name}</h2>
                        <ul>
                            {modalFilms && modalFilms.length > 0 ? (
                                modalFilms.map((film, index) => (
                                    <li key={index} className="mb-2">{film.title}</li>
                                ))
                            ) : (
                                <li>No films available</li>
                            )}
                        </ul>
                        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ParllelAPI;
