import Titulo from "../../components/Titulo";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import styles from "../../pages/inicio/index.module.css";
import home from "../../pages/inicio/home.jpg";
import frontend from "../../pages/inicio/front end.png";
import backend from "../../pages/inicio/back end.png";
import innovacionYgestion from "../inicio/innovación y gestión.png";
import videosData from "../../components/data/db.json"
import { useState, useEffect } from "react";
import EditModal from "../../pages/ModalEditarCard/modal";

function Inicio() {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/DaniRiverol/alura-cinema-api/videos")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  const handleEdit = (video) => {
    setVideoToEdit(video);
    setShowModal(true);
  };

  const handleSave = (updatedVideo) => {
    const updatedVideos = videos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video));
    setVideos(updatedVideos);
    setShowModal(false);
    setVideoToEdit(null);
  };

  const handleDelete = (videoId) => {
    const updatedVideos = videos.filter((video) => video.id !== videoId);
    setVideos(updatedVideos);
  };

  const handleClear = () => {
    setVideoToEdit(null);
    setShowModal(false);
  };


  // Datos estáticos de videos
  const staticVideos = videosData.videos;

  return (
    <>
      <Banner src={home} img="home" color="#154580" />

      {/* Sección Front End */}
      <Titulo>
        <img src={frontend} className="banner" alt="banner front end" />
      </Titulo>
      <section className={styles.container}>
        {staticVideos.filter(video => video.descripcion === "Front-End").map(video => (
          <Card
            {...video}
            key={video.id}
            onEdit={() => handleEdit(video)}
            onDelete={() => handleDelete(video.id)}
            onSave={handleSave}
            onClear={handleClear}
          />
        ))}
      </section>

      {/* Sección Back End */}
      <Titulo>
        <img src={backend} className="banner" alt="banner back end" />
      </Titulo>
      <section className={styles.container}>
        {staticVideos.filter(video => video.descripcion === "Back-End").map(video => (
          <Card
            {...video}
            key={video.id}
            onEdit={() => handleEdit(video)}
            onDelete={() => handleDelete(video.id)}
            onSave={handleSave}
            onClear={handleClear}
          />
        ))}
      </section>

      {/* Sección Innovación y Gestión */}
      <Titulo>
        <img src={innovacionYgestion} className="banner" alt="banner innovación y gestion" />
      </Titulo>
      <section className={styles.container}>
        {staticVideos.filter(video => video.descripcion === "Innovación y Gestión").map(video => (
          <Card
            {...video}
            key={video.id}
            onEdit={() => handleEdit(video)}
            onDelete={() => handleDelete(video.id)}
            onSave={handleSave}
            onClear={handleClear}
          />
        ))}
      </section>

      {/* Modal de Edición */}
      {showModal && (
        <EditModal
          initialData={videoToEdit}
          onClose={handleClear}
          onSave={handleSave}
        />
      )}

    </>
  );
}

export default Inicio;