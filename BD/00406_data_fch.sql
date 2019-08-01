/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;
-------*****PARAMETROS*****
--INSERT INTO nucleo.parametros (campo,valor,sistema,descripcion,usuario)
--VALUES('PER-VACA-VAL','9','RRHH', 'PERIODOS VALIDOS DE VACACION',1);

-------******ROLES******--
insert into nucleo.roles (sistema, nombre, descripcion,usuario) values ('CREDENCIALES', 'CREDENCIALES', 'CREDENCIALES',1);


-------******ENLACES******--
insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
(1011100000000001,1,2,'CREDENCIAL','fa-id-card-o', 'javascript:void(0)', '',1);
insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM nucleo.enlaces WHERE nombre='CREDENCIAL'),2,20,'Ficha Personal','fa-id-card-o', '#fichaPersonal', '',1);
insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM nucleo.enlaces WHERE nombre='CREDENCIAL'),2,20,'Ficha Mascotas','fa-id-card-o', '#fichaMascota', '',1);

-------******MENUS******--
insert into nucleo.menues (rol_id, enla_id,usuario) values 
((SELECT id FROM nucleo.roles WHERE nombre='CREDENCIALES'),(SELECT id FROM nucleo.enlaces WHERE nombre='CREDENCIAL'),1),
((SELECT id FROM nucleo.roles WHERE nombre='CREDENCIALES'),(SELECT id FROM nucleo.enlaces WHERE nombre='Ficha Personal'),1),
((SELECT id FROM nucleo.roles WHERE nombre='CREDENCIALES'),(SELECT id FROM nucleo.enlaces WHERE nombre='Ficha Mascotas'),1);

-------******USUARIO ROL******--
INSERT INTO nucleo.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(1001000000016110,(SELECT id FROM nucleo.roles WHERE nombre='CREDENCIALES'),'2050-01-01','{}','rpmamani');


commit;

    