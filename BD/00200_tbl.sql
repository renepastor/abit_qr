/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;


create table nucleo.tbl_tipos (
  id bigserial primary key,
  padre_id dllave,
--  codigo dtexto,
  nombre dtexto,
  valor dtexto,
  descripcion dtexto,
  ayuda dtexto,
  validador dtexto,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.parametros (
  id bigserial primary key,
  campo dtexto,
  valor dtexto,
  sistema dtexto2,
  descripcion dtexto2,
  estado destado,
  usuario duser,
  editado dfechahora
);


create table nucleo.usuarios (
  pers_id dllave primary key,
  cuenta dtexto2 unique,
  clave dtexto2,
  foto dfoto2,
  alias dtexto2,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.enlaces (
  id bigserial primary key,
  padre_id dllave,
  orden dentero2 default 1,
  nivel dentero2 default 1,
  nombre dtexto,
  ruta dtexto,
  imagen dtexto2,
  ayuda dtexto2,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.roles (
  id bigserial primary key,
  nombre dtexto,
  sistema dtexto,
  descripcion dtexto2,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.usr_roles (
  id bigserial primary key,
  user_id dllave,
  rol_id dllave,
  expira dfecha2,
  permiso djson,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.menues (
  id bigserial primary key,
  rol_id dllave,
  enla_id dllave,
  estado destado,
  usuario duser,
  editado dfechahora
);


create type nucleo.jwt as (
  role dtexto,
  pers_id dllave,
  cuenta dtexto
);


/***TRAMITES****/
create table nucleo.procesos (
  id bigserial primary key,
  proceso dtexto2,
  codigo dtexto2,
  secuenciador dentero4,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.actividades (
  id bigserial primary key,
  proceso_id dllave,
  actividad dtexto,
  orden dentero,
  url dtexto,
  imagen dtexto2,
  duracion dentero,
  destino json,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.tramites (
  id bigserial primary key,
  proceso_id dllave2,
  padre_id dllave2,
  actividad_id dllave2,
  remitente_id dllave2,
  receptor_id dllave2,
  codigo dtexto2,
  archivos djson default '[]',
  proveido dtexto2,
  envio dfechahora,
  recepcion dfechahora,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.tramites_log (
  id bigserial primary key,
  tramite_id dllave2,
  proceso_id dllave2,
  padre_id dllave2,
  actividad_id dllave2,
  remitente_id dllave2,
  receptor_id dllave2,
  codigo dllave2,
  archivos djson default '[]',
  proveido dtexto2,
  envio dfechahora,
  recepcion dfechahora,
  estado destado,
  usuario dentero2,
  editado dfechahora
);

CREATE VIEW nucleo.vw_usuarios AS
  SELECT distinct
    nucleo.usuarios.pers_id,
    nucleo.usuarios.cuenta,
    nucleo.roles.sistema::dtexto2 clave,
    nucleo.usuarios.alias,
    nucleo.usuarios.estado,
    nucleo.usuarios.usuario,
    nucleo.usuarios.editado
  FROM nucleo.usuarios JOIN
       nucleo.usr_roles on(nucleo.usuarios.pers_id = nucleo.usr_roles.user_id) JOIN
       nucleo.roles on (nucleo.usr_roles.rol_id = nucleo.roles.id);


commit;
