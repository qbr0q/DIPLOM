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

module.exports = {
    formatDate,
    formatSalary
  };