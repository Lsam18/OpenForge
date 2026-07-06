import * as THREE from "./assets/vendor/three.module.min.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const host = document.querySelector(".premium-scene, .hero-canvas");
const telemetry = {
    status: "booting",
    frames: 0,
    width: 0,
    height: 0,
    sampleEnergy: 0,
    previousSampleEnergy: 0,
    litSamples: 0,
    error: ""
};

window.__openforgeSceneTelemetry = telemetry;

if (!host) telemetry.status = "missing-host";
if (prefersReducedMotion.matches) telemetry.status = "reduced-motion";
if (host) host.dataset.sceneStatus = telemetry.status;

if (host && !prefersReducedMotion.matches) {
    let canvas = null;

    try {
        canvas = document.createElement("canvas");
        canvas.className = "security-scene";
        canvas.setAttribute("aria-hidden", "true");
        host.prepend(canvas);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });

        renderer.setClearColor(0xffffff, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

        const root = new THREE.Group();
        scene.add(root);

        scene.add(new THREE.AmbientLight(0xffffff, 1.8));

        const key = new THREE.DirectionalLight(0xffffff, 3.2);
        key.position.set(-4, 6, 6);
        scene.add(key);

        const rim = new THREE.DirectionalLight(0xa8d4ff, 1.8);
        rim.position.set(6, 2.8, -5);
        scene.add(rim);

        const fill = new THREE.DirectionalLight(0xd7f2ea, 1.1);
        fill.position.set(0, -4, 4);
        scene.add(fill);

        const glass = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.16,
            metalness: 0,
            transmission: 0.38,
            transparent: true,
            opacity: 0.68,
            clearcoat: 1,
            clearcoatRoughness: 0.18
        });

        const graphite = new THREE.MeshStandardMaterial({
            color: 0x1d1d1f,
            roughness: 0.48,
            metalness: 0.24
        });

        const blue = new THREE.MeshStandardMaterial({
            color: 0x0071e3,
            roughness: 0.34,
            metalness: 0.12
        });

        const paper = new THREE.MeshStandardMaterial({
            color: 0xf8f8fb,
            roughness: 0.42,
            metalness: 0.02
        });

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x9aa4b2,
            transparent: true,
            opacity: 0.34
        });

        function roundedBox(width, height, depth, material, x, y, z, ry = 0) {
            const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
            mesh.position.set(x, y, z);
            mesh.rotation.y = ry;
            root.add(mesh);

            const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), lineMaterial);
            edges.position.copy(mesh.position);
            edges.rotation.copy(mesh.rotation);
            root.add(edges);
            return mesh;
        }

        const base = roundedBox(4.6, 0.16, 2.9, glass, 0, -1.5, 0, -0.2);
        const device = roundedBox(2.75, 3.7, 0.22, glass, -0.25, 0.22, 0, -0.2);
        const darkPanel = roundedBox(2.18, 2.78, 0.08, graphite, -0.25, 0.2, 0.16, -0.2);
        darkPanel.scale.z = 0.7;

        const shield = new THREE.Shape();
        shield.moveTo(0, 1.05);
        shield.bezierCurveTo(0.72, 0.78, 0.94, 0.65, 0.94, 0.65);
        shield.bezierCurveTo(0.86, -0.25, 0.54, -0.9, 0, -1.16);
        shield.bezierCurveTo(-0.54, -0.9, -0.86, -0.25, -0.94, 0.65);
        shield.bezierCurveTo(-0.94, 0.65, -0.72, 0.78, 0, 1.05);

        const shieldMesh = new THREE.Mesh(
            new THREE.ExtrudeGeometry(shield, { depth: 0.12, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025, bevelSegments: 4 }),
            blue
        );
        shieldMesh.position.set(-0.25, 0.38, 0.34);
        shieldMesh.rotation.y = -0.2;
        root.add(shieldMesh);

        const check = new THREE.Group();
        root.add(check);
        const checkA = roundedBox(0.13, 0.6, 0.08, paper, -0.44, 0.17, 0.52, -0.2);
        checkA.rotation.z = -0.74;
        const checkB = roundedBox(0.13, 1.05, 0.08, paper, -0.02, 0.28, 0.52, -0.2);
        checkB.rotation.z = 0.72;

        const report = new THREE.Group();
        root.add(report);
        const sheet = new THREE.Mesh(new THREE.BoxGeometry(1.62, 2.16, 0.05), paper);
        sheet.position.set(1.65, 0.25, -0.1);
        sheet.rotation.set(0.04, -0.42, -0.05);
        report.add(sheet);

        for (let i = 0; i < 5; i += 1) {
            const line = new THREE.Mesh(new THREE.BoxGeometry(1.05 - i * 0.05, 0.035, 0.035), i === 0 ? blue : graphite);
            line.position.set(1.62, 0.96 - i * 0.34, -0.02);
            line.rotation.copy(sheet.rotation);
            report.add(line);
        }

        const orbits = new THREE.Group();
        root.add(orbits);
        for (let i = 0; i < 3; i += 1) {
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(1.85 + i * 0.32, 0.008, 8, 96),
                new THREE.MeshBasicMaterial({ color: i === 1 ? 0x0071e3 : 0x9aa4b2, transparent: true, opacity: i === 1 ? 0.22 : 0.16 })
            );
            ring.rotation.x = Math.PI / 2.7;
            ring.rotation.y = -0.18 + i * 0.08;
            ring.position.set(-0.22, 0.18, 0.03);
            orbits.add(ring);
        }

        const pointer = { x: 0, y: 0 };
        window.addEventListener("pointermove", (event) => {
            pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
            pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
        }, { passive: true });

        function publish() {
            const values = {
                sceneStatus: telemetry.status,
                sceneFrames: String(telemetry.frames),
                sceneWidth: String(telemetry.width),
                sceneHeight: String(telemetry.height),
                sceneEnergy: String(telemetry.sampleEnergy),
                scenePreviousEnergy: String(telemetry.previousSampleEnergy),
                sceneLitSamples: String(telemetry.litSamples),
                sceneError: telemetry.error,
                engine: "three.js r165"
            };

            Object.entries(values).forEach(([key, value]) => {
                canvas.dataset[key] = value;
                host.dataset[key] = value;
            });
        }

        function resize() {
            const rect = host.getBoundingClientRect();
            const width = Math.max(1, Math.floor(rect.width));
            const height = Math.max(1, Math.floor(rect.height));
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.position.set(width < 720 ? 0 : 0.35, width < 720 ? 0.25 : 0.05, width < 720 ? 9.2 : 7.2);
            root.position.set(width < 720 ? 0 : -0.3, width < 720 ? -0.15 : -0.05, 0);
            root.scale.setScalar(width < 720 ? 0.78 : 1);
            camera.updateProjectionMatrix();
        }

        function samplePixels() {
            const gl = renderer.getContext();
            const pixel = new Uint8Array(4);
            let energy = 0;
            let lit = 0;

            for (let ix = 2; ix <= 18; ix += 2) {
                for (let iy = 2; iy <= 12; iy += 2) {
                    const x = Math.max(0, Math.min(canvas.width - 1, Math.floor(canvas.width * (ix / 20))));
                    const y = Math.max(0, Math.min(canvas.height - 1, Math.floor(canvas.height * (iy / 14))));
                    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
                    const value = pixel[0] + pixel[1] + pixel[2] + pixel[3];
                    energy += value;
                    if (value > 0) lit += 1;
                }
            }

            telemetry.previousSampleEnergy = telemetry.sampleEnergy;
            telemetry.sampleEnergy = energy;
            telemetry.litSamples = lit;
            telemetry.width = canvas.width;
            telemetry.height = canvas.height;
            publish();
        }

        resize();
        window.addEventListener("resize", resize);

        let frame = 0;
        function animate(time) {
            frame += 1;
            const t = time * 0.001;
            telemetry.frames = frame;

            root.rotation.y = -0.18 + pointer.x * 0.045 + Math.sin(t * 0.18) * 0.035;
            root.rotation.x = -0.02 - pointer.y * 0.02;
            shieldMesh.position.y = 0.38 + Math.sin(t * 0.7) * 0.045;
            report.position.y = Math.sin(t * 0.55) * 0.055;
            orbits.rotation.z = t * 0.08;

            renderer.render(scene, camera);

            if (frame % 24 === 0) samplePixels();
            if (frame % 12 === 0) publish();
            requestAnimationFrame(animate);
        }

        telemetry.status = "running";
        publish();
        requestAnimationFrame(animate);
    } catch (error) {
        telemetry.status = "error";
        telemetry.error = error instanceof Error ? error.message : String(error);
        if (canvas) {
            canvas.dataset.sceneStatus = telemetry.status;
            canvas.dataset.sceneError = telemetry.error;
        }
        host.dataset.sceneStatus = telemetry.status;
        host.dataset.sceneError = telemetry.error;
        console.error("OpenForge premium scene failed", error);
    }
}
