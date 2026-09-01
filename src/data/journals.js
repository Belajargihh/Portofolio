/* ==========================================================================
   DATA JURNAL ILMIAH & ARTIKEL (JOURNALS DATA)
   --------------------------------------------------------------------------
   Petunjuk Edit via VS Code:
   Cukup tambah atau ubah objek di dalam array journalsData di bawah ini.
   ========================================================================== */

export const journalsData = [
  {
    id: 201,
    title: 'Natural Language Processing (NLP) Pada Rancang Bangun Sistem Pakar Untuk Diagnosis Penyakit Tanaman Seledri',
    publisher: 'Jikom: Jurnal Informatika dan Komputer (Vol. 15 No. 1)',
    year: '2025',
    accreditation: 'SINTA 5',
    doi: '10.55794/jikom.v15i1.267',
    tags: ['Natural Language Processing', 'RAG System', 'Expert System', 'Python'],
    image: '/jurnal-seledri-nlp.png', // 👈 Menggunakan screenshot asli Naskah Jurnal Publikasi Seledri
    abstract: 'Pengembangan sistem pakar berbasis Natural Language Processing (NLP) dengan arsitektur Retrieval-Augmented Generation (RAG) untuk mendiagnosis penyakit tanaman seledri secara cepat dan akurat. Menggunakan teknik embedding Transformer dan penalaran Forward Chaining dengan tingkat akurasi mencapai 97.14%, serta dilengkapi fitur speech-to-text dan text-to-speech.',
    pdfUrl: 'https://ojs.stikombanyuwangi.ac.id/index.php/jikom/article/download/267/134'
  },
  {
    id: 202,
    title: 'Analisis Performa Pre-Trained Model Convolutional Neural Network Dalam Klasifikasi Kulit Wajah',
    publisher: 'JTIIK: Jurnal Teknologi Informasi dan Ilmu Komputer (Vol. 13 No. 3)',
    year: '2026',
    accreditation: 'SINTA 2',
    doi: '10.25126/jtiik.2026133',
    tags: ['Convolutional Neural Network', 'CNN', 'Deep Learning', 'Computer Vision', 'Python'],
    image: '/jurnal-kulit-wajah.png', // 👈 Menggunakan screenshot asli Naskah Jurnal Publikasi Kulit Wajah
    abstract: 'Penelitian ini menganalisis dan membandingkan performa arsitektur pre-trained model Convolutional Neural Network (CNN) dalam mengklasifikasikan jenis dan kondisi kulit wajah untuk deteksi dan analisis otomatis berbasis Computer Vision.',
    pdfUrl: 'https://doi.org/10.25126/jtiik.2026133'
  }
];
