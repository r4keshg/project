import { Link } from "wouter";
import { Trophy, Github } from "lucide-react";

export function Footer() {
  const sections = [
    {
      title: "Platform",
      links: [
        { name: "Arena", href: "/arena" },
        { name: "Odyssey", href: "/odyssey" },
        { name: "Tribe", href: "/tribe" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Blog", href: "/tribe?type=blog" },
        { name: "Discussions", href: "/tribe?type=discussion" },
        { name: "Q&A", href: "/tribe?type=question" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold">VSkill</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering learners through gamified education and community-driven
              knowledge sharing.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://github.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {sections.slice(0, 2).map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold">{section.title}</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href}>
                          <a className="text-sm text-muted-foreground hover:text-foreground">
                            {link.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              {sections.slice(2).map((section) => (
                <div key={section.title} className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold">{section.title}</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href}>
                          <a className="text-sm text-muted-foreground hover:text-foreground">
                            {link.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 border-t pt-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VSkill Arena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
