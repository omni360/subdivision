/**
 * this is a test for subdivision 3d model modifier
 * athor: Hou,Chunlei
 * Email: omni360＠qq.com
 **/

var fs = require("fs");
var stream = require("stream");
var THREE = require("three");
var SubdivisionModifier = require("three-subdivision-modifier");
var OBJLoader = require("three-obj-loader");

OBJLoader(THREE);

var modifier = new SubdivisionModifier( 2 );
var container = "";

function readLine(input,func){
    var remaining = "";
    input.on('data',function(data){
        remaining += data;
        
    });
    input.on("end",function(){
        if(remaining.length > 0){
            func(remaining);
        }
    });

}
function func(data){
    container += data;
    var objPase = new THREE.OBJLoader();
    var meshs = objPase.parse(container);
    var i = 0,len = meshs.children.length;
    for (; i<len; i++){
        if (meshs.children[i].geometry !== undefined){
            var geo = meshs.children[i].geometry.clone();
            console.log ("orignal: " + geo.getAttribute("position").count);
            modifier.modify(geo);
            console.log ("modified: " + geo.getAttribute("position").count);
        }


    }
}
var input = fs.createReadStream(__dirname + "/male02/male02.obj");
readLine(input,func);
