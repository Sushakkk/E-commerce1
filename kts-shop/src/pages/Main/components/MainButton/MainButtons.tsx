import 'components/Button';
// src/test.tsx

import React from 'react';

// Пример компонента React с ошибками линтинга
const TestComponent = () => {
    console.log('This should trigger a linting error!'); // Ошибка: использование console.log
    return (
        <div>
            <h1>Hello, World!</h1>
            <p>This is a test component.</p>
        </div>
    );
};



export default TestComponent;
