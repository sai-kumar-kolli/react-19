function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-8 mt-0 border-t border-blue-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8">
        <p className="text-sm">&copy; {new Date().getFullYear()} Enterprise React Demo. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#privacy" className="text-white/80 hover:text-white underline text-xs">Privacy Policy</a>
          <a href="#terms" className="text-white/80 hover:text-white underline text-xs">Terms of Service</a>
          <a href="#contact" className="text-white/80 hover:text-white underline text-xs">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
