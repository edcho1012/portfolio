import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// 주의: React.StrictMode를 일부러 쓰지 않았습니다.
// StrictMode는 개발 모드에서 useEffect를 마운트 시 두 번 실행하는데,
// 이 앱의 로직(캔버스 애니메이션 루프, 이벤트 리스너, 오디오 스케줄링 등)은
// 정리(cleanup) 없이 한 번만 실행되는 걸 전제로 만들어져 있어서
// 두 번 실행되면 이벤트가 중복 등록되는 문제가 생깁니다.
// 프로덕션 빌드에서는 StrictMode 여부와 상관없이 원래도 한 번만 실행되지만,
// 로컬 개발(npm run dev) 경험까지 원본과 동일하게 만들기 위해 빼두었습니다.
createRoot(document.getElementById('root')).render(<App />);
