# ABIT
## ABIT-QR
[Demo](https://45.63.2.26:3000)

**DESCRIPCION**
Sistema desarrollado con:
 > NodeJs,
 > BD PostgreSql,
 > PostGrapHile,
 > Tecnologia PWA

Capas de generar codigo QR y leer el mismo para identificar a personas y mascotas registradas.

Para el acceso de usuarios y registro de informacion en general se la realisa en Base de datos [PostgreSql v10+](https://www.postgresql.org) empleando [PostgrapHile](https://www.graphile.org/postgraphile/)

**INSTALACION**

El sistema esta integrado el Front End `/abit_qr/public`  y Back End `/abit_qr/`. El mismo puede ser separado
```
  git clone https://github.com/renepastor/abit_qr.git
```

***Requisitos***
 >> NodeJs v6.4+,
 >> BD PostgreSql v10+,
 >> PostGrapHile v4+,
 >> Tecnologia PWA (HTTPS para publicar)

***Install Base de Datos***
directorio /abit_qr/DB$ 
crear BD con usuario "bd_abit" con usuario root

Para Linux ejecutar el archivo `/abit_qr/DB/create.sh`

Para WINDOWS sur los archivos .sql a postgres en orde secuencial


***Install Back End***
directorio /abit_qr$ 
```
  npm install
```

***Install Front End***
directorio /abit_qr/public$ 
```
  npm install
```


***Ejecutar***
directorio /abit_qr$ 
```
  node abit.js
```


# TODA SUGERENCIA ES BIEN VENIDO renepastor@gmail.com 591-72001106