/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;

--drop table nucleo.leds;
--drop table nucleo.ambientes;
create table nucleo.ambientes (
  id bigserial primary key,
  descripcion dtexto,
  codigo dtexto2,
  datos djson default '{}',
  estado destado,
  usuario duser,
  editado dfechahora default now()
);

create table nucleo.dispositivos (
  id bigserial primary key,
  ambiente_id dllave,
  tipo_dispositivo_id dllave,
  estado_dispositivo dbooleano2,
  valor dtexto,
  estado destado,
  usuario duser,
  editado dfechahora default now()
);

create table nucleo.user_dispositivos (
  id bigserial primary key,
  dispositivo_id dllave,
  persona_id dllave,
  estado destado,
  usuario duser,
  editado dfechahora default now()
);

create table nucleo.dispositivos_log (
  id bigserial primary key,
  dispositivo_id dllave,
  ambiente_id dllave,
  tipo_dispositivo_id dllave,
  estado_dispositivo dbooleano2,
  valor dtexto,
  estado destado,
  usuario duser,
  editado dfechahora default now()
);


commit;
