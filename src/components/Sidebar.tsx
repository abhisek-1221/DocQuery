import { Button } from "@/components/ui/button"

const menuItems = [
  { name: 'Dashboard', icon: '📊' },
  { name: 'Products', icon: '📦' },
  { name: 'Customers', icon: '👥' },
  { name: 'Orders', icon: '📝' },
  { name: 'Promotions', icon: '🏷️' },
  { name: 'Sales', icon: '💰' },
]

export default function Sidebar() {
  return (
    <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <h1 className="text-2xl font-semibold text-center">Salesync</h1>
      <nav>
        {menuItems.map((item) => (
          <Button key={item.name} variant="ghost" className="w-full justify-start">
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </Button>
        ))}
      </nav>
    </div>
  )
}