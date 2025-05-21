import { useEffect, useState } from "react";
import '../../../../css/EditProfile/EditForm.css';

const ExperienceForm = ({ experienceData, registerDirtyFields }) => {
    const initialExperience = experienceData?.length
      ? JSON.parse(JSON.stringify(experienceData))
      : [{ company_name: "", position: "", experience: "" }];

  const [experienceList, setExperienceList] = useState(initialExperience);
  const [dirtyList, setDirtyList] = useState([]);

  // обновляем внешний ref при изменении dirtyList
  useEffect(() => {
    registerDirtyFields.current = dirtyList;
  }, [dirtyList]);

  // обработка изменения поля
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedList = [...experienceList];
    updatedList[index][name] = value === "" ? null : value;
    setExperienceList(updatedList);

    const originalItem = experienceData?.[index] ?? {};
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
    setExperienceList((prev) => [...prev, { company_name: "", position: "", experience: "" }]);
  };

  // удаление опыта
  const removeExperience = (index) => {
    const item = experienceList[index];
    const updatedList = [...experienceList];
    updatedList.splice(index, 1);
    setExperienceList(updatedList);

    if (item.id) {
      setDirtyList((prev) => [
        ...prev.filter((x) => x.id !== item.id),
        {
          id: item.id,
          company_name: item.company_name,
          position: item.position,
          experience: item.experience,
          _deleted: true,
        },
      ]);
    } else {
      setDirtyList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      {experienceList.map((exp, index) => (
        <div key={index} className='manyDiv'>
          <input
            name="company_name"
            value={exp.company_name || ""}
            onChange={(e) => handleChange(e, index)}
            className='editInput'
            placeholder="Компания"
          />
          <input
            name="position"
            value={exp.position || ""}
            onChange={(e) => handleChange(e, index)}
            className='editInput'
            placeholder="Должность"
          />
          <input
            name="experience"
            value={exp.experience || ""}
            onChange={(e) => handleChange(e, index)}
            className='editInput'
            placeholder="Стаж работы"
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

export default ExperienceForm;
