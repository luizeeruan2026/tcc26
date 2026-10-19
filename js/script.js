const menuBtn=document.getElementById('menu-btn'),
mobileMenu=document.getElementById('mobile-menu'),
bar1=document.getElementById('bar-1'),
bar2=document.getElementById('bar-2'),
bar3=document.getElementById('bar-3');

let menuOpen=false;

function toggleMenu(){
  menuOpen=!menuOpen;
  menuBtn.setAttribute('aria-expanded',menuOpen);

  if(menuOpen){
    mobileMenu.style.maxHeight=mobileMenu.scrollHeight+'px';
    bar1.classList.add('rotate-45','translate-y-0');
    bar1.classList.remove('-translate-y-1.5');
    bar2.classList.add('opacity-0');
    bar3.classList.add('-rotate-45','translate-y-0');
    bar3.classList.remove('translate-y-1.5');
  }else{
    mobileMenu.style.maxHeight='0px';
    bar1.classList.remove('rotate-45','translate-y-0');
    bar1.classList.add('-translate-y-1.5');
    bar2.classList.remove('opacity-0');
    bar3.classList.remove('-rotate-45','translate-y-0');
    bar3.classList.add('translate-y-1.5');
  }
}

menuBtn.addEventListener('click',toggleMenu);

document.querySelectorAll('.mobile-link').forEach(link=>{
  link.addEventListener('click',()=>{if(menuOpen)toggleMenu()});
});

const header=document.querySelector('header');

window.addEventListener('scroll',()=>{
  const active=window.scrollY>12;
  header.classList.toggle('shadow-lg',active);
  header.classList.toggle('shadow-black/20',active);
});


const prefersReducedMotion=window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const tiltPanel=document.getElementById('tilt-panel');

if(!prefersReducedMotion){
  tiltPanel.addEventListener('mousemove',e=>{
    const r=tiltPanel.getBoundingClientRect(),
    x=(e.clientX-r.left)/r.width,
    y=(e.clientY-r.top)/r.height;

    tiltPanel.style.transform=
      `perspective(900px) rotateX(${(0.5-y)*10}deg) rotateY(${(x-0.5)*10}deg)`;

    tiltPanel.style.setProperty('--mx',`${x*100}%`);
    tiltPanel.style.setProperty('--my',`${y*100}%`);
    tiltPanel.dataset.hover='true';
  });

  tiltPanel.addEventListener('mouseleave',()=>{
    tiltPanel.style.transform=
      'perspective(900px) rotateX(0deg) rotateY(0deg)';
    tiltPanel.dataset.hover='false';
  });

  document.querySelectorAll('.tilt-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect(),
      x=(e.clientX-r.left)/r.width,
      y=(e.clientY-r.top)/r.height;

      card.style.transform=
        `perspective(800px) rotateX(${(0.5-y)*8}deg) rotateY(${(x-0.5)*8}deg) translateY(-2px)`;

      card.style.setProperty('--mx',`${x*100}%`);
      card.style.setProperty('--my',`${y*100}%`);
    });

    card.addEventListener('mouseleave',()=>{
      card.style.transform=
        'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}


(function(){
  const overlay=document.getElementById('boot-overlay'),
  lines=document.getElementById('boot-lines'),
  bar=document.getElementById('boot-bar');

  const messages=[
    '> inicializando sistema NetGuardian...',
    '> sincronizando sensores de rede...',
    '> estabelecendo conexão segura com a nuvem...',
    '> sistema carregado com sucesso pronto para uso.'
  ];

  if(prefersReducedMotion){
    overlay.remove();
    return;
  }

  document.body.style.overflow='hidden';

  let i=0;

  function nextLine(){
    if(i>=messages.length){
      setTimeout(()=>{
        overlay.style.transition='opacity .5s ease,transform .6s ease';
        overlay.style.opacity='0';
        overlay.style.transform='scale(1.03)';

        setTimeout(()=>{
          overlay.remove();
          document.body.style.overflow='';
        },550);
      },250);
      return;
    }

    const p=document.createElement('p');
    p.textContent=messages[i];
    lines.appendChild(p);

    bar.style.transition='width .4s ease';
    bar.style.width=`${((i+1)/messages.length)*100}%`;

    i++;
    setTimeout(nextLine,420);
  }

  setTimeout(nextLine,300);
})();


(function(){
  const finePointer=
    window.matchMedia('(pointer:fine)').matches &&
    !('ontouchstart' in window);

  if(!finePointer)return;

  const cursor=document.getElementById('cursor'),
  ring=document.getElementById('cursor-ring');

  cursor.classList.remove('hidden');
  document.body.classList.add('custom-cursor-on');

  let mx=innerWidth/2,my=innerHeight/2,
  cx=mx,cy=my;

  window.addEventListener('mousemove',e=>{
    mx=e.clientX;
    my=e.clientY;
  });

  function raf(){
    cx+=(mx-cx)*.18;
    cy+=(my-cy)*.18;
    cursor.style.transform=`translate(${cx}px,${cy}px)`;
    requestAnimationFrame(raf);
  }

  raf();

  document.querySelectorAll('a,button,.tilt-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
      ring.classList.add('cursor-hover');
    });

    el.addEventListener('mouseleave',()=>{
      ring.classList.remove('cursor-hover');
    });
  });
})();


(function(){
  const navLinks=document.querySelectorAll('.nav-link');

  const sections=Array.from(navLinks)
    .map(l=>document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;

      const id='#'+entry.target.id;

      navLinks.forEach(link=>{
        link.classList.toggle(
          'active',
          link.getAttribute('href')===id
        );
      });
    });
  },{
    rootMargin:'-45% 0px -50% 0px'
  });

  sections.forEach(section=>observer.observe(section));
})();


if(!prefersReducedMotion){
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect(),
      x=e.clientX-r.left-r.width/2,
      y=e.clientY-r.top-r.height/2;

      btn.style.transform=
        `translate(${x*.25}px,${y*.3}px)`;
    });

    btn.addEventListener('mouseleave',()=>{
      btn.style.transform='translate(0,0)';
    });
  });
}


(function(){
  const container=document.getElementById('log-lines');

  const hosts=[
    '192.168.0.14',
    '192.168.0.22',
    '192.168.0.31',
    '192.168.0.47',
    '192.168.0.9'
  ];

  const kinds=[
    {
      text:h=>`pkt tcp · ${h} → api.cloud.net · ${(Math.random()*2+.2).toFixed(1)}KB`,
      alert:false
    },
    {
      text:h=>`pkt tls · ${h} → cdn.edge.net · ${(Math.random()*4+.5).toFixed(1)}KB`,
      alert:false
    },
    {
      text:h=>`pkt dns · ${h} → resolver.local`,
      alert:false
    },
    {
      text:h=>`⚠ pkt não classificado · ${h} → host desconhecido`,
      alert:true
    }
  ];

  const MAX_LINES=3;
  let lines=[];

  const pad=n=>n.toString().padStart(2,'0');

  function pushLine(){
    const now=new Date(),
    time=`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    host=hosts[Math.floor(Math.random()*hosts.length)],
    kind=kinds[Math.floor(Math.random()*kinds.length)];

    lines.push({
      text:`[${time}] ${kind.text(host)}`,
      alert:kind.alert
    });

    if(lines.length>MAX_LINES)lines.shift();

    container.innerHTML='';

    lines.forEach(l=>{
      const div=document.createElement('div');
      div.className='log-line '+(l.alert?'text-alert':'text-muted');
      div.textContent=l.text;
      container.appendChild(div);
    });
  }

  pushLine();
  setInterval(pushLine,1600);
})();


(function(){
  const canvas=document.getElementById('hero-canvas'),
  scene=new THREE.Scene(),
  camera=new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth/canvas.clientHeight,
    .1,
    1000
  );

  camera.position.z=13;

  const renderer=new THREE.WebGLRenderer({
    canvas,
    alpha:true,
    antialias:true
  });

  renderer.setPixelRatio(Math.min(devicePixelRatio,2));

  function resize(){
    const w=canvas.clientWidth,
    h=canvas.clientHeight;

    renderer.setSize(w,h,false);
    camera.aspect=w/h;
    camera.updateProjectionMatrix();
  }

  addEventListener('resize',resize);

  const group=new THREE.Group();
  scene.add(group);


  const core=new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.4,1),
    new THREE.MeshBasicMaterial({
      color:0x2DD4BF,
      wireframe:true,
      transparent:true,
      opacity:.45
    })
  );

  group.add(core);


  const isMobile=innerWidth<640,
  NODE_COUNT=isMobile?46:74,
  radius=5.6,
  nodePositions=[];

  for(let i=0;i<NODE_COUNT;i++){
    const phi=Math.acos(-1+(2*i)/NODE_COUNT),
    theta=Math.sqrt(NODE_COUNT*Math.PI)*phi;

    nodePositions.push(
      new THREE.Vector3(
        radius*Math.cos(theta)*Math.sin(phi),
        radius*Math.sin(theta)*Math.sin(phi),
        radius*Math.cos(phi)
      )
    );
  }


  group.add(new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(nodePositions),
    new THREE.PointsMaterial({
      color:0x2DD4BF,
      size:.12,
      transparent:true,
      opacity:.85
    })
  ));


  const alertIdx=[
    Math.floor(NODE_COUNT*.15),
    Math.floor(NODE_COUNT*.5),
    Math.floor(NODE_COUNT*.8)
  ];

  group.add(new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(
      alertIdx.map(i=>nodePositions[i])
    ),
    new THREE.PointsMaterial({
      color:0xFB7185,
      size:.24,
      transparent:true,
      opacity:1
    })
  ));


  const lineVerts=[],
  threshold=2.5;

  for(let i=0;i<nodePositions.length;i++){
    for(let j=i+1;j<nodePositions.length;j++){
      if(nodePositions[i].distanceTo(nodePositions[j])<threshold){
        lineVerts.push(nodePositions[i],nodePositions[j]);
      }
    }
  }

  group.add(new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(lineVerts),
    new THREE.LineBasicMaterial({
      color:0x2DD4BF,
      transparent:true,
      opacity:.1
    })
  ));


  let mouseX=0,
  mouseY=0;

  addEventListener('mousemove',e=>{
    mouseX=e.clientX/innerWidth-.5;
    mouseY=e.clientY/innerHeight-.5;
  });


  const reduceMotion=window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  let heroVisible=true;

  const heroSection=document.getElementById('top');

  new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      heroVisible=e.isIntersecting;
    });
  }).observe(heroSection);


  addEventListener('scroll',()=>{
    const fade=Math.max(
      0,
      1-scrollY/(heroSection.offsetHeight*.8)
    );

    canvas.style.opacity=fade;
  });


  function animate(){
    requestAnimationFrame(animate);

    if(!heroVisible)return;

    if(!reduceMotion){
      group.rotation.y+=.0016;
      group.rotation.x+=(mouseY*.35-group.rotation.x)*.02;
      group.rotation.y+=mouseX*.0006;
      core.rotation.y-=.001;
    }

    renderer.render(scene,camera);
  }

  resize();
  animate();
})();

// ---------- Abas de "Como funciona" ----------
    const stepTabs = document.querySelectorAll('.step-tab');
    const stepContents = document.querySelectorAll('.step-content');
    stepTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.step;


        stepTabs.forEach((t) => {
          t.classList.remove('active', 'border-accent', 'bg-accent/10', 'text-ink');
          t.classList.add('border-line', 'text-muted');
        });
        tab.classList.add('active', 'border-accent', 'bg-accent/10', 'text-ink');
        tab.classList.remove('border-line', 'text-muted');


        stepContents.forEach((content) => {
          content.classList.toggle('hidden', content.dataset.step !== target);
        });
      });
    });


    // ---------- Contadores animados (Benefícios) ----------
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 900;
          const start = performance.now();


          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
          }
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => counterObserver.observe(c));


    // ---------- Boot sequence ----------
    (function () {
      const overlay = document.getElementById('boot-overlay');
      const linesEl = document.getElementById('boot-lines');
      const bar = document.getElementById('boot-bar');
      const messages = [
        '> inicializando núcleo do net guardian...',
        '> sincronizando sensores de rede...',
        '> estabelecendo conexão segura com a nuvem...',
        '> sistema pronto.'
      ];


      if (prefersReducedMotion) {
        overlay.remove();
        return;
      }


      document.body.style.overflow = 'hidden';
      let i = 0;


      function nextLine() {
        if (i >= messages.length) {
          setTimeout(() => {
            overlay.style.transition = 'opacity 0.5s ease, transform 0.6s ease';
            overlay.style.opacity = '0';
            overlay.style.transform = 'scale(1.03)';
            setTimeout(() => {
              overlay.remove();
              document.body.style.overflow = '';
            }, 550);
          }, 250);
          return;
        }
        const p = document.createElement('p');
        p.textContent = messages[i];
        linesEl.appendChild(p);
        bar.style.transition = 'width 0.4s ease';
        bar.style.width = `${((i + 1) / messages.length) * 100}%`;
        i++;
        setTimeout(nextLine, 420);
      }
      setTimeout(nextLine, 300);
    })();




// alguns nós de alerta (comportamento suspeito)
      const alertIdx = [Math.floor(NODE_COUNT * 0.15), Math.floor(NODE_COUNT * 0.5), Math.floor(NODE_COUNT * 0.8)];
      const alertGeo = new THREE.BufferGeometry().setFromPoints(alertIdx.map(i => nodePositions[i]));
      const alertMat = new THREE.PointsMaterial({ color: 0xFB7185, size: 0.24, transparent: true, opacity: 1 });
      group.add(new THREE.Points(alertGeo, alertMat));


      // linhas conectando nós próximos (malha da rede)
      const lineVerts = [];
      const threshold = 2.5;
      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          if (nodePositions[i].distanceTo(nodePositions[j]) < threshold) {
            lineVerts.push(nodePositions[i], nodePositions[j]);
          }
        }
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(lineVerts);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x2DD4BF, transparent: true, opacity: 0.1 });
      group.add(new THREE.LineSegments(lineGeo, lineMat));


      let mouseX = 0, mouseY = 0;
      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
      });


      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
