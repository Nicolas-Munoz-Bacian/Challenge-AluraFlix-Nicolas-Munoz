import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import Titulo from "../../components/Titulo";
import NotFound from "../../pages/NotFound";
import styles from "../../pages/Player/Player.module.css";
import videos from "../../components/data/db.json";

function Player() {
    const [video, setVideo] = useState(null);
    const parametros = useParams();

    useEffect(() => {
        // Encuentra el video utilizand el parámetro 'id'
        const videoEncontrado = videos.find(video => video.id === Number(parametros.id));
        if (videoEncontrado) {
            const videoURL = convertToEmbedURL(videoEncontrado.video);
            setVideo({ ...videoEncontrado, video: videoURL });
        }
    }, [parametros.id]);

    const convertToEmbedURL = (url) => {
        // Transforma URLs estandard y acortadas de YouTube para ser embebidas
        if (url.includes('youtu.be')) {
            return url.replace('youtu.be/', 'www.youtube.com/embed/');
        }
        if (url.includes('watch?v=')) {
            const videoID = url.split('watch?v=')[1].split('&')[0]; // Extrae solo el VideoID
            return `https://www.youtube.com/embed/${videoID}`;
        }
        return url; // Retorna la URL sin cambios si no son de YouTube
    };

    if (!video) return <NotFound />;
    
    return (
        <>
            <Banner img="player" color="#58B9AE" />
            <Titulo>
                <h1>Player</h1>
            </Titulo>
            <section className={styles.container}>
                <iframe 
                    width="100%" 
                    height="80vh" 
                    src={video.video} 
                    title={video.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                />
            </section>
        </>
    );
}

export default Player;