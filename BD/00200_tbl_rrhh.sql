/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;
--create schema nucleo;


create table nucleo.personas (
  id serial primary key,
  genero_id dentero2,
  estado_civil_id dentero2,
  grupo_ednia_id dentero2,
  tipo_sangre_id dentero2,
  lugar_naciomeinto_id dentero2,
  entidad_financiera_id dentero2,
  libreta_militar dtexto2,
  nro_cuenta dtexto2,
  foto dtexto2,
  primer_nombre dtexto2 check (char_length(primer_nombre) < 80),
  segundo_nombre dtexto2 check (char_length(segundo_nombre) < 80),
  primer_apellido dtexto2 check (char_length(primer_apellido) < 80),
  segundo_apellido dtexto2 check (char_length(segundo_apellido) < 80),
  apellido_casado dtexto2 check (char_length(apellido_casado) < 80),
  di dtexto2,
  nua dtexto2,
  extencion_id dentero2,
  correo_institucional dtexto2, --  unique check (correo ~* '^.+@.+\..+$'),
  correo_personal dtexto2,
  nacimeinto dfecha2,
  telefono dtexto2,
  direccion dtexto2,
  estado destado default 'C',
  usuario duser,
  editado dfechahora default now()
);

create table nucleo.instituciones (
  id serial primary key,
  tipo_id dentero,
  nombre dtexto,
  sigla dtexto,
  direccion dtexto,
  telefono dtexto,
  correo dtexto,
  logo dtexto,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.cargos (
  id serial primary key,
  padre_id dentero,
  escala_id dentero2,
  codigo dtexto,
  cargo dtexto,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.funciones (
  id serial primary key,
  padre_id dentero,
  codigo dtexto,
  funcion dtexto,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.sedes (
  id serial primary key,
  inst_id dentero,
  sede dtexto,
  sigla dtexto,
  telefono dtexto2,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.funcionarios (
  id serial primary key,
  tipo_contrato_id dentero2,
  tipo_anexo_id dentero2,
  tipo_personal_id dentero2,
  sede_id dentero2,
  unidad_organica_id dentero,
  unidad_ejecutora_id dentero2,
  cargo_id dentero,
  funcion_id dentero2,
  persona_id dentero,
  inicio dfecha,
  conclucion dfecha2,
  rescesion dfecha2,
  fecha_memo dfecha2,
  nro_contrato dtexto2,
  memo dtexto2,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.unidades_ejecutoras (
  id serial primary key,
  direccion_admin_id dentero,
  nombre dtexto,
  sigla dtexto,
  codigo dtexto,
  estado destado,
  usuario duser,
  editado dfechahora
);


create table nucleo.ubic_geograficas (
  id serial primary key,
  padre_id dentero,
  nivel dentero,
  nombre dtexto,
  sigla dtexto,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.unidades_organicas (
  id serial primary key,
  padre_id dentero2,
  codigo dtexto2,
  sigla dtexto2,
  descripcion dtexto2,
  periodo dentero2,
  estado destado,
  usuario dentero2,
  editado dfechahora
);


create table nucleo.fuentes_financiamientos(
  id serial primary key,
  codigo dtexto,
  fuente_financiamiento dtexto,
  estado destado,
  usuario dentero2,
  editado dfechahora
);
--20
create table nucleo.organismos_financiadores(
  id serial primary key,
  codigo dtexto,
  organismo_financiador dtexto,
  estado destado,
  usuario dentero2,
  editado dfechahora
);
--21
create table nucleo.fnt_organismos(
  id serial primary key,
  fuente_financiamiento_id dentero, -- references fuentes_financiamientos (id_fuente_financiamiento),
  organismo_financiador_id dentero, -- references organismos_financiadores (id_organismo_financiador),
  fuente_organismo dtexto2,
  estado destado,
  usuario dentero2,
  editado dfechahora
);
--22
create table nucleo.entidades_transferencias(
  id serial primary key,
  codigo dtexto,
  entidad_transferencia dtexto,
  estado destado,
  usuario dentero2,
  editado dfechahora
);
CREATE TABLE nucleo.sistemas (
  id serial NOT NULL primary key,
  sistema dtexto,
  codigo_gasto dtexto2,
  prefijo dtexto2,
  estado destado,
  usuario dentero2,
  editado dfechahora
);

CREATE TABLE nucleo.direccion_administrativa (
  id serial NOT NULL primary key,
  nombre dtexto,
  codigo dtexto,
  estado destado,
  usuario dentero2,
  editado dfechahora
);

create table nucleo.periodos_contables(
  id_periodo_contable serial primary key,
  periodo_contable dtexto,
  fec_inicio dfecha,
  fec_fin dfecha,
  gestion dentero4,
  estado destado,
  usuario dentero2,
  editado dfechahora
);

create table nucleo.pr_aperturas_programaticas(
  id serial primary key,
  periodo_contable_id dentero,-- references periodos_contables (id_periodo_contable),
  tipo_calificacion_id dentero,-- references tipos_calificaciones (id_tipo_calificacion),
  tipo_apertura_id dentero,-- references tipos_aperturas (id_tipo_apertura),
  tipo_gasto_id dentero,-- references tipos_gastos (id_tipo_gasto),
  padre_id dentero3,-- references pr_aperturas_programaticas (id_apertura_programatica), 
  codigo dtexto,
  apertura_programatica dtexto,
  nivel dentero4,
  gestion dentero4,
  estado destado,
  usuario dentero2,
  editado dfechahora
);

commit;
