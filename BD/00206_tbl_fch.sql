create table nucleo.ficha_personal (
  id bigserial primary key,
  nombre dtexto,
  emergencias dtexto,
  foto dfoto,
  notas djson,
  direccion dtexto,
  fecha_nacimiento dfecha,
  ci dtexto,
  tipo_sangre dtexto,
  contactos djson,
  estado destado,
  usuario duser,
  editado dfechahora
);

create table nucleo.ficha_mascotas (
  id bigserial primary key,
  nombre dtexto,
  foto dfoto,
  notas djson,
  nombre_dueño dtexto,
  direccion_dueño dtexto,
  coordenadas dpunto,
  contactos djson,
  adicionales djson,
  estado destado,
  usuario duser,
  editado dfechahora
);
