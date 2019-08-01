/*aut: renepastor@gmail.com
  fec: 19/06/2017
*/

begin;
drop schema nucleo CASCADE;
commit;

begin;
create schema nucleo;
commit;

begin;
create domain dllave   as bigint;
create domain dllave2  as bigint default null;
create domain dtexto   as text not null;
create domain dtexto2  as text default '';
create domain dentero  as integer not null;
create domain dentero2 as integer;
create domain dentero3 as integer default -1000000;
create domain dentero4 as integer default 0;
create domain dreal    as float not null;
create domain dreal2   as float default -1000000.0;
create domain dreal3   as float default 0.00;
create domain dhora    as time not null;
create domain dhora2   as time default now();
create domain dfecha   as date not null;
create domain dfecha2  as date;
create domain dmoneda  as numeric(18, 2) not null;
create domain dmoneda2 as numeric(18, 2) default 0.00;
create domain dmoneda3 as numeric(12, 6) default 0.0;
create domain dnota    as numeric(10, 7) not null;
create domain dnota2   as numeric(10, 7) default 0.00;
create domain dbooleano   as boolean not null;
create domain dbooleano2  as boolean default false;
create domain destado  as text default 'C';
create domain duser    as text default '';  -- 'id_usuario|id_rol'
create domain dfechahora  as timestamp default now();
create domain djson    as json default '{}';
create domain dpunto   as json not null;
create domain dfoto    as text not null;
create domain dpunto2  as json default '{}';
create domain dfoto2   as text default '';

--encriptacion 
create extension if not exists "pgcrypto";

commit;

