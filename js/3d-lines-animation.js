var
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,
    cameraZoomsStep = 0.3,
    rotation = 0,
    camera,
    scene,
    renderer;

    init();
    animate();

    function init() {
        var container, separation = 1000, amountX = 50, amountY = 50, color = 0xffffff,
        particles, particle;

        container = document.getElementById("canvas");


        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );

        scene = new THREE.Scene();

        renderer = new THREE.CanvasRenderer({ alpha: true });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setClearColor( 0x000000, 0 );   // canvas background color
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );



        var PI2 = Math.PI * 2;
        var material = new THREE.SpriteCanvasMaterial( {

            color: color,
            opacity: 0.5,
            program: function ( context ) {

                context.beginPath();
                context.arc( 0, 0, 0.5, 0, PI2, true );
                context.fill();

            }

        } );

        var geometry = new THREE.Geometry();

        /*
         *   Number of particles
         */
        for ( var i = 0; i < 150; i ++ ) {

            particle = new THREE.Sprite( material );
            particle.position.x = Math.random() * 2 - 1;
            particle.position.y = Math.random() * 2 - 1;
            particle.position.z = Math.random() * 2 - 1;
            particle.position.normalize();
            particle.position.multiplyScalar( Math.random() * 10 + 600 );
            particle.scale.x = particle.scale.y = 5;

            scene.add( particle );

            geometry.vertices.push( particle.position );

        }

        /*
         *   Lines
         */

        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: color, opacity: 0.2 } ) );
        scene.add( line );


        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }


    function animate() {
        requestAnimationFrame( animate );
        render();
    }


    function render() {
        rotation += 0.001;


        camera.position.x = Math.sin(rotation) * 500;
        camera.position.y = Math.cos(rotation) * 500;


        if(camera.position.z < 1000 ) {
            camera.position.z = camera.position.z + cameraZoomsStep;
        }


        camera.lookAt( scene.position );

        renderer.render( scene, camera );

    }