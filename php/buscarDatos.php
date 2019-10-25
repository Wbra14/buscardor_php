<?php
if (isset($_POST['ciudad']) && isset($_POST['tipo']) && isset($_POST['p_inicial']) && isset($_POST['p_final'])) {
  $ciudad = $_POST['ciudad'];
  $tipo = $_POST['tipo'];
  $p_inicial = (double) $_POST['p_inicial'];
  $p_final = (double) $_POST['p_final'];


  $jsondata = file_get_contents('../data-1.json',true);
  $json = json_decode($jsondata,true);

  if ((ord($ciudad) == 0) && (ord($tipo) == 0)) {
    $filtro = 1;
    echo $filtro.' tipo filtro <br>';
    foreach ($json as $key => $value) {
      $precio = $json[$key]["Precio"];
      $precio = borraprimero($precio);
      $precio = str_replace(',', '', $precio);
      $precio = (double) $precio;
      
      if ( ($p_inicial <= $precio) && ($precio  <= $p_final)  ) {
        echo $json[$key]["Id"];
        echo "ingreso al if <br>";
      };
    };


  } elseif((ord($ciudad) > 0) && (ord($tipo) == 0)) {
    $filtro = 2;
    echo $filtro.' <br>';

  } elseif((ord($ciudad) == 0) && (ord($tipo) > 0)) {
    $filtro = 3;
    echo $filtro.' <br>';

  } elseif((ord($ciudad) > 0) && (ord($tipo) > 0)) {
    $filtro = 4;
    echo $filtro.' <br>';

  }
  };


  //echo ($registro);



  function borraprimero($txt){
   $canttxt=strlen($txt);
   $txt=substr($txt, 1, $canttxt);
   return $txt;
 } ;



 ?>
