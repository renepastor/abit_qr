
--create trigger aud_user before insert on nucleo.usuarios for each row execute procedure nucleo.aud_user();

ALTER TABLE nucleo.usuarios DISABLE TRIGGER aud_user ;
ALTER TABLE nucleo.usr_roles  DISABLE TRIGGER aud_user ;
--insert into nucleo.usuarios(pers_id, cuenta, alias, clave,usuario) values 
--(1001000000016200, 'vmeriles', 'Veronica Meriles', crypt('#$%&vmeriles#$%&', gen_salt('bf')), 'rpmamani');
INSERT INTO nucleo.usr_roles(user_id,rol_id,expira,permiso,usuario) VALUES
(1001000000016200,(SELECT id FROM nucleo.roles WHERE nombre='CREDENCIALES'),'2050-01-01','{}','rpmamani');
