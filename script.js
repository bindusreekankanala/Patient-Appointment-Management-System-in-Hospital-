/* =======================================================================
   FILE        : script.js
   PROJECT     : Patient Appointment Management System in Hospital
   DESCRIPTION : All JavaScript — data, state, routing, DOM, localStorage,
                 form validation, async/await, Geolocation API
   LINK IN HTML: <script src="script.js"></script>  (before </body>)
======================================================================= */
'use strict';
/* =====================================================================
   JS SECTION 1 — DATA: Doctor & Hospital Database  (CO3: Arrays/Objects)
===================================================================== */
const DOCTORS = [
  { id:1,  name:'Dr. Arjun Mehta',     spec:'Cardiology',       exp:15, rating:4.9, fee:800,  slots:['9:00AM','10:00AM','2:00PM','4:00PM'],  hospital:'Apollo Hospital',   city:'Mumbai',    avatar:'👨‍⚕️', avail:true,  edu:'MBBS, MD – AIIMS Delhi',     bio:'Specialist in interventional cardiology with 15+ years of experience.' },
  { id:2,  name:'Dr. Priya Sharma',    spec:'Neurology',        exp:12, rating:4.8, fee:900,  slots:['8:00AM','11:00AM','3:00PM','5:00PM'],  hospital:'NIMHANS',           city:'Bangalore', avatar:'👩‍⚕️', avail:true,  edu:'MBBS, DM – CMC Vellore',     bio:'Expert in epilepsy, stroke and neuro-rehabilitation.' },
  { id:3,  name:'Dr. Ramesh Iyer',     spec:'Orthopedics',      exp:18, rating:4.7, fee:700,  slots:['9:30AM','1:00PM','3:30PM'],            hospital:'Fortis Hospital',   city:'Chennai',   avatar:'🧑‍⚕️', avail:true,  edu:'MBBS, MS Ortho – KEM Mumbai', bio:'Joint replacement and sports injury specialist.' },
  { id:4,  name:'Dr. Sneha Patel',     spec:'Pediatrics',       exp:10, rating:4.9, fee:600,  slots:['8:30AM','10:30AM','12:00PM','4:00PM'], hospital:'Rainbow Children',  city:'Hyderabad', avatar:'👩‍⚕️', avail:true,  edu:'MBBS, DCH – Grant Medical',  bio:'Caring for children from newborns to adolescents.' },
  { id:5,  name:'Dr. Vikram Nair',     spec:'Dermatology',      exp:9,  rating:4.6, fee:650,  slots:['10:00AM','11:30AM','2:30PM','5:00PM'], hospital:'Skin Clinic Plus',  city:'Delhi',     avatar:'👨‍⚕️', avail:true,  edu:'MBBS, DVD – Maulana Azad',   bio:'Skin, hair & cosmetic dermatology expert.' },
  { id:6,  name:'Dr. Ananya Roy',      spec:'Gynecology',       exp:14, rating:4.8, fee:750,  slots:['9:00AM','11:00AM','2:00PM'],           hospital:'Medanta Hospital',  city:'Kolkata',   avatar:'👩‍⚕️', avail:true,  edu:'MBBS, MS – IPGMER Kolkata',  bio:'Obstetrics, IVF and high-risk pregnancy management.' },
  { id:7,  name:'Dr. Sanjay Kapoor',   spec:'General Medicine', exp:20, rating:4.7, fee:500,  slots:['8:00AM','9:30AM','11:00AM','4:30PM'],  hospital:'City Care Hospital', city:'Mumbai',   avatar:'🧑‍⚕️', avail:true,  edu:'MBBS, MD – BJ Medical Pune', bio:'Comprehensive primary care and preventive medicine.' },
  { id:8,  name:'Dr. Lakshmi Menon',   spec:'ENT',              exp:11, rating:4.5, fee:600,  slots:['9:00AM','12:00PM','3:00PM','6:00PM'],  hospital:'ENT Speciality',    city:'Chennai',   avatar:'👩‍⚕️', avail:false, edu:'MBBS, MS ENT – Madras Med', bio:'Head, neck, ear and sinus surgery specialist.' },
  { id:9,  name:'Dr. Rohit Gupta',     spec:'Ophthalmology',    exp:13, rating:4.8, fee:700,  slots:['8:30AM','10:00AM','1:00PM','3:30PM'],  hospital:'Eye Care Centre',   city:'Delhi',     avatar:'👨‍⚕️', avail:true,  edu:'MBBS, MS Ophth – AIIMS',    bio:'Cataract, LASIK and retinal disease expert.' },
  { id:10, name:'Dr. Divya Krishnan',  spec:'Cardiology',       exp:8,  rating:4.6, fee:850,  slots:['9:00AM','11:30AM','4:00PM'],           hospital:'Heart Institute',   city:'Bangalore', avatar:'👩‍⚕️', avail:true,  edu:'MBBS, DM Cardio – NIMHANS', bio:'Non-invasive cardiology and echocardiography.' },
  { id:11, name:'Dr. Aditya Bansal',   spec:'Neurology',        exp:7,  rating:4.5, fee:800,  slots:['10:00AM','2:00PM','5:00PM'],           hospital:'Brain & Spine',     city:'Hyderabad', avatar:'👨‍⚕️', avail:true,  edu:'MBBS, DM – Nizam\'s Institute', bio:'Headache, Parkinson\'s and movement disorder specialist.' },
  { id:12, name:'Dr. Meena Joshi',     spec:'Dermatology',      exp:16, rating:4.9, fee:700,  slots:['9:30AM','11:00AM','3:00PM','5:30PM'], hospital:'Glow Derma Clinic', city:'Mumbai',    avatar:'👩‍⚕️', avail:true,  edu:'MBBS, MD Derma – KEM',       bio:'Acne, psoriasis, hair loss and aesthetic treatments.' },
];

const HOSPITALS = [
  { id:1, name:'Apollo Hospital',      city:'Mumbai',    addr:'Greams Road, Nungambakkam', phone:'044-28290200', type:'Multi-Specialty', beds:750, rating:4.8, lat:19.076, lng:72.877, services:['Cardiology','Neurology','Oncology','ICU'] },
  { id:2, name:'Fortis Hospital',      city:'Chennai',   addr:'Arcot Road, Vadapalani',   phone:'044-24774444', type:'Multi-Specialty', beds:600, rating:4.7, lat:13.072, lng:80.272, services:['Orthopedics','Transplant','Robotic Surgery'] },
  { id:3, name:'NIMHANS',              city:'Bangalore', addr:'Hosur Road, Bangalore',    phone:'080-46110007', type:'Neurological',    beds:900, rating:4.9, lat:12.971, lng:77.594, services:['Neurology','Psychiatry','Neurosurgery'] },
  { id:4, name:'Rainbow Children',     city:'Hyderabad', addr:'Road No 2, Banjara Hills',  phone:'040-44558585', type:'Pediatric',       beds:200, rating:4.8, lat:17.385, lng:78.486, services:['Pediatrics','Neonatology','PICU'] },
  { id:5, name:'Medanta Hospital',     city:'Kolkata',   addr:'DLF Cyber City, Gurugram',  phone:'0124-4141414', type:'Multi-Specialty', beds:1250,rating:4.7, lat:22.572, lng:88.363, services:['Cardiology','Gynecology','Cancer Care'] },
  { id:6, name:'City Care Hospital',   city:'Mumbai',    addr:'Andheri East, Mumbai',      phone:'022-26836666', type:'General',         beds:300, rating:4.5, lat:19.113, lng:72.868, services:['General Medicine','Surgery','Maternity'] },
  { id:7, name:'Heart Institute',      city:'Bangalore', addr:'Jayanagar, Bangalore',      phone:'080-46688888', type:'Cardiac',         beds:180, rating:4.9, lat:12.930, lng:77.583, services:['Cardiology','Cardiac Surgery','Cath Lab'] },
  { id:8, name:'Eye Care Centre',      city:'Delhi',     addr:'Safdarjung Enclave, Delhi', phone:'011-26183405', type:'Ophthalmology',   beds:120, rating:4.8, lat:28.644, lng:77.209, services:['LASIK','Cataract','Retina','Glaucoma'] },
];

const HEALTH_TIPS = [
  { cat:'nutrition', icon:'🥗', title:'Eat a Rainbow Daily',    body:'Include fruits and vegetables of 5 different colours every day to ensure a wide range of vitamins, minerals, and antioxidants for optimal health.' },
  { cat:'nutrition', icon:'💧', title:'Stay Hydrated',           body:'Drink at least 8 glasses (2 litres) of water daily. Proper hydration improves cognition, energy levels, and digestion significantly.' },
  { cat:'fitness',   icon:'🚶', title:'Walk 10,000 Steps',       body:'A daily 10,000 step goal reduces the risk of cardiovascular disease by up to 30%. Start with 5,000 and build up gradually.' },
  { cat:'fitness',   icon:'🏋️', title:'Strength Train 2×/Week',  body:'Resistance training twice a week maintains muscle mass, strengthens bones, and boosts metabolism even at rest.' },
  { cat:'mental',    icon:'🧘', title:'Practice Mindfulness',    body:'Just 10 minutes of daily meditation reduces cortisol (stress hormone) levels by 14%, improving focus and emotional resilience.' },
  { cat:'mental',    icon:'🤝', title:'Social Connections',      body:'Strong social ties are linked to a 50% increased likelihood of longer life. Make time for friends and family every week.' },
  { cat:'sleep',     icon:'😴', title:'Sleep 7–9 Hours',         body:'Consistent quality sleep is the cornerstone of immune function, memory consolidation, and mood regulation. Avoid screens 1 hour before bed.' },
  { cat:'sleep',     icon:'🌙', title:'Keep a Sleep Schedule',   body:'Going to bed and waking at the same time daily — even on weekends — resets your circadian rhythm and dramatically improves sleep quality.' },
  { cat:'prevention',icon:'🦷', title:'Brush & Floss Daily',    body:'Oral bacteria are linked to heart disease and diabetes. Brush twice a day, floss once, and visit a dentist every 6 months.' },
  { cat:'prevention',icon:'☀️', title:'Apply Sunscreen Daily',   body:'UV exposure is the #1 cause of skin ageing and skin cancer. Use SPF 30+ every morning, even on cloudy days.' },
  { cat:'nutrition', icon:'🐟', title:'Eat Omega-3 Rich Foods',  body:'Fatty fish, walnuts, and flaxseed are rich in omega-3 fatty acids that reduce inflammation, triglycerides, and blood pressure.' },
  { cat:'fitness',   icon:'🧗', title:'Take the Stairs',         body:'Climbing stairs burns 8× more calories than the elevator. This simple habit adds cardio into your daily routine effortlessly.' },
];

const EMERGENCY_CONTACTS = [
  { icon:'🚑', name:'National Ambulance', phone:'108', desc:'Free ambulance service 24/7' },
  { icon:'🚒', name:'Fire Emergency',     phone:'101', desc:'Fire brigade & rescue' },
  { icon:'🚓', name:'Police Emergency',   phone:'100', desc:'Law enforcement emergency' },
  { icon:'📞', name:'General Emergency',  phone:'112', desc:'All-in-one emergency line' },
  { icon:'👶', name:'Child Helpline',     phone:'1098',desc:'Child abuse & missing child' },
  { icon:'🧠', name:'Mental Health',      phone:'iCall 9152987821', desc:'Free psychological counselling' },
  { icon:'💉', name:'Poison Control',     phone:'1800-116-117', desc:'24/7 poison emergency line' },
  { icon:'🩺', name:'Medical Advice',     phone:'104', desc:'ASHA / health helpline' },
];

const SAMPLE_REVIEWS = [
  { doctor:'Dr. Arjun Mehta', rating:5, title:'Excellent Doctor!', body:'Dr. Mehta was extremely thorough and compassionate. He took time to explain every step of my treatment. Highly recommended!', author:'Rajesh K.', date:'2025-03-15' },
  { doctor:'Dr. Priya Sharma', rating:4, title:'Very knowledgeable', body:'Great experience overall. The wait time was a bit long but the consultation was worth it. Dr. Sharma really knows her subject.', author:'Anita M.', date:'2025-04-02' },
  { doctor:'Dr. Sneha Patel', rating:5, title:'Best paediatrician!', body:'My toddler always feels comfortable with Dr. Patel. She has a wonderful way with children. We won\'t see anyone else!', author:'Pooja S.', date:'2025-04-18' },
  { doctor:'Dr. Sanjay Kapoor', rating:4, title:'Good general physician', body:'Very systematic diagnosis and clear prescription. He listens patiently and explains everything. Clinic is clean and staff polite.', author:'Vijay R.', date:'2025-05-01' },
];

/* =====================================================================
   JS SECTION 2 — STATE MANAGEMENT  (CO3: Objects, variables)
===================================================================== */
let state = {
  user: JSON.parse(localStorage.getItem('medicare_user')) || null,
  appointments: JSON.parse(localStorage.getItem('medicare_appts')) || [],
  reports: JSON.parse(localStorage.getItem('medicare_reports')) || [],
  reminders: JSON.parse(localStorage.getItem('medicare_reminders')) || [],
  reviews: JSON.parse(localStorage.getItem('medicare_reviews')) || [...SAMPLE_REVIEWS],
  currentPage: 'home',
  booking: { doctor: null, date: null, time: null },
  calMonth: new Date().getMonth(),
  calYear: new Date().getFullYear(),
  selectedDoctor: null,
  selectedRating: 0,
};

const save = (key, data) => localStorage.setItem(`medicare_${key}`, JSON.stringify(data));

/* =====================================================================
   JS SECTION 3 — SPA ROUTER  (CO4: DOM manipulation, event handling)
===================================================================== */
function navigate(page) {
  // Guard dashboard/reports/reminders — redirect to auth if not logged in
  const authRequired = ['dashboard','reports','reminders'];
  if (authRequired.includes(page) && !state.user) {
    showToast('Please log in to access this page.', 'warn');
    page = 'auth';
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });

  // Close mobile nav
  document.getElementById('mobileNav').classList.add('hidden');

  state.currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger page-specific init
  if (page === 'doctors')   initDoctors();
  if (page === 'hospitals') initHospitals();
  if (page === 'booking')   initBooking();
  if (page === 'dashboard') initDashboard();
  if (page === 'reports')   initReports();
  if (page === 'reminders') initReminders();
  if (page === 'reviews')   initReviews();
  if (page === 'tips')      initTips();
  if (page === 'emergency') initEmergency();
}

// Delegate all [data-page] clicks
document.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (el) { e.preventDefault(); navigate(el.dataset.page); }
});

/* =====================================================================
   JS SECTION 4 — DARK MODE TOGGLE  (CO4: DOM, localStorage)
===================================================================== */
(function initTheme() {
  const saved = localStorage.getItem('medicare_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('darkToggle').textContent = saved === 'dark' ? '☀️' : '🌙';
})();

document.getElementById('darkToggle').addEventListener('click', () => {
  const curr = document.documentElement.getAttribute('data-theme');
  const next = curr === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('medicare_theme', next);
  document.getElementById('darkToggle').textContent = next === 'dark' ? '☀️' : '🌙';
  showToast(`${next === 'dark' ? '🌙 Dark' : '☀️ Light'} mode activated`, 'info');
});

/* =====================================================================
   JS SECTION 5 — MOBILE NAV
===================================================================== */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('hidden');
});

/* =====================================================================
   JS SECTION 6 — AUTH: Login / Register  (CO5: form validation)
===================================================================== */
// Tab switching
document.getElementById('tabLogin').addEventListener('click', () => {
  document.getElementById('tabLogin').classList.add('active');
  document.getElementById('tabRegister').classList.remove('active');
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('registerForm').classList.add('hidden');
});
document.getElementById('tabRegister').addEventListener('click', () => {
  document.getElementById('tabRegister').classList.add('active');
  document.getElementById('tabLogin').classList.remove('active');
  document.getElementById('registerForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');
});

function showErr(id, show = true) {
  document.getElementById(id).classList.toggle('show', show);
}
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function validatePhone(p) { return /^[0-9+\s\-]{7,15}$/.test(p); }

// Password strength  (CO3: conditions, functions)
document.getElementById('regPass').addEventListener('input', function () {
  const v = this.value;
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  const fill = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');
  const widths = ['0%','25%','50%','75%','100%'];
  const colors = ['','#e53935','#fb8c00','#fdd835','#2e7d32'];
  const labels = ['','Weak','Fair','Good','Strong 💪'];
  fill.style.width = widths[s];
  fill.style.background = colors[s];
  label.textContent = labels[s];
  label.style.color = colors[s];
});

// LOGIN  (CO5: form validation, localStorage)
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  let valid = true;

  showErr('loginEmailErr', !validateEmail(email));
  if (!validateEmail(email)) valid = false;

  showErr('loginPassErr', !pass);
  if (!pass) valid = false;

  if (!valid) return;

  // Simulate async login (CO4: Promises / async-await)
  const btn = this.querySelector('button[type="submit"]');
  btn.innerHTML = '<span class="spinner"></span> Logging in…';
  btn.disabled = true;

  await new Promise(r => setTimeout(r, 1000)); // Simulate network

  const users = JSON.parse(localStorage.getItem('medicare_users') || '[]');
  const found = users.find(u => u.email === email && u.password === pass);

  if (found) {
    state.user = found;
    save('user', found);
    updateAuthUI();
    showToast(`Welcome back, ${found.firstName}! 👋`, 'success');
    navigate('dashboard');
  } else {
    showToast('Invalid email or password.', 'error');
  }
  btn.innerHTML = 'Login →';
  btn.disabled = false;
});

// REGISTER
document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const first  = document.getElementById('regFirst').value.trim();
  const last   = document.getElementById('regLast').value.trim();
  const email  = document.getElementById('regEmail').value.trim();
  const phone  = document.getElementById('regPhone').value.trim();
  const dob    = document.getElementById('regDOB').value;
  const gender = document.getElementById('regGender').value;
  const pass   = document.getElementById('regPass').value;
  const pass2  = document.getElementById('regPass2').value;
  const terms  = document.getElementById('termsChk').checked;
  let valid = true;

  const checks = [
    ['regFirstErr',  !first],
    ['regLastErr',   !last],
    ['regEmailErr',  !validateEmail(email)],
    ['regPhoneErr',  !validatePhone(phone)],
    ['regDOBErr',    !dob],
    ['regGenderErr', !gender],
    ['regPassErr',   pass.length < 8],
    ['regPass2Err',  pass !== pass2],
    ['termsErr',     !terms],
  ];
  checks.forEach(([id, cond]) => { showErr(id, cond); if (cond) valid = false; });
  if (!valid) return;

  const btn = this.querySelector('button[type="submit"]');
  btn.innerHTML = '<span class="spinner"></span> Creating account…';
  btn.disabled = true;

  await new Promise(r => setTimeout(r, 1200));

  const users = JSON.parse(localStorage.getItem('medicare_users') || '[]');
  if (users.find(u => u.email === email)) {
    showToast('Email already registered. Please login.', 'warn');
    btn.innerHTML = 'Create Account →'; btn.disabled = false;
    return;
  }

  const newUser = { id: Date.now(), firstName: first, lastName: last, email, phone, dob, gender, password: pass };
  users.push(newUser);
  localStorage.setItem('medicare_users', JSON.stringify(users));
  state.user = newUser;
  save('user', newUser);
  updateAuthUI();
  showToast(`Account created! Welcome, ${first} 🎉`, 'success');
  navigate('dashboard');
  btn.innerHTML = 'Create Account →'; btn.disabled = false;
});

// GUEST login
document.getElementById('guestBtn').addEventListener('click', () => {
  state.user = { firstName: 'Guest', lastName: 'User', email: 'guest@medicare.com', id: 0 };
  save('user', state.user);
  updateAuthUI();
  showToast('Logged in as Guest 👤', 'info');
  navigate('home');
});

// LOGOUT
document.getElementById('logoutBtn').addEventListener('click', e => {
  e.preventDefault();
  state.user = null;
  localStorage.removeItem('medicare_user');
  updateAuthUI();
  showToast('Logged out successfully. 👋', 'info');
  navigate('home');
});

function updateAuthUI() {
  const loggedIn = !!state.user;
  document.getElementById('loginBtn').classList.toggle('hidden', loggedIn);
  document.getElementById('dashBtn').classList.toggle('hidden', !loggedIn);
  if (loggedIn) {
    document.getElementById('dashAvatar').textContent = state.user.firstName?.[0] || '👤';
    document.getElementById('dashName').textContent = `${state.user.firstName} ${state.user.lastName || ''}`.trim();
    document.getElementById('dashEmail').textContent = state.user.email || '';
  }
}
updateAuthUI();

/* =====================================================================
   JS SECTION 7 — DOCTORS PAGE  (CO3: loops, filter, DOM)
===================================================================== */
let activeSpec = 'all';

function initDoctors() {
  renderDoctors(DOCTORS);
  // Populate review doctor select
  const sel = document.getElementById('revDoctor');
  sel.innerHTML = '<option value="">— Select —</option>';
  DOCTORS.forEach(d => sel.innerHTML += `<option>${d.name}</option>`);
}

function renderDoctors(list) {
  const grid = document.getElementById('doctorsGrid');
  if (!list.length) { grid.innerHTML = '<p style="color:var(--txt-m);padding:2rem">No doctors found.</p>'; return; }

  grid.innerHTML = list.map(d => `
    <article class="doctor-card" data-id="${d.id}">
      <div class="doctor-card-top">
        <div class="doctor-avatar">${d.avatar}</div>
        <h4>${d.name}</h4>
        <div class="spec">${d.spec} · ${d.city}</div>
      </div>
      <div class="doctor-card-body">
        <div class="doctor-meta">
          <div class="doctor-meta-item"><strong>${d.exp}yr</strong>Experience</div>
          <div class="doctor-meta-item"><strong>₹${d.fee}</strong>Fee</div>
          <div class="doctor-meta-item"><strong>${d.rating}⭐</strong>Rating</div>
        </div>
        <div class="avail-slots">${d.slots.slice(0,3).map(s => `<div class="slot">${s}</div>`).join('')}</div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="badge ${d.avail ? 'badge-success' : 'badge-danger'}">${d.avail ? '✅ Available' : '❌ Unavailable'}</span>
          <button class="btn btn-primary btn-sm" onclick="openDoctorModal(${d.id})">View →</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Filter buttons  (CO3: arrow functions, conditions)
document.getElementById('specialtyFilters').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeSpec = btn.dataset.spec;
  filterDoctors();
});

document.getElementById('docSearch').addEventListener('input', filterDoctors);
document.getElementById('docFilter').addEventListener('change', filterDoctors);

function filterDoctors() {
  const q    = document.getElementById('docSearch').value.toLowerCase();
  const spec = document.getElementById('docFilter').value;
  const filtered = DOCTORS.filter(d => {
    const matchSpec   = (activeSpec === 'all' || d.spec === activeSpec) && (!spec || d.spec === spec);
    const matchSearch = d.name.toLowerCase().includes(q) || d.spec.toLowerCase().includes(q) || d.city.toLowerCase().includes(q);
    return matchSpec && matchSearch;
  });
  renderDoctors(filtered);
}

// Quick search from home page
document.getElementById('quickSearchBtn').addEventListener('click', () => {
  const q    = document.getElementById('qs-name').value;
  const spec = document.getElementById('qs-spec').value;
  document.getElementById('docSearch').value = q;
  document.getElementById('docFilter').value = spec;
  navigate('doctors');
  filterDoctors();
});

/* =====================================================================
   JS SECTION 8 — DOCTOR MODAL
===================================================================== */
function openDoctorModal(id) {
  const d = DOCTORS.find(doc => doc.id === id);
  if (!d) return;
  state.selectedDoctor = d;
  document.getElementById('doctorModalContent').innerHTML = `
    <div style="text-align:center;margin-bottom:1.2rem">
      <div style="font-size:3.5rem;margin-bottom:.4rem">${d.avatar}</div>
      <h3 style="font-size:1.25rem">${d.name}</h3>
      <div class="tag">${d.spec}</div>
      <div style="font-size:.85rem;color:var(--txt-m);margin-top:.4rem">${d.hospital} · ${d.city}</div>
    </div>
    <div class="grid-2" style="gap:.8rem;margin-bottom:1rem;font-size:.88rem">
      <div class="card" style="box-shadow:none"><strong>📚 Education</strong><br/><span style="color:var(--txt-m)">${d.edu}</span></div>
      <div class="card" style="box-shadow:none"><strong>⏱ Experience</strong><br/><span style="color:var(--txt-m)">${d.exp} years</span></div>
      <div class="card" style="box-shadow:none"><strong>💰 Consultation Fee</strong><br/><span style="color:var(--primary);font-weight:700">₹${d.fee}</span></div>
      <div class="card" style="box-shadow:none"><strong>⭐ Rating</strong><br/><span style="color:#f59e0b;font-weight:700">${d.rating} / 5</span></div>
    </div>
    <p style="font-size:.9rem;margin-bottom:1rem">${d.bio}</p>
    <div><strong style="font-size:.85rem">Available Slots:</strong>
      <div class="time-slots" style="margin-top:.5rem">${d.slots.map(s => `<div class="time-slot">${s}</div>`).join('')}</div>
    </div>
  `;
  document.getElementById('doctorModal').classList.remove('hidden');
}

document.getElementById('closeDoctorModal').addEventListener('click', () => {
  document.getElementById('doctorModal').classList.add('hidden');
});
document.getElementById('doctorModal').addEventListener('click', e => {
  if (e.target === document.getElementById('doctorModal')) document.getElementById('doctorModal').classList.add('hidden');
});
document.getElementById('modalBookBtn').addEventListener('click', () => {
  document.getElementById('doctorModal').classList.add('hidden');
  navigate('booking');
  if (state.selectedDoctor) prefillBookingDoctor(state.selectedDoctor);
});

function prefillBookingDoctor(d) {
  document.getElementById('bookSpec').value = d.spec;
  populateBookingDoctors(d.spec);
  document.getElementById('bookDoc').value = d.id;
  showDoctorPreview(d);
}

/* =====================================================================
   JS SECTION 9 — HOSPITALS / MAP  (CO5: Geolocation API)
===================================================================== */
function initHospitals() { renderHospitals(HOSPITALS); }

function renderHospitals(list) {
  document.getElementById('hospitalCount').textContent = `Showing ${list.length} hospital${list.length !== 1 ? 's' : ''}`;
  document.getElementById('hospitalsList').innerHTML = list.map(h => `
    <article class="hospital-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.6rem">
        <h4>🏥 ${h.name}</h4>
        <span class="badge badge-success">${h.rating}⭐</span>
      </div>
      <div class="hospital-info">
        <span>📍 ${h.addr}, ${h.city}</span>
        <span>📞 <a href="tel:${h.phone}">${h.phone}</a></span>
        <span>🏷️ ${h.type} · 🛏 ${h.beds} beds</span>
        <span>⚕️ ${h.services.join(' · ')}</span>
      </div>
      <div style="margin-top:.8rem;display:flex;gap:.5rem;flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" onclick="bookAtHospital('${h.name}')">📅 Book Here</button>
        <a href="https://www.google.com/maps?q=${h.lat},${h.lng}" target="_blank" class="btn btn-outline btn-sm">🗺️ Get Directions</a>
      </div>
    </article>
  `).join('');
}

function bookAtHospital(name) { navigate('booking'); showToast(`Booking at ${name}`, 'info'); }

// Geolocation  (CO5: async, Geolocation API)
document.getElementById('locateBtn').addEventListener('click', async () => {
  if (!navigator.geolocation) { showToast('Geolocation not supported.', 'error'); return; }
  const btn = document.getElementById('locateBtn');
  btn.textContent = '⌛ Locating…';
  btn.disabled = true;

  try {
    const pos = await new Promise((res, rej) =>
      navigator.geolocation.getCurrentPosition(res, rej, { timeout: 8000 })
    );
    const { latitude: lat, longitude: lng } = pos.coords;
    showToast(`📍 Location found: ${lat.toFixed(3)}, ${lng.toFixed(3)}`, 'success');
    simulateMapWithLocation(lat, lng);
    // Sort hospitals by simulated distance
    const sorted = [...HOSPITALS].sort((a, b) => {
      const da = Math.hypot(a.lat - lat, a.lng - lng);
      const db = Math.hypot(b.lat - lat, b.lng - lng);
      return da - db;
    });
    renderHospitals(sorted);
    document.getElementById('hospitalCount').textContent = `Showing hospitals nearest to your location`;
  } catch {
    showToast('Could not get your location. Try searching manually.', 'warn');
  }
  btn.textContent = '📍 My Location';
  btn.disabled = false;
});

function simulateMapWithLocation(lat, lng) {
  const map = document.getElementById('mapSimulated');
  document.getElementById('mapStatus').textContent = `📍 Your location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  // Draw pins
  const pins = document.getElementById('mapPins');
  pins.innerHTML = '';
  const colors = ['#e53935','#1060a8','#2e7d32','#fb8c00','#7b1fa2','#00838f','#558b2f','#4527a0'];
  HOSPITALS.forEach((h, i) => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 70 + 10;
    const pin = document.createElement('div');
    pin.style.cssText = `position:absolute;left:${x}%;top:${y}%;transform:translate(-50%,-50%);
      background:${colors[i % colors.length]};color:#fff;border-radius:50% 50% 50% 0;
      width:34px;height:34px;display:flex;align-items:center;justify-content:center;
      font-size:.7rem;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.3);
      transform:rotate(-45deg);transition:all .2s`;
    pin.title = h.name;
    pin.innerHTML = `<span style="transform:rotate(45deg)">🏥</span>`;
    pins.appendChild(pin);
  });
  // User pin
  const up = document.createElement('div');
  up.style.cssText = `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
    background:#e53935;color:#fff;border-radius:50%;width:20px;height:20px;
    display:flex;align-items:center;justify-content:center;font-size:.7rem;
    box-shadow:0 0 0 6px rgba(229,57,53,.25);z-index:2`;
  up.title = 'Your Location';
  up.textContent = '📍';
  pins.appendChild(up);
}

document.getElementById('mapSearchBtn').addEventListener('click', () => {
  const q = document.getElementById('mapSearch').value.toLowerCase();
  const filtered = HOSPITALS.filter(h =>
    h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q) ||
    h.type.toLowerCase().includes(q) || h.services.some(s => s.toLowerCase().includes(q))
  );
  renderHospitals(filtered);
});

/* =====================================================================
   JS SECTION 10 — BOOKING SYSTEM  (CO4: DOM, localStorage, steps)
===================================================================== */
let bookingStep = 1;

function initBooking() {
  bookingStep = 1;
  goToBookingStep(1);
  renderCalendar();
  renderTimeSlots();

  document.getElementById('bookSpec').value = '';
  document.getElementById('bookDoc').innerHTML = '<option value="">— Select specialty first —</option>';
  document.getElementById('selectedDoctorPreview').classList.add('hidden');
  state.booking = { doctor: null, date: null, time: null };
}

function goToBookingStep(n) {
  bookingStep = n;
  document.querySelectorAll('.booking-form-section').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === n);
  });
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 < n) s.classList.add('done');
    if (i + 1 === n) s.classList.add('active');
  });
}

// Step navigation
document.getElementById('step1Next').addEventListener('click', () => {
  if (!state.booking.doctor) { showToast('Please select a doctor.', 'warn'); return; }
  goToBookingStep(2);
});
document.getElementById('step2Back').addEventListener('click', () => goToBookingStep(1));
document.getElementById('step2Next').addEventListener('click', () => {
  if (!state.booking.date) { showToast('Please select a date.', 'warn'); return; }
  if (!state.booking.time) { showToast('Please select a time slot.', 'warn'); return; }
  goToBookingStep(3);
});
document.getElementById('step3Back').addEventListener('click', () => goToBookingStep(2));
document.getElementById('step3Next').addEventListener('click', () => {
  const name  = document.getElementById('pName').value.trim();
  const age   = document.getElementById('pAge').value;
  const phone = document.getElementById('pPhone').value.trim();
  const email = document.getElementById('pEmail').value.trim();
  let valid = true;
  [['pNameErr', !name], ['pAgeErr', !age || age < 1], ['pPhoneErr', !validatePhone(phone)], ['pEmailErr', !validateEmail(email)]]
    .forEach(([id, c]) => { showErr(id, c); if (c) valid = false; });
  if (!valid) return;
  buildBookingSummary();
  goToBookingStep(4);
});
document.getElementById('step4Back').addEventListener('click', () => goToBookingStep(3));

document.getElementById('confirmBooking').addEventListener('click', async () => {
  const btn = document.getElementById('confirmBooking');
  btn.innerHTML = '<span class="spinner"></span> Confirming…';
  btn.disabled = true;

  await new Promise(r => setTimeout(r, 1500));

  const appt = {
    id: Date.now(),
    doctor:    state.booking.doctor?.name,
    specialty: state.booking.doctor?.spec,
    hospital:  state.booking.doctor?.hospital,
    date:      state.booking.date,
    time:      state.booking.time,
    patient:   document.getElementById('pName').value,
    phone:     document.getElementById('pPhone').value,
    email:     document.getElementById('pEmail').value,
    symptoms:  document.getElementById('pSymptoms').value,
    type:      document.getElementById('pType').value,
    payment:   document.getElementById('payMethod').value,
    status:    'Confirmed',
    bookedAt:  new Date().toISOString(),
  };

  state.appointments.push(appt);
  save('appointments', state.appointments);

  // Auto-add reminder
  state.reminders.push({ id: Date.now(), title: `Appointment: ${appt.doctor}`, type: 'Appointment', date: appt.date, time: appt.time, note: appt.symptoms || '', color: '#1060a8' });
  save('reminders', state.reminders);

  showToast('🎉 Appointment confirmed! A reminder has been set.', 'success');
  navigate('dashboard');
  btn.innerHTML = '🎉 Confirm Booking';
  btn.disabled = false;
});

// Specialty → Doctor dropdown
document.getElementById('bookSpec').addEventListener('change', function () {
  populateBookingDoctors(this.value);
  state.booking.doctor = null;
  document.getElementById('selectedDoctorPreview').classList.add('hidden');
});
document.getElementById('bookDoc').addEventListener('change', function () {
  const d = DOCTORS.find(doc => doc.id == this.value);
  if (d) { state.booking.doctor = d; showDoctorPreview(d); }
});

function populateBookingDoctors(spec) {
  const sel = document.getElementById('bookDoc');
  const filtered = spec ? DOCTORS.filter(d => d.spec === spec) : DOCTORS;
  sel.innerHTML = '<option value="">— Select doctor —</option>' +
    filtered.map(d => `<option value="${d.id}">${d.name} (${d.city})</option>`).join('');
}

function showDoctorPreview(d) {
  document.getElementById('sdpAvatar').textContent = d.avatar;
  document.getElementById('sdpName').textContent   = d.name;
  document.getElementById('sdpSpec').textContent   = d.spec + ' · ' + d.hospital;
  document.getElementById('sdpExp').textContent    = `${d.exp} years exp · ₹${d.fee} fee · ⭐ ${d.rating}`;
  document.getElementById('selectedDoctorPreview').classList.remove('hidden');
}

// Calendar
function renderCalendar() {
  const grid  = document.getElementById('calGrid');
  const label = document.getElementById('calMonthLabel');
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  label.textContent = `${months[state.calMonth]} ${state.calYear}`;
  const firstDay = new Date(state.calYear, state.calMonth, 1).getDay();
  const daysInMonth = new Date(state.calYear, state.calMonth + 1, 0).getDate();
  const today = new Date();
  let html = '';
  for (let i = 0; i < firstDay; i++) html += '<div></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(state.calYear, state.calMonth, d);
    const isPast = date < new Date(today.toDateString());
    const isToday = date.toDateString() === today.toDateString();
    const dateStr = `${state.calYear}-${String(state.calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isSelected = state.booking.date === dateStr;
    html += `<div class="cal-day ${isPast ? 'disabled' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}"
               data-date="${dateStr}">${d}</div>`;
  }
  grid.innerHTML = html;
  grid.querySelectorAll('.cal-day:not(.disabled)').forEach(el => {
    el.addEventListener('click', () => {
      state.booking.date = el.dataset.date;
      grid.querySelectorAll('.cal-day').forEach(c => c.classList.remove('selected'));
      el.classList.add('selected');
      renderTimeSlots();
    });
  });
}

document.getElementById('prevMonth').addEventListener('click', () => {
  if (state.calMonth === 0) { state.calMonth = 11; state.calYear--; } else state.calMonth--;
  renderCalendar();
});
document.getElementById('nextMonth').addEventListener('click', () => {
  if (state.calMonth === 11) { state.calMonth = 0; state.calYear++; } else state.calMonth++;
  renderCalendar();
});

function renderTimeSlots() {
  const times = ['8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM'];
  const container = document.getElementById('timeSlots');
  container.innerHTML = times.map(t =>
    `<div class="time-slot ${state.booking.time === t ? 'selected' : ''}" data-t="${t}">${t}</div>`
  ).join('');
  container.querySelectorAll('.time-slot').forEach(el => {
    el.addEventListener('click', () => {
      state.booking.time = el.dataset.t;
      container.querySelectorAll('.time-slot').forEach(c => c.classList.remove('selected'));
      el.classList.add('selected');
    });
  });
}

function buildBookingSummary() {
  const d = state.booking.doctor;
  const summary = document.getElementById('bookingSummary');
  summary.innerHTML = `
    <div class="row"><span>👨‍⚕️ Doctor</span><strong>${d ? d.name : '-'}</strong></div>
    <div class="row"><span>🏥 Hospital</span><span>${d ? d.hospital : '-'}</span></div>
    <div class="row"><span>📅 Date</span><span>${state.booking.date || '-'}</span></div>
    <div class="row"><span>⏰ Time</span><span>${state.booking.time || '-'}</span></div>
    <div class="row"><span>👤 Patient</span><span>${document.getElementById('pName').value}</span></div>
    <div class="row"><span>🔬 Type</span><span>${document.getElementById('pType').value}</span></div>
    <div class="row"><span>💰 Fee</span><strong style="color:var(--primary)">₹${d ? d.fee : '-'}</strong></div>
  `;
}

/* =====================================================================
   JS SECTION 11 — DASHBOARD  (CO4: localStorage read)
===================================================================== */
function initDashboard() {
  updateAuthUI();
  const appts    = state.appointments;
  const reports  = state.reports;
  const reminders = state.reminders;
  const reviews  = state.reviews.filter(r => r.self);

  document.getElementById('statAppt').textContent     = appts.length;
  document.getElementById('statReports').textContent  = reports.length;
  document.getElementById('statReminders').textContent= reminders.length;
  document.getElementById('statReviews').textContent  = reviews.length;

  const tbody = document.getElementById('dashApptBody');
  if (!appts.length) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--txt-m);padding:2rem">No appointments yet. <a href="#" data-page="booking">Book one now →</a></td></tr>';
    return;
  }
  tbody.innerHTML = appts.slice().reverse().map((a, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${a.doctor}</strong></td>
      <td><span class="tag">${a.specialty}</span></td>
      <td>${a.date}</td>
      <td>${a.time}</td>
      <td>${a.type}</td>
      <td><span class="badge badge-success">✅ ${a.status}</span></td>
      <td><button class="btn btn-danger btn-sm" onclick="cancelAppt(${a.id})">Cancel</button></td>
    </tr>
  `).join('');
}

function cancelAppt(id) {
  if (!confirm('Cancel this appointment?')) return;
  state.appointments = state.appointments.filter(a => a.id !== id);
  save('appointments', state.appointments);
  initDashboard();
  showToast('Appointment cancelled.', 'warn');
}

/* =====================================================================
   JS SECTION 12 — MEDICAL REPORTS  (CO4: File API, DOM)
===================================================================== */
function initReports() { renderReports(); }

const REPORT_ICONS = { pdf:'📄', jpg:'🖼️', jpeg:'🖼️', png:'🖼️', docx:'📝', default:'📁' };

function renderReports() {
  const filter = document.getElementById('reportFilter').value;
  const list = filter === 'All Types' ? state.reports : state.reports.filter(r => r.category === filter);
  document.getElementById('reportCount').textContent = state.reports.length;
  const container = document.getElementById('reportsList');
  if (!list.length) { container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--txt-m)">No reports found.</div>'; return; }
  container.innerHTML = list.map(r => {
    const ext = r.name.split('.').pop().toLowerCase();
    const icon = REPORT_ICONS[ext] || REPORT_ICONS.default;
    return `
      <div class="report-item">
        <div class="report-icon">${icon}</div>
        <div class="report-info">
          <h5>${r.name}</h5>
          <small>${r.category} · ${r.size} · Uploaded ${r.date}</small>
        </div>
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-outline btn-sm">👁 View</button>
          <button class="btn btn-danger btn-sm" onclick="deleteReport(${r.id})">🗑</button>
        </div>
      </div>
    `;
  }).join('');
}

document.getElementById('reportFilter').addEventListener('change', renderReports);

// Drag and drop + click to upload
const uploadZone = document.getElementById('uploadZone');
uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag'));
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('drag');
  handleFiles(e.dataTransfer.files);
});
document.getElementById('fileInput').addEventListener('change', function () { handleFiles(this.files); });

async function handleFiles(files) {
  for (const file of files) {
    if (file.size > 10 * 1024 * 1024) { showToast(`${file.name} exceeds 10MB limit.`, 'error'); continue; }
    await new Promise(r => setTimeout(r, 600)); // Simulate upload
    const report = {
      id: Date.now() + Math.random(),
      name: file.name,
      size: formatBytes(file.size),
      category: guessCategory(file.name),
      date: new Date().toLocaleDateString('en-IN'),
    };
    state.reports.push(report);
    save('reports', state.reports);
    showToast(`✅ ${file.name} uploaded successfully!`, 'success');
    renderReports();
  }
}

function formatBytes(b) {
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
  return (b / 1048576).toFixed(1) + ' MB';
}

function guessCategory(name) {
  const n = name.toLowerCase();
  if (n.includes('blood') || n.includes('cbc')) return 'Blood Test';
  if (n.includes('xray') || n.includes('x-ray')) return 'X-Ray';
  if (n.includes('scan') || n.includes('mri') || n.includes('ct')) return 'Scan';
  if (n.includes('prescription') || n.includes('rx')) return 'Prescription';
  return 'Other';
}

function deleteReport(id) {
  state.reports = state.reports.filter(r => r.id !== id);
  save('reports', state.reports);
  renderReports();
  showToast('Report deleted.', 'warn');
}

/* =====================================================================
   JS SECTION 13 — REVIEWS & RATINGS  (CO3: Objects, conditions)
===================================================================== */
function initReviews() {
  // Populate doctor select
  const sel = document.getElementById('revDoctor');
  sel.innerHTML = '<option value="">— Select —</option>' + DOCTORS.map(d => `<option>${d.name}</option>`).join('');
  renderReviews();
}

// Star rating interactive
document.getElementById('starSelect').addEventListener('click', e => {
  const s = e.target.closest('span');
  if (!s) return;
  state.selectedRating = +s.dataset.v;
  document.getElementById('revRating').value = state.selectedRating;
  document.querySelectorAll('#starSelect span').forEach((el, i) => el.classList.toggle('lit', i < state.selectedRating));
});

document.getElementById('reviewForm').addEventListener('submit', e => {
  e.preventDefault();
  const doc   = document.getElementById('revDoctor').value;
  const rating = state.selectedRating;
  const title  = document.getElementById('revTitle').value.trim();
  const body   = document.getElementById('revBody').value.trim();
  let valid = true;
  [['revDoctorErr', !doc], ['revRatingErr', rating === 0], ['revTitleErr', !title], ['revBodyErr', !body]]
    .forEach(([id, c]) => { showErr(id, c); if (c) valid = false; });
  if (!valid) return;

  const review = {
    doctor: doc, rating, title, body,
    author: state.user ? `${state.user.firstName} ${state.user.lastName || ''}`.trim() : 'Anonymous',
    date: new Date().toLocaleDateString('en-IN'),
    self: true,
  };
  state.reviews.unshift(review);
  save('reviews', state.reviews);
  renderReviews();
  document.getElementById('reviewForm').reset();
  state.selectedRating = 0;
  document.querySelectorAll('#starSelect span').forEach(el => el.classList.remove('lit'));
  showToast('⭐ Review submitted! Thank you.', 'success');
});

function renderReviews() {
  const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
  document.getElementById('reviewsList').innerHTML = state.reviews.map(r => `
    <article class="review-card">
      <div class="review-header">
        <div class="reviewer">
          <div class="reviewer-av">${r.author[0] || '?'}</div>
          <div>
            <div style="font-weight:600;font-size:.9rem">${r.author}</div>
            <div style="font-size:.78rem;color:var(--txt-m)">${r.doctor} · ${r.date}</div>
          </div>
        </div>
        <div style="color:#f59e0b;font-size:1rem">${stars(r.rating)}</div>
      </div>
      <div style="font-weight:600;margin-bottom:.3rem;font-size:.93rem">${r.title}</div>
      <p style="font-size:.87rem">${r.body}</p>
    </article>
  `).join('');
}

/* =====================================================================
   JS SECTION 14 — REMINDERS  (CO4: localStorage, async)
===================================================================== */
function initReminders() { renderReminders(); }

const REM_COLORS = { Appointment:'#1060a8', Medication:'#2e7d32', 'Test / Checkup':'#fb8c00', Vaccine:'#7b1fa2', Other:'#546e7a' };

document.getElementById('reminderForm').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('remTitle').value.trim();
  const date  = document.getElementById('remDate').value;
  const time  = document.getElementById('remTime').value;
  let valid = true;
  [['remTitleErr', !title], ['remDateErr', !date], ['remTimeErr', !time]]
    .forEach(([id, c]) => { showErr(id, c); if (c) valid = false; });
  if (!valid) return;

  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<span class="spinner"></span>';
  btn.disabled = true;
  await new Promise(r => setTimeout(r, 700));

  const type = document.getElementById('remType').value;
  state.reminders.push({ id: Date.now(), title, type, date, time, note: document.getElementById('remNote').value, color: REM_COLORS[type] || '#546e7a' });
  save('reminders', state.reminders);
  renderReminders();
  e.target.reset();
  showToast('⏰ Reminder set!', 'success');
  btn.innerHTML = '⏰ Set Reminder'; btn.disabled = false;
});

document.getElementById('clearReminders').addEventListener('click', () => {
  if (!confirm('Clear all reminders?')) return;
  state.reminders = [];
  save('reminders', state.reminders);
  renderReminders();
  showToast('All reminders cleared.', 'warn');
});

function renderReminders() {
  document.getElementById('reminderCount').textContent = state.reminders.length;
  const container = document.getElementById('remindersList');
  if (!state.reminders.length) { container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--txt-m)">No reminders set yet.</div>'; return; }
  const sorted = [...state.reminders].sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
  container.innerHTML = sorted.map(r => `
    <div class="reminder-item">
      <div class="reminder-dot" style="background:${r.color}"></div>
      <div class="reminder-info">
        <h5>${r.title}</h5>
        <small>📅 ${r.date} ⏰ ${r.time} · 🏷️ ${r.type}${r.note ? ' · ' + r.note : ''}</small>
      </div>
      <button class="btn btn-danger btn-sm" onclick="deleteReminder(${r.id})">🗑</button>
    </div>
  `).join('');
}

function deleteReminder(id) {
  state.reminders = state.reminders.filter(r => r.id !== id);
  save('reminders', state.reminders);
  renderReminders();
  showToast('Reminder removed.', 'warn');
}

/* =====================================================================
   JS SECTION 15 — HEALTH TIPS
===================================================================== */
let activeTipCat = 'all';

function initTips() {
  const daily = HEALTH_TIPS[new Date().getDay() % HEALTH_TIPS.length];
  document.getElementById('todayTip').textContent = `${daily.icon} ${daily.title}: ${daily.body}`;
  renderTips(HEALTH_TIPS);

  document.getElementById('tipsFilter').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('#tipsFilter .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTipCat = btn.dataset.cat;
    renderTips(activeTipCat === 'all' ? HEALTH_TIPS : HEALTH_TIPS.filter(t => t.cat === activeTipCat));
  });
}

function renderTips(list) {
  document.getElementById('tipsGrid').innerHTML = list.map(t => `
    <article class="tip-card">
      <div class="tip-card-head">
        <div class="icon">${t.icon}</div>
        <h4>${t.title}</h4>
      </div>
      <div class="tip-card-body">
        <p>${t.body}</p>
        <div class="tag mt-sm">${t.cat}</div>
      </div>
    </article>
  `).join('');
}

/* =====================================================================
   JS SECTION 16 — EMERGENCY PAGE
===================================================================== */
function initEmergency() {
  document.getElementById('emergencyGrid').innerHTML = EMERGENCY_CONTACTS.map(c => `
    <div class="emergency-card">
      <span class="icon">${c.icon}</span>
      <h4>${c.name}</h4>
      <p style="font-size:.8rem;margin-bottom:.5rem">${c.desc}</p>
      <a href="tel:${c.phone}" class="phone">${c.phone}</a>
    </div>
  `).join('');
}

/* =====================================================================
   JS SECTION 17 — TOAST NOTIFICATION SYSTEM  (CO4: DOM creation)
===================================================================== */
function showToast(msg, type = 'info', duration = 3500) {
  const icons = { success:'✅', error:'❌', warn:'⚠️', info:'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

/* =====================================================================
   JS SECTION 18 — PAGE LOAD INIT  (CO3: functions, CO4: DOM)
===================================================================== */
(function onLoad() {
  // Animate progress bars with slight delay
  setTimeout(() => {
    document.querySelectorAll('.progress-fill').forEach(el => {
      const w = el.style.width;
      el.style.width = '0';
      setTimeout(() => { el.style.width = w; }, 100);
    });
  }, 500);

  // Set min date to today for booking
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('remDate').min = today;

  // Welcome toast
  if (state.user) {
    showToast(`Welcome back, ${state.user.firstName}! 👋`, 'success');
  }
})();

/*
=======================================================================
  COURSE OUTCOME MAPPING SUMMARY
=======================================================================
  CO1 — HTML Document Structure, Typography, CSS syntax, Selectors,
         Color representation, Margin/Padding/Border:
         • Used throughout: semantic HTML (header, nav, main, section,
           article, footer), headings h1–h5, paragraphs, links,
           CSS rules for every element including font, color variables,
           margins, padding, and border properties.

  CO2 — HTML Forms, Semantic Tags, Tables, Media, CSS Grid, Flexbox,
         Media Queries, Transitions, Animations, Custom Properties:
         • Auth forms with all input types (text, email, password, date,
           tel, select, checkbox, file), appointment table, CSS Grid
           layouts (grid-2, grid-3, grid-4, stats-row, footer-grid),
           Flexbox for header/nav/cards, @media queries at 900px & 580px,
           transition on every interactive element, @keyframes animations
           (fadeUp, slideIn, slideOut, pulse-bg, heartbeat, shimmer),
           :root CSS custom properties for entire design system.

  CO3 — JavaScript Expressions, Operators, Conditions, Loops,
         Functions, Arrow Functions, Callbacks, Objects/Arrays:
         • DOCTORS/HOSPITALS/HEALTH_TIPS/EMERGENCY_CONTACTS arrays of
           objects, arrow functions (filterDoctors, renderDoctors, etc.),
           loops (map, forEach, filter), conditions (ternaries, if/else),
           callback functions (event listeners), operators (+, &&, ||, !).

  CO4 — DOM Manipulation, Event Handling, LocalStorage, Async/Promises:
         • navigate(), renderDoctors(), initDashboard() etc. all
           manipulate the DOM; addEventListener for clicks/input/submit;
           localStorage.setItem/getItem with JSON serialisation;
           async/await in login, register, confirm booking, file upload;
           Promise constructor wrapping geolocation and setTimeout.

  CO5 — Form Validation, Dynamic Input Handling, API Integration,
         Page Optimisation, SEO Meta Tags:
         • Full client-side validation on login, register, booking,
           review, reminder forms with live error display; password
           strength meter; dynamic doctor dropdown based on specialty;
           Geolocation API with navigator.geolocation.getCurrentPosition;
           lazy page init (pages render only when navigated to);
           SEO meta tags (description, keywords, author, viewport).
=======================================================================
*/