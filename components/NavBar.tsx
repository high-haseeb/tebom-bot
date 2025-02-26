"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ExternalLink, Link2 } from "lucide-react"

const components: { title: string; href: string; description: string }[] =
    [
        {
            "title": "Hasar Durumu",
            "href": "/docs/hasar/durum",
            "description": "Sigorta hasarınızın ilerleme durumunu gerçek zamanlı olarak kontrol edin."
        },
        {
            "title": "Poliçe Detayları",
            "href": "/docs/police/detaylar",
            "description": "Sigorta poliçenizin kapsamını ve avantajlarını görüntüleyin."
        },
        {
            "title": "Prim Ödemeleri",
            "href": "/docs/odemeler/prim",
            "description": "Sigorta kapsamınızın kesintisiz devam etmesi için prim ödemelerinizi yönetin ve takip edin."
        },
        {
            "title": "Destek Merkezi",
            "href": "/docs/destek",
            "description": "Poliçe, hasar ve diğer sigorta işlemleriyle ilgili yardım alın."
        },
        {
            "title": "Kapsam Seçenekleri",
            "href": "/docs/kapsam/secenekler",
            "description": "Farklı sigorta planlarını keşfedin ve size en uygun olanı bulun."
        },
        {
            "title": "SSS",
            "href": "/docs/sss",
            "description": "Sigorta poliçeleri ve hasar süreçleri hakkında sıkça sorulan soruların yanıtlarını bulun."
        }
    ]


export function NavigationBar() {
    return (
        <NavigationMenu className="">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <div className="mb-2 mt-4 text-lg font-medium">Sigorta Merkezi</div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Poliçenizi yönetin, hasar başvurularınızı takip edin ve sigorta kapsamınızı
                                            kolayca keşfedin. Güvenli. Kullanıcı dostu. Şeffaf.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/docs/police/detaylar" title="Poliçe Detayları">
                                Sigorta poliçenizin kapsamı ve avantajları hakkında bilgi edinin.
                            </ListItem>
                            <ListItem href="/docs/hasar/durum" title="Hasar Durumu">
                                Açtığınız hasar dosyalarının durumunu anlık olarak takip edin.
                            </ListItem>
                            <ListItem href="/docs/kapsam/secenekler" title="Kapsam Seçenekleri">
                                Farklı sigorta planlarını keşfedin ve ihtiyaçlarınıza en uygun olanı seçin.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            About Us
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
