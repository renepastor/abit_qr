/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;
create role visita login password 'semilleroL3n404054ng3l40103H3l3n1003R3n30908';
commit;


begin;
grant usage on schema nucleo to publico;

commit;

begin;
grant execute on function nucleo.auth(text, text) to publico;
--- GRANT EXECUTE ON FUNCTION nucleo.fn_postulante(text, text) TO publico;
--- GRANT EXECUTE ON FUNCTION nucleo.mis_preguntas(dllave) TO publico;

commit;



begin;
  create trigger aud_user before insert on nucleo.usuarios for each row execute procedure nucleo.aud_user();
  create trigger aud_user before insert on nucleo.usr_roles for each row execute procedure nucleo.aud_user();
commit;