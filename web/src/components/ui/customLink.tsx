import Link from "next/link";

interface CustomLinkProps {
  href: string;
  text: string;
  type: "muted" | "primary";
}

const CustomLink = ({ href, text, type }: CustomLinkProps) => {
  const getStyle = () => {
    if (type === "muted") {
      return "text-muted-foreground hover:text-foreground hover:underline";
    } else if (type === "primary") {
      return "text-primary hover:underline font-medium";
    }
    return "";
  };

  return (
    <Link href={href} className={getStyle()}>
      {text}
    </Link>
  );
};

export default CustomLink;
