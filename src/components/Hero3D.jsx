import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const holder = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      holder.clientWidth / holder.clientHeight,
      0.1,
      100
    );
    camera.position.set(3.6, 2.2, 4.2);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ canvas: holder, antialias: true, alpha: true });
    renderer.setSize(holder.clientWidth, holder.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffc93c, 1.1);
    key.position.set(4, 6, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7fe0b8, 0.4);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    const yellow = new THREE.MeshStandardMaterial({ color: 0xffc93c, roughness: 0.4, metalness: 0.2 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x212228, roughness: 0.6 });
    const tire = new THREE.MeshStandardMaterial({ color: 0x0d0d0f, roughness: 0.8 });

    const scooter = new THREE.Group();

    function wheel(x, z) {
      const g = new THREE.Group();
      const t = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.11, 10, 20), tire);
      t.rotation.y = Math.PI / 2;
      g.add(t);
      g.position.set(x, 0.32, z);
      return g;
    }
    const wF = wheel(0, -1.15);
    const wR = wheel(0, 1.0);
    scooter.add(wF, wR);

    const deck = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 1.6), yellow);
    deck.position.set(0, 0.5, -0.05);
    scooter.add(deck);

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.32, 0.8), dark);
    body.position.set(0, 0.72, 0.35);
    scooter.add(body);

    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 10), dark);
    column.position.set(0, 0.9, -1.1);
    column.rotation.x = -0.25;
    scooter.add(column);

    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.06), yellow);
    bar.position.set(0, 1.38, -1.28);
    scooter.add(bar);

    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.14, 0.5), dark);
    seat.position.set(0, 0.9, 0.7);
    scooter.add(seat);

    const lamp = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xfff3c9, emissive: 0xffc93c, emissiveIntensity: 0.8 })
    );
    lamp.position.set(0, 0.95, -1.55);
    scooter.add(lamp);

    scooter.rotation.y = 0.5;
    scene.add(scooter);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(1.7, 1.75, 48),
      new THREE.MeshBasicMaterial({ color: 0x33353d, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    scene.add(ring);

    let autoSpin = true;
    let dragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0.5;
    let rotX = 0;

    const onDown = (e) => {
      dragging = true;
      autoSpin = false;
      prevX = e.clientX;
      prevY = e.clientY;
      holder.style.cursor = "grabbing";
    };
    const onUp = () => {
      dragging = false;
      holder.style.cursor = "grab";
    };
    const onMove = (e) => {
      if (!dragging) return;
      rotY += (e.clientX - prevX) * 0.008;
      rotX = Math.max(-0.3, Math.min(0.3, rotX + (e.clientY - prevY) * 0.005));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    holder.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (autoSpin) rotY += 0.004;
      scooter.rotation.y = rotY;
      scooter.rotation.x = rotX;
      wF.children[0].rotation.x += autoSpin ? 0.05 : 0;
      wR.children[0].rotation.x += autoSpin ? 0.05 : 0;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = holder.clientWidth / holder.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(holder.clientWidth, holder.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      holder.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="canvas-holder">
      <canvas ref={canvasRef} id="scene" />
      <div className="canvas-tag">drag to rotate</div>
    </div>
  );
}
