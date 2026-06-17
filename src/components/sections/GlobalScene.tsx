"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlobalScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.set(0, 3, 0);
    camera.lookAt(0, 0, -10);

    scene.fog = new THREE.FogExp2(0x050A10, 0.022);

    // Primary grid
    const GRID_SIZE = 120;
    const GRID_DIV = 40;
    const grid1 = new THREE.GridHelper(GRID_SIZE, GRID_DIV, 0xF5C842, 0x0D2035);
    (grid1.material as THREE.Material).opacity = 0.35;
    (grid1.material as THREE.Material).transparent = true;
    grid1.position.y = -2;
    scene.add(grid1);

    // Fine grid
    const grid2 = new THREE.GridHelper(GRID_SIZE, GRID_DIV * 3, 0x0A1825, 0x0A1825);
    (grid2.material as THREE.Material).opacity = 0.2;
    (grid2.material as THREE.Material).transparent = true;
    grid2.position.y = -2.001;
    scene.add(grid2);

    // Horizon glow
    const horizonGeo = new THREE.PlaneGeometry(120, 0.1);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0xF5C842, transparent: true, opacity: 0.7 });
    const horizon = new THREE.Mesh(horizonGeo, horizonMat);
    horizon.rotation.x = -Math.PI / 2;
    horizon.position.set(0, -2, -30);
    scene.add(horizon);

    // Bloom
    const bloomMat = new THREE.MeshBasicMaterial({ color: 0xF5C842, transparent: true, opacity: 0.025 });
    const bloom = new THREE.Mesh(new THREE.PlaneGeometry(120, 12), bloomMat);
    bloom.rotation.x = -Math.PI / 2;
    bloom.position.set(0, -1.99, -30);
    scene.add(bloom);

    // Particles
    const COUNT = 500;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = Math.random() * 40 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200 - 20;
    }
    const pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pmat = new THREE.PointsMaterial({ color: 0xE8EDF4, size: 0.06, transparent: true, opacity: 0.45, sizeAttenuation: true });
    scene.add(new THREE.Points(pgeo, pmat));

    // Floating wireframe shapes distributed across scroll height
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xF5C842, wireframe: true, transparent: true, opacity: 0.1 });
    const shapeConfigs = [
      { geo: new THREE.OctahedronGeometry(0.6),         pos: [-5,  1,  -8] },
      { geo: new THREE.IcosahedronGeometry(0.5),        pos: [ 7,  2, -12] },
      { geo: new THREE.TorusGeometry(0.6, 0.13, 8, 16), pos: [-9,  1, -20] },
      { geo: new THREE.OctahedronGeometry(0.4),         pos: [ 10, 2, -30] },
      { geo: new THREE.IcosahedronGeometry(0.7),        pos: [-12, 3, -40] },
      { geo: new THREE.TorusGeometry(0.45, 0.1, 6, 12), pos: [ 8,  1, -50] },
      { geo: new THREE.OctahedronGeometry(0.5),         pos: [-6,  2, -60] },
      { geo: new THREE.IcosahedronGeometry(0.4),        pos: [ 11, 1, -70] },
      { geo: new THREE.TorusGeometry(0.5, 0.12, 8, 16), pos: [-10, 2, -80] },
      { geo: new THREE.OctahedronGeometry(0.6),         pos: [ 6,  3, -90] },
    ];
    const shapes = shapeConfigs.map(cfg => {
      const mesh = new THREE.Mesh(cfg.geo, wireMat.clone());
      mesh.position.set(...cfg.pos as [number, number, number]);
      scene.add(mesh);
      return mesh;
    });

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation
    let t = 0;
    let scrollY = 0;
    let targetCameraZ = 0;

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      t += 0.006;

      // Grid scrolling
      const cellSize = GRID_SIZE / GRID_DIV;
      grid1.position.z = (t * 1.5) % cellSize;
      grid2.position.z = (t * 1.5) % (GRID_SIZE / (GRID_DIV * 3));

      // Camera follows scroll — moves deep into the scene
      targetCameraZ = -(scrollY / window.innerHeight) * 18;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.05;

      // Mouse parallax
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.5 + 3 - camera.position.y) * 0.03;
      camera.lookAt(mouseX * 0.4, camera.position.y - 2, camera.position.z - 10);

      // Rotate shapes
      shapes.forEach((s, i) => {
        s.rotation.x += 0.003 + i * 0.0005;
        s.rotation.y += 0.005 + i * 0.0004;
        s.position.y += Math.sin(t + i) * 0.002;
      });

      // Pulse horizon
      horizonMat.opacity = 0.5 + 0.2 * Math.sin(t * 1.5);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
// Wed Jun 17 12:28:26 UTC 2026
