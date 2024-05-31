import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="max-w-2xl mx-auto pt-32 pb-0 px-4">
      <Link href={"/"}>
        <h1 className="font-bold">Tatenda Christopher Chinyamakobvu</h1>
        <p className="mb-4">Design — Engineer</p>
      </Link>
    </nav>
  );
}
