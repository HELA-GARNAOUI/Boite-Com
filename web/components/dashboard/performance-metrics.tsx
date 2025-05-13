import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/dashboard/charts"

export function PerformanceMetrics() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>View your performance across different metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="traffic">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="traffic">Website Traffic</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>
          <TabsContent value="traffic" className="space-y-4">
            <div className="h-[300px]">
              <LineChart />
            </div>
          </TabsContent>
          <TabsContent value="social" className="space-y-4">
            <div className="h-[300px]">
              <BarChart />
            </div>
          </TabsContent>
          <TabsContent value="sales" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-[300px]">
                <PieChart />
              </div>
              <div className="h-[300px]">
                <BarChart />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
