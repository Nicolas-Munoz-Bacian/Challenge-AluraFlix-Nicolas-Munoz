import Banner from "../../components/Banner";
import styles from "../../pages/Favoritos/Favoritos.module.css";
import Titulo from "../../components/Titulo";
import Card from "../../components/Card";
import { useFavoritosContext } from "../Context/Favoritos";

function Favoritos() {
  const { favorito } = useFavoritosContext();

  return (
    <>
      <Banner img="favorite" color="#44d97d" />
      <Titulo>
        <h1></h1>
      </Titulo>
      <section className={styles.container}>
        {favorito.map((fav) => (
          <Card 
            {...fav} 
            key={fav.id} 
            onDelete={() => {/* Lógica para eliminar el favorito si es necesario */}} 
            // Puedes agregar más props si es necesario
          />
        ))}
      </section>
    </>
  );
}

export default Favoritos;