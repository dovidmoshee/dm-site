import Image from "next/image";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ref-footer">
      <Image src="/cohevo-logo-dark.svg" alt="Cohevo" width={136} height={30} className="ref-footer-logo" />
      <p className="final-thought">Practical technology help for businesses and people</p>
      <hr />
      <small>© {currentYear} Cohevo &nbsp;·&nbsp; Remote worldwide &nbsp;·&nbsp; Local computer service in Carmei Gat and Kiryat Gat</small>
    </footer>
  );
}
