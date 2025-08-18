import {
  Box,
  Home,
  UsersRound
} from "lucide-react"

import { CategoriesIcon } from "../../client/ui/icons";
import { Link } from "@/i18n/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger
  } from "../ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: UsersRound,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: CategoriesIcon,
  },
  {
    title: "Products",
    icon: Box,
    url: "/admin/products",
    items: [
      {
        title: "Products",
        url: "/admin/products"
      },
      {
        title: "Variant types",
        url: "/admin/product-variant-types"
      }
    ]
  },
]

function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarTrigger />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url}>
                    <SidebarMenuButton>
                      <item.icon size={17} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                  {item.items && (
                    <SidebarMenuSub>
                      {item.items.map((i) => (
                        <SidebarMenuSubItem key={i.title}>
                          <Link href={i.url}>
                            <SidebarMenuSubButton className="whitespace-nowrap">
                              {i.title}
                            </SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { AdminSidebar };
