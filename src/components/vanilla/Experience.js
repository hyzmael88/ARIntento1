import * as THREE from 'three'

class ARExperience{
    constructor(){
        this.container = document.createElement('div');

        //scene
        this.scene = new THREE.Scene();

        //camera
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerHeightWidth / window.innerHeight,
            0.1,
            100
             )
             this.camera.position.set(5,5,5)
             this.scene.add(this.camera)

             //renderer
             this.renderer = new THREE.WebGLRenderer()
             this.renderer.setSize(window.innerWidth, window.innerHeight)
             this.renderer.setPixelRatio(1)
             this.container.appendChild(this.renderer.domElement)

            

             //cube
             //tamano esta en metros
             const mesh = new THREE.Mesh(
                new THREE.BoxBufferGeometry(0.2,0.2,0.2),
                new THREE.MeshBasicMaterial({color: 0xff0000})

             )
             this.scene.add(mesh)

             //Resize
             window.addEventListener('resize', this.resize.bind(this))
    }

    initScene(){
        document
            .querySelector(".container3D") //aqui es como se llama en ARComponents
            .appendChild(this.container) // hasta arriba esta declarado que se va a hacer un div
        this.renderer.setAnimationLoop(this.render.bind(this))
    }

    resize(){
        const{
            clientWidth: width,
            clientHeight: height,
        } = this.container
        this.renderer.setSize(width, height)
        this.camera.updateProjectionMatrix()
        this.camera.aspect = width / height
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }
}

export {ARExperience}