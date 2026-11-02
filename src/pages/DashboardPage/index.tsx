import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { ImageUploader } from '@/features/upload/ui/ImageUploader';

export default function DashboardPage() {
  const { user } = useAuthContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h2>
        <p className="text-muted-foreground">
          Xin chào, {user?.email ?? 'Khách'}!
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Tổng bình chọn</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Người tham gia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      {/* Image Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload hình ảnh</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader />
        </CardContent>
      </Card>
    </div>
  );
}
