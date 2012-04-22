/**
* It should be formed only with alphanumeric chars.
* At least it should have two levels of nest
* (otherwise it would be merely a simple object).
* It is a global function, so be careful with the name 
* collision with another global function.
* @author Paolo Carrasco
* @param ns The full path of the namespace
* @param nsContent The body of the script that will use 
*        the namespace as an alias (optional)
* @remark The developer should be aware of not reallocating 
*         the namespaces created before
*/
function namespace(ns, nsContent) {
    // asserting if the text is a well-formed namespace
    var isValid = /^(?:[a-z]\w*)(?:\.[a-z]\w+)+$/.test(ns);
    // if not valid, there's nothing to do...
    if(!isValid) throw new Error('Namespace ' + ns + ' is not valid');
    
    var nsPath = ns.split('.');
    var theNs = window;
    // building the namespace
    for(var i in nsPath) {
        // if the current level wasn't defined, define it
        if(typeof(theNs[nsPath[i]]) == 'undefined') {
            theNs[nsPath[i]] = {};
        }
        theNs = theNs[nsPath[i]];
    }
    // logging the creation (if the console is available)
    if(console) console.log('Namespace created: ' + ns);
    // calling the content and sending the namespace
    if(typeof(nsContent) == 'function') nsContent(theNs);
}
