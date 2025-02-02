
## Al descargar el proyecto por primera (GITCLONE) vez usamos:

1. composer install
2. npm install 
3. Modificamos nuestro .env para que pueda acceder a nuestra base de datos (no borrar .env.example si se borra crear uno con los mismos datos que .env)
4. php artisan migrate
5. copiamos el htaccess (tema 5 en el aula virtual) y lo pegamos en la carpeta raiz (htdocs) --voluntario
6. Ponemos todo el contenido de la carpeta en htdocs, al hacer gitCommit recordad cambiar el nombre (miniproyecto)

## Base de datos en Vercel
1. Elegir base de datos postgres
2. Quick start (show secret)
3. Añadir a .env las variables de entorno de postgres al final 

# Despliegue de BBDD Vercel (.env) para que funcione hay que comentar la conexión de mysql local
DATABASE_URL = ":endpoint= (buscar endpoint en la misma url este entre el @):"
DB_CONNECTION = "pgsql"
APP_URL = show secret
APP_ENV = production
APP_DEBUG = false
