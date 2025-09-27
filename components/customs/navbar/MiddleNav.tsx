"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";

export function NavigationMenuDemo({ categories }: { categories: any }) {
  const [categoriess, setCategoriess] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [others, setOthers] = useState();
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    const categoriesFunc = async () => {
      console.log(window.innerWidth);
      setWindowWidth(window.innerWidth);
      const others = categories.filter(
        (citem: any) => citem?.name?.toLowerCase() == "others"
      );
      console.log(others);
      const all = categories.filter(
        (citem: any) => citem?.name?.toLowerCase() !== "others"
      );
      let alls = [];

      if (windowWidth > 1000 && windowWidth < 1200) {
        alls = all?.slice(0, 3);
        // setCategoriess();
        alls?.push(others[0]);
      }
      if (windowWidth > 1200) {
        alls = all?.slice(0, 4);
        // setCategoriess();
        alls?.push(others[0]);
      }
      console.log(alls);
      setCategoriess(alls);
    };
    return () => {
      window.removeEventListener("resize", handleResize);
      categoriesFunc;
    };
  }, [windowWidth]);

  return (
    <NavigationMenu viewport={false}>
      {categoriess?.length >= 1 ? (
        <NavigationMenuList>
          {categoriess.map((categorie) => (
            <NavigationMenuItem key={categorie?.id}>
              <NavigationMenuTrigger>{categorie?.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {categorie?.metadata?.children?.map((item: any) => (
                    <ListItem
                      key={item?.slug}
                      href={item?.path}
                      title={item?.name}
                    ></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      ) : (
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Mobile & Accessories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem
                  href="/search?s=smartphone"
                  title="Smartphones"
                ></ListItem>
                <ListItem
                  href="/search?s=tablet+ipad"
                  title="Tablets & iPads"
                ></ListItem>
                <ListItem
                  href="/search?s=smartwatch"
                  title="Smartwatches"
                ></ListItem>
                <ListItem
                  href="/search?s=phone+case"
                  title="Phone Cases & Covers"
                ></ListItem>
                <ListItem
                  href="/search?s=screen+protector"
                  title="Screen Protectors"
                ></ListItem>
                <ListItem
                  href="/search?s=phone+charger"
                  title="Chargers & Cables"
                ></ListItem>
                <ListItem
                  href="/search?s=power+bank"
                  title="Power Banks"
                ></ListItem>
                <ListItem
                  href="/search?s=earbuds"
                  title="Wireless Earbuds"
                ></ListItem>
                <ListItem
                  href="/search?s=bluetooth+headphones"
                  title="Bluetooth Headphones"
                ></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Computers & Accessories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem href="/search?s=laptop" title="Laptops"></ListItem>
                <ListItem
                  href="/search?s=desktop+pc"
                  title="Desktops & Mini PCs"
                ></ListItem>
                <ListItem href="/search?s=monitor" title="Monitors"></ListItem>
                <ListItem
                  href="/search?s=keyboard"
                  title="Keyboards"
                ></ListItem>
                <ListItem href="/search?s=mouse" title="Mice"></ListItem>
                <ListItem
                  href="/search?s=external+ssd"
                  title="External Hard Drives & SSDs"
                ></ListItem>
                <ListItem
                  href="/search?s=graphics+card"
                  title="Graphics Cards (GPU)"
                ></ListItem>
                <ListItem
                  href="/search?s=motherboard"
                  title="Motherboards & Processors"
                ></ListItem>
                <ListItem
                  href="/search?s=ram+memory"
                  title="RAM & Storage"
                ></ListItem>
                <ListItem
                  href="/search?s=webcam"
                  title="Webcams & Headsets"
                ></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Gaming Gadgets</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem
                  href="/search?s=gaming+console"
                  title="Gaming Consoles"
                ></ListItem>
                <ListItem
                  href="/search?s=vr+headset"
                  title="VR Headsets"
                ></ListItem>
                <ListItem
                  href="/search?s=gaming+controller"
                  title="Gaming Controllers"
                ></ListItem>
                <ListItem
                  href="/search?s=gaming+laptop"
                  title="Gaming Laptops"
                ></ListItem>
                <ListItem
                  href="/search?s=gaming+keyboard"
                  title="Gaming Keyboards"
                ></ListItem>
                <ListItem
                  href="/search?s=gaming+mouse"
                  title="Gaming Mice"
                ></ListItem>
                <ListItem
                  href="/search?s=gaming+headset"
                  title="Gaming Headsets"
                ></ListItem>
                <ListItem
                  href="/search?s=capture+card"
                  title="Capture Cards"
                ></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className=" hidden xl:block">
            <NavigationMenuTrigger>
              Entertainment Electronics
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem
                  href="/search?s=smart+tv"
                  title="Smart TVs"
                ></ListItem>
                <ListItem
                  href="/search?s=home+theater"
                  title="Home Theater Systems"
                ></ListItem>
                <ListItem
                  href="/search?s=projector"
                  title="Projectors"
                ></ListItem>
                <ListItem
                  href="/search?s=bluetooth+speaker"
                  title="Bluetooth Speakers"
                ></ListItem>
                <ListItem
                  href="/search?s=streaming+device"
                  title="Streaming Devices"
                ></ListItem>
                <ListItem
                  href="/search?s=soundbar"
                  title="Soundbars"
                ></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Others</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                <ListItem
                  href="/search?s=dslr+camera"
                  title="DSLR & Mirrorless Cameras"
                ></ListItem>
                <ListItem
                  href="/search?s=action+camera"
                  title="Action Cameras"
                ></ListItem>
                <ListItem href="/search?s=drone" title="Drones"></ListItem>
                <ListItem
                  href="/search?s=tripod"
                  title="Tripods & Stabilizers"
                ></ListItem>
                <ListItem
                  href="/search?s=camera+lens"
                  title="Camera Lenses"
                ></ListItem>
                <ListItem
                  href="/search?s=memory+card"
                  title="Memory Cards"
                ></ListItem>
                <ListItem
                  href="/search?s=smart+light"
                  title="Smart Lights & Bulbs"
                ></ListItem>
                <ListItem
                  href="/search?s=smart+plug"
                  title="Smart Plugs & Switches"
                ></ListItem>
                <ListItem
                  href="/search?s=smart+speaker"
                  title="Smart Speakers"
                ></ListItem>
                <ListItem
                  href="/search?s=smart+doorbell"
                  title="Smart Doorbells"
                ></ListItem>
                <ListItem
                  href="/search?s=security+camera"
                  title="Security Cameras"
                ></ListItem>
                <ListItem
                  href="/search?s=smart+thermostat"
                  title="Smart Thermostats"
                ></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      )}
    </NavigationMenu>
  );
}

export function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
