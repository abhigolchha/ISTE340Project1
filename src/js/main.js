/*
* @author Abhigyan Golchha
* @version 10/10/2018
* ISTE 340 Project 1
* main.js
*/

//Browser Detection-----------------------------------------------------------------------------------------------------
if( !document.getElementById ){
    window.location = "https://www.mozilla.org/en-US/firefox/?utm_source=google&utm_medium=cpc&utm_campaign=Brand-US-GGL-" +
        "Exact&utm_term=download%20firefox&utm_content=A144_A203_A006296&gclid=EAIaIQobChMIieL-ybu_2QIVQeDICh1PEQveEAAYAS" +
        "AAEgJRlPD_BwE&gclsrc=aw.ds";
}
//----------------------------------------------------------------------------------------------------------------------

//Variables for keeping stuff together and not clashing with each other
var opt = [];
var ie = false;  //Internet Explorer Variable

/*
* Serves as a main method and calls functions
* @param dom
 */
function construct( dom ){
    makeSelect( dom );
    makeImage( opt )

}
//----------------------------------------------------------------------------------------------------------------------


/*
* A method to create HTML elements
* parameter has 4 attributes tagName, text, attribute and value
* @return {elements}
*/
function makeElement(parameters ){
    var tagName = parameters.tagName;
    var text = parameters.text;
    var attribute = parameters.attribute;
    var value = parameters.value;
    var ele = document.createElement( tagName );
    if( text != null ){
        ele.appendChild( document.createTextNode( text ) );
    }
    if( attribute != null){
        ele.setAttribute( attribute, value );
    }
    return ele;
}

/*
* A method to create form elements
* parameter has 3 type, name, and id
* @return {elements}
*/
function makeInput( type, name, id ){
    var formEle = document.createElement( "input" );
    formEle.setAttribute( "type", type );
    formEle.setAttribute( "name", name );
    formEle.setAttribute( "id", id );
    return formEle;
}
//----------------------------------------------------------------------------------------------------------------------

/*
* Animation function which is used for fading in elements
* parameter ele
*/
function animate( ele ){
    if( ele != ele.parentNode.firstChild ){
        if( ele.style.opacity < 1 ){
            ele.style.opacity = parseFloat(window.getComputedStyle( ele ).opacity) + .5;
            setTimeout( function(){ animate( ele ) }, 60);
        }
    }else{
        ele.style.opacity = 2;
    }
}

/*
* For creating the drop downs for the elements
* parameter ( ele ) which is being dropped down
*/
function selectMenu( ele ){
    if (ele != ele.parentNode.firstChild) {
        var lastPlace = parseInt(window.getComputedStyle(ele.previousSibling).top) + 90;
        if (parseInt(window.getComputedStyle(ele).top) > lastPlace) {
        } else {
            ele.style.top = parseInt(window.getComputedStyle(ele).top) + 20 + "px";
            setTimeout(function () {
                selectMenu(ele)
            }, 15);
        }
    } else {
        ele.style.top = 100 + "px";
    }
}
//----------------------------------------------------------------------------------------------------------------------


//Construction of the page----------------------------------------------------------------------------------------------------

/*
* Setup for the page. Is not extensible
*/
function build(){
    //make wrapper element for both the divs filling the sel and the character.
    var content;
    content = makeElement({tagName: "div", text: null, attribute: "id", value: "content"});
    //make and appends two sections to the wrapper div.
    content.appendChild( makeElement( {tagName: "div", text: null, attribute: "id", value: "sel"} ) );
    content.appendChild( makeElement( {tagName: "div", text: null, attribute: "id", value: "character"}) );
    //Append the created sections to the page.
    geit( 'body' )[0].appendChild( makeElement({tagName: "h1", text: "Destiny Character Picker", attribute: null, value: null} ) );
    geit( 'body' )[0].appendChild( content );
    //make the first select menu.
    makeSelect( 'build' );
}

/*
* The function that creates the select menus dynamically.
 */
function makeSelect( dom ) {
    //dom is a string
    switch (typeof (dom)) {
        case 'string':
            var fill = data[dom];

            break;
        default:
            console.log(gei("sel").childNodes);
            console.log(dom);
            if (gei("sel").childNodes.length > 0) {
                var div = dom.parentNode;
                while (div != div.parentNode.lastChild) {
                    opt.pop();
                    removeElement(div.parentNode.lastChild);
                }
            }
            var fill = data[dom.value];
            //Keeps track of all the user choices.
            opt.push(dom.value);

            break;
    }

    //If fill is defined, then make the next select option dynamically based on the users last choice
    var submitDiv;
    var submitButton;

    if (fill == undefined) {
        submitDiv = makeElement({tagName: "div", text: null, attribute: "class", value: "selectDiv"});
        submitDiv.setAttribute("style", "position: absolute; top: 625px; height: 50px; left: 50%; transform: translateX(-50%) ");
        submitButton = makeElement({
            tagName: "button",
            text: "Confirm Character",
            attribute: "onclick",
            value: "makeFormDiv();"
        });
        if (ie) {
            submitButton.attachEvent("onclick", function () {
                makeFormDiv();
            });
        }
        submitButton.setAttribute("style", "margin: auto;");
        submitDiv.appendChild(submitButton);
        gei('sel').appendChild(submitDiv);
        animate(submitDiv);
    } else {
        //Creates a div for filling the select menu.
        var selectDiv = makeElement({tagName: "div", text: null, attribute: "class", value: "selectDiv"});
        if (!ie) {
            selectDiv.setAttribute("style", "opacity: 0;");
        } else {
            selectDiv.setAttribute("style", "margin:20px;");
        }
        //Creates the select menu
        var selectOption = makeElement({tagName: "select", text: null, attribute: "name", value: fill});
        selectOption.setAttribute('class', 'selectMenus');
        if (!ie) {
            selectOption.setAttribute('onchange', "construct(this); ");
        } else {
            selectOption.attachEvent("onchange", function () {
                construct(selectOption);
            });
        }

        //Loop that creates options for the select menu.
        for (var i = 0; i < fill.length; i++) {
            selectOption.appendChild(makeElement({
                tagName: "option",
                text: fill[i],
                attribute: "value",
                value: fill[i]
            }));
        }
        //Append the select option menu to the select div.
        selectDiv.appendChild(selectOption);
        gei('sel').appendChild(selectDiv);

        animate(selectDiv);

    }
}

/*
* Function for removing the elements
* node is being removed
*/
function removeElement( node ){
    node.parentNode.removeChild( node );
}



//Form------------------------------------------------------------------------------------------------------------

var formDiv; //form Div variable
/*
* A div that holds a form
*/
function makeFormDiv(){

    formDiv = makeElement( {tagName: "div", text: null, attribute: "id", value: "form"} );
    formDiv.appendChild( makeElement({
        tagName: "h2",
        text: "Your character looks amazing!",
        attribute: null,
        value: null
    }) );
    formDiv.appendChild( makeElement( {tagName: "h4", text: "You picked The Following:", attribute: null, value: null} ) );
    var choices = makeElement( {tagName: "ul", text: null, attribute: "id", value: "lastPick"});
    for(var i = 0; i < opt.length; i++ ){
        choices.appendChild( makeElement({tagName: "li", text: opt[i], attribute: null, value: null} ) );
    }
    formDiv.appendChild( choices );
    formDiv.appendChild( makeElement( {
        tagName: "h4",
        text: "Please Fill out and submit the form",
        attribute: null,
        value: null
    }) );
    formDiv.appendChild( makeElement( {tagName: "div", text: null, attribute: "id", value: "SubFeedback"}) );
    formDiv.appendChild( makeForm() );
    var cancelButton = makeElement( {
        tagName: "button",
        text: "Cancel",
        attribute: "onclick",
        value: "removeElement( formDiv )"
    });
    if(ie){
        cancelButton.attachEvent("onclick", function(){ removeElement( formDiv ); } );
    }
    formDiv.appendChild( cancelButton );
    //add to the body
    geit( "body" )[0].appendChild( formDiv );

}

/*
* Function that builds all the form elements, first name, last name and email
*/
function makeForm(){
    var form = makeElement( {tagName: "form", text: null, attribute: "action", value: ""}  );
    form.setAttribute( "method" , "post" );
    form.setAttribute( "onsubmit", "return validate();" );
    if( ie ){
        form.attachEvent( "onsubmit", function(){ return validate(); } );
    }
    form.appendChild( makeElement( {tagName: "label", text: "First Name: ", attribute: null, value: null} ) );
    var firstnameField =  makeInput( 'text', 'first', 'first_name')
    if (retrieveInfo("firstname") == null) {
    } else {
        firstnameField.value = retrieveInfo("firstname");
    }
    form.appendChild( firstnameField );
    form.appendChild( makeElement( {tagName: "label", text: "Last Name: ", attribute: null, value: null} ) );
    var lastnameField =  makeInput( 'text', "last", 'last_name')
    if (retrieveInfo("lastname") == null) {
    } else {
        lastnameField.value = retrieveInfo("lastname");
    }
    form.appendChild( lastnameField );
    form.appendChild( makeElement( {tagName: "label", text: "E-mail: ", attribute: null, value: null} ) );
    var emailField =  makeInput( 'text', "e-mail", 'email')
    if (retrieveInfo("email") == null) {
    } else {
        emailField.value = retrieveInfo("email");
    }
    form.appendChild( emailField );
    form.appendChild( makeInput( 'submit', 'submit', 'submit', 'submit' ) );
    return form;

}

/*
* Validation Function
* returns a boolean value if the form data is valid
*/
function validate(){
    var ree = true;
    var sResponse = "Please enter the following: <br/>";

    if( gei( "first_name" ).value == '' ){
        ree = false;
        sResponse += "First Name <br/>";
        gei( "first_name" ).style.backgroundColor = "#2a26fc";
    } else {
        saveInfo( "firstname", gei( "first_name" ).value);
    }

    if( gei( "last_name" ).value == '' ){
        sResponse += "Last Name <br/>";
        ree = false;
        gei( "last_name" ).style.backgroundColor = "#2a26fc";
    } else {
        saveInfo( "lastname", gei( "last_name" ).value);
    }

    if( gei( "email" ).value == '' ){
        sResponse += "E-mail <br/>";
        ree = false;
        gei( "email" ).style.backgroundColor = "#2a26fc";
    } else {
        saveInfo( "email", gei( "email" ).value);
    }

    if( sResponse.length > 33 ){
        gei( "SubFeedback" ).innerHTML = sResponse;
    }
    return ree;
}

//----------------------------------------------------------------------------------------------------------------------


//Cookies and Local Storage ---------------------------------------------------------------------------------------------------------


function saveInfo( key, val ){
    if( localStorage ){

        localStorage.setItem( key, val );
    }else{

        if( GetCookie( key ) == null ){
            SetCookie( key, val );
        }else{
            alert( GetCookie( key ) );
        }
        alert( GetCookie( key ) );
    }
}


function retrieveInfo( key ) {

    if (localStorage) {
        return localStorage.getItem(key);
    }
    return GetCookie(key);

}

//----------------------------------------------------------------------------------------------------------------------
//Image Function

/*
* Takes images from the image file and chooses the correct image based on the users choice
* opt is the parameter and is array of keyword and image path
* Created the function with help from professor Goldman
*/
function makeImage( opt ){
    var character = gei( "character" );
    console.log("got far 1");
    while( character.firstChild ){
        character.removeChild( character.firstChild );
    }
    for(var i = 0; i < opt.length;i++){
        console.log("got far 2");
        var parameters = {tagName:"img", text:null, attribute: "src", value:img[ opt[i] ]};
        var image = makeElement( parameters );
        console.log("got far 3");
        image.setAttribute( "alt", opt[i] );
        console.log("got far 4");
        gei( "character" ).appendChild( image );

    }
}//End generate images function.

//----------------------------------------------------------------------------------------------------------------------
//Function Shortcuts -- makes it much easier to call

/*
* function which provides a shortcut to getting id of element
* parameter is ID
* returns elements which has a specific ID
*/
function gei( id ){
    return document.getElementById( id );
}

/*
* function which provides a shortcut to getting elements with tagName
* parameter is tagName of the element to be returned
* returns {NodeList}
*/
function geit( tagName ){
    return document.getElementsByTagName( tagName );
}


