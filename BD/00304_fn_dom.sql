/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/
begin;

create or replace function nucleo.aud_user() returns trigger as $$
begin
  NEW.editado := now();
  --NEW.fec_registro := OLD.fec_registro;
  NEW.estado := 'C';
  NEW.usuario := current_setting('jwt.claims.cuenta')::text;
  return NEW;
end;
$$ language plpgsql;



create or replace function nucleo.trg_volumen_eess() returns trigger as $$
declare
begin
  
  INSERT INTO nucleo.eess_registro_volumenes_log(eess_id, tanque_id, volumen, fecha_hora, estado, usuario, editado)
  --VALUES(NEW.eess_id, NEW.tanque_id, NEW.volumen, NEW.fecha_hora, NEW.estado, NEW.usuario, NEW.editado)
  SELECT eess_id, tanque_id, volumen, fecha_hora, estado, usuario, editado
  FROM nucleo.eess_registro_volumenes WHERE id = NEW.id;
  
  return NEW;
end;
$$ language plpgsql;

--drop trigger trg_volumen_eess on nucleo.eess_registro_volumenes;
create trigger trg_volumen_eess before update on nucleo.eess_registro_volumenes
  for each row execute procedure nucleo.trg_volumen_eess();

--select * from nucleo.eess_registro_volumenes_log;

commit;
