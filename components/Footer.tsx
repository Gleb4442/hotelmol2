"use client";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export default function Footer() {
  const { t } = useTranslation();

  const solutions = [
    { nameKey: "footer.singleHotels" as const, href: "/solutions" },
    { nameKey: "footer.hotelChains" as const, href: "/solutions" },
  ];

  const company = [
    { nameKey: "footer.aboutUs" as const, href: "/about" },
    { nameKey: "footer.contact" as const, href: "/contact" },
  ];

  const legal = [
    { nameKey: "footer.privacy" as const, href: "https://docs.google.com/document/d/1Ejy6rwEZinKKrt26F2ShF6yBL6VZSyK8DDaNj4xKOms/edit?usp=sharing", external: true },
    { nameKey: "footer.cookies" as const, href: "https://docs.google.com/document/d/1e-Qf_fqJuANZ6nGuhyXyh9I_WyullsyBgvnhSnWO5Ts/edit?usp=sharing", external: true },
  ];

  return (
    <footer className="border-t bg-sidebar">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img src="/assets/hotelmol-logo.png" alt="HotelMol" className="h-[150px]" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t("footer.tagline")}
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:partnerships@hotelmol.com" className="hover:text-foreground">
                  partnerships@hotelmol.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+380931603830" className="hover:text-foreground">
                  +380 93 160 38 30
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.solutions")}</h3>
            <ul className="space-y-2">
              {solutions.map((item) => (
                <li key={item.nameKey}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {t(item.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.nameKey}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {t(item.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.nameKey}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                      {t(item.nameKey)}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {t(item.nameKey)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
