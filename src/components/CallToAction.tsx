import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./HighlightedText"

export function CallToAction() {
  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Контакты</p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Готовы к
            <br />
            <HighlightedText>отдыху</HighlightedText>?
          </h2>

          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом — ответим быстро и поможем выбрать даты. Минимальный срок аренды — 2 ночи.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto text-left">
            <div className="border border-primary-foreground/20 p-6">
              <p className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-2">Телефон</p>
              <a href="tel:+79001234567" className="text-primary-foreground hover:text-primary-foreground/70 transition-colors font-medium">
                +7 (900) 123-45-67
              </a>
            </div>
            <div className="border border-primary-foreground/20 p-6">
              <p className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-2">Telegram</p>
              <a href="https://t.me/cottage_rent" className="text-primary-foreground hover:text-primary-foreground/70 transition-colors font-medium">
                @cottage_rent
              </a>
            </div>
            <div className="border border-primary-foreground/20 p-6">
              <p className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-2">Email</p>
              <a href="mailto:cottage@mail.ru" className="text-primary-foreground hover:text-primary-foreground/70 transition-colors font-medium">
                cottage@mail.ru
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+79001234567"
              className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 group"
            >
              Позвонить сейчас
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://t.me/cottage_rent"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
