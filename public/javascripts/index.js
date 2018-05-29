// Checks that your browser supports WebGL.
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var renderer = null;
var scene    = null;
var camera   = null;
var cube01   = null;
var cube01_wireframe = null;
var cube02 = null;
var cube02_wireframe = null;
var bar01 = null;
var bar02 = null;
var curTime  = Date.now();
var starter = Date.now();

// This function is called whenever the document is loaded
function init() {
    // Get display canvas
    var canvas = document.getElementById("webglcanvas");
    console.log( canvas );

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas,
        antialias: true } );
    // Set the viewport size
    renderer.setSize( canvas.width, canvas.height );
    // Create a new Three.js scene
    scene = new THREE.Scene();
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height,
        0.1, 1000 );

    camera.position.z = 2;

    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
    cube01 = new THREE.Mesh( geometry, material );
    scene.add( cube01 );

    geometry = new THREE.BoxGeometry( 3,3,3 );
    material = new THREE.MeshBasicMaterial( { color: "#433F81",wireframe:true,transparent:true } );
    cube01_wireframe = new THREE.Mesh( geometry, material );
    scene.add( cube01_wireframe );

    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshBasicMaterial( { color: "#A49FEF" } );
    cube02 = new THREE.Mesh( geometry, material );
    scene.add( cube02 );

    geometry = new THREE.BoxGeometry( 3,3,3 );
    material = new THREE.MeshBasicMaterial( { color: "#A49FEF",wireframe:true,transparent:true } );
    cube02_wireframe = new THREE.Mesh( geometry, material );
    scene.add( cube02_wireframe );

    geometry = new THREE.BoxGeometry( 10,0.05,0.5 );
    material = new THREE.MeshBasicMaterial( { color: "#00FFBC" } );
    bar01 = new THREE.Mesh( geometry, material );
    bar01.position.z = 0.5;
    scene.add( bar01 );

    geometry = new THREE.BoxGeometry( 10,0.05,0.5 );
    material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
    bar02 = new THREE.Mesh( geometry, material );
    bar02.position.z = 0.5;
    scene.add( bar02 );
}

// This function is called regularly to update the canvas webgl.
function run() {
    // Ask to call again run
    requestAnimationFrame( run );

    // Render the scene
    render();

    // Calls the animate function if objects or camera should move
    animate();
}

// This function is called regularly to take care of the rendering.
function render() {
    // Render the scene
    renderer.render( scene, camera );
}

// This function is called regularly to update objects.
function animate() {
    // Computes how time has changed since last display
    var now       = Date.now();
    var deltaTime = now - curTime;
    curTime       = now;
    var fracTime  = deltaTime / 1000; // in seconds
    var timer = (Date.now() - starter) / 1000;
    // Now we can move objects, camera, etc.
    // Example: rotation cube
    var angle = 0.1 * Math.PI * 2 * fracTime; // one turn per 10 second.

    cube01.rotation.x += angle;
    cube01.rotation.y += angle;

    cube01.material.color = new THREE.Color(
        makeColorGradient(0.3, 0.3, 0.3, 0, 2, 4, timer)
    );

    cube01_wireframe.rotation.x += angle;
    cube01_wireframe.rotation.y += angle;

    cube01_wireframe.material.color = new THREE.Color(
        makeColorGradient(0.5, 0.5, 0.5, 0, 2, 4, timer)
    );

    cube02.rotation.x -= angle;
    cube02.rotation.y -= angle;

    cube02.material.color = new THREE.Color(
        makeColorGradient(0.3, 0.3, 0.3, 2, 0, 4, timer)
    );

    cube02_wireframe.rotation.x -= angle;
    cube02_wireframe.rotation.y -= angle;

    cube02_wireframe.material.color = new THREE.Color(
        makeColorGradient(0.5, 0.5, 0.5, 2, 0, 4, timer)
    );

    bar01.rotation.z-= angle;
    bar02.rotation.z+= angle;

    bar01.material.color = new THREE.Color(
        makeColorGradient(0.7, 0.7, 0.7, 4, 0, 2, timer)
    );

    bar02.material.color = new THREE.Color(
        makeColorGradient(0.7, 0.7, 0.7, 4, 2, 0, timer)
    );
}

function RGB2Color(r,g,b)
{
    return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
}

function makeColorGradient(frequency1, frequency2, frequency3,
                           phase1, phase2, phase3, time, center, width)
{
    if (center === undefined)   center = 128;
    if (width === undefined)    width = 127;

    var red = Math.sin(frequency1 * time + phase1) * width + center;
    var grn = Math.sin(frequency2 * time + phase2) * width + center;
    var blu = Math.sin(frequency3 * time + phase3) * width + center;

    return RGB2Color(red, grn, blu);
}