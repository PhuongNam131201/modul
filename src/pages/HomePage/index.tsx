import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { useNavigate } from 'react-router-dom';
import { useIsAdmin } from '@/shared/hooks/useIsAdmin';

export default function HomePage() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Chào mừng đến với{' '}
          <span className="text-primary">Vote</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Nền tảng bình chọn trực tuyến — realtime, dễ sử dụng, hiển thị tốt trên mọi thiết bị.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          {isAdmin ? (
            // Admin: go to dashboard
            <Button size="lg" onClick={() => navigate('/dashboard')}>
              Quản lý Dashboard
            </Button>
          ) : (
            // Viewer: just view content — no login button needed on hero
            <Button size="lg" onClick={() => {/* scroll to content */}}>
              Xem bình chọn
            </Button>
          )}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>⚡ Realtime</CardTitle>
            <CardDescription>Kết quả cập nhật tức thì với Firebase Realtime Database</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Mọi bình chọn được đồng bộ ngay lập tức giữa tất cả người dùng.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📱 Responsive</CardTitle>
            <CardDescription>Hiển thị tốt trên mọi thiết bị</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Từ điện thoại, tablet đến desktop — giao diện tự động thích ứng.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🖼️ Media</CardTitle>
            <CardDescription>Upload và tối ưu hình ảnh với Cloudinary</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Hình ảnh được tự động tối ưu và phân phối qua CDN toàn cầu.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
