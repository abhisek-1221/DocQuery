import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const overviewItems = [
  { title: 'Total Revenue', value: '$6,240.28', change: '+8%' },
  { title: 'Total Expense', value: '$3,275.18', change: '+2%' },
  { title: 'Total Customers', value: '16,240', change: '+5%' },
]

export default function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      {overviewItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}