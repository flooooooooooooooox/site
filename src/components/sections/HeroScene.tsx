"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 2.5, 0);
    camera.lookAt(0, 0, -10);

    // Fog for depth
    scene.fog = new THREE.FogExp2(0x050A10, 0.045);

    // ── Infinite grid (moving) ──
    const GRID_SIZE = 60;
    const GRID_DIV  = 30;
    const gridHelper = new THREE.GridHelper(GRID_SIZE, GRID_DIV, 0xF5C842, 0x0D2035);
    (gridHelper.material as THREE.Material).opacity = 0.55;
    (gridHelper.material as THREE.Material).transparent = true;
    gridHelper.position.y = -1.5;
    scene.add(gridHelper);

    // Second finer grid
    const gridHelper2 = new THREE.GridHelper(GRID_SIZE, GRID_DIV * 3, 0x122030, 0x0A1825);
    (gridHelper2.material as THREE.Material).opacity = 0.3;
    (gridHelper2.material as THREE.Material).transparent = true;
    gridHelper2.position.y = -1.501;
    scene.add(gridHelper2);

    // ── Horizon glow plane ──
    const horizonGeo = new THREE.PlaneGeometry(80, 0.08);
    const horizonMat = new THREE.MeshBasicMaterial({
      color: 0xF5C842,
      transparent: true,
      opacity: 0.9,
    });
    const horizon = new THREE.Mesh(horizonGeo, horizonMat);
    horizon.rotation.x = -Math.PI / 2;
    horizon.position.set(0, -1.5, -18);
    scene.add(horizon);

    // Horizon bloom (wide soft plane)
    const bloomGeo = new THREE.PlaneGeometry(80, 6);
    const bloomMat = new THREE.MeshBasicMaterial({
      color: 0xF5C842,
      transparent: true,
      opacity: 0.04,
    });
    const bloom = new THREE.Mesh(bloomGeo, bloomMat);
    bloom.rotation.x = -Math.PI / 2;
    bloom.position.set(0, -1.49, -18);
    scene.add(bloom);

    // ── Floating particles ──
    const PARTICLE_COUNT = 320;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes     = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 12 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));
    const particleMat = new THREE.PointsMaterial({
      color: 0xE8EDF4,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Floating 3D wireframe shapes ──
    const shapes: THREE.Mesh[] = [];
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xF5C842, wireframe: true, transparent: true, opacity: 0.18 });

    const shapeConfigs = [
      { geo: new THREE.OctahedronGeometry(0.5),    pos: [-4,  1, -8],  rot: [0.3, 0.5, 0] },
      { geo: new THREE.IcosahedronGeometry(0.4),   pos: [ 5,  2, -12], rot: [0, 0.2, 0.4] },
      { geo: new THREE.TorusGeometry(0.5, 0.12, 8, 16), pos: [-7, 0.5, -15], rot: [0.8, 0, 0.3] },
      { geo: new THREE.OctahedronGeometry(0.3),    pos: [ 9,  1.5, -10], rot: [0.1, 0.8, 0.2] },
      { geo: new THREE.IcosahedronGeometry(0.6),   pos: [-10, 2, -20],  rot: [0.5, 0.3, 0] },
      { geo: new THREE.TorusGeometry(0.35, 0.08, 6, 12), pos: [6, 3, -6], rot: [1.2, 0.4, 0] },
    ];

    shapeConfigs.forEach(cfg => {
      const mesh = new THREE.Mesh(cfg.geo, wireMat.clone());
      mesh.position.set(...cfg.pos as [number,number,number]);
      mesh.rotation.set(...cfg.rot as [number,number,number]);
      scene.add(mesh);
      shapes.push(mesh);
    });

    // ── Vertical light beams at horizon ──
    for (let i = 0; i < 5; i++) {
      const beamGeo = new THREE.PlaneGeometry(0.015, 8);
      const beamMat = new THREE.MeshBasicMaterial({ color: 0xF5C842, transparent: true, opacity: 0.06 + i * 0.01, side: THREE.DoubleSide });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(-8 + i * 4, 2.5, -18);
      scene.add(beam);
    }

    // ── Mouse parallax ──
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // ── Scroll parallax ──
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll);

    // ── Resize ──
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ──
    let t = 0;
    const animate = () => {
      const id = requestAnimationFrame(animate);
      t += 0.008;

      // Grid scrolling toward camera
      gridHelper.position.z  = (t * 2) % (GRID_SIZE / GRID_DIV);
      gridHelper2.position.z = (t * 2) % (GRID_SIZE / (GRID_DIV * 3));

      // Camera parallax
      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.6 + 2.5 - camera.position.y) * 0.04;
      camera.position.y -= scrollY * 0.003;
      camera.lookAt(mouseX * 0.5, -mouseY * 0.3, -10);

      // Rotate shapes
      shapes.forEach((s, i) => {
        s.rotation.x += 0.004 + i * 0.001;
        s.rotation.y += 0.006 + i * 0.0008;
        s.position.y += Math.sin(t + i) * 0.003;
      });

      // Pulse horizon
      horizon.material.opacity = 0.7 + 0.2 * Math.sin(t * 1.5);

      renderer.render(scene, camera);
      return id;
    };
    const animId = animate();

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
