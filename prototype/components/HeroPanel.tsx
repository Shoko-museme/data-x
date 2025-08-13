import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const chartData = [
  { name: 'Jan', revenue: 4000, users: 240, projects: 12 },
  { name: 'Feb', revenue: 3000, users: 198, projects: 18 },
  { name: 'Mar', revenue: 5000, users: 320, projects: 24 },
  { name: 'Apr', revenue: 4500, users: 275, projects: 21 },
  { name: 'May', revenue: 6000, users: 390, projects: 28 },
  { name: 'Jun', revenue: 5500, users: 365, projects: 31 },
]

const statsData = [
  {
    title: 'Total Revenue',
    value: '$28,000',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    description: 'vs last month'
  },
  {
    title: 'Active Users',
    value: '1,788',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    description: 'vs last month'
  },
  {
    title: 'Completion Rate',
    value: '94.2%',
    change: '-2.1%',
    trend: 'down',
    icon: Target,
    description: 'vs last month'
  },
  {
    title: 'Active Projects',
    value: '134',
    change: '+15.3%',
    trend: 'up',
    icon: Activity,
    description: 'vs last month'
  }
]

export function HeroPanel() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1>Welcome back, John</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Badge 
                    variant={stat.trend === 'up' ? 'default' : 'secondary'}
                    className={`gap-1 ${stat.trend === 'up' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-red-100 text-red-700 hover:bg-red-100'}`}
                  >
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {stat.change}
                  </Badge>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue growth trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Projects Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Activity</CardTitle>
            <CardDescription>Monthly project creation and user growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="projects" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="users" fill="hsl(var(--chart-3))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}