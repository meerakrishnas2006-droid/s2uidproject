window.initSpiral = function () {
    if (typeof THREE === 'undefined') return;
    if (window._spiralAnimId) { cancelAnimationFrame(window._spiralAnimId); window._spiralAnimId = null; }

    const imageUrls = [
        'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
        'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80',
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
        'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
        'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80',
        'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80',
        'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=800&q=80',
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
        'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80',
        'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80',
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
        'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&q=80',
        'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80',
        'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
        'https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=800&q=80',
    ];

    const N = imageUrls.length;
    let scene, camera, renderer, spiralMesh, tiltGroup, mat;
    let scrollOffset = 0;
    let imageRatios = [];
    let originalPositions = [];
    const AUTO_SPEED = 0.0003;

    let time = 0;

    const cfg = {
        imageHeight: 7, curvature: -0.030, gapSize: 0,
        spiralRadius: 3.5,
        spiralTurns: 2.8 + (N - 21) * 0.1,
        spiralHeight: 12 + (N - 21) * 0.25,
        centerX: -2, centerY: 4.38, centerZ: 0
    };

    function updateUV() {
        if (!mat) return;
        let o = scrollOffset % 1;
        if (o < 0) o += 1;
        mat.uniforms.offset.value = o;
    }

    function rebuildGeometry() {
        if (!spiralMesh) return;
        const slots = imageRatios.length;
        const widths = imageRatios.map(r => r * cfg.imageHeight);
        const tw = widths.reduce((a, b) => a + b, 0);
        const geo = new THREE.PlaneGeometry(tw, cfg.imageHeight, 200 + slots * 20, 24);
        const pos = geo.attributes.position;
        const uvs = geo.attributes.uv;
        const ox = [], oy = [];
        for (let i = 0; i < pos.count; i++) { ox.push(pos.getX(i)); oy.push(pos.getY(i)); }
        const cum = [0];
        for (let i = 0; i < slots; i++) cum.push(cum[i] + widths[i] / tw);
        for (let i = 0; i < uvs.count; i++) {
            let u = Math.max(0, Math.min(0.999999, uvs.getX(i)));
            for (let j = 0; j < slots; j++) {
                if (u >= cum[j] && u < cum[j + 1]) {
                    let lu = (u - cum[j]) / (cum[j + 1] - cum[j]);
                    let su = Math.max(0.001, Math.min(0.999, lu));
                    uvs.setX(i, cum[j] + su * (cum[j + 1] - cum[j]));
                    break;
                }
            }
        }
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i), y = pos.getY(i), nx = x / (tw / 2);
            pos.setXYZ(i, x, y, -cfg.curvature * 0.4 * (nx * nx - 1));
        }
        for (let i = 0; i < pos.count; i++) {
            let t = Math.max(0, Math.min(1, (ox[i] + tw / 2) / tw));
            const a = t * Math.PI * 2 * cfg.spiralTurns;
            const r = cfg.spiralRadius * (1 - t * 0.12);
            let px = Math.sin(a) * r, pz = Math.cos(a) * r, py = (t - 0.5) * cfg.spiralHeight + oy[i] * 0.35;
            if (!originalPositions[i]) originalPositions[i] = { x: (Math.random() - .5) * .001, y: (Math.random() - .5) * .001, z: (Math.random() - .5) * .001 };
            pos.setXYZ(i, px + originalPositions[i].x, py + originalPositions[i].y, pz + originalPositions[i].z);
        }
        geo.computeVertexNormals();
        const old = spiralMesh.geometry;
        spiralMesh.geometry = geo;
        if (old) old.dispose();
    }

    function createTexture() {
        return new Promise(resolve => {
            const c = document.createElement('canvas'), ctx = c.getContext('2d'), bh = 500;
            let loaded = 0; const imgs = [];
            imageUrls.forEach((url, i) => {
                const img = new Image(); img.crossOrigin = 'Anonymous';
                img.onload = () => { imageRatios[i] = img.naturalWidth / img.naturalHeight; imgs[i] = { img, w: bh * imageRatios[i], h: bh }; if (++loaded === N) finish(); };
                img.onerror = () => { imageRatios[i] = .8; if (++loaded === N) finish(); };
                img.src = url;
            });
            function finish() {
                const tw = imgs.reduce((s, i) => s + (i ? i.w : bh), 0);
                c.width = tw; c.height = bh; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, tw, bh);
                let x = 0; imgs.forEach(d => { if (d?.img) { ctx.drawImage(d.img, x, 0, d.w, d.h); x += d.w; } else x += bh; });
                const tex = new THREE.CanvasTexture(c);
                tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.ClampToEdgeWrapping;
                tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter;
                tex.generateMipmaps = false; resolve(tex);
            }
        });
    }

    async function init() {
        const box = document.getElementById('webgl-container');
        const cvs = document.getElementById('webgl-canvas');
        if (!box || !cvs) return;

        scene = new THREE.Scene();
        // Transparent background so video shows .
        camera = new THREE.PerspectiveCamera(50, box.clientWidth / box.clientHeight, 0.1, 1000);
        camera.position.set(0, 3.5, 9);

        renderer = new THREE.WebGLRenderer({ canvas: cvs, antialias: true, alpha: true });
        renderer.setClearColor(0x000000, 0); // fully transparent
        renderer.setSize(box.clientWidth, box.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const dl = new THREE.DirectionalLight(0xffffff, 0.8);
        dl.position.set(5, 8, 5); scene.add(dl);

        tiltGroup = new THREE.Group();
        tiltGroup.rotation.x = -0.18;
        tiltGroup.rotation.z = 0.12;
        scene.add(tiltGroup);

        const tex = await createTexture();
        mat = new THREE.ShaderMaterial({
            uniforms: { map: { value: tex }, offset: { value: 0 } },
            vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
            fragmentShader: `uniform sampler2D map; uniform float offset; varying vec2 vUv;
        void main(){ float u=vUv.x+offset; if(u>=1.)u-=1.; if(u<0.)u+=1.; gl_FragColor=texture2D(map,vec2(u,vUv.y)); }`,
            transparent: true, side: THREE.DoubleSide
        });

        spiralMesh = new THREE.Mesh(new THREE.BufferGeometry(), mat);
        spiralMesh.position.set(cfg.centerX, cfg.centerY, cfg.centerZ);
        spiralMesh.rotation.x = 0.35;
        tiltGroup.add(spiralMesh);
        rebuildGeometry();

        window.addEventListener('resize', () => {
            camera.aspect = box.clientWidth / box.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(box.clientWidth, box.clientHeight);
        });

        animate();
    }

    function animate() {
        window._spiralAnimId = requestAnimationFrame(animate);
        time += 0.01;

        // Auto-scroll continuously
        scrollOffset += AUTO_SPEED;
        updateUV();

        // Gentle idle sway
        if (tiltGroup) {
            tiltGroup.rotation.x = -0.18 + Math.sin(time * 0.3) * 0.02;
            tiltGroup.rotation.z = 0.12 + Math.cos(time * 0.2) * 0.015;
        }

        renderer.render(scene, camera);
    }

    window.destroySpiral = function () {
        if (window._spiralAnimId) { cancelAnimationFrame(window._spiralAnimId); window._spiralAnimId = null; }
        if (renderer) { renderer.dispose(); renderer = null; }
    };

    init();
};
