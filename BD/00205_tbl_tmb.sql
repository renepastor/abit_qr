/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;

--drop table nucleo.leds;
--drop table nucleo.ambientes;
create table nucleo.tmb_instituciones (
  id bigserial primary key,
  intitucion dtexto,
  direccion dtexto2,
  telefono dtexto2,
  fecha_fundacion dfecha,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.tmb_puestos (
  id bigserial primary key,
  codigo dtexto,
  tipo_estado_id dllave,
  coordenadas dpunto2,
  area dpunto2,
  dimension dpunto2,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.tmb_propietarios (
  id bigserial primary key,
  primer_nombre dtexto,
  segundo_nombre dtexto2,
  primer_apellido dtexto,
  segundo_apellido dtexto2,
  ci dtexto,
  extencion dtexto,
  direccion dtexto,
  telefono dtexto,
  fecha_nacimiento dfecha,
  estado destado,
  usuario duser,
  editado dfechahora
);


create table nucleo.tmb_puestos_propietarios (
  id bigserial primary key,
  propietario_id dllave,
  puesto_id dllave,
  incorporacion dfecha,
  trasferencias dfecha2,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.tmb_documentos(
  id bigserial primary key,
  puesto_propietario_id dllave,
  tipo_documento_id dllave,
  archivo djson,
  estado destado,
  usuario duser,
  editado dfechahora
);


commit;
