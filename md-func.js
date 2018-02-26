FunctionBinder = function(allFunctions) {
    var fnObject = {};
    
    _constructor();

    function _constructor() {
        if(allFunctions != 'undefined')
        {
            for(var func in allFunctions)
            {
                fnObject[allFunctions[func].name.toLowerCase()] = allFunctions[func];
            }
        }
    }

    // TODO: write a small tokenizer to handle multiple args
    this.parseFunctions = function(markdown) {        
        while(true)
        {
            matches = /\$([^ ])+\s([a-zA-Z\s]).+/g.exec(markdown);

            if(!matches) break;
    
            var x = matches[0];
            var type = x.split(' ')[0].substring(1);
            var tx = x.substring(x.split(' ')[0].length);
            tx = tx.split('<')[0].trim();
            var output = "<strong>error: invalid function</strong>";
            
            if(typeof fnObject[type] === "function")
            {
                output = fnObject[type](tx);
            }
            
            markdown = text.replace(x, output);
        }
        return markdown;
    }   
}