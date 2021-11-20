*Santiago San Román Játiva* (Dic’ 2020)  
<santi72alc@gmail.com>

[mi LinkedIn](https://linkedin.com/in/santiagosanroman)

---
# Favorite Links

Este proyecto está basado en un vídeo del magnífico youtuber ‘Fazt’ y el vídeo original, por si estás interesado en visionarlo, lo puedes encontrar [aquí](https://www.youtube.com/watch?v=qJ5R9WTW0_E).

Mi proyecto es **totalmente libre** para su uso, edición y distribución. El repositorio se encuentra en GitHub y podéis descargarlo desde [aquí](https://github.com/Santi72Alc/favorite-links-inter.git).

También está subido a [esta dirección](https://sr-favorite-links-inter.herokuapp.com) de HEROKU para que se pueda probar su funcionamiento.

***Siempre es de agradecer que se referencie el creador inicial***.

Las tecnologías en las que se basa este proyecto son Javascript. Node.js, Express, Passport y MySQL para la base de datos y usuarios.

El servidor y el control de sus rutas se realiza mediante Node.js y Express, mientras que la seguridad de acceso a las rutas y a la base de datos es realizada con la librería Passport.

Nos permite crear y mantener direcciones de links ‘favoritos’ de varios usuarios independientemente.

Se trata de un **C**reate **R**ead **U**pdate **D**elete en el cual cada usuario podrá tener almacenados y mantenidos sus links ‘favoritos’.

***Para este proyecto es necesario e imprescindible tener instalado y funcionando el servidor MySQL, el servidor de aplicaciones NODEjs y el gestor de paquetes NPM.***

En el caso de que el software requerido no esté instalado, les dejo links externos con información de instalación.

- Instalación de MySQL en [WINDOWS 10](https://www.tuexperto.com/2019/07/17/como-instalar-la-base-de-datos-mysql-en-windows-10/)
- Instalación de MySQL en [LINUX](https://www.digitalocean.com/community/tutorials/como-instalar-mysql-en-ubuntu-18-04-es) (ubuntu)
- Instalación de [Node y NPM](https://nodejs.org/es/download/) (elegir la versión adecuada al S.O.)

Todas las instrucciones de instalación del proyecto son indicadas para el sistema operativo Linux, en su distribución UBUNTU o similares, que son en las que la he realizado. No debería ser muy difícil  adaptarlas para Windows u otro sistema operativo.

---
### **Descarga del proyecto**

El proyecto está almacenado en la plataforma GitHub y se puede descargar/clonar desde [aquí](https://github.com/Santi72Alc/favorite-links-inter.git).

A continuación, abrir una terminal de comandos en el directorio del proyecto descomprimido o clonado. ***Importante!!*** Revisar proceso de preparación, configuración e instalación antes de realizar cualquier prueba.

## **Preparación, configuración e instalación del proyecto**

##Configuración del servidor MyS

ANTES de hacer nada con el proyecto descargado, verificaremos la existencia y el funcionamiento del servidor de MySQL en nuestro sistema.

> mysql –version

En caso de no tenerlo instalado, sugiero repetir las instrucciones indicadas anteriormente. Si lo tenemos instalado, comprobamos que el servicio esté activo.

> service mysql status

En color verde debe indicar que el servicio está activo ‘*active (running*)’. Presionaremos ‘Q’ para salir de la ventana activa.

En el caso de NO tener el sistema activo lo activaremos mediante:

> service mysql start

Asumiendo que el servidor de MySQL está instalado y activo, ya podemos empezar con la configuración del proyecto.

#### Creación de la base de datos

Para la creación de las bases de datos se proporciona un fichero *script* que nos facilitará y automatizará completamente el proceso.

Este script se encarga de generar la base de datos ‘_database\_links_’ y las tablas necesarias (‘_users_’ y ‘_links_’) para el uso del proyecto.

Debemos de posicionarnos en la carpeta ‘/database’ del directorio raíz en el que se ha clonado el proyecto y, dentro de ella, ejecutaremos el siguientes comandos:

>cd database  
>mysql -u <_username_> -p < create_database.sql

donde _username_ se deberá de cambiar por el usuario registrado en MySQL. Una vez introducida la clave del usuario indicado, se generará todo lo necesario referente a la base de datos y sus tablas.

#### Acceso a la base de datos 

La modificación a realizar es en el fichero ‘*/src/config.js*’ del proyecto.

Este fichero está con una estructura formato JSON y tiene datos de configuración en los que está la clave ‘*database*’ con sus valores. Debemos modificarlos y adecuarlos a nuestra conexión. En principio sólo habría que modificar el ‘*user*’ y ‘*password*’ para tener un correcto acceso a la base de datos.

#### Actualización de librerías

Por último paso en la configuración del proyecto, sólo queda descargar y actualizar todas las librerías necesarias para la correcta ejecución del mismo.

Para esto nos situaremos en el directorio raíz del proyecto y ejecutamos las siguientes órdenes:

>npm install

Con esta instrucción quedan instaladas y configuradas todas las librerías necesarias para el proyecto.

### Ejecución del proyecto

La siguiente y última sentencia a ejecutar nos permite poner en marcha el proyecto.

>npm run dev

#### Finalización del proyecto

Para la finalizar con la ejecución de proyecto, debemos presionar ‘Ctrl+C’ en la terminal de comandos.

## <center>**POSIBLES ERRORES**</center>


Los posibles errores que he detectado, es que pueda darse que el puerto a utilizar ya esté siendo ocupado por algún servicio, lo cual deberemos evitar la coincidencia cambiando el valor en el fichero de configuración indicado en el apartado de ***Acceso a la base de datos***.

Para saber si el error de puerto es por nuestro proyecto, usaremos la sentencia:

>lsof -i TCP:4000

Si está ocupado el puerto saldrá un listado con el comando que lo está ocupando. Si se corresponde con NODE es el proyecto el que la tiene ocupado. Debemos ‘matar’  ese proceso y se hace con la siguiente instrucción:

>kill <_numPID_>

(donde <_numPID_> es el número de PID indicado en el listado)

Esto nos permitirá tener libre otra vez el puerto (4000) utilizado por nuestro proyecto.

---
_Favorite Links_
