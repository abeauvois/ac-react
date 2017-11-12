<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script src="./cra/node_modules/react/umd/react.development.js"></script>
    <script src="./cra/node_modules/react-dom/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script
    src="https://code.jquery.com/jquery-2.2.4.min.js"
    integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
    crossorigin="anonymous">
    </script>
    <script src="./template.js"></script>
  </head>
  <body>
    <div id="button"><?php echo('toto veut partir au togo'); ?></div>
    <div id="container"></div>
    <script type="text/babel">
      var names = ['Alice', 'Emily', 'Kate'];
      const Button = () => {
        return <button id="btn">Say Hello</button>;
      }
      document.getElementById("button").append(_spark.template.button('id1', 'test').html());

      ReactDOM.render(
        <div>
        {
          names.map(function (name) {
            return <div key={name}>Hello, {name}!</div>
          })
        }
        </div>,
        document.getElementById('container'),
        function() {
          $('#btn').click(function() {
            alert('Hello2!');
          });
        }
      );

    </script>
  </body>
</html>
