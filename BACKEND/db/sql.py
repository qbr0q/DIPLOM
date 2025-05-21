from sqlalchemy import text


ALL_VACANCY_STMT = text("""
SELECT
    vc.id,
    vc.createDate,
    vc.position,
    vc.salary,
    vc.duration,
    vc.isCalling,
    cm.name,
    rbc.currencySymbol
FROM vacancy vc
INNER JOIN Company cm on vc.company_id = cm.id
INNER JOIN rbCurrency rbc on rbc.currencyName = vc.currency
WHERE !vc.deleted
ORDER BY vc.createDate
""")

VACANCY_INFO_STMT = text("""
SELECT
    vc.position,
    vci.jobDescription,
    vc.salary,
    rbc.currencySymbol,
    vc.duration,
    vci.jobDuties,
    vci.candidateRequirements,
    vc.isCalling,
    cm.name AS companyName
FROM Vacancy vc
INNER JOIN VacancyInfo vci on vc.id = vci.vacancy_id
INNER JOIN rbCurrency rbc on rbc.currencyName = vc.currency
INNER JOIN Company cm on vc.company_id = cm.id
WHERE vc.id = :vacancy_id
""")

CANDIDATE_MAIN_DATA_STMT = text("""
SELECT
    cd.id AS candidateId,
    cd.lastName,
    cd.firstName,
    cd.patronymic,
    cd.phone,
    cd.mail,
    cdi.id AS candidateInfoId,
    DATE_FORMAT(cdi.birth_date, '%d.%m.%Y') AS birth_date,
    cdi.sex,
    cdi.about,
    COALESCE(cdi.image_base64, rdi.image_base64) AS image_base64
FROM Candidate cd
INNER JOIN CandidateInfo cdi on cd.id = cdi.candidate_id
INNER JOIN rbDefaultImages rdi on rdi.name = 'candidate_default'
WHERE cd.id = :candidate_id
""")

CANDIDATE_EDUCATION_DATA_STMT = text("""
SELECT
    cde.id,
    cde.institution,
    cde.specialization,
    cde.education_start_date,
    DATE_FORMAT(cde.education_start_date, '%d.%m.%Y') AS education_start_date,
    DATE_FORMAT(cde.education_end_date, '%d.%m.%Y') AS education_end_date
FROM Candidate cd
INNER JOIN CandidateEducation cde on cd.id = cde.candidate_id
WHERE cd.id = :candidate_id
""")

CANDIDATE_EXPERIENCE_DATA_STMT = text("""
SELECT
    cwe.id, 
    cwe.company_name,
    cwe.position,
    cwe.experience
FROM Candidate cd
INNER JOIN CandidateWorkExperience cwe on cd.id = cwe.candidate_id
WHERE cd.id = :candidate_id
""")

CANDIDATE_SKILLS_DATA_STMT = text("""
SELECT
    cs.id,
    cs.skill_name,
    cs.level
FROM Candidate cd
INNER JOIN CandidateSkills cs on cd.id = cs.candidate_id
WHERE cd.id = :candidate_id
""")
