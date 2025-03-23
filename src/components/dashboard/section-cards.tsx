import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:px-6">
      <Card className="bg-gradient-to-t from-primary/5 to-card dark:bg-card p-4 shadow-xl shadow-red-950">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">$1,250.00</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp /> +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Visitors for the last 6 months</div>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-t from-primary/5 to-card dark:bg-card p-4 shadow-xl shadow-red-950">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">1,234</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown /> -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Acquisition needs attention</div>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-t from-primary/5 to-card dark:bg-card p-4 shadow-xl shadow-red-950">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">45,678</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp /> +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceeds targets</div>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xl shadow-red-950 dark:bg-card p-4">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">4.5%</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp /> +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}