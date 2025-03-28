import {React, useState} from 'react';
import Header from '../BaseComponents/Header/Header';
import Footer from '../BaseComponents/Footer/Footer';

const SignUp = () => {

  const [activeForm, setActiveForm] = useState('form1'); // 'form1' или 'form2'

  const handleSubmitForm1 = (e) => {
    e.preventDefault();
    alert('Форма 1 отправлена!');
  };

  const handleSubmitForm2 = (e) => {
    e.preventDefault();
    alert('Форма 2 отправлена!');
  };

  return (
    <>
        <Header/>
               <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      {/* Переключатель */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveForm('form1')}
          style={{
            padding: '10px',
            background: activeForm === 'form1' ? '#4CAF50' : '#ddd',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Форма 1
        </button>
        <button
          onClick={() => setActiveForm('form2')}
          style={{
            padding: '10px',
            background: activeForm === 'form2' ? '#4CAF50' : '#ddd',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Форма 2
        </button>
      </div>

      {/* Форма 1 */}
      {activeForm === 'form1' && (
        <form onSubmit={handleSubmitForm1} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <h3>Форма 1</h3>
          <div style={{ marginBottom: '10px' }}>
            <label>Имя:</label>
            <input type="text" required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input type="email" required style={{ width: '100%', padding: '8px' }} />
          </div>
          <button type="submit" style={{ padding: '10px 15px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
            Отправить
          </button>
        </form>
      )}

      {/* Форма 2 */}
      {activeForm === 'form2' && (
        <form onSubmit={handleSubmitForm2} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <h3>Форма 2</h3>
          <div style={{ marginBottom: '10px' }}>
            <label>Телефон:</label>
            <input type="tel" required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Адрес:</label>
            <textarea required style={{ width: '100%', padding: '8px' }} />
          </div>
          <button type="submit" style={{ padding: '10px 15px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
            Отправить
          </button>
        </form>
      )}
    </div>
  );
};
        <Footer/>
    </>
  );
}

export default SignUp