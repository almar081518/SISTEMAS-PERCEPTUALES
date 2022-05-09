<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interaccion Humana Computadora</title>
        <!-- Hojas de estilo -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <!-- librerias para JavaScript -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

        <link rel="stylesheet" href="stilo/style.css">
</head>
<body>

    <div class="header">
        <h1 class="header"></h1>
    </div>

    <div class="contenedor">
        <div class="flex-basis">
            <a href="#modalAuditivo" class="boton-principal azul" data-toggle="modal">

           
               
          
            </a>
            <h1> AUDITIVO </h1>
        </div>
        <div class="flex-basis">
            <a href="#modalVisual" class="boton-principal rojo" data-toggle="modal">
               
            </a>

            <h1> VISUAL </h1>
        </div>
        
    </div>

    <?php include("html/modal_auditivo.php");?>
    <?php include("html/modal_visual.php");?>
    <script src="js/script.js"></script>
</body>
</html>