function formatDate(inputDate) {
    const date = new Date(inputDate);
    const now = new Date();

    const isToday = (date) => {
        return date.toDateString() === now.toDateString();
    };

    const isYesterday = (date) => {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return date.toDateString() === yesterday.toDateString();
    };

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatDateText = (date) => {
        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];
        const day = date.getDate();
        const month = months[date.getMonth()];
        return `${day} ${month}`;
    };

    if (isToday(date)) {
        return `сегодня в ${formatTime(date)}`;
    } else if (isYesterday(date)) {
        return `вчера в ${formatTime(date)}`;
    } else {
        return formatDateText(date);
    }
}

function formatSalary(salary, currencySymbol, duration){
    const formattedSalary = String(salary).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formattedSalary}${currencySymbol} в ${duration}`
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9]{10,14}$/;

function validationSignUpCandidateForm(formData) {
    let errors = []

    if (formData.firstName.length === 0) {
        errors.push('Имя должно быть заполнено')
    } else if (formData.firstName.length < 2) {
        errors.push('Имя не должно быть меньше 2 и больше 20 символов')
    }

    if (formData.lastName.length === 0) {
        errors.push('Фамилия должно быть заполнено')
    } else if (formData.lastName.length < 2) {
        errors.push('Фамилия не должно быть меньше 2 и больше 20 символов')
    }

    if (formData.password.length === 0) {
      errors.push('Пароль должен быть заполнен');
    } else if (formData.password.length < 6) {
      errors.push('Пароль должен быть от 6 до 20 символов');
    }

    if (formData.phone.length === 0) {
      errors.push('Номер телефона должен быть заполнен');
    } else if (!phonePattern.test(formData.phone)) {
      errors.push('Некорректный номер телефона');
    }

    if (formData.mail.length === 0) {
      errors.push('Почта должна быть заполнена');
    } else if (!emailPattern.test(formData.mail)) {
      errors.push('Некорректный формат почты');
    }

    return errors
}

function validationSignUpCompanyForm(formData) {
    let errors = []

    if (formData.name.length === 0) {
        errors.push('Название компании должно быть заполнено')
    } else if (formData.name.length < 2) {
        errors.push('Название компании не должно быть меньше 2 и больше 20 символов')
    }

    if (formData.password.length === 0) {
        errors.push('Пароль должен быть заполнен');
    } else if (formData.password.length < 6) {
        errors.push('Пароль должен быть от 6 до 20 символов');
    }

    if (formData.phone.length === 0) {
      errors.push('Номер телефона должен быть заполнен');
    } else if (!phonePattern.test(formData.phone)) {
      errors.push('Некорректный номер телефона');
    }

    if (formData.mail.length === 0) {
        errors.push('Почта должна быть заполнена');
    } else if (!emailPattern.test(formData.mail)) {
        errors.push('Некорректный формат почты');
    }

    if (formData.description.length === 0) {
        errors.push('Описание компании должно быть заполнено');
    } else if (formData.description.length < 20) {
        errors.push('Описание компании должно быть от 20 до 400 символов');
    }

    return errors
}

function showNotification(title, message, type = 'info', duration = 4000) {
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
    };

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '20px';
    container.style.right = '20px';
    container.style.zIndex = 9999;
    container.style.minWidth = '250px';
    container.style.padding = '12px 16px';
    container.style.marginBottom = '10px';
    container.style.borderRadius = '8px';
    container.style.backgroundColor = colors[type] || '#2196f3';
    container.style.color = '#fff';
    container.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    container.style.fontFamily = 'sans-serif';
    container.style.transition = 'opacity 0.3s ease';

    const titleEl = document.createElement('div');
    titleEl.style.fontWeight = 'bold';
    titleEl.style.marginBottom = '4px';
    titleEl.innerText = title;

    const messageEl = document.createElement('div');
    messageEl.innerText = message;

    container.appendChild(titleEl);
    container.appendChild(messageEl);
    document.body.appendChild(container);

    setTimeout(() => {
        container.style.opacity = 0;
        setTimeout(() => container.remove(), 300);
    }, duration);
}

module.exports = {
    formatDate,
    formatSalary,
    validationSignUpCandidateForm,
    validationSignUpCompanyForm,
    showNotification
  };