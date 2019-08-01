/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;
-------*****PARAMETROS*****
--INSERT INTO nucleo.parametros (campo,valor,sistema,descripcion,usuario)
--VALUES('PER-VACA-VAL','9','RRHH', 'PERIODOS VALIDOS DE VACACION',1);

-------******TBL TIPOS******--
INSERT INTO nucleo.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(1011100000000001,'TP-DOM-TAMBO','TIPO DOCOMENTO TAMBO','TIPO DOCUMENTO DE TAMBO','','',1);
INSERT INTO nucleo.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(nucleo.fn_tipo_nombre_id('TP-DOM-TAMBO'),'CARNET DE IDENTIDAD','CI','DOCUMENTO DE IDENTIDAD','','',1);
INSERT INTO nucleo.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(nucleo.fn_tipo_nombre_id('TP-DOM-TAMBO'),'CERTIFICADO DE PROPIEDAD','CPROP','CERTIFICADO DE PROPIEDAD','','',1);
INSERT INTO nucleo.tbl_tipos(padre_id,nombre,valor,descripcion,ayuda,validador,usuario) VALUES
(nucleo.fn_tipo_nombre_id('TP-DOM-TAMBO'),'CERTIFICADO DE AFILIACION','CAFI','CERTIFICADO DE AFILIACION','','',1);

-------******ROLES******--
insert into nucleo.roles (sistema, nombre, descripcion,usuario) values ('ADMIN PROPIETARIO', 'ADMIN PROPIETARIO', 'ADMIN PROPIETARIO',1);
insert into nucleo.roles (sistema, nombre, descripcion,usuario) values ('PROPIETARIO', 'PROPIETARIO', 'PROPIETARIO',1);


-------******ENLACES******--
insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
(1011100000000001,1,2,'TAMBO','fa-id-card-o', 'javascript:void(0)', '',1);
insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM nucleo.enlaces WHERE nombre='TAMBO'),2,20,'Puestos','fa-id-card-o', '#puestos', '',1);
insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM nucleo.enlaces WHERE nombre='TAMBO'),2,20,'Ficha Propietario','fa-id-card-o', '#fichaPropietario', '',1);
insert into nucleo.enlaces (padre_id,nivel,orden,nombre,imagen,ruta,ayuda,usuario) values 
((SELECT id FROM nucleo.enlaces WHERE nombre='TAMBO'),2,20,'Editar Perfil','fa-user-circle', '#perfilPropietario', '',1);

-------******MENUS******--
insert into nucleo.menues (rol_id, enla_id,usuario) values 
((SELECT id FROM nucleo.roles WHERE nombre='PROPIETARIO'),(SELECT id FROM nucleo.enlaces WHERE nombre='TAMBO'),1),
((SELECT id FROM nucleo.roles WHERE nombre='PROPIETARIO'),(SELECT id FROM nucleo.enlaces WHERE nombre='Ficha Propietario'),1),
((SELECT id FROM nucleo.roles WHERE nombre='PROPIETARIO'),(SELECT id FROM nucleo.enlaces WHERE nombre='Editar Perfil'),1);

insert into nucleo.menues (rol_id, enla_id,usuario) values 
((SELECT id FROM nucleo.roles WHERE nombre='ADMIN PROPIETARIO'),(SELECT id FROM nucleo.enlaces WHERE nombre='TAMBO'),1),
((SELECT id FROM nucleo.roles WHERE nombre='ADMIN PROPIETARIO'),(SELECT id FROM nucleo.enlaces WHERE nombre='Puestos'),1);

-------******USUARIO ROL******--
INSERT INTO nucleo.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(1001000000016110,(SELECT id FROM nucleo.roles WHERE nombre='PROPIETARIO'),'2050-01-01','{}','rpmamani');

INSERT INTO nucleo.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(1001000000016110,(SELECT id FROM nucleo.roles WHERE nombre='ADMIN PROPIETARIO'),'2050-01-01','{}','rpmamani');


commit;

    