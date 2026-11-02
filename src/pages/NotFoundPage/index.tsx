import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="text-xl text-muted-foreground">
        Trang bạn tìm kiếm không tồn tại.
      </p>
      <Button onClick={() => navigate('/')}>
        Về trang chủ
      </Button>
    </div>
  );
}
