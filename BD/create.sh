#!/bin/bash
host_bd="localhost"
name_bd="bd_abit"
echo "Borrar $name_bd"
echo "Host BD: $host_bd"
dropdb $name_bd


createdb $name_bd
echo "Crear BD $name_bd"

echo '************ INICIO *******' > error
echo '    ******* Tablas ....' >> error
psql $name_bd < 00100_domain.sql 2>> error > log
psql $name_bd < 00200_tbl.sql 2>> error >> log
psql $name_bd < 00204_tbl_dom.sql 2>> error >> log
psql $name_bd < 00205_tbl_tmb.sql 2>> error >> log
psql $name_bd < 00206_tbl_fch.sql 2>> error >> log


echo '    ******* Funciones....' >> error
psql $name_bd < 00300_fn.sql 2>> error >> log
psql $name_bd < 00305_fn_tmb.sql 2>> error >> log

echo '    ******* Datos....' >> error
psql $name_bd < 00400_data.sql 2>> error >> log
psql $name_bd < 00404_data_dom.sql 2>> error >> log
psql $name_bd < 00405_data_tmb.sql 2>> error >> log
psql $name_bd < 00406_data_fch.sql 2>> error >> log

echo '    ******* Referencias....' >> error
psql $name_bd < 00500_ref.sql 2>> error >> log
psql $name_bd < 00504_ref_dom.sql 2>> error >> log
psql $name_bd < 00505_ref_tmb.sql 2>> error >> log

echo '    ******* Grant....' >> error
psql $name_bd < 00700_grant.sql 2>> error >> log
psql $name_bd < 00705_grant_tmb.sql 2>> error >> log
##psql $name_bd < 00703_grant_eess.sql 2>> error >> log


##psql $name_bd < 00701_grant_app.sql 2>> error >> log



echo '************ FIN ************' >> error
