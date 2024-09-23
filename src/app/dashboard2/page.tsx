import DashboardLayout from '@/components/DashboardLayout'
import Overview from '@/components/Overview'
import TopProducts from '@/components/TopProducts'

export default function Home() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Good Morning, Justin</h1>
        <Overview />
        <TopProducts />
      </div>
    </DashboardLayout>
  )
}