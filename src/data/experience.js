/* ==========================================================================
   DATA PENGALAMAN (FRESH GRADUATE & MAGANG / ORGANISASI - BILINGUAL ID & ENG)
   ========================================================================== */

export const experienceData = [
  {
    id: 101,
    role: {
      id: 'Web Development',
      eng: 'Web Development'
    },
    category: {
      id: 'GOVERNMENT & WEB DEV',
      eng: 'GOVERNMENT & WEB DEV'
    },
    year: '2025',
    company: 'Kantor Distrik Sorong Timur Kota Sorong',
    location: {
      id: 'Kota Sorong, Papua Barat Daya',
      eng: 'Sorong City, Southwest Papua'
    },
    period: {
      id: '28 Juli – 30 September 2025',
      eng: '28 July – 30 September 2025'
    },
    title: {
      id: 'Website Profil Instansi Distrik Sorong Timur',
      eng: 'Official Profile Website of Sorong Timur District'
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Web', 'Government'],
    image: '/Distrik_1.jpeg',
    liveUrl: 'https://distrik-sortim.vercel.app/',
    liveLabel: {
      id: 'Buka Website Distrik',
      eng: 'Visit District Website'
    },
    documentation: [
      {
        url: '/Distrik_1.jpeg',
        caption: {
          id: 'Tampilan Beranda Website Resmi Distrik Sorong Timur',
          eng: 'Official Homepage of Sorong Timur District Website'
        }
      },
      {
        url: '/Distrik_2.jpeg',
        caption: {
          id: 'Struktur Organisasi & Informasi Kedistrikan',
          eng: 'Organizational Structure & District Information'
        }
      }
    ],
    desc: {
      id: 'Perancangan dan pengembangan website profil instansi resmi berbasis web modern responsif untuk memperluas akses informasi publik dan digitalisasi profil wilayah.',
      eng: 'Design and development of an official responsive agency profile website to expand public information access and regional profile digitalization.'
    },
    highlights: {
      id: [
        'Merancang dan membangun arsitektur website profil Kantor Distrik Sorong Timur berbasis web responsif ramah perangkat mobile dan desktop.',
        'Menyusun struktur navigasi, peta wilayah interaktif, struktur hierarki organisasi, serta galeri dokumentasi kegiatan kedistrikan.',
        'Meningkatkan transparansi dan kemudahan akses informasi publik bagi masyarakat distrik setempat.'
      ],
      eng: [
        'Designed and developed the responsive official profile website for Sorong Timur District Office tailored for mobile & desktop.',
        'Structured site navigation, interactive regional maps, organizational hierarchy, and activity gallery documentation.',
        'Enhanced transparency and public information accessibility for local district residents.'
      ]
    }
  },
  {
    id: 102,
    role: {
      id: 'Full-Stack Web Developer',
      eng: 'Full-Stack Web Developer'
    },
    category: {
      id: 'FULL-STACK & DATABASE',
      eng: 'FULL-STACK & DATABASE'
    },
    year: '2025 - 2026',
    company: {
      id: 'Tim Development TBM (Taman Bacaan Masyarakat)',
      eng: 'TBM (Community Reading Center) Dev Team'
    },
    location: {
      id: 'Kota Sorong, Papua Barat Daya',
      eng: 'Sorong City, Southwest Papua'
    },
    period: {
      id: 'Nov 2025 - Jan 2026',
      eng: 'Nov 2025 - Jan 2026'
    },
    title: {
      id: 'Platform Sistem Informasi & Manajemen TBM',
      eng: 'TBM Information System & Management Platform'
    },
    tags: ['HTML', 'JavaScript', 'Supabase', 'PostgreSQL', 'Vercel', 'Tailwind CSS'],
    image: '/tbm-dashboard.jpg',
    liveUrl: 'https://forumtbm.vercel.app/',
    liveLabel: {
      id: 'Buka Web Forum TBM',
      eng: 'Visit Forum TBM Web'
    },
    documentation: [
      {
        url: '/tbm-dashboard.jpg',
        caption: {
          id: 'Dashboard Sistem Informasi & Pengaturan Akun Anggota TBM',
          eng: 'TBM Information System & Member Account Dashboard'
        }
      },
      {
        url: '/tbm-meeting.jpg',
        caption: {
          id: 'Kolaborasi & Rapat Koordinasi Tim Development TBM',
          eng: 'TBM Development Team Collaboration & Online Meeting'
        }
      }
    ],
    desc: {
      id: 'Platform sistem manajemen TBM berbasis web dengan autentikasi multi-role (Admin, Pengurus, Anggota) serta sinkronisasi database cloud PostgreSQL real-time.',
      eng: 'Web-based TBM management system platform featuring multi-role authentication and real-time PostgreSQL cloud database synchronization.'
    },
    highlights: {
      id: [
        'Merancang dan mengembangkan platform manajemen sistem TBM berbasis web menggunakan stack modern HTML, JavaScript, Supabase, dan Vercel.',
        'Membangun sistem autentikasi multi-role (Admin, Pengurus Pusat, Wilayah, Daerah, dan Anggota) dengan hak akses dan verifikasi berjenjang.',
        'Mengelola skema database relational PostgreSQL di Supabase serta mengembangkan dashboard pemantauan data yang responsif dan interaktif.'
      ],
      eng: [
        'Designed and developed the web-based TBM system management platform utilizing HTML, JavaScript, Supabase, and Vercel.',
        'Built multi-role authentication (Admin, Central Board, Regional, Local, and Members) with tiered verification permissions.',
        'Managed PostgreSQL relational database schemas on Supabase and developed responsive, interactive monitoring dashboards.'
      ]
    }
  }
];
