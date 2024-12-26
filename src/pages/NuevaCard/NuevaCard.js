import React, { useState } from 'react';
import Card from '../../components/Card';
import EditModal from '../../pages/ModalEditarCard/modal';
import { enviarProducto } from '../../pages/ConexionAPI/API';

function NuevaCard({ initialVideos = [], onUpdateVideos }) {
    const [videos, setVideos] = useState(initialVideos);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' });

    const handleNewVideo = () => {
        setModalData({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' });
        setShowModal(true);
    };

    const handleSave = async (videoData) => {
        let updatedVideos;

        if (videoData.id) {
            // Editar video existente
            updatedVideos = videos.map(video => 
                video.id === videoData.id ? videoData : video
            );
        } else {
            // Agregar un nuevo video
            videoData.id = new Date().getTime();
            updatedVideos = [...videos, videoData];
        }

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

            if (!videoData.id) {
                const savedVideo = await enviarProducto(newVideoData);
                setVideos(prevVideos => [...prevVideos, savedVideo]);
            }
        } catch (error) {
            console.error('Error al guardar el video:', error.message);
            alert('Ocurrió un error al guardar el video. Verifica los datos.');
        }
    };

    // Función para eliminar un video por su ID
    const handleDelete = (videoId) => {
        setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
    };

    // Función para limpiar los datos del modal
    const handleClear = () => {
        setModalData({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' });
        setShowModal(false);
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
                    onClose={handleClear} // Usa manejar el "limpiar" al cerrar
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
                            onDelete={() => handleDelete(video.id)} // Elimina solo el video seleccionado
                            onEdit={() => {
                                setModalData(video); // Prellenar el modal con los datos del video existente
                                setShowModal(true); // Abre el modal para editar
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default NuevaCard;