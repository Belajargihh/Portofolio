/* ==========================================================================
   DATA PROYEK (PROJECTS DATA - BILINGUAL ID & ENG SUPPORT)
   --------------------------------------------------------------------------
   Proyek Asli dari akun GitHub Belajargihh (https://github.com/Belajargihh)
   ========================================================================== */

export const allProjectsData = [
  {
    id: 1,
    title: {
      id: 'ConsoleFix - AI JavaScript Error Solver',
      eng: 'ConsoleFix - AI JavaScript Error Solver'
    },
    category: ['extension', 'ai', 'webapp'],
    tags: ['Chrome Extension', 'Manifest V3', 'Gemini AI', 'RAG', 'Vector Search', 'Supabase', 'Node.js'],
    image: '',
    desc: {
      id: 'Ekstensi Chrome berbasis Google Gemini AI & RAG untuk mendeteksi, mendiagnosa, dan memberikan solusi perbaikan instan terhadap runtime error JavaScript di console browser secara otomatis dan real-time.',
      eng: 'Chrome extension powered by Google Gemini AI & RAG to detect, diagnose, and provide instant code fixes for JavaScript runtime errors in the browser console in real time.'
    },
    liveUrl: 'https://chromewebstore.google.com/detail/kpbcjbeicmhhhnaofmjjnogninnmepkd?utm_source=item-share-cb',
    githubUrl: 'https://github.com/Belajargihh/ConsoleFix-Deploy',
    liveLabel: {
      id: 'Chrome Store',
      eng: 'Chrome Store'
    },
    modalLiveLabel: {
      id: 'Pasang dari Chrome Web Store',
      eng: 'Install from Chrome Web Store'
    },
    highlights: {
      id: [
        'Dipublikasikan resmi di Google Chrome Web Store (Manifest V3)',
        'Auto-Capture Error: Otomatis mendeteksi exception dan error runtime langsung dari console browser',
        'Retrieval-Augmented Generation (RAG): Pencarian kesamaan vektor di database Supabase pgvector untuk solusi terverifikasi',
        'AI Analysis & Code Fix: Memberikan analisa akar masalah beserta snippet solusi kode perbaikan siap pakai dari Google Gemini AI'
      ],
      eng: [
        'Officially published on Google Chrome Web Store (Manifest V3)',
        'Auto-Capture Error: Automatically detects runtime exceptions and errors directly from browser console',
        'Retrieval-Augmented Generation (RAG): Supabase pgvector similarity search for verified solutions',
        'AI Analysis & Code Fix: Provides root cause analysis with ready-to-use fix snippets powered by Google Gemini AI'
      ]
    }
  },
  {
    id: 2,
    title: {
      id: 'AirCheck - AI Air Quality Expert System',
      eng: 'AirCheck - AI Air Quality Expert System'
    },
    category: ['webapp', 'ai'],
    tags: ['Python', 'Flask', 'Naive Bayes', 'NLP', 'Tailwind CSS', 'Vercel'],
    image: '',
    desc: {
      id: 'Aplikasi web sistem pakar berbasis AI & NLP (Naive Bayes) untuk menganalisis dan memprediksi kualitas udara secara real-time berdasarkan deskripsi lingkungan dan input suara.',
      eng: 'Web-based expert system powered by AI & NLP (Naive Bayes) to analyze and predict real-time air quality based on environmental descriptions and voice input.'
    },
    liveUrl: 'https://air-check-rouge.vercel.app/',
    githubUrl: 'https://github.com/Belajargihh/AirCheck',
    liveLabel: {
      id: 'Live Demo',
      eng: 'Live Demo'
    },
    modalLiveLabel: {
      id: 'Kunjungi AirCheck Web App',
      eng: 'Visit AirCheck Web App'
    },
    highlights: {
      id: [
        'Prediksi Kualitas Udara (Baik/Sedang/Tidak Sehat) berbasis Algoritma Naive Bayes',
        'Natural Language Processing (NLP) & Stemming Bahasa Indonesia (Sastrawi)',
        'Dukungan Input Suara (Speech-to-Text) & Rekomendasi Kesehatan Interaktif',
        'Live Full-Stack Serverless Deployment di Platform Vercel'
      ],
      eng: [
        'Air Quality Prediction (Good/Moderate/Unhealthy) powered by Naive Bayes algorithm',
        'Natural Language Processing (NLP) with Indonesian language stemming (Sastrawi)',
        'Voice input support (Speech-to-Text) & interactive health recommendations',
        'Live Full-Stack Serverless Deployment on Vercel platform'
      ]
    }
  },
  {
    id: 3,
    title: {
      id: 'NewsGeo - AI Geospatial News Intelligence Platform',
      eng: 'NewsGeo - AI Geospatial News Intelligence Platform'
    },
    category: ['webapp', 'ai'],
    tags: ['JavaScript', 'Firebase', 'Leaflet.js', 'NLP', 'Tailwind CSS', 'Vercel'],
    image: '',
    desc: {
      id: 'Platform SaaS intelijen berita dan analisis geospasial berbasis AI & NLP yang secara otomatis memetakan lokasi peristiwa berita ke peta interaktif Leaflet.js, menghasilkan ringkasan berita cerdas, analisis tren heatmap, serta autentikasi Firebase dengan role membership.',
      eng: 'AI & NLP-powered geospatial intelligence and news analysis SaaS platform that automatically maps news events onto interactive Leaflet.js maps, generates intelligent news summaries, heatmap trend analytics, and Firebase role-based authentication.'
    },
    liveUrl: 'https://saa-s-news-geo-priview.vercel.app/',
    githubUrl: 'https://github.com/Belajargihh/SaaS-NewsGeoPriview',
    liveLabel: {
      id: 'Live Demo',
      eng: 'Live Demo'
    },
    modalLiveLabel: {
      id: 'Kunjungi NewsGeo Web App',
      eng: 'Visit NewsGeo Web App'
    },
    highlights: {
      id: [
        'Geocoding & Pemetaan Berita Otomatis: Deteksi lokasi berita dan visualisasi peta interaktif Leaflet.js',
        'Ringkasan Cerdas AI (NLP): Ekstraksi ringkasan inti berita secara cepat dan otomatis',
        'Analisis Tren & Heatmap: Visualisasi sebaran intensitas dan popularitas topik berita terkini',
        'Firebase Authentication: Autentikasi aman terintegrasi Google Sign-In & Email/Password',
        'Role-Based Access Control: Sistem keanggotaan (Free vs Premium Member) tersinkronisasi di Cloud Firestore',
        'Live Serverless Web Deployment di Platform Vercel'
      ],
      eng: [
        'Automated Geocoding & News Mapping: News location detection and Leaflet.js interactive map visualization',
        'AI Smart Summaries (NLP): Rapid automated extraction of key news takeaways',
        'Trend & Heatmap Analytics: Visualizes intensity distribution and trending topics',
        'Firebase Authentication: Secure sign-in with Google and Email/Password',
        'Role-Based Access Control: Free vs Premium tier memberships synced on Cloud Firestore',
        'Live Serverless Web Deployment on Vercel platform'
      ]
    }
  },
  {
    id: 4,
    title: {
      id: 'MyWatchlist Tracker App',
      eng: 'MyWatchlist Tracker App'
    },
    category: 'webapp',
    tags: ['JavaScript', 'Tailwind CSS', 'TMDB API', 'AniList API', 'Vercel'],
    image: '',
    desc: {
      id: 'Aplikasi web pelacak film, serial TV, dan anime terpadu dengan integrasi TMDB & AniList API, manajemen personal watchlist, dan antarmuka modern responsif.',
      eng: 'Unified movie, TV series, and anime tracker web app with TMDB & AniList API integrations, personal watchlist management, and modern responsive interface.'
    },
    liveUrl: 'https://my-watchlist-brown.vercel.app/landing.html',
    githubUrl: 'https://github.com/Belajargihh/MyWatchlist',
    liveLabel: {
      id: 'Live Demo',
      eng: 'Live Demo'
    },
    modalLiveLabel: {
      id: 'Buka MyWatchlist Web App',
      eng: 'Open MyWatchlist Web App'
    },
    highlights: {
      id: [
        'Integrasi Multi-API: TMDB API (Film & Serial TV) dan AniList API (Anime)',
        'Manajemen Personal Watchlist & Tracking Status Tontonan Interaktif',
        'Desain Antarmuka Modern & Responsif berbasis Tailwind CSS',
        'Live Serverless Web Deployment di Platform Vercel'
      ],
      eng: [
        'Multi-API Integration: TMDB API (Movies & TV Shows) and AniList API (Anime)',
        'Personal Watchlist Management & interactive watch-status tracking',
        'Modern & Responsive UI design with Tailwind CSS',
        'Live Serverless Web Deployment on Vercel platform'
      ]
    }
  },
  {
    id: 5,
    title: {
      id: 'TBM Web Application',
      eng: 'TBM Web Application'
    },
    category: 'webapp',
    tags: ['JavaScript', 'HTML', 'CSS', 'Vercel'],
    image: '',
    desc: {
      id: 'Aplikasi web interaktif TBM yang telah dipublikasikan dan dapat diakses secara live melalui platform Vercel.',
      eng: 'Interactive community library (TBM) web application published and accessible live via Vercel platform.'
    },
    liveUrl: 'https://tbm-pi.vercel.app',
    githubUrl: 'https://github.com/Belajargihh/tbm',
    liveLabel: {
      id: 'Live Demo',
      eng: 'Live Demo'
    },
    modalLiveLabel: {
      id: 'Buka TBM Web App',
      eng: 'Open TBM Web App'
    },
    highlights: {
      id: [
        'Live Deployment di Vercel',
        'Desain Web Responsif',
        'Performa Web Cepat & Ringan'
      ],
      eng: [
        'Live Deployment on Vercel',
        'Responsive Web Design',
        'Fast & Lightweight Web Performance'
      ]
    }
  },
  {
    id: 6,
    title: {
      id: 'YOLO & DeepSORT BBQ Queue Tracking',
      eng: 'YOLO & DeepSORT BBQ Queue Tracking'
    },
    category: 'ai',
    tags: ['Python', 'YOLO', 'DeepSORT', 'Computer Vision', 'Jupyter Notebook'],
    image: '',
    desc: {
      id: 'Sistem deteksi dan pelacakan objek (Object Detection & Tracking) real-time menggunakan algoritma YOLO dan DeepSORT untuk analisis antrian BBQ.',
      eng: 'Real-time object detection and tracking system using YOLO and DeepSORT algorithms for BBQ queue analysis.'
    },
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/Yolo-Deepsort_AntrianBBQ',
    highlights: {
      id: ['Deteksi & Pelacakan Objek Realtime', 'Implementasi YOLO & DeepSORT', 'Analisis Kepadatan & Waktu Antrian'],
      eng: ['Real-time Object Detection & Tracking', 'YOLO & DeepSORT Implementation', 'Queue Density & Wait Time Analysis']
    }
  },
  {
    id: 7,
    title: {
      id: 'Academic PDF NLP Chatbot',
      eng: 'Academic PDF NLP Chatbot'
    },
    category: 'ai',
    tags: ['Python', 'NLP', 'PDF Processing', 'Jupyter Notebook'],
    image: '',
    desc: {
      id: 'Chatbot kecerdasan buatan berbasis Natural Language Processing untuk ekstraksi informasi dan tanya-jawab otomatis dari dokumen PDF akademik.',
      eng: 'AI chatbot powered by Natural Language Processing for automated information extraction and Q&A on academic PDF documents.'
    },
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/Chatbot_PDF_Akademik_NLP',
    highlights: {
      id: ['Ekstraksi Informasi PDF Otomatis', 'Pemrosesan Bahasa Alami (NLP)', 'Asisten Akademik Cerdas'],
      eng: ['Automated PDF Information Extraction', 'Natural Language Processing (NLP)', 'Smart Academic Assistant']
    }
  },
  {
    id: 8,
    title: {
      id: 'YOLOv11 Stationery Object Detection',
      eng: 'YOLOv11 Stationery Object Detection'
    },
    category: 'ai',
    tags: ['Python', 'YOLOv11', 'Object Detection', 'Computer Vision'],
    image: '',
    desc: {
      id: 'Model deteksi objek presisi tinggi menggunakan arsitektur YOLOv11 terbaru untuk mengklasifikasi dan mendeteksi berbagai jenis alat tulis.',
      eng: 'High-precision object detection model using state-of-the-art YOLOv11 architecture to classify and detect stationery items.'
    },
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/YOLO11_Alat_Tulis',
    highlights: {
      id: ['Model Deteksi YOLOv11 Terbaru', 'Dataset & Pelatihan Kustom', 'Klasifikasi Presisi Tinggi'],
      eng: ['Latest YOLOv11 Detection Model', 'Custom Dataset & Training Pipeline', 'High-Precision Classification']
    }
  },
  {
    id: 9,
    title: {
      id: 'MathGenius Educational Game & App',
      eng: 'MathGenius Educational Game & App'
    },
    category: 'desktop',
    tags: ['C#', 'Unity', 'ASP.NET'],
    image: '',
    desc: {
      id: 'Aplikasi dan game edukasi matematika interaktif yang dikembangkan menggunakan C#, engine Unity, dan backend ASP.NET.',
      eng: 'Interactive mathematics educational game and app developed with C#, Unity engine, and ASP.NET backend.'
    },
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/PapuaTechInovator_MathGenius',
    highlights: {
      id: ['Pengembangan Engine Unity & C#', 'Backend ASP.NET', 'Media Pembelajaran Interaktif'],
      eng: ['Unity Engine & C# Development', 'ASP.NET Backend', 'Interactive Learning Media']
    }
  },
  {
    id: 10,
    title: {
      id: 'Machine Learning Algorithm & Models',
      eng: 'Machine Learning Algorithm & Models'
    },
    category: 'ai',
    tags: ['Python', 'Scikit-Learn', 'Machine Learning', 'Jupyter Notebook'],
    image: '',
    desc: {
      id: 'Kumpulan eksperimen, analisis data, dan implementasi algoritma Machine Learning terlatih.',
      eng: 'Collection of experiments, data analysis, and trained Machine Learning model implementations.'
    },
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/Machine_Learning',
    highlights: {
      id: ['Analisis Exploratory Data (EDA)', 'Model Supervised Learning', 'Evaluasi Performa Model'],
      eng: ['Exploratory Data Analysis (EDA)', 'Supervised Learning Models', 'Model Performance Evaluation']
    }
  },
  {
    id: 11,
    title: {
      id: 'EduLearn C# Desktop Application',
      eng: 'EduLearn C# Desktop Application'
    },
    category: 'desktop',
    tags: ['C#', '.NET', 'Desktop App'],
    image: '',
    desc: {
      id: 'Aplikasi desktop edukasi berbasis C# .NET untuk manajemen pembelajaran dan sistem informasi pendukung.',
      eng: 'Educational desktop application built with C# .NET for learning management and academic information support.'
    },
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/Edu_Learn',
    highlights: {
      id: ['Aplikasi Desktop C# .NET', 'Arsitektur Sistem Edukasi', 'Manajemen Data Pembelajaran'],
      eng: ['C# .NET Desktop Application', 'Educational System Architecture', 'Learning Data Management']
    }
  }
];

// Hanya tampilkan di galeri proyek yang sudah memiliki link demo deployment (liveUrl)
export const projectsData = allProjectsData.filter(p => p.liveUrl && p.liveUrl.trim() !== '');

/**
 * Helper untuk mengambil gambar banner GitHub otomatis jika field 'image' dikosongkan.
 */
export function getProjectImage(proj) {
  if (proj.image && proj.image.trim() !== '') {
    return proj.image;
  }
  // Ambil otomatis dari GitHub OpenGraph jika ada githubUrl
  if (proj.githubUrl && proj.githubUrl.includes('github.com/')) {
    const parts = proj.githubUrl.replace(/\/$/, '').split('/');
    const repo = parts.pop();
    const user = parts.pop();
    if (user && repo) {
      return `https://opengraph.githubassets.com/1/${user}/${repo}`;
    }
  }
  return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop';
}
