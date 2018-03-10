# markdown-functions
A tiny js library to add "function"ality to markdowns if you need that tiny bit of preprocessing power.

## How to use
Use a markdown parser which parses your markdown, and add this as an intermediate stage.

e.g. showdown.js
```html
<html>
<head>
  <script src="./assets/js/showdown.js"></script>
  <script src="./assets/js/md-func.js"></script>
</head>

<body>
  <div id="markdown">
    $hello_world
    it is $current_time
    1 + 1 = $add 1 1
  </div>
</body>

<script>
function hello_world() {
  return "hello world!";
}

function current_time() {
    var now = new Date(Date.now());
    return now.toTimeString();
}

function add(arg) {
    var args = arg.split(' ');
    var output = 0;

    for(var i = 0; i < args.length; i++)
    {
        output += new Number(args[i]);
    }

    return output;
}

var text = document.getElementById("markdown").innerHTML;

// Create and bind your functions to markdown-functions
var funcBinder = new FunctionBinder([
  hello_world, current_time, add
]);

// Preprocess markdown
text = funcBinder.parseFunctions(text);

var converter = new showdown.Converter();
document.getElementById("markdown").innerHTML = converter.makeHtml(text);
</script>
```



