<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
    <script
      src="https://code.jquery.com/jquery-2.2.4.min.js"
      integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
      crossorigin="anonymous">
    </script>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this website.
    </noscript>
    <?php echo('<h1 id="titre">php ready in syncccc!</h1>') ?>
    <div id="root">:)</div>
    
    <script src="dist/bundle.js"></script>
    <script>
      $("#titre").append(
        _spark._spark.template.button("titre", "close me")
      )

    </script>
  </body>
</html>
