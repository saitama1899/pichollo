Scraping de portales inmobiliarios con playwright

Funcionamiento actual:

- Busca en 2 portales indicando zona y precio y devuelve el resultado
- Guarda el resultado y lo compara con el anterior con Mongo db cloud
- Notificaciones push con Web push cuándo salta una novedad
- Deploy en heroku: Guarda el token de notificación si no existe, y escucha si salta el endpoint api/notificaciones/novedad
- Ejecución en local para ejecutar el cronjob con playwright

<img src="https://i.gyazo.com/66e898f0bfddfe9feba8354930e70085.png" alt="drawing" width="500"/>

TODO:

- Lograr evitar la detección del bot en el tercer portal
- Deploy heroku: Cron job y hacer funcionar la dependencia playwright
