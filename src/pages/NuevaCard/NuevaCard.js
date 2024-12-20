import React, { useState } from 'react';
import Card from '../../components/Card';
import EditModal from '../../pages/ModalEditarCard/modal'; // Asegúrate de que el nombre de `EditModal` es correcto
import { enviarProducto } from '../../pages/ConexionAPI/API';

function NuevaCard({ initialVideos = [] }) {
    const [videos, setVideos] = useState(initialVideos);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ categorias: 'Front-End' });
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');

    const handleNewVideo = () => {
        setModalData({ categoria: 'Front-End' });
        setShowModal(true);
    };

    const handleSave = async (videoData) => {
        const updatedVideos = [...videos, videoData];
        setVideos(updatedVideos);
        localStorage.setItem('videos', JSON.stringify(updatedVideos));
        setShowModal(false);
        try {
            // Crear objeto para enviar a la API
            const newVideoData = {
                titulo: videoData.titulo,
                categoria: videoData.categoria,
                capa: videoData.capa, // Asegúrate de que este campo sea relevante
                video: videoData.video,
                descripcion: videoData.descripcion,
            };

            // Enviar el nuevo video a la API
            const savedVideo = await enviarProducto(newVideoData);
            const updatedVideos = [...videos, savedVideo]; // Actualiza con el video guardado
            setVideos(updatedVideos);
            localStorage.setItem('videos', JSON.stringify(updatedVideos)); // Guardar en localStorage

            setShowModal(false);
        } catch (error) {
            console.error('Error al guardar el video:', error.message);
            alert('Ocurrió un error al guardar el video. Verifica los datos.');
        }
    };

    const handleDelete = (videoId) => {
        setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
    };
    
    const categorias = {
        "Front-End": videos.filter(video => video.categoria === 'Front-End'),
        "Back-End": videos.filter(video => video.categoria === 'Back-End'),
        "Innovación y Gestión": videos.filter(video => video.categoria === 'Innovación y Gestión'),
    };

    const Player = ({ url }) => {
        return (
            <div>
                {/* Renderizar el reproductor utilizando la URL */}
                <iframe 
                    width="560" 
                    height="315" 
                    src={url} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                />
            </div>
        );
    }

    return (
        <div>
            <button onClick={handleNewVideo}>Agregar Nuevo Video</button>
            {showModal && (
                <EditModal
                    initialData={modalData}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
            {Object.entries(categorias).map(([categoria, videos]) => (
                <div key={categoria}>
                    <h2>{categoria}</h2>
                    {videos.map(video => (
                        <Card
                            key={video.id}
                            {...video}
                            onDelete={() => handleDelete(video.id)}
                            onEdit={() => {
                                setModalData(video);
                                setShowModal(true);
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default NuevaCard;