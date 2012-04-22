/**
* Testing the namespace function
*/
function NamespaceTest() {
    
    /**
    * Validates the namespace name
    */
    this.testValidityOfNs = function() {
        
        // map with the namespace name and its correctness
        var nsTestData = {'com.abaris': true,
            'com.abaris.': false,
            'c.abaris': true,
            'java': false,
            'pe.com.peru1': true,
            'com.abaris2u': true,
            '1e.com.abaris': false,
            'blah,ok.comma': false,
            'maraña.com': false,
            'tíldalo.con.ganas': false};
        
        var successValidation = true;
        // iterates the namespaces
        for(var ns in nsTestData) {
            console.log('Validating ' + ns);
            var isValid = true;
            try {
                // it should throw an error if not valid
                namespace(ns);
            } catch (e) {
                isValid = false;
                console.error(e);
            }            
            if(nsTestData[ns] != isValid) {
                console.log('Not cool with ' + ns);
                successValidation = false;
            }
        }
        // TODO assert it
        console.log(successValidation);
    };
    
    this.testClassCreationTwoLevels = function() {
        namespace('testing.abaris', function(ns) {
            if(ns) {
                // TODO assert it
                console.log(testing.abaris == ns);
            }
        });
    };
    
    this.testClassCreationThreeLevels = function() {
        namespace('testing.com.abaris', function(ns) {
            if(ns) {
                // TODO assert it
                console.log(testing.com.abaris == ns);
            }
        });
    };
    
    this.testDoubleNamespaceCreation = function() {
        namespace('testing.com.abaris', function(ns) {
            ns.object1 = {};
        });
        namespace('testing.com.abaris', function(ns) {
            ns.object2 = {};
            var object1 = ns.object1;
            // TODO assert it
            console.log('Still with object1?' + (typeof(object1) != 'undefined'));
        });
    };
}