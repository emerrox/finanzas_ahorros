"use client"
import { User, Settings, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import React from "react"

interface UserMenuProps {
  onLogout: () => void;
  settingsUrl?: string;
}

export default function UserMenu({ onLogout, settingsUrl = "/settings" }: UserMenuProps) {
  return (
    <div className="absolute  right-[20vw]">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  size="icon" color="#2f475d" className="rounded-full h-11 w-11 bg-pickled-bluewood-900">
          <User className="h-5 w-5" />
          <span className="sr-only">Menú de usuario</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a href={settingsUrl} className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="flex items-center cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}


