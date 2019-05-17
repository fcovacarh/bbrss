import React, { Component } from "react";
import "./VisualizerComponent.css";
import Tone from "tone";
import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);

export default class VisualizerComponent extends Component {
  state = {
    epilepsyMode: false
  };
  constructor() {
    super();
    this.analyser = new Tone.Analyser("fft", 16);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.sphere = null;
    this.cubes = [];
    this.controls = require("three-orbit-controls")(THREE);
    this.iteration = 0;
    Tone.Master.connect(this.analyser);
  }

  componentDidMount() {
    const V_WIDTH = window.innerWidth,
      V_HEIGHT = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(15, V_WIDTH / V_HEIGHT, 1, 1000);
    this.camera.position.set(0, 600, 0);
    this.scene.add(this.camera);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(V_WIDTH, V_HEIGHT);
    document
      .querySelector("#visualizer-wrapper")
      .appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const sphere = this.createSphere();
    this.scene.add(sphere);
    this.sphere = sphere;

    const offset = 50;
    const cube1 = this.createCube(-offset, -offset);
    this.scene.add(cube1);
    this.cubes.push(cube1);

    const cube2 = this.createCube(offset, -offset);
    this.scene.add(cube2);
    this.cubes.push(cube2);

    const cube3 = this.createCube(-offset, offset);
    this.scene.add(cube3);
    this.cubes.push(cube3);

    const cube4 = this.createCube(offset, offset);
    this.scene.add(cube4);
    this.cubes.push(cube4);

    this.renderer.render(this.scene, this.camera);
    this.draw();
  }

  toggleEpilepsyMode = () => {
    console.log(!this.state.epilepsyMode);
    this.setState({
      ...this.state,
      epilepsyMode: !this.state.epilepsyMode
    });
  };

  createSphere = () => {
    const RADIUS = 70;
    const SEGMENTS = 16;
    const RINGS = 16;

    const sphereGeometry = new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS);

    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    sphere.position.x = 0;
    sphere.position.z = 0;

    return sphere;
  };

  createCube = (posX, posZ) => {
    const WIDTH = 10;
    const HEIGHT = 10;
    const DEPTH = 10;

    const cubeGeometry = new THREE.BoxGeometry(WIDTH, HEIGHT, DEPTH);

    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // Move the cube back in Z so we
    // can see it.
    cube.position.x = posX;
    cube.position.z = posZ;

    return cube;
  };

  animateSphere = (value, threshold) => {
    const freqThreshold = 20;
    if (this.state.epilepsyMode) {
      if (value > freqThreshold && this.iteration % threshold !== 0) {
        this.sphere.scale.set(value / 500, value / 500, value / 500);
      } else {
        this.sphere.scale.set(16, 16, 16);
      }
    } else {
      if (value > freqThreshold) {
        this.sphere.scale.set(value / 500, value / 500, value / 500);
      } else {
        this.sphere.scale.set(1, 1, 1);
      }
    }
    this.sphere.rotation.y += 0.1;
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  animateCube = (idx, value, threshold) => {
    const freqThreshold = 10;
    if (this.state.epilepsyMode) {
      if (value > freqThreshold && this.iteration % threshold !== 0) {
        this.cubes[idx].scale.set(value / 100, value / 100, value / 100);
      } else {
        this.cubes[idx].scale.set(16, 16, 16);
      }
    } else {
      if (value > freqThreshold) {
        this.cubes[idx].scale.set(value / 100, value / 100, value / 100);
      } else {
        this.cubes[idx].scale.set(0.1, 0.1, 0.1);
      }
    }

    if (idx % 2 === 0) {
      this.cubes[idx].rotation.z += 0.1;
    } else {
      this.cubes[idx].rotation.z -= 0.1;
    }

    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  draw = () => {
    const bassValue = Math.abs(this.analyser.getValue()[0]);
    const highValue = Math.abs(this.analyser.getValue()[15]);
    const threshold = 8;
    this.animateSphere(bassValue, threshold);
    this.cubes.forEach((_, idx) =>
      this.animateCube(idx, highValue, threshold)
    );
    this.iteration > threshold ? (this.iteration = 1) : this.iteration++;
    requestAnimationFrame(this.draw);
  };

  render() {
    return (
      <React.Fragment>
        <div id="visualizer-wrapper">
          <button
            id="epilepsy-mode-button"
            className={this.state.epilepsyMode ? "btn-on" : "btn-off"}
            onClick={() => this.toggleEpilepsyMode()}
          >
            EPILEPSY MODE: {this.state.epilepsyMode ? "ON" : "OFF"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}
