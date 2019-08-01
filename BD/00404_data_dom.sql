/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;
-------*****PARAMETROS*****
--INSERT INTO nucleo.parametros (campo,valor,sistema,descripcion,usuario)
--VALUES('PER-VACA-VAL','9','RRHH', 'PERIODOS VALIDOS DE VACACION',1);

-------******TBL TIPOS******--
INSERT INTO nucleo.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(1011100000000001,'TP-EQUIPO-DOM','TIPO EQUIPO DOMOTICA','TIPO EQUIPO DOMOTICA','','',1);
INSERT INTO nucleo.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(nucleo.fn_tipo_nombre_id('TP-EQUIPO-DOM'),'LUZ','fa-lightbulb-o','LUZ NORMAL','','',1);
INSERT INTO nucleo.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(nucleo.fn_tipo_nombre_id('TP-EQUIPO-DOM'),'TEMPERATUA','fa-thermometer','SENSOR DE TEMPERATURA','','',1);
INSERT INTO nucleo.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(nucleo.fn_tipo_nombre_id('TP-EQUIPO-DOM'),'GAS','fa-free-code-camp','SENSOR DE GAS','','',1);
INSERT INTO nucleo.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(nucleo.fn_tipo_nombre_id('TP-EQUIPO-DOM'),'MOVIMIENTO','MOVIMIENTO','SENSOR DE MOVIMIENTO','','',1);

-------******ROLES******--
insert into nucleo.roles (sistema, nombre, descripcion,usuario) values ('DOMOTICA', 'DOMOTICA', 'DOMOTICA',1);

-------******ENLACES******--
insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
(1011100000000001,1,2,'AMBIENTES','fa-home', '#ambientes', '',1);
insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM nucleo.enlaces WHERE nombre='AMBIENTES'),2,20,'Reportes Dom.','fa-file', '#domReporte', '',1);
/*((SELECT id FROM nucleo.enlaces WHERE nombre='EESS'),2,20,'Admin. EESS','fa-dashcube', '#eess', '',1),
((SELECT id FROM nucleo.enlaces WHERE nombre='EESS'),2,21,'Admin. Tanques','fa-circle-o', '#esTanque', '',1),
((SELECT id FROM nucleo.enlaces WHERE nombre='EESS'),2,21,'Admin. Productos','fa-cubes', '#esProducto', '',1);
*/
-------******MENUS******--
insert into nucleo.menues (rol_id, enla_id,usuario) values 
((SELECT id FROM nucleo.roles WHERE nombre='DOMOTICA'),(SELECT id FROM nucleo.enlaces WHERE nombre='AMBIENTES'),1),
((SELECT id FROM nucleo.roles WHERE nombre='DOMOTICA'),(SELECT id FROM nucleo.enlaces WHERE nombre='Reportes Dom.'),1);
/*((SELECT id FROM nucleo.roles WHERE nombre='EESS'),(SELECT id FROM nucleo.enlaces WHERE nombre='Admin. EESS'),1),
((SELECT id FROM nucleo.roles WHERE nombre='EESS'),(SELECT id FROM nucleo.enlaces WHERE nombre='Admin. Tanques'),1),
((SELECT id FROM nucleo.roles WHERE nombre='EESS'),(SELECT id FROM nucleo.enlaces WHERE nombre='Admin. Productos'),1);
*/
-------******USUARIO ROL******--
INSERT INTO nucleo.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(1001000000016110,(SELECT id FROM nucleo.roles WHERE nombre='DOMOTICA'),'2050-01-01','{}','rpmamani');

insert into nucleo.usuarios(pers_id, cuenta, alias, clave,usuario) values 
(1001000000016140, 'jtorres', 'Josue Torrez', crypt('#$%&jtorres#$%&', gen_salt('bf')), 'rpmamani');
INSERT INTO nucleo.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(1001000000016140,(SELECT id FROM nucleo.roles WHERE nombre='DOMOTICA'),'2050-01-01','{}','rpmamani');


insert into nucleo.usuarios(pers_id, cuenta, alias, clave,usuario) values 
(1001000000016141, 'joaquin', 'Joaquib', crypt('#$%&joaquin#$%&', gen_salt('bf')), 'rpmamani');
INSERT INTO nucleo.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(1001000000016141,(SELECT id FROM nucleo.roles WHERE nombre='DOMOTICA'),'2050-01-01','{}','rpmamani');


-------******DOMOTICA******--
SELECT setval('nucleo.ambientes_id_seq', 1011100000000000);
INSERT INTO nucleo.ambientes(descripcion) VALUES('Entrada');
INSERT INTO nucleo.ambientes(descripcion) VALUES('Central');
INSERT INTO nucleo.ambientes(descripcion) VALUES('Interior');

SELECT setval('nucleo.dispositivos_id_seq', 1011100000000000);
INSERT INTO nucleo.dispositivos(ambiente_id, tipo_dispositivo_id, valor, usuario)VALUES(1011100000000001, nucleo.fn_tipo_nombre_id('LUZ'),'false', 'rpmamani');
INSERT INTO nucleo.dispositivos(ambiente_id, tipo_dispositivo_id, estado_dispositivo, valor, usuario)VALUES(1011100000000002, nucleo.fn_tipo_nombre_id('LUZ'), true,'false', 'rpmamani');
INSERT INTO nucleo.dispositivos(ambiente_id, tipo_dispositivo_id, valor, usuario)VALUES(1011100000000003, nucleo.fn_tipo_nombre_id('LUZ'),'false', 'rpmamani');

SELECT setval('nucleo.user_dispositivos_id_seq', 1011100000000000);
INSERT INTO nucleo.user_dispositivos(dispositivo_id, persona_id)VALUES(1011100000000001, 1001000000016110);
INSERT INTO nucleo.user_dispositivos(dispositivo_id, persona_id)VALUES(1011100000000002, 1001000000016110);
INSERT INTO nucleo.user_dispositivos(dispositivo_id, persona_id)VALUES(1011100000000003, 1001000000016110);
INSERT INTO nucleo.user_dispositivos(dispositivo_id, persona_id)VALUES(1011100000000001, 1001000000016140);
INSERT INTO nucleo.user_dispositivos(dispositivo_id, persona_id)VALUES(1011100000000002, 1001000000016140);
INSERT INTO nucleo.user_dispositivos(dispositivo_id, persona_id)VALUES(1011100000000003, 1001000000016140);
INSERT INTO nucleo.user_dispositivos(dispositivo_id, persona_id)VALUES(1011100000000001, 1001000000016141);
INSERT INTO nucleo.user_dispositivos(dispositivo_id, persona_id)VALUES(1011100000000002, 1001000000016141);
INSERT INTO nucleo.user_dispositivos(dispositivo_id, persona_id)VALUES(1011100000000003, 1001000000016141);


commit;

    