<?php
if (isset($_POST['ciudad']) && isset($_POST['tipo']) && isset($_POST['p_inicial']) && isset($_POST['p_final'])) {
  $filtro = array();
  $ciudad = $_POST['ciudad'];
  $tipo = $_POST['tipo'];
  $p_inicial = (double) $_POST['p_inicial'];
  $p_final = (double) $_POST['p_final'];



  $jsondata = file_get_contents('../data-1.json',true);
  $json = json_decode($jsondata,true);

  if ((ord($ciudad) == 0) && (ord($tipo) == 0)) {
    //$filtro = 1;
    $ll_i = 0;
    foreach ($json as $key => $value) {
      $j_precio = $json[$key]["Precio"];
      $j_precio = borraprimero($j_precio);
      $j_precio = str_replace(',', '', $j_precio);
      $j_precio = (double) $j_precio;

      if ( ($p_inicial <= $j_precio) && ($j_precio  <= $p_final)  ) {
        $id = $json[$key]["Id"];
        $filtro[$ll_i] = $id;
        $ll_i++;

      };
    };


  } elseif((ord($ciudad) > 0) && (ord($tipo) == 0)) {
    //$filtro = 2;
    $ll_i = 0;
    foreach ($json as $key => $value) {
      $j_ciudad = $json[$key]["Ciudad"];
      $j_precio = $json[$key]["Precio"];
      $j_precio = borraprimero($j_precio);
      $j_precio = str_replace(',', '', $j_precio);
      $j_precio = (double) $j_precio;

      if ( ($ciudad == $j_ciudad) && (($p_inicial <= $j_precio) && ($j_precio  <= $p_final)) ) {
        $id = $json[$key]["Id"];
        $filtro[$ll_i] = $id;
        $ll_i++;

      };
    };

  } elseif((ord($ciudad) == 0) && (ord($tipo) > 0)) {
    //$filtro = 3;
    $ll_i = 0;
    foreach ($json as $key => $value) {
      $j_tipo = $json[$key]["Tipo"];
      $j_precio = $json[$key]["Precio"];
      $j_precio = borraprimero($j_precio);
      $j_precio = str_replace(',', '', $j_precio);
      $j_precio = (double) $j_precio;

      if ( ($tipo == $j_tipo) && (($p_inicial <= $j_precio) && ($j_precio  <= $p_final)) ) {
        $id = $json[$key]["Id"];
        $filtro[$ll_i] = $id;
        $ll_i++;

      };
    };

  } elseif((ord($ciudad) > 0) && (ord($tipo) > 0)) {
    //$filtro = 4;
    $ll_i = 0;
    foreach ($json as $key => $value) {
      $j_ciudad = $json[$key]["Ciudad"];
      $j_tipo = $json[$key]["Tipo"];
      $j_precio = $json[$key]["Precio"];
      $j_precio = borraprimero($j_precio);
      $j_precio = str_replace(',', '', $j_precio);
      $j_precio = (double) $j_precio;

      if ( ($ciudad == $j_ciudad) && ($tipo == $j_tipo) && (($p_inicial <= $j_precio) && ($j_precio  <= $p_final)) ) {
        $id = $json[$key]["Id"];
        $filtro[$ll_i] = $id;
        $ll_i++;

      };
    };

  }
  };


  echo json_encode($filtro);


// Funciones Adicionales
  function borraprimero($txt){
   $canttxt=strlen($txt);
   $txt=substr($txt, 1, $canttxt);
   return $txt;
 } ;



 ?>
