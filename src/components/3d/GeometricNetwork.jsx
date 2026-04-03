import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GeometricNetwork = ({ count = 400 }) => {
    const mesh = useRef();
    const linesGeometry = useRef();
    const starsGeometry = useRef();

    // 1. Define the PATH (Spline)
    // A winding path deep into the Z-axis
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 15),
            new THREE.Vector3(-2, 2, 5),
            new THREE.Vector3(3, -2, -10),
            new THREE.Vector3(-3, 1, -25),
            new THREE.Vector3(2, -1, -40),
            new THREE.Vector3(0, 0, -60),
            new THREE.Vector3(0, 0, -80), // End point
        ], false, 'catmullrom', 0.5);
    }, []);

    /* eslint-disable react-hooks/purity */
    const particles = useMemo(() => {
        const temp = [];
        // Spread particles ALONG the curve with some noise
        const points = curve.getPoints(count);

        points.forEach((point) => {
            const spread = 25; // Slightly wider spread for density
            const x = point.x + (Math.random() - 0.5) * spread;
            const y = point.y + (Math.random() - 0.5) * spread;
            const z = point.z + (Math.random() - 0.5) * 15;
            // Random pulse offset
            const phase = Math.random() * Math.PI * 2;
            temp.push({ x, y, z, phase });
        });

        return temp;
    }, [count, curve]);

    // Secondary Layer: Starfield / Stardust
    const stars = useMemo(() => {
        const temp = [];
        const starCount = 2000; // Dense dust
        const spread = 60;
        const depth = 120; // Deep field

        for (let i = 0; i < starCount; i++) {
            const x = (Math.random() - 0.5) * spread;
            const y = (Math.random() - 0.5) * spread;
            const z = 20 - Math.random() * depth;
            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, []);
    /* eslint-enable react-hooks/purity */

    const dummy = useMemo(() => new THREE.Object3D(), []);

    const nodeMaterial = useRef();
    const lineMaterial = useRef();

    // Define theme colors
    const colors = useMemo(() => [
        new THREE.Color('#8b5cf6'), // Violet
        new THREE.Color('#06b6d4'), // Cyan
        new THREE.Color('#f43f5e'), // Rose
        new THREE.Color('#8b5cf6'), // Violet
    ], []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.max(0, Math.min(1, scrollY / maxScroll));

        // 1. Camera Path Follow Logic
        // Get position on curve
        const point = curve.getPointAt(scrollProgress);
        const lookAtPoint = curve.getPointAt(Math.min(1, scrollProgress + 0.05)); // Look ahead

        // Smoothly move camera to target point
        state.camera.position.lerp(point, 0.1);
        state.camera.lookAt(lookAtPoint);

        // 2. Color Shift Logic
        const colorIndex = Math.floor(scrollProgress * (colors.length - 1));
        const colorFactor = (scrollProgress * (colors.length - 1)) % 1;
        const startColor = colors[Math.min(colorIndex, colors.length - 1)];
        const endColor = colors[Math.min(colorIndex + 1, colors.length - 1)];

        if (nodeMaterial.current && lineMaterial.current) {
            nodeMaterial.current.color.lerpColors(startColor, endColor, colorFactor);
            nodeMaterial.current.emissive.lerpColors(startColor, endColor, colorFactor);
            lineMaterial.current.color.lerpColors(startColor, endColor, colorFactor);
        }

        // 3. Update instanced mesh positions + PULSE
        particles.forEach((particle, i) => {
            dummy.position.set(particle.x, particle.y, particle.z);

            // Pulse: sin wave based on time + random phase
            const pulse = 1 + Math.sin(time * 2 + particle.phase) * 0.2;
            dummy.scale.setScalar(pulse);

            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;

        // 4. Subtle rotation for starfield
        if (starsGeometry.current) {
            starsGeometry.current.rotation.z = time * 0.05;
        }
    });

    // Create lines connecting close particles (Simplified for performance)
    const linesLines = useMemo(() => {
        const points = [];
        const distanceThreshold = 6;  // Reduced slightly to keep lines clean with more nodes

        for (let i = 0; i < count; i++) {
            // Optimization: Look fewer neighbors ahead to save perf on high count
            for (let j = i + 1; j < Math.min(i + 20, count); j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dist = Math.sqrt(
                    Math.pow(p1.x - p2.x, 2) +
                    Math.pow(p1.y - p2.y, 2) +
                    Math.pow(p1.z - p2.z, 2)
                );

                if (dist < distanceThreshold) {
                    points.push(new THREE.Vector3(p1.x, p1.y, p1.z));
                    points.push(new THREE.Vector3(p2.x, p2.y, p2.z));
                }
            }
        }
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [particles, count]);

    return (
        <>
            {/* Fog for Depth Fade */}
            <fog attach="fog" args={['#09090b', 5, 45]} />

            {/* MAIN NODES */}
            <instancedMesh ref={mesh} args={[null, null, count]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial
                    ref={nodeMaterial}
                    color="#8b5cf6"
                    emissive="#8b5cf6"
                    emissiveIntensity={0.8}
                    roughness={0.1}
                    metalness={0.8}
                />
            </instancedMesh>

            {/* LINES */}
            <lineSegments ref={linesGeometry} geometry={linesLines}>
                <lineBasicMaterial
                    ref={lineMaterial}
                    color="#8b5cf6"
                    transparent
                    opacity={0.1}
                />
            </lineSegments>

            {/* STARFIELD / DUST */}
            <points ref={starsGeometry}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[stars, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color="#ffffff"
                    transparent
                    opacity={0.4}
                    sizeAttenuation={true}
                />
            </points>

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        </>
    );
};

export default GeometricNetwork;
