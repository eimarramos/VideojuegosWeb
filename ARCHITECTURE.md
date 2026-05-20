## Arquitectura

El proyecto usa una arquitectura basada en puertos y adaptadores para permitir la flexibilidad y la escalabilidad. La aplicación se divide en varias capas:

1. **Capa de presentación**: Esta capa se encarga de la interacción con el usuario. Aquí se encuentran las vistas.
2. **Capa de aplicación**: Esta capa contiene la lógica de negocio y las reglas de la aplicación. Aquí se encuentran los casos de uso que definen las operaciones que se pueden realizar en el sistema.
3. **Capa de dominio**: Esta capa contiene las entidades y los puertos. Aquí se encuentran las clases que definen los videojuegos, las reseñas y las valoraciones.
4. **Capa de infraestructura**: Esta capa se encarga de la comunicación con los sistemas externos, como bases de datos y servicios web. Aquí se encuentran los adaptadores.
