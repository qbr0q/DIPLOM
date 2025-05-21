import { useEffect, useState } from "react";
import '../../../../css/EditProfile/EditForm.css';

const SkillsForm = ({ skillsData, registerDirtyFields }) => {
    const initialExperience = skillsData?.length
      ? JSON.parse(JSON.stringify(skillsData))
      : [{ skill_name: "", level: ""}];

  const [skillList, setSkillList] = useState(initialExperience);
  const [dirtyList, setDirtyList] = useState([]);

  // обновляем внешний ref при изменении dirtyList
  useEffect(() => {
    registerDirtyFields.current = dirtyList;
  }, [dirtyList]);

  // обработка изменения поля
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedList = [...skillList];
    updatedList[index][name] = value === "" ? null : value;
    setSkillList(updatedList);

    const originalItem = skillsData?.[index] ?? {};
    const currentItem = updatedList[index];
    const id = currentItem.id;

    const changed = { ...(id ? { id: id } : {}) };

    Object.keys(currentItem).forEach((key) => {
      const originalValue = originalItem[key] ?? null;
      const currentValue = currentItem[key];
      if (currentValue !== originalValue) {
        changed[key] = currentValue;
      }
    });

    if (!id) changed._new = true;

    setDirtyList((prev) => {
      const filtered = prev.filter(
        (item) =>
          item.id !== id &&
          !(item._new && index === prev.findIndex((i) => i._new && i.index === index))
      );
      return [...filtered, changed];
    });
  };

  // добавление нового опыта
  const addExperience = () => {
    setSkillList((prev) => [...prev, { skill_name: "", level: "" }]);
  };

  // удаление опыта
  const removeExperience = (index) => {
    const item = skillList[index];
    const updatedList = [...skillList];
    updatedList.splice(index, 1);
    setSkillList(updatedList);

    if (item.id) {
      setDirtyList((prev) => [
        ...prev.filter((x) => x.id !== item.id),
        {
          id: item.id,
          skill_name: item.skill_name,
          level: item.level,
          _deleted: true,
        },
      ]);
    } else {
      setDirtyList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      {skillList.map((exp, index) => (
        <div key={index} className='manyDiv'>
          <input
            name="skill_name"
            value={exp.skill_name || ""}
            onChange={(e) => handleChange(e, index)}
            className='editInput'
            placeholder="Навык"
          />
          <input
            name="level"
            value={exp.level || ""}
            onChange={(e) => handleChange(e, index)}
            className='editInput'
            placeholder="Уровень"
          />
          {index !== 0 && (
            <button type="button" onClick={() => removeExperience(index)}
            className='btnDelete'>
              X
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addExperience} className='btnAddNew'>
        +
      </button>
    </div>
  );
};

export default SkillsForm;
