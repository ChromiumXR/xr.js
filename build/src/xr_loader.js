

class Model extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback() {
        console.log('Custom element added to page.');
        updateModel(this);
    }
    disconnectedCallback() {
        console.log('Custom element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom element moved to new page.');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom element attributes changed.');
        updateModel(this);
    }
    static get observedAttributes() { return ['c', 'l']; }

    getWidth() {
        return this.style.width.replace(/[a-z]/g, '')
    }

    getHeight() {
        return this.style.height.replace(/[a-z]/g, '')
    }

    getObjectPath() {
        return this.getAttribute('obj')
    }
    getMaterialPath() {
        return this.getAttribute('mtl')
    }
    getTexturePath() {
        return this.getAttribute('texturePath')
    }
    getDisplay() {
    	if (this.getAttribute('desktop') === 'true') {
    		return 'inherit'
		} else {
    		return 'none'
		}
	}

	getPosition() {
    	let positions = this.getAttribute('position').split(',');
    	return {
    		x: parseFloat(positions[0]),
			y: parseFloat(positions[1]),
			z: parseFloat(positions[2])
		}
	}
	getScale() {
		let scales = this.getAttribute('scale').split(',');
		return {
			x: parseFloat(scales[0]),
			y: parseFloat(scales[1]),
			z: parseFloat(scales[2])
		}
	}
	getRotation() {
		let rotations = this.getAttribute('rotation').split(',');
		return {
			x: parseFloat(rotations[0]) * (Math.PI/180),
			y: parseFloat(rotations[1]) * (Math.PI/180),
			z: parseFloat(rotations[2]) * (Math.PI/180)
		}
	}
}

customElements.define('xr-mdl', Model);


function updateModel (element) {
    const materialPath = element.getMaterialPath();
    const objectPath = element.getObjectPath();
    const texturePath = element.getTexturePath();
	const displayValue = element.getDisplay();

	const position = element.getPosition();
	const scale = element.getScale();
	const rotation = element.getRotation();

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //todo: hide the canvas so it only appears in unity
    renderer.domElement.style.display = displayValue;
    let vrButton = WEBVR.createButton( renderer );
    vrButton.style.display = displayValue;
    document.body.appendChild( vrButton );
    renderer.vr.enabled = true;
    //renderer.vr.scale.set(scale.x, scale.y, scale.z);
	//renderer.vr.position.set(position.x, position.y, position.z);
	document.body.appendChild( renderer.domElement );

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    const fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath(texturePath);
    mtlLoader.setPath(texturePath);
    mtlLoader.load(materialPath, function (materials) {

        materials.preload();

        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(texturePath);
        objLoader.load(objectPath, function (object) {

            scene.add(object);
            object.position.set(position.x, position.y, position.z);
			object.scale.set(scale.x, scale.y, scale.z);
			object.rotation.set(rotation.x, rotation.y, rotation.z)

        });

    });

    const animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();
}
