LuxuryStay Project

Este es el proyecto para gestionar la disponibilidad de habitaciones, reservas y un servicio SOAP para consulta de disponibilidad de habitaciones. A continuación, se describen los pasos para ejecutar cada servicio.

Requisitos Previos
Antes de ejecutar los servicios, asegúrate de tener instalados los siguientes programas:

Node.js
PostgreSQL
Postman (opcional, para probar la API)
Visual Studio Code (opcional, para desarrollar)

Pasos para ejecutar el proyecto
1. Clonar el Repositorio
Primero, clona el repositorio del proyecto en tu máquina local:
git clone <URL_del_repositorio>
cd luxury-stay-prueba

2. Instalar Dependencias
Instala las dependencias necesarias para los dos servicios (API REST y SOAP).

Para la API REST (Node.js):
En la carpeta donde se encuentra el servicio de la API REST, ejecuta:
cd luxury-stay-api-rest
npm install
Para el servicio SOAP (Node.js):
En la carpeta donde se encuentra el servicio SOAP, ejecuta:
cd luxury-stay-soap-service
npm install

3. Configuración de la Base de Datos
Asegúrate de tener PostgreSQL instalado y configurado. Luego, crea la base de datos y las tablas necesarias. Puedes usar los scripts SQL proporcionados en el proyecto.

Conectar a PostgreSQL:
Abre PostgreSQL y conéctate al servidor con el siguiente comando:
psql -U postgres

Crea la base de datos luxurystay (si no está creada ya):
CREATE DATABASE luxurystay;

Ejecuta los scripts SQL proporcionados para crear las tablas y agregar los datos de prueba:
psql -U postgres -d luxurystay -f <ruta_a_los_scripts_sql>

4. Configuración de Variables de Entorno
Asegúrate de tener el archivo .env correctamente configurado en la raíz del proyecto. El archivo .env debe contener las siguientes variables de entorno para la conexión a la base de datos:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=<tu_contraseña_postgresql>
DB_NAME=luxurystay

5. Ejecutar el Servicio SOAP
Para iniciar el servicio SOAP, navega a la carpeta donde está ubicado el servicio SOAP y ejecuta:
cd luxury-stay-soap-service
node index.js

Esto pondrá en marcha el servicio SOAP en http://localhost:3001/soap.

6. Ejecutar la API REST
Para iniciar el servicio de la API REST, navega a la carpeta donde está ubicado el servicio API REST y ejecuta:
cd luxury-stay-api-rest
node index.js

Esto pondrá en marcha el servicio REST en http://localhost:3000.

7. Probar la API REST (Postman)
Con el servicio API REST en funcionamiento, puedes usar Postman o cualquier otra herramienta para hacer solicitudes HTTP.

Obtener disponibilidad de habitaciones: En Postman, realiza una solicitud GET a http://localhost:3000/api/availability con los parámetros de fecha de inicio y fin.

Crear una reserva: Realiza una solicitud POST a http://localhost:3000/api/reservations con el JSON que contiene los detalles de la reserva, como el número de habitación, nombre del huésped, fecha de entrada y salida.

8. Probar el Servicio SOAP
Para probar el servicio SOAP, abre Postman o cualquier herramienta que soporte SOAP, y realiza una solicitud a http://localhost:3001/soap con los parámetros startDate, endDate, y roomType.

Acceder al WSDL: El archivo WSDL estará disponible en http://localhost:3001/wsdl.

Consultar disponibilidad: Envía la solicitud SOAP al endpoint /soap con los parámetros adecuados. El servicio SOAP devolverá la disponibilidad de las habitaciones en formato JSON.

9. Detener los Servicios
Para detener ambos servicios, presiona Ctrl + C en la terminal donde se estén ejecutando.



