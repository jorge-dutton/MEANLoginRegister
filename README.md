# Proyecto follogins API Rest #

----------

## Descripción ##
Conjunto de servicios que confirman la API Rest de la aplicación followings

## API de Autenticación ##
- ***Registro mediante nombre, email y password*** (/api/auth/register).

	**Método** POST
 
	Necesita form parameters userName, email y password. Devuelve JSON de este estilo:
	
	{
	"token": "**JWT ...**",
	"user": {
	"_id": "57ff7ccd4dcd7521d8322df3",
	"userName": "Federico Ramos",
	"email": "ppp@ppp.com"
	}
	
	El token devuelto debe incluirse en la cabecera Authorization de todas las peticiones para autentificarlas.

- ***Login mediante email y password*** (/api/auth/login). 
	
	**Método** POST
	
	Necesita form parameters email y password.

	{
	"token": "**JWT ...**",
	"user": {
	"_id": "57ff7ccd4dcd7521d8322df3",
	"userName": "Federico Ramos",
	"email": "ppp@ppp.com"
	}
	
	El token devuelto debe incluirse en la cabecera Authorization de todas las peticiones para autentificarlas.

- ***Registro y login mediante Google*** (/api/auth/google). 

	**Método** GET

	Muestra la ventana modal de Google para selección de cuenta de acceso.
	Una vez seleccionada la cuenta, se redirige al usuario al servicio /api/auth/google/callback para obtener la respuesta que será así:

	{
	"token": "**JWT ...**",
	"user": {
	"_id": "57ff7ccd4dcd7521d8322df3",
	"userName": "Federico Ramos",
	"email": "ppp@ppp.com"
	}

	El token devuelto debe incluirse en la cabecera Authorization de todas las peticiones para autentificarlas.
- ***Registro y login mediante Facebook*** (/api/auth/facebook). 
	
	**Método** GET

	Redirige al usuario a la pantalla de autenticación de Facebbok en la que tendrá que validarse.
	Una vez que el usuario se ha validado en Facebook se le redirige al servicio /api/auth/facebook/callback para obtener la respuesta que será así:

	{
	"token": "**JWT ...**",
	"user": {
	"_id": "57ff7ccd4dcd7521d8322df3",
	"userName": "Federico Ramos",
	"email": "ppp@ppp.com"
	}

	El token devuelto debe incluirse en la cabecera Authorization de todas las peticiones para autentificarlas.
## API de Usuario ##
- ***Obtener los datos del usuario actual*** (/api/user).
	
	**Método** GET

	Permite recuperar los datos del usuario actual.
	La petición necesita establecer la cabecera Authorization con el valor del token de login.
	Devuelve los datos del usuario en formato JSON

- ***Actualizar datos del usuario*** (/api/user)

	**Método** PUT

	Permite modificar los datos del usuario actual.
	La petición necesita establecer la cabecera Authorization con el valor del token de login.
	Devuelve los datos del usuario en formato JSON.

## API de constantes ##
- ***Obtener el listado de profesiones*** (/api/professions)
	
	**Método** GET

	Devuelve el listado completo de profesiones en forma de lista. Cada elemento de la lista es un JSON con este aspecto:

	{
        "id": 1,
        "name": "Cocinero",
        "desc": "Profesión de cocinero",
        "color": "rgb",
        "income": 1200,
        "cardBg": "prof1CardBg",
        "universities": [],
        "skills": [
            20,
            28,
            26
        ]
    }
- ***Obtener los datos de una profesión*** (/api/profession/:idProfesion)
	
	**Método** GET

	Devuelve los datos específicos de la profesión cuyo id coincide con el enviado como parámetro:

	{
        "id": 1,
        "name": "Cocinero",
        "desc": "Profesión de cocinero",
        "color": "rgb",
        "income": 1200,
        "cardBg": "prof1CardBg",
        "universities": [],
        "skills": [
            20,
            28,
            26
        ]
    }
- ***Obtener el listado de habilidades*** (/api/skills)

	**Método** GET

	Devuelve el listado completo de habilidades en formato lista. Cada uno de los elementos JSON de la lista tiene este aspecto:
	
	{
        "id": 1,
        "name": "Comunicación oral",
        "icon": "skill1Icon"
    },

- ***Obtener los datos de una habilidad*** (/api/skill/:skillId)
	
	**Método** GET

	Devuelve el listado completo de habilidades en formato lista. Cada uno de los elementos JSON de la lista tiene este aspecto:
	
	{
        "id": 1,
        "name": "Comunicación oral",
        "icon": "skill1Icon"
    },

- ***Obtener los elementos del generador de avatares*** (/api/avatar-elements)
	
	**Método** GET

	Permite obtener el conjunto de imágenes correspondientes a las diferentes partes que conforman el generador de avatares, tales como el color del pelo, de la piel, los tipos de peinado y los posibles complementos (tipos de barbas, piercings, etc.).
	
	