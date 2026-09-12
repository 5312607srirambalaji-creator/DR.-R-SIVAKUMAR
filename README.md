# Academic Portfolio & Faculty Website: Dr. R. Sivakumar

This repository contains the complete, modern, multi-page responsive academic website for **Dr. R. Sivakumar**, Professor in the Department of Civil Engineering and Coordinator of the Earthquake Research Cell (CET) at SRM Institute of Science and Technology (SRMIST), Kattankulathur, Chennai, India.

---

## 🌟 Key Architecture & Highlights

1. **Modular Multi-Page Architecture (Non-monolithic):**
   - Content is cleanly categorized across dedicated, fast-loading pages rather than a single endless scrolling page:
     - **[index.html](index.html):** Executive Overview & Biography, LHS Portrait, quick metrics, core research previews, and inquiry CTAs.
     - **[research.html](research.html):** Deep-dive into Intellectual Property (Granted & Published Patents), Extramural Research Grants (DST, NRDMS, ISRO, SERC), and detailed domain breakdowns.
     - **[publications.html](publications.html):** Full interactive repository for all 95+ peer-reviewed works (56 Journals, 31 Conferences, 8 Books) with live search, category filtering, and one-click citation copying.
     - **[experience.html](experience.html):** Professional appointments timeline (SRMIST, BIT Mesra, GIS Institute Noida), Educational Degrees, Courses Taught, and Honors & Institutional Leadership.
     - **[contact.html](contact.html):** Official campus coordinates and interactive inquiry form.

2. **Dual Email Support:**
   - **Primary Institutional Email:** `sivakumr@srmist.edu.in`
   - **Alternate 2nd Email for Direct Inquiries:** `sivageoinfo@gmail.com`
   - Integrated one-click copy buttons for both email addresses.
   - The inquiry form defaults to `sivageoinfo@gmail.com` with CC to `sivakumr@srmist.edu.in`.

3. **LHS (Left Hand Side) Profile Photo Layout:**
   - In the hero section, the faculty portrait is prominently placed on the Left Hand Side (LHS) with subtle glowing accents and quick-access email pills underneath.
   - The Right Hand Side (RHS) features titles, institutional affiliations, brief biography, action buttons, and scholarly network links.

4. **No CV Option:**
   - CV print and download buttons have been removed as per specification.

5. **Interactive Capabilities:**
   - Dark/Light mode toggle synchronized with `localStorage`.
   - Real-time client-side search across 95 publications.
   - Responsive mobile navigation drawer.

---

## 📁 Project Structure

```
dr-sivakumar-profile/
├── assets/
│   └── profile.jpg         # High-resolution faculty portrait
├── data.js                 # Global data object (window.PROFESSOR_DATA)
├── data.json               # Pure JSON backup of complete faculty profile data
├── index.html              # Home & Executive Overview (LHS photo layout)
├── research.html           # Patents, Extramural Grants & Research Domains
├── publications.html       # Full searchable 95+ publications archive
├── experience.html         # Career timeline, Education, Teaching, Honors
├── contact.html            # Dual email inquiry system & office coordinates
├── script.js               # Theme, publication search/filtering, forms, copy helpers
├── styles.css              # Custom styling, glassmorphism, badges, dark mode
└── README.md               # Project documentation
```

---

## 🚀 How to Preview Locally

Open `index.html` directly in any web browser, or launch a local HTTP server:

```powershell
# Using Python
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.
