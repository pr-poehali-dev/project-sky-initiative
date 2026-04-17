export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-6">
              <span className="text-xl font-medium tracking-tight">🏡 Коттедж в лесу</span>
            </a>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Уютный деревянный коттедж для отдыха посуточно. Баня, сауна, природа и полный покой для вас и вашей компании.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Навигация</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  О коттедже
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-foreground transition-colors">
                  Фотогалерея
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-foreground transition-colors">
                  Удобства
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-foreground transition-colors">
                  Бронирование
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Связь</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="tel:+79001234567" className="hover:text-foreground transition-colors">
                  +7 (900) 123-45-67
                </a>
              </li>
              <li>
                <a href="https://t.me/cottage_rent" className="hover:text-foreground transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="mailto:cottage@mail.ru" className="hover:text-foreground transition-colors">
                  cottage@mail.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Коттедж в лесу. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
