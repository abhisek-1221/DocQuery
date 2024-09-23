import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <Input type="search" placeholder="Search something here..." className="w-64" />
      <div className="flex items-center space-x-4">
        <Button variant="outline">Notifications</Button>
        <Button variant="outline">Settings</Button>
        <Button>+ Create request</Button>
      </div>
    </header>
  )
}