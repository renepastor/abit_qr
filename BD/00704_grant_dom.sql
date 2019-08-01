/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/

/*****ASISTENCIA*****/
begin;

  create trigger aud_user before insert on nucleo.ambientes for each row execute procedure nucleo.aud_user();
  create trigger aud_user before insert on nucleo.dispositivos for each row execute procedure nucleo.aud_user();
  create trigger aud_user before insert on nucleo.user_dispositivos for each row execute procedure nucleo.aud_user();
  create trigger aud_user before insert on nucleo.dispositivos_log for each row execute procedure nucleo.aud_user();
commit;



