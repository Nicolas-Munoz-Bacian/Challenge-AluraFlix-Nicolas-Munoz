import React, { useState } from 'react';
import { useFavoritosContext } from "../../pages/Context/Favoritos";
import styles from "../../components/Card/Card.module.css";
import iconFavorito from "../../components/Card/iconFavorito.png";
import iconNoFavorito from "../../components/Card/iconNoFavorito.png";
import EditModal from "../../pages/ModalEditarCard/modal";
import { Link } from 'react-router-dom';

function Card({ id, capa, titulo, descripcion, video, onDelete, onSave, onClear, imagen }) {
    const { favorito, agregarFavorito } = useFavoritosContext();
    const [showModal, setShowModal] = useState(false);
    const isFavorito = favorito.some(fav => fav.id === id);
    const icon = isFavorito ? iconFavorito : iconNoFavorito;

    const handleEdit = () => {
        setShowModal(true);
    };

    const handleDelete = () => {
        if (onDelete) onDelete(id); // Llama a la función de eliminación pasada como prop
    };

    const handleRedirect = () => {
        if (video) {
            const formattedVideoUrl = formatYouTubeURL(video);
            window.open(formattedVideoUrl, "_blank"); // Redirigir a YouTube
        } else {
            console.error('No hay URL de video para redirigir');
        }
    };

    const formatYouTubeURL = (url) => {
        // Asegúrate de que las URLs de YouTube sean válidas
        if (url.startsWith('http')) {
            return url; // Ya está bien formada
        } else {
            // Formación estándar para URLs de YouTube
            return `https://www.youtube.com/watch?v=${url.split('watch?v=')[1]}`;
        }
    };

    return (
        <div className={styles.container}>
            <Link className={styles.link} to={`/${id}`} onClick={handleRedirect}>
            <img 
                src={imagen} // Utilizar el campo imagen para mostrar la miniatura
                alt={titulo} 
                className={styles.imagen} 
                onClick={handleRedirect} // Permitir abrir el video al hacer clic en la imagen
            />
                <h2>{titulo}</h2>
            </Link>
            <img 
                src={icon} 
                alt="Icono favorito"
                className={styles.favorito}
                onClick={() => agregarFavorito({ id, titulo, capa, imagen })}
            />
            <button onClick={handleEdit} className={styles.button}>
                Editar
            </button>
            <button onClick={handleDelete} className={styles.button}>
                Eliminar
            </button>

            {showModal && (
                <EditModal
                    initialData={{ id, titulo, capa, descripcion, video }}
                    onClose={() => setShowModal(false)}
                    onSave={(data) => {
                        onSave(data);  
                        setShowModal(false);
                    }}
                    onDelete={handleDelete}
                    onClear={onClear} 
                />
            )}
        </div>
    );
}

export default Card;