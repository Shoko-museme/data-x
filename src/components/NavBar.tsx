import { Search, Plus, Bell, Settings, LogOut, User } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface NavBarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function NavBar({ currentPage, onPageChange }: NavBarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        {/* Logo and Navigation Links */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-medium">D</span>
            </div>
            <span className="font-medium">Dashboard</span>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant={currentPage === 'overview' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onPageChange('overview')}
            >
              Overview
            </Button>
            <Button 
              variant={currentPage === 'maps' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onPageChange('maps')}
            >
              Maps
            </Button>
            <Button 
              variant={currentPage === 'projects' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => onPageChange('projects')}
            >
              Projects
            </Button>
            <Button variant="ghost" size="sm">Analytics</Button>
            <Button variant="ghost" size="sm">Reports</Button>
          </div>
        </div>

        {/* Search, Actions, and Avatar */}
        <div className="flex items-center gap-3">
          {/* Search Field */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="w-64 pl-10 border-0"
            />
          </div>

          {/* New Project Button */}
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Project</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>

          {/* Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
