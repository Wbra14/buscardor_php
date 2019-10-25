<?php
  $ciudades = array();
  $tipos = array();
  $jsondata = file_get_contents('../data-1.json',true);
  $json = json_decode($jsondata,true);
  $ll_i = 0;
  foreach ($json as $key => $value) {
    $ciudad = $json[$key]["Ciudad"];
    $existe = array_search($ciudad,$ciudades,true);
    if ( ord($existe) == 0) {
      $ciudades[$ll_i] = $ciudad;
      $ll_i++;
    };
  };
  $ll_i = 0;
  foreach ($json as $key => $value) {
    $tipo = $json[$key]["Tipo"];
    $existe = array_search($tipo,$tipos,true);
    if ( ord($existe) == 0) {
      $tipos[$ll_i] = $tipo;
      $ll_i++;
    };
  };

  var_export ($ciudades);
  var_export ($tipos);



 ?>
