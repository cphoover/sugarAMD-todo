function Batter(_ns, _scopes){
    this.scopes = _ns instanceof Array ? _ns : null;
    this.namespaces = _scopes instanceof Array ? _scopes : [];
}


Batter.prototype = new Array();

Batter.prototype.loadNamespace = function(_ns){
    this.namespaces.push(_ns);
    return this;
};

Batter.prototype.setNamespaces = function(_ns){
    this.namespaces = _ns;
    return this;
};

Batter.prototype.setScopes = function(_scopes){
    this.scopes = _scopes;
    return this;
};

Batter.prototype.createNamespace = function(_namespaceString, _val, _context) {
    if("undefined" !== typeof _val && ("function" !== typeof _val && "object" !== typeof _val)){
        throw "namespace must be an object";
    }

    var parts = _namespaceString.split('.'),
        parent = _context || window,
        currentPart = '';    
        
    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || ((i == parts.length - 1 && "undefined" !== typeof _val) ? _val : {});
        parent = parent[currentPart];
    }
 
    return parent;
};

Batter.prototype.addToScope = function(_inst){
    _inst = _inst || window;
    for(var i = 0; i<this.namespaces.length; i++){
            this.createNamespace(this.namespaces[i], this.scopes[i], _inst);
    }
};


