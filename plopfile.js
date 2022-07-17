var fs = require('fs');
module.exports = function (plop) {
    plop.setHelper('upperCase', function (text) {
        return text.toUpperCase();
    });
    var tableJson = JSON.parse(fs.readFileSync('./modulegenerator/table.json', 'utf8'));
    var filterJson = JSON.parse(fs.readFileSync('./modulegenerator/filter.json', 'utf8'));
    var formJson = {}
    plop.setHelper('upperCase', function (text) {
        return text.toUpperCase();
    });
    plop.setHelper('snakeCase', function (text) {
        return text.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase()
    });
    plop.setHelper('stringify', function (context) {
        return JSON.stringify(context)
    });
    plop.setHelper('checkIf', function (v1, op, v2, options) {
            var c = {
            "==": function( v1, v2 ) {
              return v1 == v2;
            },
            "!=": function( v1, v2 ) {
              return v1 != v2;
            },
            "exists": function( v1 ) {
                return typeof v1 != undefined;
              },
          }
          if( Object.prototype.hasOwnProperty.call( c, op ) ) {
            return c[ op ].call( this, v1, v2 ) ? options.fn( this ) : options.inverse( this );
          }
          return options.inverse( this );
    });
    plop.setHelper('exists', function (v1) {
        return typeof v1 != "undefined";
    });
    // feature generator
    plop.setGenerator('module', {
        description: 'application feature',
        prompts: [
            {
                name: 'pageType',
                type: 'list',
                message: 'Please select type of Page',
                choices: [
                    {name: 'New Page For Listing Component', value: 'newListingPage'},
                    {name: 'New Page With Separate Form and List Component', value: 'newCompletePage'},
                    {name: 'New Page For Form Component', value: 'newFormPage'},
                    {name: 'Listing Component on Existing Page', value: 'existingListingPage'},
                    {name: 'Form Component on Existing Page', value: 'existingFormPage'},
                ]
            },
            {
                when: function (response) {
                    if(['newCompletePage','newListingPage','existingListingPage'].includes(response.pageType)){
                        response.tableJson = tableJson
                    }
                    if(['newCompletePage','newFormPage','existingFormPage'].includes(response.pageType)){
                        response.formJson = formJson
                    }
                    if(['newCompletePage','newListingPage','newFormPage'].includes(response.pageType)){
                        return true
                    }
                },
                name: 'moduleSlug',
                type: 'input',
                message: 'Please Enter Slug For New Page, eg: freecharge-page'
            },
            {
                when: function (response) {
                    if(['existingListingPage','existingFormPage'].includes(response.pageType)){
                        return true
                    }
                },
                name: 'moduleSlug',
                type: 'input',
                message: 'Please Enter Exact Slug of Existing Module, eg: freecharge-page'
            },
            {
                when: function (response) {
                    if(['newCompletePage','newListingPage','newFormPage'].includes(response.pageType)){
                        return true
                    }
                },
                name: 'addNewMenu',
                type: 'confirm',
                message: 'Would you like to create new menu? [N]',
                default: false
            },
            {
                when: function (response) {
                    if(response.addNewMenu){
                        return true
                    }else{
                        response.ListingPageSlug = 'index'
                        response.FormPageSlug = 'create'
                        
                        
                        return false
                    }
                },
                type: 'input',
                name: 'menuName',
                message: 'Type Menu Name'
            },
            {
                when: function (response) {
                    if(response.addNewMenu===true || (typeof response.addNewMenu=="undefined" && ['existingListingPage','existingFormPage'].includes(response.pageType))){
                        return true
                    }
                },
                name: 'addSubMenu',
                type: 'confirm',
                message: 'Would you like to add in sub menu? [N]',
                default: false
            },
            {
                when: function (response) {
                    if(response.addSubMenu && ['existingListingPage','existingFormPage'].includes(response.pageType)){
                        return true
                    }
                },
                name: 'menuName',
                type: 'input',
                message: 'Please enter exact name of existing main menu',
                default: false
            },
            {
                when: function (response) {
                  if ((response.addSubMenu) && ['newCompletePage','newListingPage','existingListingPage'].includes(response.pageType)){
                    return true
                  }
                },
                type: 'input',
                name: 'ListingSubMenuName',
                message: 'Please enter Listing Page Sub Menu'
            },
            {
                when: function (response) {
                  if (response.addSubMenu && ['newCompletePage','newListingPage','existingListingPage'].includes(response.pageType)){
                    return true
                  }
                },
                type: 'input',
                name: 'ListingPageSlug',
                message: 'Please enter Listing Page Slug',
            },
            {
                when: function (response) {
                  if (response.addSubMenu && ['newCompletePage','newFormPage','existingFormPage'].includes(response.pageType)){
                    return true
                  }
                },
                type: 'input',
                name: 'FormSubMenuName',
                message: 'Please enter Form Page Sub Menu'
            },
            {
                when: function (response) {
                  if (response.addSubMenu && ['newCompletePage','newFormPage','existingFormPage'].includes(response.pageType)){
                    return true
                  }
                },
                type: 'input',
                name: 'FormPageSlug',
                message: 'Please enter Form Page Slug'
            },
            {
                when: function (response) {
                    if(['newCompletePage','newListingPage','existingListingPage'].includes(response.pageType)){
                        return true
                    }
                },
                name: 'addFilter',
                type: 'confirm',
                message: 'Would you like to add filter [N]',
                default: false
            },
            {
                when: function (response) {
                    if(response.addFilter){
                        response.filterJson = filterJson
                    }
                    return response.addFilter
                },
                name: 'filterValues',
                type: 'confirm',
                message: 'Please Map Your filter in modulecreater/filter.json file [Y]',
                default: true
            },
            {
                when: function (response) {
                    if (response.addSubMenu && ['newCompletePage','newFormPage','existingFormPage'].includes(response.pageType)){
                        return true
                    }
                },
                name: 'listingColumns',
                type: 'confirm',
                message: 'Please Map Your Table Column in modulecreater/table.json file',
                default: true
            },
            {
                when: function (response) {
                    if (response.addSubMenu && ['newCompletePage','newFormPage','existingFormPage'].includes(response.pageType)){
                        return true
                    }
                },
                name: 'formFields',
                type: 'confirm',
                message: 'Please Map Your Table Column in modulecreater/form.json file',
                default: true
            },
            {
                type: 'confirm',
                name: 'createModule',
                message: 'Would you like to create? [N]',
                default: false
            },
        ],
        actions:({createModule,pageType,moduleSlug,addNewMenu,menuName,addSubMenu,ListingSubMenuName,ListingPageSlug,FormSubMenuName,FormPageSlug,addFilter,filterValues,listingColumns,formFields,final,tableJson,filterJson})=>{
            //console.log(pageType,moduleSlug,addNewMenu,menuName,addSubMenu,ListingSubMenuName,ListingPageSlug,FormSubMenuName,FormPageSlug,addFilter,filterValues,listingColumns,formFields,final,tableJson.apiUrl)
            
            var action = [];
            if(createModule==true){
                const MENU_PATH = 'src/utils/menu.js'
                if(addNewMenu===true){
                    action.push({
                        type: 'append',
                        path: MENU_PATH,
                        pattern: /(\/\/Append New Menu Here)/g,
                        templateFile: 'modulegenerator/template/menu.js.hbs',
                    })
                }
                if(['newCompletePage','newListingPage'].includes(pageType)){
                    action.push({
                        type: 'add',
                        path: 'pages/{{moduleSlug}}/{{ListingPageSlug}}.js',
                        templateFile: 'modulegenerator/template/listing.js.hbs',
                        abortOnFail: true
                    })
                    action.push({
                        type: 'add',
                        path: 'src/components/forms/{{moduleSlug}}/{{properCase ListingPageSlug}}.js',
                        templateFile: 'modulegenerator/template/table.js.hbs',
                        abortOnFail: true
                    })
                    action.push({
                        type: 'add',
                        path: 'src/api/services/{{moduleSlug}}/index.js',
                        templateFile: 'modulegenerator/template/api.js.hbs',
                        abortOnFail: true
                    })
                    action.push({
                        type: 'add',
                        path: 'src/api/services/{{moduleSlug}}/urls.js',
                        templateFile: 'modulegenerator/template/apiurl.js.hbs',
                        abortOnFail: true 
                    })
                    action.push({
                        type: 'append',
                        path: 'nginx/dev/nginx.conf',
                        pattern: /(#Append New Proxy Here)/g,
                        templateFile: 'modulegenerator/template/proxy.js.hbs',
                        abortOnFail: true 
                    })
                    action.push({
                        type: 'append',
                        path: 'nginx/dev/nginx.conf',
                        pattern: /(#Append New Server Here)/g,
                        templateFile: 'modulegenerator/template/serverproxy.js.hbs',
                        abortOnFail: true 
                    })
                    
                }
            }
            return action
        }
    });
};