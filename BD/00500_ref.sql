
/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;
--alter table only nucleo. add foreign key (_id) references nucleo.(id);
alter table only nucleo.tbl_tipos add foreign key (padre_id) references nucleo.tbl_tipos(id);
--alter table only nucleo.usuarios add foreign key (pers_id) references nucleo.personas(id);

alter table only nucleo.enlaces add foreign key (padre_id) references nucleo.enlaces(id);
--alter table only nucleo.usr_roles add foreign key (user_id) references nucleo.personas(id);
alter table only nucleo.usr_roles add foreign key (user_id) references nucleo.usuarios(pers_id);
alter table only nucleo.usr_roles add foreign key (rol_id) references nucleo.roles(id);
alter table only nucleo.menues add foreign key (rol_id) references nucleo.roles(id);
alter table only nucleo.menues add foreign key (enla_id) references nucleo.enlaces(id);

alter table only nucleo.actividades add foreign key (proceso_id) references nucleo.procesos(id);


alter table only nucleo.tramites add foreign key (proceso_id) references nucleo.procesos(id);
alter table only nucleo.tramites add foreign key (actividad_id) references nucleo.actividades(id);
alter table only nucleo.tramites add foreign key (remitente_id) references nucleo.usuarios(pers_id);
alter table only nucleo.tramites add foreign key (receptor_id) references nucleo.usuarios(pers_id);
--alter table only nucleo.tramites add foreign key (receptor_id) references nucleo.usuarios(pers_id);


alter table only nucleo.tramites_log add foreign key (proceso_id) references nucleo.procesos(id);
alter table only nucleo.tramites_log add foreign key (actividad_id) references nucleo.actividades(id);
alter table only nucleo.tramites_log add foreign key (remitente_id) references nucleo.usuarios(pers_id);
alter table only nucleo.tramites_log add foreign key (receptor_id) references nucleo.usuarios(pers_id);
--alter table only nucleo.tramites_log add foreign key (receptor_id) references nucleo.usuarios(pers_id);
alter table only nucleo.tramites_log add foreign key (tramite_id) references nucleo.tramites(id);


commit;

