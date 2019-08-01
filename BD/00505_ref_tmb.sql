/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;

--alter table only nucleo.ambientes add foreign key (persona_id) references nucleo.usuarios(pers_id);

alter table only nucleo.tmb_puestos add foreign key (tipo_estado_id) references nucleo.tbl_tipos(id);

alter table only nucleo.tmb_puestos_propietarios add foreign key (propietario_id) references nucleo.tmb_propietarios(id);
alter table only nucleo.tmb_puestos_propietarios add foreign key (puesto_id) references nucleo.tmb_puestos(id);

alter table only nucleo.tmb_documentos add foreign key (puesto_propietario_id) references nucleo.tmb_puestos_propietarios(id);
alter table only nucleo.tmb_documentos add foreign key (tipo_documento_id) references nucleo.tbl_tipos(id);


commit;

