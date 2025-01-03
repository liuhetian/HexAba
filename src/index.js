import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

function Main() {
    useEffect(() => {
        // 获取当前访问次数
        const visitCount = localStorage.getItem('visitCount') || 0;
        // 增加访问次数
        localStorage.setItem('visitCount', parseInt(visitCount) + 1);
        console.log(`访问次数: ${parseInt(visitCount) + 1}`);
    }, []);

    return <App />;
}

root.render(<Main />);