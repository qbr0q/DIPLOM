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

CANDIDATE_DATA_STMT = text("""
SELECT
    cd.lastName,
    cd.firstName,
    cd.patronymic,
    cd.phone,
    cd.mail,
    cdi.birth_date,
    cdi.sex,
    cdi.about
FROM Candidate as cd
INNER JOIN CandidateInfo cdi on cd.id = cdi.candidate_id
WHERE cd.id = :candidate_id
""")
