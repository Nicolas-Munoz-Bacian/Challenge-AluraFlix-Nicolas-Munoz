import React from 'react';
import Banner from "../../components/Banner";
import styles from "../../pages/Favoritos/Favoritos.module.css";
import Titulo from "../../components/Titulo";
import Card from "../../components/Card";
import { useFavoritosContext } from "../Context/Favoritos";


function Favoritos() {
  const { favorito, eliminarFavorito } = useFavoritosContext(); // Obtiene la lista de favoritos y la función para eliminar

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
                      onDelete={() => eliminarFavorito(fav.id)} // Llama a eliminarFavorito en el click
                      // Puedes agregar más props si es necesario
                  />
              ))}
          </section>
      </>
  );
}

export default Favoritos;