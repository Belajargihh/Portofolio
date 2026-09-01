/* ==========================================================================
   DATA PROYEK (PROJECTS DATA)
   --------------------------------------------------------------------------
   Proyek Asli dari akun GitHub Belajargihh (https://github.com/Belajargihh)
   ========================================================================== */

export const projectsData = [
  {
    id: 1,
    title: 'YOLO & DeepSORT BBQ Queue Tracking',
    category: 'ai',
    tags: ['Python', 'YOLO', 'DeepSORT', 'Computer Vision', 'Jupyter Notebook'],
    image: '',
    desc: 'Sistem deteksi dan pelacakan objek (Object Detection & Tracking) real-time menggunakan algoritma YOLO dan DeepSORT untuk analisis antrian BBQ.',
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/Yolo-Deepsort_AntrianBBQ',
    highlights: ['Deteksi & Pelacakan Objek Realtime', 'Implementasi YOLO & DeepSORT', 'Analisis Kepadatan & Waktu Antrian']
  },
  {
    id: 2,
    title: 'Academic PDF NLP Chatbot',
    category: 'ai',
    tags: ['Python', 'NLP', 'PDF Processing', 'Jupyter Notebook'],
    image: '',
    desc: 'Chatbot kecerdasan buatan berbasis Natural Language Processing untuk ekstraksi informasi dan tanya-jawab otomatis dari dokumen PDF akademik.',
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/Chatbot_PDF_Akademik_NLP',
    highlights: ['Ekstraksi Informasi PDF Otomatis', 'Pemrosesan Bahasa Alami (NLP)', 'Asisten Akademik Cerdas']
  },
  {
    id: 3,
    title: 'YOLOv11 Stationery Object Detection',
    category: 'ai',
    tags: ['Python', 'YOLOv11', 'Object Detection', 'Computer Vision'],
    image: '',
    desc: 'Model deteksi objek presisi tinggi menggunakan arsitektur YOLOv11 terbaru untuk mengklasifikasi dan mendeteksi berbagai jenis alat tulis.',
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/YOLO11_Alat_Tulis',
    highlights: ['Model Deteksi YOLOv11 Terbaru', 'Dataset & Pelatihan Kustom', 'Klasifikasi Presisi Tinggi']
  },
  {
    id: 4,
    title: 'TBM Web Application',
    category: 'webapp',
    tags: ['JavaScript', 'HTML', 'CSS', 'Vercel'],
    image: '',
    desc: 'Aplikasi web interaktif TBM yang telah dipublikasikan dan dapat diakses secara live melalui platform Vercel.',
    liveUrl: 'https://tbm-pi.vercel.app',
    githubUrl: 'https://github.com/Belajargihh/tbm',
    highlights: ['Live Deployment di Vercel', 'Desain Web Responsif', 'Performa Web Cepat & Ringan']
  },
  {
    id: 5,
    title: 'SaaS News GeoPreview Platform',
    category: 'webapp',
    tags: ['JavaScript', 'HTML', 'CSS', 'SaaS'],
    image: '',
    desc: 'Platform SaaS web untuk pratinjau berita berbasis geolokasi dan antarmuka pengguna modern.',
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/SaaS-NewsGeoPriview',
    highlights: ['Konsep Platform SaaS', 'Integrasi Berita & Geolokasi', 'UI/UX Modern & Sleek']
  },
  {
    id: 6,
    title: 'AirCheck Air Quality Monitor',
    category: 'webapp',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '',
    desc: 'Aplikasi web pemantauan kualitas udara interaktif untuk menampilkan indikator kebersihan dan parameter kualitas udara.',
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/AirCheck',
    highlights: ['Indikator Kualitas Udara', 'Antarmuka Visual Interaktif', 'Tampilan Web Responsif']
  },
  {
    id: 7,
    title: 'MyWatchlist Tracker App',
    category: 'webapp',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '',
    desc: 'Aplikasi web pengelola dan pemantau daftar tontonan film & serial favorit pengguna.',
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/MyWatchlist',
    highlights: ['Manajemen Watchlist Interaktif', 'Pencarian & Fitur Filter', 'Desain UI Clean']
  },
  {
    id: 8,
    title: 'MathGenius Educational Game & App',
    category: 'desktop',
    tags: ['C#', 'Unity', 'ASP.NET'],
    image: '',
    desc: 'Aplikasi dan game edukasi matematika interaktif yang dikembangkan menggunakan C#, engine Unity, dan backend ASP.NET.',
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/PapuaTechInovator_MathGenius',
    highlights: ['Pengembangan Engine Unity & C#', 'Backend ASP.NET', 'Media Pembelajaran Interaktif']
  },
  {
    id: 9,
    title: 'Machine Learning Algorithm & Models',
    category: 'ai',
    tags: ['Python', 'Scikit-Learn', 'Machine Learning', 'Jupyter Notebook'],
    image: '',
    desc: 'Kumpulan eksperimen, analisis data, dan implementasi algoritma Machine Learning terlatih.',
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/Machine_Learning',
    highlights: ['Analisis Exploratory Data (EDA)', 'Model Supervised Learning', 'Evaluasi Performa Model']
  },
  {
    id: 10,
    title: 'EduLearn C# Desktop Application',
    category: 'desktop',
    tags: ['C#', '.NET', 'Desktop App'],
    image: '',
    desc: 'Aplikasi desktop edukasi berbasis C# .NET untuk manajemen pembelajaran dan sistem informasi pendukung.',
    liveUrl: '',
    githubUrl: 'https://github.com/Belajargihh/Edu_Learn',
    highlights: ['Aplikasi Desktop C# .NET', 'Arsitektur Sistem Edukasi', 'Manajemen Data Pembelajaran']
  }
];

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

