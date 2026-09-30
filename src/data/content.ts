import images from "./images.generated.json";

export type Img = { src: string; w: number; h: number };
const img = (k: string) => (images as Record<string, Img[] | Img>)[k];
export const gallery = (k: string) => img(k) as Img[];
export const single = (k: string) => img(k) as Img;

// ---------- Tentang Kami (slide 2, versi terbaru) ----------
export const about = [
  "PT Naga Karya Sakti Indonesia (NKSI) merupakan perusahaan General Contractor yang menyediakan layanan engineering dan pelaksanaan pekerjaan konstruksi terintegrasi untuk kebutuhan proyek industri.",
  "Kami memiliki kemampuan dalam engineering, fabrication, construction, commissioning, maintenance, procurement, mechanical, piping, equipment installation, serta pekerjaan pendukung lainnya sesuai kebutuhan proyek.",
  "Didukung oleh tenaga kerja, pengalaman lapangan, serta jaringan pemasok dan mitra kerja, NKSI berkomitmen memberikan solusi yang aman, berkualitas, terukur, dan sesuai dengan spesifikasi serta kebutuhan pelanggan.",
  "Kami melayani berbagai kebutuhan proyek pada sektor industri, energi, oil & gas, manufaktur, utility, commercial, dan infrastructure, dengan pendekatan yang menekankan kualitas pekerjaan, keselamatan, ketepatan waktu, dan koordinasi yang efektif.",
  "NKSI membangun hubungan jangka panjang dengan pelanggan melalui pelaksanaan pekerjaan yang profesional dan solusi yang disesuaikan dengan kebutuhan setiap proyek.",
];

export const sectors = ["Industri", "Energi", "Oil & Gas", "Manufaktur", "Utility", "Commercial", "Infrastructure"];

// ---------- Visi & Misi (slide 4) ----------
export const visi =
  "Menjadi perusahaan Engineering, Procurement, Construction (EPC) yang terpercaya, kompetitif, dan berkelanjutan dalam menyediakan solusi industri terintegrasi dengan standar kualitas, keselamatan, dan profesionalisme yang tinggi.";

export const misi = [
  "Menyediakan layanan Engineering, Procurement, Construction yang berkualitas tinggi sesuai kebutuhan dan standar pelanggan.",
  "Menyelesaikan setiap proyek secara aman, tepat mutu, tepat waktu, dan efisien melalui penerapan manajemen proyek yang profesional.",
  "Membangun kemitraan jangka panjang dengan klien, vendor, dan stakeholder berdasarkan kepercayaan, integritas, dan kepuasan pelanggan.",
  "Mengembangkan kompetensi sumber daya manusia serta menerapkan inovasi dan teknologi untuk meningkatkan kinerja dan daya saing perusahaan.",
];

// ---------- Our Core Services (slide 5) ----------
export const services = [
  {
    no: "01",
    title: "General Contractor",
    desc: "Pengelolaan dan pelaksanaan pekerjaan proyek secara terintegrasi mulai dari persiapan, mobilisasi, pelaksanaan, pengawasan, hingga completion dan handover.",
    items: [],
  },
  {
    no: "02",
    title: "Engineering",
    desc: "",
    items: ["Engineering design", "Technical calculation", "Shop drawing", "Detail engineering", "Fabrication drawing", "Construction drawing", "Technical solution"],
  },
  {
    no: "03",
    title: "Fabrication",
    desc: "",
    items: ["Pipe spool fabrication", "Piping fabrication", "Mechanical equipment fabrication", "Steel fabrication", "Platform fabrication", "Pressure vessel fabrication", "Skid fabrication", "Tank repair / fabrication", "Supporting structure"],
  },
  {
    no: "04",
    title: "Construction",
    desc: "",
    items: ["Mechanical", "Piping", "Structural", "Civil / Supporting Works"],
  },
  {
    no: "05",
    title: "Commissioning & Maintenance",
    desc: "",
    items: ["Commissioning", "Maintenance"],
  },
];

// ---------- Klien (slide 14-15; nomor pilihan: 1,3,5,6,14,12,17,20,23,22,27) ----------
// [ISI] "Cargloss" dan "MCP" tidak ada di daftar klien PDF: nama lengkap/lokasi/logo perlu dikonfirmasi.
export type Client = { name: string; place?: string; logo?: string };
export const clients: Client[] = [
  { name: "PT. PAM Jaya Lyonnaise" },
  { name: "PLTU Cirebon", place: "bersama PT Indonesia Power" },
  { name: "PT. Nissan Motor Indonesia", place: "Kawasan Industri Bukit Industri Cikampek" },
  { name: "PT. Nagai Plastic Indonesia", place: "Kawasan Industri Jababeka" },
  { name: "PT. YKK Zipper", place: "Kawasan Industri Cibitung" },
  { name: "PT. Sakura Java Indonesia", place: "Kawasan Industri EJIP Cikarang" },
  { name: "PT. Coca Cola Amatil Indonesia", place: "Cibitung" },
  { name: "PT. Suez Water Treatment Indonesia" },
  { name: "PT. Megasari Makmur" },
  { name: "PT. Waskita Karya" },
  { name: "Pakuwon Group" },
  { name: "Cargloss" },
  { name: "MCP" },
];

// ---------- Tools (slide 17-21): PDF tidak memberi nama alat, jadi tanpa keterangan ----------
export const tools = gallery("tools");

// ---------- Proyek Kami (slide 23,24,26,28,29,30) ----------
export type Work = { slug: string; title: string; client?: string; images: Img[] };
export const projects: Work[] = [
  { slug: "batamindo-greenhouse-farm", title: "Project Batamindo Greenhouse Farm", client: "PT. Bestindo Putra Mandiri" },
  { slug: "fire-pump-seiko", title: "Project System Fire Pump PT. Seiko" },
  { slug: "inkali", title: "Project PT. IndonesiaNikka Chemicals (INKALI)" },
  { slug: "pondasi-tanki", title: "Project Pembuatan Pondasi Tanki" },
  { slug: "gedung-logistik-kemendag", title: "Project Pembuatan Gedung Logistik Kementerian Perdagangan Purwakarta" },
  { slug: "rsud-jampang-kulon", title: "Project Pembuatan RSUD Jampang Kulon" },
].map((p) => ({ ...p, images: gallery(p.slug) }));

// ---------- General Contractor (slide 35,36,39,41,43,46) ----------
export const gcWorks: Work[] = [
  { slug: "oil-and-gas", title: "Pekerjaan Oil and Gas" },
  { slug: "mechanical-piping-steel", title: "Mechanical Equipment, Piping & Steel Fabrication" },
  { slug: "mud-pit", title: "Pembuatan Mud Pit" },
  { slug: "hdpe-pipe", title: "HDPE Pipe" },
  { slug: "piping-fabrication-welding-valve", title: "Piping Fabrication, Welding, and Valve Installation" },
  { slug: "storage-tank-repair", title: "Storage Tank Repair (T-206 & T-205)" },
].map((p) => ({ ...p, images: gallery(p.slug) }));
