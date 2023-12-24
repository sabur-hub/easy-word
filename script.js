const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['code-block', 'link', 'image', 'video'],
            ['clean']
        ]
    }
});

const saveButton = document.getElementById('save-btn');

// Получаем данные из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    try {
        const savedContent = localStorage.getItem('editorContent');
        if (savedContent) {
            quill.root.innerHTML = savedContent;
        }
    } catch (error) {
        console.error('Ошибка загрузки данных из localStorage:', error);
    }
});

// Обработчик клика по кнопке сохранения
saveButton.addEventListener('click', () => {
    try {
        const content = quill.root.innerHTML;
        // Сохраняем содержимое в localStorage
        localStorage.setItem('editorContent', content);
        // Создаем новый Blob (бинарные данные)
        const blob = new Blob([content], { type: 'text/plain' });

        // Создаем ссылку для скачивания
        const downloadLink = document.createElement('a');
        downloadLink.download = 'yourFile.docx'; // Имя файла для скачивания
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.click();

        // Освобождаем ресурсы URL.createObjectURL
        URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
        console.error('Ошибка сохранения данных в localStorage:', error);
    }
});

const observer = new MutationObserver(() => {
    const content = quill.root.innerHTML;
    localStorage.setItem('editorContent', content);
});

observer.observe(quill.root, { subtree: true, childList: true });
// Добавим стили для темно-оранжевого дизайна
const editor = document.getElementById('editor');
editor.style.backgroundColor = '#1a1a1a'; // измените на желаемый цвет фона
editor.style.color = '#fff'; // измените на желаемый цвет текста


