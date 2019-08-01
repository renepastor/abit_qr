/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;

--alter table only nucleo.ambientes add foreign key (persona_id) references nucleo.usuarios(pers_id);
alter table only nucleo.dispositivos add foreign key (ambiente_id) references nucleo.ambientes(id);
alter table only nucleo.dispositivos add foreign key (tipo_dispositivo_id) references nucleo.tbl_tipos(id);

alter table only nucleo.user_dispositivos add foreign key (dispositivo_id) references nucleo.dispositivos(id);
alter table only nucleo.user_dispositivos add foreign key (persona_id) references nucleo.usuarios(pers_id);


commit;

