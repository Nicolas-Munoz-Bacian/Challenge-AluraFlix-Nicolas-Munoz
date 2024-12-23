import React, { useState } from 'react';
import Card from '../../components/Card';
import EditModal from '../../pages/ModalEditarCard/modal'; // Asegúrate de que el nombre de `EditModal` es correcto
import { enviarProducto } from '../../pages/ConexionAPI/API';

function NuevaCard({ initialVideos = [] }) {
    const [videos, setVideos] = useState(initialVideos);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' });

    const handleNewVideo = () => {
        // Inicializa el modalData para la creación de un nuevo video
        setModalData({ id: null, titulo: '', imagen: '', link: '', descripcion: '', categoria: 'Front-End' });
        setShowModal(true);
    };

    const handleSave = async (videoData) => {
        if (videoData.id) {
            // Editar video existente
            const updatedVideos = videos.map(video =>
                video.id === videoData.id ? videoData : video
            );
            setVideos(updatedVideos); // Actualiza el estado
        } else {
            // Agregar un nuevo video
            const updatedVideos = [...videos, videoData]; // Añade el nuevo video
            setVideos(updatedVideos); // Actualiza el estado
        }

        localStorage.setItem('videos', JSON.stringify(videos)); // Guarda en localStorage
        setShowModal(false); // Cierra el modal

        try {
            const newVideoData = {
                titulo: videoData.titulo,
                imagen: videoData.imagen, // Asegúrate de que se utilice el campo imagen
                link: videoData.link,
                descripcion: videoData.descripcion,
                categoria: videoData.categoria,
            };

            // Enviar el nuevo video a la API
            if (!videoData.id) {
                const savedVideo = await enviarProducto(newVideoData);
                setVideos(prevVideos => [...prevVideos, savedVideo]); // Añadir nuevo video guardado
            }
        } catch (error) {
            console.error('Error al guardar el video:', error.message);
            alert('Ocurrió un error al guardar el video. Verifica los datos.');
        }
    };

    const handleDelete = (videoId) => {
        const updatedVideos = videos.filter(video => video.id !== videoId); // Elimina solo el video seleccionado
        setVideos(updatedVideos); // Actualiza el estado
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