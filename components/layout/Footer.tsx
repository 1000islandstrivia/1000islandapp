
export default function Footer() {
  return (
    <footer className="bg-primary/10 text-foreground py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} 1000 Islands RiverRat Lore. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Explore the mysteries of the St. Lawrence River!
        </p>
      </div>
    </footer>
  );
}
