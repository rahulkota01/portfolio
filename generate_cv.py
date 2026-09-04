import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

def build_pdf():
    pdf_path = os.path.join("c:\\Rahul Portfolio\\assets", "Rahul_Kota_Resume.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom Palette
    PRIMARY = colors.HexColor("#0f172a")    # Deep Slate / Dark Navy
    ACCENT = colors.HexColor("#1e3a8a")     # Royal Blue
    TEXT_DARK = colors.HexColor("#1e293b")  # Dark Charcoal
    TEXT_MUTED = colors.HexColor("#475569") # Muted Grey
    LINE_COLOR = colors.HexColor("#cbd5e1") # Divider Line

    # Custom Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=PRIMARY,
        alignment=TA_CENTER
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=ACCENT,
        alignment=TA_CENTER
    )
    
    contact_style = ParagraphStyle(
        'DocContact',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=TEXT_MUTED,
        alignment=TA_CENTER
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=ACCENT,
        spaceBefore=8,
        spaceAfter=3,
        textTransform='uppercase'
    )

    item_title = ParagraphStyle(
        'ItemTitle',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=PRIMARY
    )

    item_sub = ParagraphStyle(
        'ItemSub',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=TEXT_DARK
    )

    body_style = ParagraphStyle(
        'ItemBody',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=TEXT_DARK,
        alignment=TA_JUSTIFY
    )

    status_style = ParagraphStyle(
        'StatusStyle',
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11.5,
        textColor=ACCENT
    )

    tags_style = ParagraphStyle(
        'TagsStyle',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=TEXT_MUTED
    )

    story = []

    # 1. HEADER
    story.append(Paragraph("RAHUL KOTA", title_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Doctor of Pharmacy (Pharm.D) Scholar &nbsp;|&nbsp; Aspiring Computational & Structural Biology Researcher", subtitle_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph("Vijayawada, AP, India &nbsp;&bull;&nbsp; Email: rahulkota0101@gmail.com &nbsp;&bull;&nbsp; Phone: +91 9502313528", contact_style))
    story.append(Paragraph("Portfolio: <u>rahulkota01.github.io/portfolio</u> &nbsp;&bull;&nbsp; GitHub: <u>github.com/rahulkota01</u>", contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=LINE_COLOR, spaceBefore=2, spaceAfter=8))

    # 2. EDUCATION
    story.append(Paragraph("EDUCATION", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=ACCENT, spaceBefore=1, spaceAfter=6))
    
    edu_p1 = Paragraph("<b>Doctor of Pharmacy (Pharm.D)</b> &bull; <i>3rd Year Scholar</i><br/><font color='#475569'>QIS College of Pharmacy, AP (Affiliated with JNTUK & RIMS)</font>", item_sub)
    edu_d1 = Paragraph("<b>2023 &ndash; Present</b>", ParagraphStyle('DateRight', fontName='Helvetica-Bold', fontSize=8.5, alignment=2, textColor=TEXT_MUTED))
    t1 = Table([[edu_p1, edu_d1]], colWidths=[420, 120])
    t1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t1)
    story.append(Spacer(1, 4))

    edu_p2 = Paragraph("<b>Intermediate &mdash; PCB (Physics, Chemistry, Biology)</b> &bull; <i>GPA: 9.0 / 90.2%</i><br/><font color='#475569'>VKR College</font>", item_sub)
    edu_d2 = Paragraph("<b>2021 &ndash; 2023</b>", ParagraphStyle('DateRight2', fontName='Helvetica-Bold', fontSize=8.5, alignment=2, textColor=TEXT_MUTED))
    t2 = Table([[edu_p2, edu_d2]], colWidths=[420, 120])
    t2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t2)
    story.append(Spacer(1, 8))

    # 3. RESEARCH MANUSCRIPTS & PUBLICATIONS
    story.append(Paragraph("RESEARCH MANUSCRIPTS & PUBLICATIONS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=ACCENT, spaceBefore=1, spaceAfter=6))

    ms_title = Paragraph("<b>Research Article</b> &nbsp;|&nbsp; <i>Manuscript Submitted</i>", item_title)
    ms_heading = Paragraph("<b>Decoding miRNA&ndash;mRNA Regulatory Networks in Triple-Negative Breast Cancer: An Integrative Re-analysis of Public Expression Data</b>", item_sub)
    ms_desc = Paragraph("Integrative computational re-analysis of publicly available expression data to investigate miRNA&ndash;mRNA regulatory relationships in triple-negative breast cancer (TNBC).", body_style)
    ms_status = Paragraph("<b>Status:</b> Manuscript submitted to a Q2 journal in the <i>Journal of Biomedicine</i> and currently under consideration.", status_style)
    ms_tags = Paragraph("<b>Keywords:</b> Computational Biology, Bioinformatics, Cancer Biology, TNBC, miRNA&ndash;mRNA Networks, Genomics, Systems Biology", tags_style)

    story.append(ms_title)
    story.append(Spacer(1, 2))
    story.append(ms_heading)
    story.append(Spacer(1, 3))
    story.append(ms_desc)
    story.append(Spacer(1, 3))
    story.append(ms_status)
    story.append(Spacer(1, 3))
    story.append(ms_tags)
    story.append(Spacer(1, 10))

    # 4. RESEARCH EXPERIENCE & INTERNSHIPS
    story.append(Paragraph("RESEARCH EXPERIENCE & INTERNSHIPS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=ACCENT, spaceBefore=1, spaceAfter=6))

    exp1_title = Paragraph("<b>Research Internship</b> &bull; Organic Chemistry Research Laboratory", item_title)
    exp1_sub = Paragraph("Department of Chemistry &bull; <b>National Institute of Technology Warangal (NITW)</b>", item_sub)
    exp1_desc = Paragraph("Research internship in the Organic Chemistry Research Laboratory under the guidance of <b>Prof. Venkata Sri Lakshmi</b>, working alongside PhD scholars on organic chemistry research lab.", body_style)

    story.append(exp1_title)
    story.append(Spacer(1, 2))
    story.append(exp1_sub)
    story.append(Spacer(1, 3))
    story.append(exp1_desc)
    story.append(Spacer(1, 6))

    exp2_title = Paragraph("<b>Guided Mentorship</b> &bull; Exploratory Cancer Biology & Nanocarrier Research", item_title)
    exp2_sub = Paragraph("Department of Pharmaceutical Engineering & Technology &bull; <b>Indian Institute of Technology (BHU) Varanasi</b>", item_sub)
    exp2_desc = Paragraph("Literature-based exploratory research on miRNA-incorporated nanocarrier delivery systems for Triple-Negative Breast Cancer under PhD scholar guidance.", body_style)

    story.append(exp2_title)
    story.append(Spacer(1, 2))
    story.append(exp2_sub)
    story.append(Spacer(1, 3))
    story.append(exp2_desc)
    story.append(Spacer(1, 10))

    # 5. WORKSHOPS, CERTIFICATIONS & ACHIEVEMENTS
    story.append(Paragraph("WORKSHOPS, CERTIFICATIONS & ACHIEVEMENTS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=ACCENT, spaceBefore=1, spaceAfter=6))

    achievements = [
        "<b>1st Place &mdash; Poster Presentation:</b> National Pharmacy Week 2025, SCRMP Gujarat Chapter.",
        "<b>GIAN Course &mdash; Precision Medicines & Next-Gen Deep Medicines:</b> 10-day intensive workshop at IIT Indore in collaboration with Purdue University, USA.",
        "<b>5th Health Care Summit 2025:</b> National conference participant at Indian Institute of Science (IISc), Bangalore.",
        "<b>NPTEL Certification:</b> Mathematical Foundations for Machine Learning (IISc & NITK Joint Certification).",
        "<b>GATE Preparation:</b> Active preparation for GATE (Life Sciences - XL & Biotechnology - BT)."
    ]

    for ach in achievements:
        story.append(Paragraph(f"&bull; {ach}", body_style))
        story.append(Spacer(1, 3))

    story.append(Spacer(1, 6))

    # 6. TECHNICAL & COMPUTATIONAL SKILLS
    story.append(Paragraph("TECHNICAL & COMPUTATIONAL SKILLS", section_heading))
    story.append(HRFlowable(width="100%", thickness=0.5, color=ACCENT, spaceBefore=1, spaceAfter=6))

    sk1 = Paragraph("<b>Programming & Tools:</b> Python (Basics), Streamlit, SQL (Basics), Java (Basics)", body_style)
    sk2 = Paragraph("<b>Computational & Biological Focus:</b> Bioinformatics, Computational Genomics, Systems Biology, Structural Biology Concepts", body_style)
    sk3 = Paragraph("<b>Languages:</b> English (Academic/Professional), Hindi (Working), German (Elementary A1)", body_style)

    story.append(sk1)
    story.append(Spacer(1, 3))
    story.append(sk2)
    story.append(Spacer(1, 3))
    story.append(sk3)

    doc.build(story)
    print(f"Successfully generated {pdf_path}")

if __name__ == '__main__':
    build_pdf()
