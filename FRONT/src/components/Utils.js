import {BACKEND_URL} from './appContans'

export function formatDate(inputDate) {
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

export function formatSalary(salary, currencySymbol, duration){
    const formattedSalary = String(salary).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formattedSalary}${currencySymbol} в ${duration}`
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(?:\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
const namePattern = /^[А-Яа-яЁё\-]{2,}$/;
const passwordPattern = /^.{6,}$/;
const companyNamePattern = /^[А-Яа-яЁёA-Za-z\-']{2,50}$/;

export function validationSignUpCandidateLogin(formData) {
    let errors = []
    let isMail = null
    let login = formData.login

    if (!login) {return ['Почта или номер телефона должны быть заполнены']}

    if (login.includes('@')) {isMail = true}

    if (isMail) {
        if (!emailPattern.test(login)) {
            errors.push('Некорректный формат почты');
        }
    } else {
        if (!phonePattern.test(login)) {
            errors.push('Некорректный номер телефона');
        }
    }

    return errors
}

export function validationSignUpCompanyLogin(formData) {
    let errors = []
    let login = formData.login

    if (login.length === 0) {
        errors.push('Почта должна быть заполнена');
    } else if (!emailPattern.test(login)) {
        errors.push('Некорректный формат почты');
    }

    return errors
}

export function validationSignUpCandidateForm(formData) {
    let errors = [];
    let firstName = formData.firstName;
    let secondName = formData.lastName;
    let patronymic = formData.patronymic;
    let password = formData.candidatePass;

    if (firstName.length === 0) {
        errors.push('Имя должно быть заполнено');
    } else if (!namePattern.test(firstName)) {
        errors.push('Имя должно содержать только буквы и быть не короче 2 символов');
    }

    if (secondName.length === 0) {
        errors.push('Фамилия должна быть заполнена');
    } else if (!namePattern.test(secondName)) {
        errors.push('Фамилия должна содержать только буквы и быть не короче 2 символов');
    }

    if (patronymic.length > 0 && !namePattern.test(patronymic)) {
        errors.push('Отчество должно содержать только буквы и быть не короче 2 символов');
    }

    if (password.length === 0) {
        errors.push('Пароль должен быть заполнен');
    } else if (!passwordPattern.test(password)) {
        errors.push('Пароль должен быть не короче 6 символов');
    }

    return errors;
}

export function validationSignUpCompanyForm(formData) {
    let errors = []
    let name = formData.companyName
    let password = formData.companyPass

    if (name.length === 0) {
        errors.push('Название компании должно быть заполнено')
    } else if (!companyNamePattern.test(name)) {
        errors.push('Некорректное название компании')
    }

    if (password.length < 6) {
        errors.push('Пароль должен содержать минимум 6 символов')
    }

    return errors
}

export function loginUser(data) {
    const response = fetch(BACKEND_URL + '/account/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
    })
    return response
}

export function showNotification(title, message, type = 'info', duration = 2000) {
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3'
    };

    // контейнер для всех уведомлений (общий)
    let notificationsWrapper = document.getElementById('notifications-wrapper');
    if (!notificationsWrapper) {
        notificationsWrapper = document.createElement('div');
        notificationsWrapper.id = 'notifications-wrapper';
        notificationsWrapper.style.position = 'fixed';
        notificationsWrapper.style.top = '20px';
        notificationsWrapper.style.right = '20px';
        notificationsWrapper.style.zIndex = 9999;
        notificationsWrapper.style.display = 'flex';
        notificationsWrapper.style.flexDirection = 'column';
        notificationsWrapper.style.gap = '10px';

        // попытка сохранять уведомления между переходами страниц, пока тщетная
        const root = document.getElementById('notification-root') || document.body;
        root.appendChild(notificationsWrapper);
    }

    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.minWidth = '250px';
    container.style.padding = '12px 16px';
    container.style.borderRadius = '8px';
    container.style.backgroundColor = colors[type] || '#2196f3';
    container.style.color = '#fff';
    container.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    container.style.fontFamily = 'sans-serif';
    container.style.transition = 'opacity 0.3s ease';
    container.style.opacity = '1';

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '8px';
    closeBtn.style.right = '12px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '18px';
    closeBtn.style.fontWeight = 'bold';

    closeBtn.onclick = () => {
        clearTimeout(timeoutId);
        container.style.opacity = 0;
        setTimeout(() => container.remove(), 300);
    };

    const titleEl = document.createElement('div');
    titleEl.style.fontWeight = 'bold';
    titleEl.style.marginBottom = '4px';
    titleEl.innerText = title;

    const messageEl = document.createElement('div');
    messageEl.innerText = message;

    container.appendChild(closeBtn);
    container.appendChild(titleEl);
    container.appendChild(messageEl);
    notificationsWrapper.appendChild(container);

    const timeoutId = setTimeout(() => {
        container.style.opacity = 0;
        setTimeout(() => container.remove(), 300);
    }, duration);
}