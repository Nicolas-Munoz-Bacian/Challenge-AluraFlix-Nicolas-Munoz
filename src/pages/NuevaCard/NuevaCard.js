import React, { useState } from 'react';
import Card from '../../components/Card';
import EditModal from '../../pages/ModalEditarCard/modal'; // Asegúrate de que el nombre de `EditModal` es correcto
import { enviarProducto } from '../../pages/ConexionAPI/API';


function NuevaCard({ initialVideos = [] }) {
    const [videos, setVideos] = useState(initialVideos);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ categorias: 'Front-End' });

    const handleNewVideo = () => {
        // Inicializa el modalData para la creación de un nuevo video
        setModalData({ titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' });
        setShowModal(true);
    };

    const handleSave = async (videoData) => {
        const updatedVideos = [...videos, videoData]; // Actualiza los videos con el nuevo video
        setVideos(updatedVideos);
        localStorage.setItem('videos', JSON.stringify(updatedVideos));
        setShowModal(false);
        try {
            const newVideoData = {
                titulo: videoData.titulo,
                imagen: videoData.imagen,
                link: videoData.link,
                descripcion: videoData.descripcion,
                categoria: videoData.categoria,
            };

            // Enviar el nuevo video a la API
            const savedVideo = await enviarProducto(newVideoData);
            setVideos(prevVideos => [...prevVideos, savedVideo]); // Mantiene los videos previos y añade el nuevo
            localStorage.setItem('videos', JSON.stringify([...updatedVideos, savedVideo]));

        } catch (error) {
            console.error('Error al guardar el video:', error.message);
            alert('Ocurrió un error al guardar el video. Verifica los datos.');
        }
    };

    const handleDelete = (videoId) => {
        // Función que elimina solo el video que coincide con el videoId pasado
        setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
    };
    
    const categorias = {
        "Front-End": videos.filter(video => video.categoria === 'Front-End'),
        "Back-End": videos.filter(video => video.categoria === 'Back-End'),
        "Innovación y Gestión": videos.filter(video => video.categoria === 'Innovación y Gestión'),
    };

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
                            onDelete={() => handleDelete(video.id)} // Eliminar solo el video seleccionado
                            onEdit={() => {
                                setModalData(video); // Prellenar el modal con los datos del video existente
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