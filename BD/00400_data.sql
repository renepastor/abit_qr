/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;


-------******ROLES******--
SELECT setval('nucleo.roles_id_seq', 1011100000000000);
insert into nucleo.roles (sistema, nombre, descripcion,usuario) values ('SUPERADMIN','SUPER ADMIN', 'RESPONSABLE',1011100000000001);

-------******ENLACES******--
SELECT setval('nucleo.enlaces_id_seq', 1011100000000000);

insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
(1011100000000001,1,2,'MENU','fa-bars', '', '',1011100000000001);
insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM nucleo.enlaces WHERE nombre='MENU'),1,2,'Configuracion','fa-eye', 'javascript:void(0)', '',1011100000000001);

insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM nucleo.enlaces WHERE nombre='Configuracion'),2,6,'Parametros','fa-flag', '#parametros', '',1011100000000001),
((SELECT id FROM nucleo.enlaces WHERE nombre='Configuracion'),2,7,'Tbl Tipos','fa-folder-open', '#tblTipos', '',1011100000000001),
((SELECT id FROM nucleo.enlaces WHERE nombre='Configuracion'),2,7,'Generador','fa-cogs', '#generador', '',1011100000000001);

insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM nucleo.enlaces WHERE nombre='MENU'),1,3,'Administracion','fa-cubes', 'javascript:void(0)', '',1011100000000001);
insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM nucleo.enlaces WHERE nombre='Administracion'),2,8,'Usuarios','fa-eye', '#usuario', '',1011100000000001),
((SELECT id FROM nucleo.enlaces WHERE nombre='Administracion'),2,9,'Roles','fa-calendar', '#roles', '',1011100000000001),
((SELECT id FROM nucleo.enlaces WHERE nombre='Administracion'),2,10,'Accesos','fa-search-plus', '#accesos', '',1011100000000001);


-------******MENUS******--
SELECT setval('nucleo.menues_id_seq', 1011100000000000);
insert into nucleo.menues (rol_id, enla_id,usuario) values 
((SELECT id FROM nucleo.roles WHERE nombre='SUPER ADMIN'),(SELECT id FROM nucleo.enlaces WHERE nombre='Configuracion'),1011100000000001),
((SELECT id FROM nucleo.roles WHERE nombre='SUPER ADMIN'),(SELECT id FROM nucleo.enlaces WHERE nombre='Parametros'),1011100000000001),
((SELECT id FROM nucleo.roles WHERE nombre='SUPER ADMIN'),(SELECT id FROM nucleo.enlaces WHERE nombre='Tbl Tipos'),1011100000000001),
((SELECT id FROM nucleo.roles WHERE nombre='SUPER ADMIN'),(SELECT id FROM nucleo.enlaces WHERE nombre='Generador'),1011100000000001),
((SELECT id FROM nucleo.roles WHERE nombre='SUPER ADMIN'),(SELECT id FROM nucleo.enlaces WHERE nombre='Administracion'),1011100000000001),
((SELECT id FROM nucleo.roles WHERE nombre='SUPER ADMIN'),(SELECT id FROM nucleo.enlaces WHERE nombre='Usuarios'),1011100000000001),
((SELECT id FROM nucleo.roles WHERE nombre='SUPER ADMIN'),(SELECT id FROM nucleo.enlaces WHERE nombre='Roles'),1011100000000001),
((SELECT id FROM nucleo.roles WHERE nombre='SUPER ADMIN'),(SELECT id FROM nucleo.enlaces WHERE nombre='Accesos'),1011100000000001);



-------******* USUARIOS *****----

insert into nucleo.usuarios(pers_id, cuenta, alias, clave,usuario) values 
(1001000000016110, 'rpmamani', 'Rene Pastor Mamani Flores', crypt('#$%&rpmamani#$%&', gen_salt('bf')), 'rpmamani');


SELECT setval('nucleo.usr_roles_id_seq', 1011100000000000);
INSERT INTO nucleo.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(1001000000016110,(SELECT id FROM nucleo.roles WHERE nombre='SUPER ADMIN'),'2050-01-01','{}','rpmamani');


-------******* PARAMETROS *****----
SELECT setval('nucleo.parametros_id_seq', 1011100000000000);
INSERT INTO nucleo.parametros (campo,valor,sistema,descripcion,usuario)
VALUES('TIME-SESSION','30','SESSION', 'TIEMPO DE SESSION DEL USUARIO',1011100000000001);

-------******* TBL TIPOS *****----
SELECT setval('nucleo.tbl_tipos_id_seq', 1011100000000000);
INSERT INTO nucleo.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(1011100000000001,'--','0','Inicio','Es el origen de la tabla','null',1);

-------******PROCESO******--
SELECT setval('nucleo.procesos_id_seq', 1011100000000000);
INSERT INTO nucleo.procesos(proceso,codigo,usuario) VALUES
('Correspondencia','CORR',1);

-------******ACTIVIDAD******--
SELECT setval('nucleo.actividades_id_seq', 1011100000000000);
INSERT INTO nucleo.actividades(proceso_id,actividad,orden,url,imagen,duracion,destino,usuario) VALUES
(1011100000000001,'Crear Corresp',0,'/corresp/index.html','fa-folder-open',8,'{"url":"./tem.html", "fn":"function(res){return (res.nombre)}"}',1);


commit;

