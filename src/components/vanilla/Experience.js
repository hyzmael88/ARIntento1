import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {ARButton} from 'three/examples/jsm/webxr/ARButton'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


class ARExperience {
    constructor() {
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
        this.camera.position.set(5, 5, 5)
        this.scene.add(this.camera)

        //renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha:true,
        }
        )

        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(1)
        this.container.appendChild(this.renderer.domElement)

        //controls
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        )
        this.controls.enableDamping = true

        //cube
        //tamano esta en metros
        // const mesh = new THREE.Mesh(
        //     new THREE.BoxBufferGeometry(0.2, 0.2, 0.2),
        //     new THREE.MeshBasicMaterial({ color: 0xff0000 })

        // )
        // this.scene.add(mesh)
        //Lights
            const drLight = new THREE.DirectionalLight(0xffffff,1.5)
            drLight.position.set(5,5,5)
            this.scene.add(drLight)

            const al = new THREE.AmbientLight(0xfffff, 0.4)
            this.scene.add(al)

        //Resize
        window.addEventListener('resize', this.resize.bind(this))
    }

    setupARExperience(){
        const controller = this.renderer.xr.getController(0)
        this.scene.add(controller)
        this.scene.traverse(child =>{
            if(child instanceof THREE.Mesh){
                child.position.set(0,0,-1)
                .applyMatrix4(controller.matrixWorld)
                child.quaternion.setFromRotationMatrix(
                    controller.matrixWorld
                )
            }
        })

        this.container.appendChild(
            ARButton.createButton(this.renderer)
        )
    }

    loadModel(){
        const gltfloader = new GLTFLoader()
        gltfloader.load("./models/amongus.glb", (gltf)=>{
            this.scene.add(gltf.scene)
        })
    }

    initScene() {
    
        document
            .querySelector(".container3D") //aqui es como se llama en ARComponents
            .appendChild(this.container) // hasta arriba esta declarado que se va a hacer un div
        this.renderer.setAnimationLoop(this.render.bind(this))
    }

    resize() {
        const {
            clientWidth: width,
            clientHeight: height,
        } = document.querySelector(".container3D")
        this.renderer.setSize(width, height)
        this.camera.updateProjectionMatrix()
        this.camera.aspect = width / height
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }

    cleapUp() {
        const container = document.querySelector(".container3D")
        let child = container.lastElementChild
        while (child) {
          container.removeChild(child)
          child = container.lastElementChild
        }
    }
}

export { ARExperience }