import {React, useState} from 'react';
import '../../../css/HelpPage/support.css'

const Support = () => {
  const [theme, setTheme] = useState('');
  const [contact, setContact] = useState('');
  const [question, setQuestion] = useState('');
  const [countChar, setCountChar] = useState(0)

  const handleChange = (event) => {
    const { value } = event.target;
    setQuestion(value);
    setCountChar(value.length);
  };

    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (theme.length >= 5 && theme.length <= 15 && contact.length >= 10
        && question.length <= 1000 && question.length >= 10) {
        alert('Форма успешно отправлена!');
        setTheme('');
        setContact('');
        setQuestion('');
        setCountChar(0);
      } else {
        alert('Пожалуйста, заполните все поля формы корректно.');
      }
    };
  
    return (
      <form className='contacts' onSubmit={handleSubmit}>
        <h1>Служба поддержки</h1>
        <div className='mskPhone'>
          <a href='tel: +74957907277'>+7 495 790 72 77</a>
          <p>Санкт-Петербург</p>
        </div>
        <div className='rfPhone'>
          <a href='tel: 88002007277'>8 800 200‑72‑77</a>
          <p>Россия</p>
        </div>
        <div className='theme'>
          <p>Тема обращения</p>
          <input
            required
            minLength={5}
            maxLength={15}
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
          />
        </div>
        <div className='phoneMail'>
          <p>Телефон или email</p>
          <input
            required
            minLength={10}
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
        </div>
        <div className='question'>
          <p>Ваш вопрос</p>
          <textarea
            required
            minLength={10}
            maxLength={1000}
            value={question}
            onChange={handleChange}
            id='texteriaQuestion'
          ></textarea>
          <p className='counter'>{countChar}/1000</p>
        </div>
        <button className='sumbitBtn' type='submit'>Отправить</button>
      </form>
  );
}

export default Support