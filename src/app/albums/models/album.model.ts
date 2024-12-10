export interface Album {
    id?: number; // El ID es opcional porque se generará automáticamente
    name: string; // Nombre del álbum
    cover: string; // URL de la cubierta del álbum
    releaseDate: Date; // Fecha de lanzamiento
    description: string; // Descripción del álbum
    genre: string; // Género del álbum
    recordLabel: string; // Disquera del álbum
    comments?: Comment[]; // Lista de comentarios asociados al álbum (opcional)
}

export interface Comment {
    id?: number; // ID del comentario
    description: string; // Texto del comentario
    rating: number; // Valoración del comentario (0-5)
}
