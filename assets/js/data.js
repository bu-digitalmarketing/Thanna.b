/* ============================================================
   data.js — แก้ไขข้อมูลทั้งหมดของเว็บได้ที่ไฟล์นี้ไฟล์เดียว
   Edit everything about this site in this single file.

   ทุก field ที่เป็นข้อความ เขียนเป็น { th: "ไทย", en: "English" }
   Every text field is written as { th: "...", en: "..." }

   ── ข้อมูลที่ "ยืนยันได้จากเว็บ" (ใส่ให้แล้ว) ──────────────
     • ชื่อ-สกุล  : Thannapat Boonsinpuripat
     • Instagram : @schon_ked  (bio เขียนว่า "๑๙๙๖ 🌈")
     • Threads   : @schon_ked
     • Facebook  : cosry.shakkieye  (โปรไฟล์ไม่เปิดสาธารณะ ดึงข้อมูลไม่ได้)

   ── ⚠️ ข้อมูลที่ยังหาไม่เจอ ต้องเติมเอง ──────────────────
     อาชีพ การศึกษา ผลงาน ทักษะ ประวัติการทำงาน อีเมล
     ไม่มีข้อมูลเปิดเผยสาธารณะบนเว็บเลย — ผมไม่เดาหรือแต่งให้
     ทุกจุดที่ต้องเติมมีคำว่า  TODO  กำกับไว้
   ============================================================ */

const SITE_DATA = {

  /* ---------- 1. ข้อมูลหลัก / Identity ---------- */
  profile: {
    // ✅ ยืนยันแล้วจาก Instagram
    // TODO: ใส่ชื่อภาษาไทยแทน (ถอดกลับจากอักษรโรมันได้หลายแบบ ผมเลยไม่เดาให้)
    name:     { th: "Thannapat Boonsinpuripat", en: "Thannapat Boonsinpuripat" },

    // TODO: ชื่อเล่น — เว้นว่างไว้ได้ ถ้าว่างแถบบนจะใช้ชื่อจริงแทน
    nickname: { th: "", en: "" },

    // ✅ จาก bio ของ Instagram: "๑๙๙๖ 🌈"
    badge:    { th: "๑๙๙๖ 🌈", en: "๑๙๙๖ 🌈" },

    // บรรทัดใหญ่ใต้ชื่อ — สลับไปเรื่อย ๆ ทีละบรรทัด (พิมพ์ทีละตัวอักษร)
    // TODO: แก้เป็นคำที่อธิบายตัวคุณจริง ๆ เพิ่ม/ลบได้ไม่จำกัด
    taglines: [
      { th: "ยินดีที่ได้รู้จักครับ",     en: "Nice to meet you" },
      { th: "ใส่คำอธิบายตัวเองที่นี่",  en: "Your headline here" },
      { th: "เช่น นักออกแบบ / ช่างภาพ", en: "e.g. Designer / Photographer" }
    ],

    // TODO: ย่อหน้าแนะนำตัว 2–3 บรรทัด
    bio: {
      th: "สวัสดีครับ 👋 ตรงนี้คือพื้นที่เล่าเรื่องตัวเองสั้น ๆ — " +
          "คุณเป็นใคร สนใจอะไร ทำอะไรอยู่ และกำลังมองหาอะไรต่อไป " +
          "เขียนแบบสบาย ๆ เหมือนแนะนำตัวให้เพื่อนใหม่ฟังได้เลย",
      en: "Hi 👋 This is the space to tell your story in a few lines — " +
          "who you are, what you're into, what you're working on, and what you're looking for next. " +
          "Keep it casual, like introducing yourself to a new friend."
    },

    // TODO: ใส่ไฟล์รูปไว้ที่ assets/img/ แล้วแก้ path ตรงนี้
    // ถ้าปล่อยว่างไว้ เว็บจะแสดงตัวอักษรย่อของชื่อแทนรูป
    avatar: "",           // เช่น "assets/img/profile.jpg"

    location: { th: "ประเทศไทย", en: "Thailand" },

    // TODO: ตัวเลขเด่นบนหน้าแรก (ตัวเลขจะนับขึ้นเองตอนเลื่อนมาเห็น)
    // value = ตัวเลข, suffix = ตัวต่อท้าย เช่น "+" หรือ "%"
    // ⚠️ ช่องที่ value เป็น 0 จะ "ไม่แสดง" — ใส่ตัวเลขจริงแล้วช่องนั้นจะโผล่มาเอง
    //    (ตอนนี้ยังไม่มีข้อมูลจริง เลยตั้งเป็น 0 ไว้ทั้งหมด แถวนี้จึงยังไม่ขึ้น)
    stats: [
      { value: 0, suffix: "+", label: { th: "โปรเจกต์",     en: "Projects" } },
      { value: 0, suffix: "+", label: { th: "ปีประสบการณ์", en: "Years experience" } },
      { value: 0, suffix: "+", label: { th: "ลูกค้า",       en: "Happy clients" } }
    ]
  },

  /* ---------- 2. คำวิ่ง (แถบคำที่เลื่อนไปเรื่อย ๆ) ---------- */
  // TODO: ใส่คำที่อธิบายตัวคุณ / สิ่งที่ชอบ
  marquee: ["Create", "สร้างสรรค์", "Design", "ออกแบบ", "Explore", "ค้นหา", "Build", "ลงมือทำ", "Share", "แบ่งปัน"],

  /* ---------- 3. ผลงาน / Portfolio ---------- */
  // TODO: แก้เป็นผลงานจริง เพิ่ม/ลบได้ไม่จำกัด
  // image: ใส่ path รูป เช่น "assets/img/work1.jpg" — ถ้าเว้นว่างจะใช้ emoji + สีพื้นแทน
  portfolio: [
    {
      emoji: "🎨",
      image: "",
      title: { th: "ชื่อผลงานที่ 1",  en: "Project One" },
      desc:  { th: "อธิบายสั้น ๆ ว่าผลงานนี้คืออะไร ทำอะไรบ้าง และผลลัพธ์เป็นยังไง",
               en: "A short description of what this project is, what you did, and the outcome." },
      tags:  ["Design", "Branding"],
      link:  ""      // ใส่ URL ถ้ามีหน้าให้กดดูต่อ เว้นว่างได้
    },
    {
      emoji: "📱",
      image: "",
      title: { th: "ชื่อผลงานที่ 2",  en: "Project Two" },
      desc:  { th: "อธิบายสั้น ๆ ว่าผลงานนี้คืออะไร ทำอะไรบ้าง และผลลัพธ์เป็นยังไง",
               en: "A short description of what this project is, what you did, and the outcome." },
      tags:  ["UI/UX", "Mobile"],
      link:  ""
    },
    {
      emoji: "📸",
      image: "",
      title: { th: "ชื่อผลงานที่ 3",  en: "Project Three" },
      desc:  { th: "อธิบายสั้น ๆ ว่าผลงานนี้คืออะไร ทำอะไรบ้าง และผลลัพธ์เป็นยังไง",
               en: "A short description of what this project is, what you did, and the outcome." },
      tags:  ["Photography"],
      link:  ""
    },
    {
      emoji: "🌐",
      image: "",
      title: { th: "ชื่อผลงานที่ 4",  en: "Project Four" },
      desc:  { th: "อธิบายสั้น ๆ ว่าผลงานนี้คืออะไร ทำอะไรบ้าง และผลลัพธ์เป็นยังไง",
               en: "A short description of what this project is, what you did, and the outcome." },
      tags:  ["Web", "Front-end"],
      link:  ""
    }
  ],

  /* ---------- 4. ทักษะ / Skills ---------- */
  // TODO: แก้เป็นทักษะจริง — level = 0–100 (ความยาวของแถบ)
  // ⚠️ ชื่อทักษะและตัวเลขข้างล่างนี้เป็น "ตัวอย่าง" ทั้งหมด ไม่ใช่ข้อมูลจริง
  //    ใส่ไว้เพื่อให้เห็นว่าหน้าตาเป็นยังไง — แก้ทับได้เลย
  skills: [
    {
      group: { th: "ออกแบบ", en: "Design" },
      items: [
        { name: "Figma",            level: 70 },
        { name: "Adobe Photoshop",  level: 70 },
        { name: "Illustrator",      level: 70 }
      ]
    },
    {
      group: { th: "เทคโนโลยี", en: "Technology" },
      items: [
        { name: "HTML / CSS",  level: 70 },
        { name: "JavaScript",  level: 70 },
        { name: "Git",         level: 70 }
      ]
    },
    {
      group: { th: "ทักษะอื่น ๆ", en: "Other skills" },
      items: [
        { name: { th: "การสื่อสาร",   en: "Communication" }, level: 70 },
        { name: { th: "ทำงานเป็นทีม", en: "Teamwork" },      level: 70 },
        { name: { th: "ภาษาอังกฤษ",   en: "English" },       level: 70 }
      ]
    }
  ],

  /* ---------- 5. ประสบการณ์ / Experience ---------- */
  // TODO: ไทม์ไลน์ เรียงจากใหม่ → เก่า
  experience: [
    {
      period: { th: "25xx – ปัจจุบัน", en: "20xx – Present" },
      role:   { th: "ตำแหน่งงานปัจจุบัน", en: "Current Role" },
      org:    { th: "ชื่อบริษัท / องค์กร", en: "Company / Organisation" },
      desc:   { th: "สรุปสิ่งที่รับผิดชอบและผลงานเด่นในตำแหน่งนี้",
                en: "What you were responsible for and your key achievements here." }
    },
    {
      period: { th: "25xx – 25xx", en: "20xx – 20xx" },
      role:   { th: "ตำแหน่งงานก่อนหน้า", en: "Previous Role" },
      org:    { th: "ชื่อบริษัท / องค์กร", en: "Company / Organisation" },
      desc:   { th: "สรุปสิ่งที่รับผิดชอบและผลงานเด่นในตำแหน่งนี้",
                en: "What you were responsible for and your key achievements here." }
    },
    {
      period: { th: "25xx – 25xx", en: "20xx – 20xx" },
      role:   { th: "ปริญญาตรี สาขา…", en: "Bachelor's Degree in …" },
      org:    { th: "ชื่อมหาวิทยาลัย", en: "University Name" },
      desc:   { th: "กิจกรรม ผลงาน หรือเกียรตินิยมที่อยากเล่า",
                en: "Activities, projects or honours worth mentioning." }
    }
  ],

  /* ---------- 6. ลิงก์ติดต่อ / Links ---------- */
  // เว้น url ว่างไว้ = ไม่แสดงปุ่มนั้น
  links: [
    // ✅ ยืนยันแล้ว
    { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/schon_ked/" },
    { label: "Threads",   icon: "threads",   url: "https://www.threads.net/@schon_ked" },
    { label: "Facebook",  icon: "facebook",  url: "https://www.facebook.com/cosry.shakkieye" },
    // TODO
    { label: "Email",     icon: "mail",      url: "" },   // เช่น "mailto:you@example.com"
    { label: "LINE",      icon: "line",      url: "" }
  ]
};
